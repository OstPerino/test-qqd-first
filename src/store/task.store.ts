import { ITask } from "@/types/types";
import { db } from "@/firebase/db";
import {
  collection, doc, deleteDoc, setDoc, addDoc, getDocs, updateDoc
} from "firebase/firestore";

export default {
  namespaced: true,
  state: {
    tasks: [] as Array<ITask>,
  },
  mutations: {
    setTasks(state: any, payload: Array<any>) {
      state.tasks = payload;
    },

    createTask(state: any, payload: ITask) {
      state.tasks.push(payload);
    },

    deleteTask(state: any, payload: any) {
      state.tasks = state.tasks.filter((tasks: any) => tasks.id !== payload);
    },

    editTask(state: any, payload: any) {
      state.tasks = payload;
    }

  },
  actions: {
    async fetchTasks({ commit }: { commit: Function }, state: any) {
      const tasks: any = [];
      const querySnapshot = await getDocs(collection(db, "task"));
      querySnapshot.forEach((doc) => {
        const task = {
          id: doc.id,
          title: doc.data().title
        };
        tasks.push(task);
      });
      commit("setTasks", tasks);
    },

    async createTask({ commit, dispatch }: { commit: Function, dispatch: Function }, task: any) {
      await addDoc(collection(db, "task"), {
        title: task.title
      });
      await dispatch("fetchTasks");
    },

    async deleteTask({ commit, dispatch }: { commit: Function, dispatch: Function }, task: any) {
      await deleteDoc(doc(db, "task", task));
      await dispatch("fetchTasks");
    },

    async editTask({ commit }: { commit: Function }, task: any) {
      const querySnapshot = await getDocs(collection(db, "task"));
      querySnapshot.forEach((docRef) => {
        const updatedDoc = doc(db, "task", docRef.id);
        updateDoc(updatedDoc, {
          title: task.title
        });
      });
      commit("editTask", task.id);
    }
  }
};
