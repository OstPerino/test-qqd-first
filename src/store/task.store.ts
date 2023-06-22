import {ITask} from "@/types/types";

export default {
  namespaced: true,
  state: {
    tasks: [
      // {
      //   id: 1,title: "title", description: "description"
      // }
    ] as Array<ITask>
  },
  getters: {
    getTask: (state: any) => (id: number) => {
      return state.tasks.find((task: ITask) => task.id === id);
    }
  },
  mutations: {
    setTasks(state: any, payload: Array<ITask>) {
      state.tasks = payload;
    },
    addTask(state: any, task: ITask) {
      state.tasks.push(task);
    },
    deleteTask(state: any, taskId: number) {
      state.tasks = state.tasks.filter((task: ITask) => {
        return task.id !== taskId;
      });
    },
    editTask(state: any, task: ITask) {
      const toUpdateTask = state.tasks.find((item: ITask) => {
        return item.id === task.id;
      });

      // for (let key in task) {
      //   toUpdateTask.key = task.key;
      // }
    }
  }
}