export default {
  namespaced: true,
  state: {
    isShownModal: false,
    modalType: "",
  },
  mutations: {
    showModal(state: any, payload: string) {
      state.isShownModal = true;
      state.modalType = payload;
    },
    closeModal(state: any) {
      state.isShownModal = false;
    },
  },
};
