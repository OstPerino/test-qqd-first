import { ITask } from "@/types/types";
import { db } from "@/firebase/db";
import { collection, doc, deleteDoc, onSnapshot, updateDoc, setDoc, addDoc } from "firebase/firestore";
import firebase from "firebase/compat";

export default {
  namespaced: true,
  state: {
    tasks: [] as Array<ITask>
  },
  mutations: {
    setTasks(state: any, payload: Array<any>) {
      // state.tasks = state.tasks.filter((tasks: any) => tasks.id !== payload);
      // state.tasks.push(payload);
      state.tasks = payload;
    },

    createTask(state: any, payload: ITask) {
      state.tasks.push(payload);
    },

    deleteTask(state: any, payload: any) {
      state.tasks = state.tasks.filter((tasks: any) => tasks.id !== payload);
    },

    // editTask(state: any, payload: any) {
    //   state.tasks.forEach((tasks: any) => {
    //     if (tasks.id === payload) {
    //       tasks.title = "hello";
    //     }
    //   });
    // },

    cleanStore(state: any) {
      state.tasks = [] as Array<ITask>
    }
  },
  actions: {
    async fetchTasks({ commit }: { commit: Function }, state: any) {
      const tasks: any = [];
      await onSnapshot(collection(db, "task"), (getTask) => {
        getTask.forEach((doc) => {
          const task = {
            id: doc.id,
            title: doc.data().title
          };
          tasks.push(task);
        });
        commit("setTasks", tasks);
      });
    },

    async createTask({ commit, dispatch }: { commit: Function, dispatch: Function }, task: any) {
      const docRef = await addDoc(collection(db, "task"), {
        title: task.title
      });
      await dispatch("fetchTasks");
    },

    async deleteTask({ commit, dispatch }: { commit: Function, dispatch: Function }, task: any) {
      const result = await deleteDoc(doc(db, "task", task));
      await dispatch("fetchTasks");
    },

    // async editTask({ commit }: { commit: Function }, tasks: any) {
    //   await setDoc(doc(db, "task", tasks.id), {
    //     title: tasks
    //   });
    //   console.log(tasks);
    //   commit("editTask", tasks.id);
    // },
  },
};
