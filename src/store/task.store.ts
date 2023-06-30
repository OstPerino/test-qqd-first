import { ITask } from "@/types/types";
import { db } from "@/firebase/db";
import { collection, doc, deleteDoc, onSnapshot, updateDoc, setDoc, addDoc, getDocs } from "firebase/firestore";

export default {
  namespaced: true,
  state: {
    tasks: [] as Array<ITask>,
    loadingStatus: false
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

    // editTask(state: any, payload: any) {
    //   // state.tasks.push(payload);
    //   state.tasks.forEach((tasks: any) => {
    //     if (tasks.id === payload) {
    //       tasks.title = "hello";
    //     }
    //   });
    // },

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
        tasks.push(task)
      });
      commit("setTasks", tasks)
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
      const ref = doc(collection(db, 'users'), query.uid)
      const userDoc = await setDoc(ref)
      // const docRef = doc(collection(db, "task", task.id), task.id);
      // await setDoc(docRef, {
      //   title: task.title
      // })
      // console.log(task);
      // commit("editTask", task.id)
    }
    // db.collection('books').doc(book.id).update({
    //   title: book.title
    // })
  },
};
