import { create } from 'zustand';

const chatStore = create((set) => ({
  chatInfo: {
    chatRoomId: 2,
    partnerId: 2,
    partnerName: '김요양 요양보호사',
    patientLogId: 1,
    patientLogName: '어르신2',
  },

  setChatInfo: (newInfo) => set((state) => ({ chatInfo: { ...state.chatInfo, ...newInfo } })),
}));

export default chatStore;
