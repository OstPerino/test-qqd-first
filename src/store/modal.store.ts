export default {
  namespaced: true,
  state: {
    isShownModal: false,
    isShownUpdateModal: false,
    modalType: "",
  },
  mutations: {
    showModal(state: any, payload: string) {
      state.isShownModal = true;
      state.modalType = payload;
    },
    showUpdateModal(state: any, payload: string) {
      state.isShownUpdateModal = true;
      state.modalType = payload;
    },
    closeModal(state: any) {
      state.isShownModal = false;
    },
    closeUpdateModal(state: any) {
      state.isShownUpdateModal = false;
    },
  },
};
