import { ITask } from "@/types/types";
import { db } from "@/firebase/db";
import { collection, doc, deleteDoc, getDocs, updateDoc } from "firebase/firestore";

export default {
  state: {
    namespaced: true,
    tasks: [] as Array<ITask>
  },
  mutations: {
    getTasks(state: any, payload: string) {
      state.tasks.push(payload);
    },
    deleteTask(state: any, payload: string) {
      state.tasks.push(payload);
    }
  },
  actions: {
    // KAKAYA TO HUITA
    async getTasks({ commit }: { commit: Function }, state: any) {
      const dataCollection = collection(db, "task");
      const results = await getDocs(dataCollection);
      results.docs.forEach((doc) => {
        const data = {
          id: doc.id,
          title: doc.data().title
        };
        console.log(data);
        commit("getTasks", data);
      });
    },
    // RABOTAET
    async deleteTask({ commit }: { commit: Function }, tasks: any) {
      await deleteDoc(doc(db, "task", tasks));
      commit("deleteTask", tasks);
    }

    //EWE NE DELAL
    // async updateTask({ commit, dispatch }, { tasks, routeId }) {
    //   commit("deleteTask", tasks);
    //   await dispatch("getTasks");
    //   commit("updateTask", routeId);
    // }
  },
  getters: {
    getTasks(state: any) {
      return state.tasks;
    }
  }
};
