import { ITask } from "@/types/types";
import { db } from "@/firebase/db";
import { collection, doc, deleteDoc, getDocs, onSnapshot, updateDoc } from "firebase/firestore";

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
        };
      });
    },

    deleteTask(state: any, payload: any) {
      state.tasks = state.tasks.filter((tasks: any) => tasks.id !== payload);
    },

    editTask(state: any, payload: any) {
      state.tasks.forEach((tasks: any) => {
        if (tasks.id === payload) {
          tasks.title = "hello";
        }
      });
    }
  },
  actions: {
    async fetchTasks({ commit }: { commit: Function }, state: any) {
      const dataCollection = collection(db, "task");
      const results = await getDocs(dataCollection);
      commit("setTasks", results.docs);
    },

    async deleteTask({ commit }: { commit: Function }, tasks: any) {
      await deleteDoc(doc(db, "task", tasks));
      commit("deleteTask", tasks);
    },

    async editTask({ commit }: { commit: Function }, tasks: any) {
      await updateDoc(doc(db, "task", tasks.id), {
        title: tasks
      });
      console.log(tasks);
      commit("editTask", tasks.id);
    }
  }
};
