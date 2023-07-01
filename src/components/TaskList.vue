<template>
  <div class="task-page"
       v-if="tasks.length === 0"
  >
    <h1>Что бы добавить задачу нажмите кнопку "Добавить задачу"</h1>
  </div>
  <div class="task-container">
    <h1 class="title"
        v-if="tasks.length !== 0"
    >
      Задачи
    </h1>
    <ul class="task-list">
      <TaskItem v-for="task in tasks" :task="task" />
    </ul>
    <div class="button-container">
      <button class="add" @click="store.commit('modalStore/showModal', '')">
        Добавить задание
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { computed, ref } from "vue";
import TaskItem from "@/components/TaskItem.vue";

const store = useStore();

const tasks = computed(() => store.state.taskStore.tasks);
</script>

<style scoped>
.task-container {
  width: 90vw;
  max-width: 35rem;
  background: var(--grey);
  color: #eee;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  border-radius: 1em;
  padding: 1.2rem 2rem 1.8rem;
}

.task-page {
  display: flex;
  justify-content: center;
  margin: 15px;
}

.title {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 40px;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
}

.add {
  background-color: var(--blue);
}

.add:hover {
  background-color: #001b4d;
  transition: var(--transition);
}
</style>
