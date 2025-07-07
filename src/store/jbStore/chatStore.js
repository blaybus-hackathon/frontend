import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const chatStore = create(
  persist((set) => ({
    chatInfo: {
      chatRoomId: 2,
      partnerId: 2,
      partnerName: '김요양 요양보호사',
      partnerImgAddress: null,
      lastChatContent: '',
      lastChatSendTime: '',
      notReadCnt: 0,
      patientLogId: 1,
      patientLogName: '어르신2',
    },

    setChatInfo: (newInfo) => set((state) => ({ chatInfo: { ...state.chatInfo, ...newInfo } })),

    // resetChatInfo:
  })),
);

export default chatStore;
