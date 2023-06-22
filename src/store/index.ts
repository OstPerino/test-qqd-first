import { createStore } from "vuex";
import taskStore from "@/store/task.store";
import modalStore from "@/store/modal.store";

export default createStore({
  modules: { taskStore, modalStore },
});
