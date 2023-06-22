import { createStore } from "vuex";
import { ITask } from "@/types/types";

export default createStore({
  state: {
    tasks: [] as Array<ITask>
  },
  mutations: {},
  actions: {},
  getters: {},
  modules: {}
});
