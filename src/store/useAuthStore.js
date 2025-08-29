import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SERVER_ROLE, CLIENT_ROLE, ROLE_MAP } from '@/constants/authType';

const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null, // {chatSenderId, email, userAuth, cmSeq?, helperSeq? }

      /**
       * 사용자 로그인 처리
       * @param {Object} userInfo - 서버에서 받은 사용자 정보
       * @param {string} userInfo.chatSenderId - 채팅 발신자 ID
       * @param {string} userInfo.email - 사용자 이메일
       * @param {string} userInfo.userAuth - 서버 권한 (MANAGER | MEMBER)
       * @param {number} [userInfo.cmSeq] - 관리자인 경우 시퀀스
       * @param {number} [userInfo.helperSeq] - 요양보호사인 경우 시퀀스
       */
      login: (userInfo) => {
        if (!userInfo || !userInfo.chatSenderId || !userInfo.email || !userInfo.userAuth) {
          console.error('Invalid user info provided to login');
          return;
        }

        const { userAuth: serverRole, cmSeq, helperSeq, ...rest } = userInfo;

        // valid server authorize
        if (!Object.values(SERVER_ROLE).includes(serverRole)) {
          console.error('Invalid server role: ', serverRole);
          return;
        }

        // map server userAuth(manager, helper) -> client(center, helper)
        const clientRole = ROLE_MAP.toClient[serverRole];

        if (!clientRole) {
          console.error('Failed to map server role to client role: ', serverRole);
          return;
        }

        // map user by userAuth
        const mappedUser = {
          ...rest,
          serverRole,
          clientRole,
          cmSeq: serverRole === SERVER_ROLE.MANAGER ? cmSeq : undefined,
          helperSeq: serverRole === SERVER_ROLE.MEMBER ? helperSeq : undefined,
        };

        // valid seq
        if (serverRole === SERVER_ROLE.MANAGER && !cmSeq) {
          console.error('cmSeq is required for MANAGER role');
          return;
        }

        if (serverRole === SERVER_ROLE.MEMBER && !helperSeq) {
          console.error('helperSeq is required for MEMBER role');
          return;
        }

        set({ user: mappedUser });
      },

      /**
       * 사용자 로그아웃 처리
       * logoutHandler와 함께 사용
       */
      logout: () => set({ user: null }),

      /**
       * 사용자 정보 부분 업데이트
       * @param {Object} updates - 업데이트할 필드들
       */
      updateUser: (updates) => {
        const currentUser = get().user;
        if (!currentUser) {
          console.error('No user logged in to update');
          return;
        }

        set({
          user: {
            ...currentUser,
            ...updates,
          },
        });
      },

      // === 클라이언트 권한 확인 메서드 (클라이언트 로직용) ===

      /**
       * 관리자 권한 확인 (클라이언트 기준)
       * @returns {boolean} 관리자 여부
       */
      isCenter: () => get().user?.clientRole === CLIENT_ROLE.CENTER,

      /**
       * 요양보호사 권한 확인 (클라이언트 기준)
       * @returns {boolean} 요양보호사 여부
       */
      isHelper: () => get().user?.clientRole === CLIENT_ROLE.HELPER,

      /**
       * 로그인 상태 확인
       * @returns {boolean} 로그인 여부
       */
      isLoggedIn: () => !!get().user,

      // === 서버 권한 확인 메서드 (API 통신용) ===
      /**
       * 서버 권한이 MANAGER인지 확인
       * @returns {boolean} 서버 기준 관리자 여부
       */
      isServerManager: () => get().user?.serverRole === SERVER_ROLE.MANAGER,

      /**
       * 서버 권한이 MEMBER인지 확인
       * @returns {boolean} 서버 기준 멤버 여부
       */
      isServerMember: () => get().user?.serverRole === SERVER_ROLE.MEMBER,

      // === 권한별 식별자 getter ===
      /**
       * 현재 사용자의 cmSeq 반환
       * @returns {number|null} cmSeq (관리자가 아닌 경우 null)
       */
      getCmSeq: () => {
        const user = get().user;
        return user?.serverRole === SERVER_ROLE.MANAGER ? user.cmSeq : null;
      },

      /**
       * 현재 사용자의 helperSeq 반환
       * @returns {number|null} helperSeq (요양보호사가 아닌 경우 null)
       */
      getHelperSeq: () => {
        const user = get().user;
        return user?.serverRole === SERVER_ROLE.MEMBER ? user.helperSeq : null;
      },

      /**
       * 현재 사용자의 권한별 식별자 반환
       * @returns {number|null} 권한에 따른 식별자
       */
      getUserSeq: () => {
        const user = get().user;
        if (!user) return null;

        return user.serverRole === SERVER_ROLE.MANAGER
          ? user.cmSeq
          : user.serverRole === SERVER_ROLE.MEMBER
            ? user.helperSeq
            : null;
      },

      /**
       * 클라이언트 권한 반환
       * @returns {string|null} 클라이언트 권한 (center | helper)
       */
      getClientRole: () => get().user?.clientRole || null,

      /**
       * 서버 권한 반환 (API 통신용)
       * @returns {string|null} 서버 권한 (MANAGER | MEMBER)
       */
      getServerRole: () => get().user?.serverRole || null,

      /**
       * 사용자 기본 정보 반환
       * @returns {Object|null} 사용자 기본 정보
       */
      getUserInfo: () => {
        const user = get().user;
        if (!user) return null;

        return {
          chatSenderId: user.chatSenderId,
          email: user.email,
          clientRole: user.clientRole,
          serverRole: user.serverRole,
        };
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user }),
      storage: {
        getItem: (name) => {
          try {
            const item = sessionStorage.getItem(name);
            return item ? JSON.parse(item) : null;
          } catch (error) {
            console.error('Error reading from sessionStorage:', error);
            return null;
          }
        },
        setItem: (name, value) => {
          try {
            sessionStorage.setItem(name, JSON.stringify(value));
          } catch (error) {
            console.error('Error writing to sessionStorage:', error);
          }
        },
        removeItem: (name) => {
          try {
            sessionStorage.removeItem(name);
          } catch (error) {
            console.error('Error removing from sessionStorage:', error);
          }
        },
      },
    },
  ),
);

export default useAuthStore;
