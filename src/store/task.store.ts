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
      state.tasks.push(payload);
    },

    createTask(state: any, payload: Array<any>) {
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
      let bTask = [];
      await onSnapshot(collection(db, "task"), (getTask) => {
        getTask.forEach((doc) => {
          const tasks = {
            id: doc.id,
            title: doc.data().title
          };
          console.log(tasks);
          bTask.push(tasks);
          commit("setTasks", tasks);
        });
      });
    },

    async createTask({ commit }: { commit: Function }, tasks: any) {
      const docRef = await addDoc(collection(db, "task"), {
        title: tasks.title
      });
      const taskId = docRef.id
      const updateDocId = doc(db, "task", taskId) ;
      await updateDoc(updateDocId, {
        id: taskId
      });
      commit("createTask", tasks);
    },

    async deleteTask({ commit }: { commit: Function }, tasks: any) {
      await deleteDoc(doc(db, "task", tasks));
      commit("deleteTask", tasks);
    },

    // async editTask({ commit }: { commit: Function }, tasks: any) {
    //   await setDoc(doc(db, "task", tasks.id), {
    //     title: tasks
    //   });
    //   console.log(tasks);
    //   commit("editTask", tasks.id);
    // },

    cleanStore({ commit }: { commit: Function }) {
      commit("cleanStore");
    }
  },
};
