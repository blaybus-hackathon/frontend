import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const chatStore = create(
  persist((set) => ({
    chatInfo: {
      chatRoomId: 2,
      partnerId: 2,
      partnerName: '김요양 요양보호사',
      partnerImgAddress: null,
      lastChatContent: 'dmfdkrtghdxh55',
      lastChatSendTime: '2025-03-23T19:20:18.805541',
      notReadCnt: 3,
      patientLogId: 1,
      patientLogName: '어르신2',
      matchedFinYn: true,
      helperSeq: 1,
    },

    setChatInfo: (newInfo) => set((state) => ({ chatInfo: { ...state.chatInfo, ...newInfo } })),

    // resetChatInfo:
  })),
);

export default chatStore;
