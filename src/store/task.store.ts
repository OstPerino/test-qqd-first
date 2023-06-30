import { ITask } from "@/types/types";
import { db } from "@/firebase/db";
import {
  collection, doc, deleteDoc, updateDoc, setDoc, addDoc, getDocs
} from "firebase/firestore";

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

    editTask(state: any, payload: any) {
      state.tasks.push(payload);
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
        const docId = docRef.id;

        console.log(docId);

        const updatedDoc = doc(db, "task", docId);
        setDoc(updatedDoc, {
          title: task.title
        });
      })
      commit('editTask', task);
    },
  }
};



// const taskRef = doc(collection(db, "task"));
// await updateDoc(taskRef, {
//   title: id
// });

// const taskRef = doc(
//   this.fb.tasks as CollectionReference,
//   updatedTask.uuid
// );
// updateDoc(taskRef, { ...updatedTask });
// },

// editTodo({ commit, state }, payload) {
//   if (state.user.uid !== "") {
//     firebase
//       .firestore()
//       .collection("users")
//       .doc(state.user.uid)
//       .collection("todos")
//       .doc(String(payload.id)).update({
//       title: payload.title,
//       priority: Number(payload.priority),
//       category: payload.category,
//       limit: payload.limit,
//       completed: payload.completed
//     })
//   }
//   commit('editTodo', payload);
//   const regex = new RegExp(state.search);
//   if (!regex.test(state.search !== "" && payload.title.toLowerCase()) && !regex.test(payload.category.toLowerCase())) {
//     commit('searchText', '');
//   }
// },