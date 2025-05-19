import { create } from "zustand";

const useAuthStore = create((set) => ({
  email: "",
  isVerified: false,

  password: "",
  name: "",
  phone: "",
  addressDetail: "",

  essentialCertNo: "", // 요양보호사
  careCertNo: "", // 간병사
  nurseCertNo: "", // 병원동행매니저
  postPartumCertNo: "", // 산후관리사
  helperOtherCerts: [], // 기타 자격증 목록

  carOwnYn: null,
  eduYn: null,

  // 메서드들
  setEmail: (email) => set({ email }),
  setIsVerified: (status) => set({ isVerified: status }),
  setPassword: (password) => set({ password }),
  setName: (name) => set({ name }),
  setPhone: (phone) => set({ phone }),
  setAddressDetail: (address) => set({ addressDetail: address }),
  setCarOwnYn: (hascar) => set({ carOwnYn: hascar }),
  setEduYn: (hasEdu) => set({ eduYn: hasEdu }),

  setEssentialCertNo: (certNo) => set({ essentialCertNo: certNo }),
  setCareCertNo: (certNo) => set({ careCertNo: certNo }),
  setNurseCertNo: (certNo) => set({ nurseCertNo: certNo }),
  setPostPartumCertNo: (certNo) => set({ postPartumCertNo: certNo }),

  setHelperOtherCerts: (certs) => set({ helperOtherCerts: certs }),
  addHelperOtherCert: (cert) =>
    set((state) => ({
      helperOtherCerts: [...state.helperOtherCerts, cert],
    })),

  removeHelperOtherCert: (index) =>
    set((state) => ({
      helperOtherCerts: state.helperOtherCerts.filter((_, i) => i !== index),
    })),

  // 초기화
  clearAll: () =>
    set({
      email: "",
      isVerified: false,
      password: "",
      name: "",
      phone: "",
      addressDetail: "",
      carOwnYn: null,
      eduYn: null,
      essentialCertNo: "",
      careCertNo: "",
      nurseCertNo: "",
      postPartumCertNo: "",
      helperOtherCerts: [],
    }),
}));

export default useAuthStore;
