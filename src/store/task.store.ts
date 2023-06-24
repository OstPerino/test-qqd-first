import {ITask} from "@/types/types";

export default {
  namespaced: true,
  state: {
    tasks: [] as Array<ITask>
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
      state.tasks = state.tasks.map((item: ITask) => {
        if (item.id === task.id) {
          return item;
        }
        return { ...item, ...task };
      });
    }
  },
  actions: {
    async fetchTasks(context: any) {
      try {
        const response = await requestTasks();
        context.commit('setTasks', response.data);
      } catch (e) {
        return e.response;
      }
    },
    async createTask(context: any, payload: ITask) {
      try {
        const response = await addTask(payload);
        context.commit('addTask', response.data);
      } catch (e) {
        return e.response;
      }
    }
  }
}