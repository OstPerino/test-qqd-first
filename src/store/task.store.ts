import { ITask } from "@/types/types";
import { db } from "@/firebase/db";
import { collection, doc, deleteDoc, getDocs, updateDoc } from "firebase/firestore";

export default {
  namespaced: true,
  state: {
    tasks: [] as Array<ITask>
  },
  mutations: {
    setTasks(state: any, payload: Array<any>) {
      state.tasks = payload.map((task) => {
        return {
          id: task.id,
          title: task.data().title
        }
      })
    },
    deleteTask(state: any, payload: string) {
      state.tasks.push(payload);
    }
  },
  actions: {
    // KAKAYA TO HUITA
    async fetchTasks({ commit }: { commit: Function }, state: any) {
      const dataCollection = collection(db, "task");
      const results = await getDocs(dataCollection);
      commit("setTasks", results.docs);
      // console.log(results.docs);
      // results.docs.forEach((doc) => {
      //   const data = {
      //     id: doc.id,
      //     title: doc.data().title
      //   };
      //   console.log(data);
      //   commit("getTasks", data);
      // });
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
