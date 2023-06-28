<template>
  <div class="tasks-page">
    <h1>Список заданий</h1>
  </div>
  <div class="main-page-link">
    <router-link to="main">Главная страница</router-link>
  </div>
  <div class="tasks-list">
    <TaskList />
  </div>
  <div class="button-container">
    <button class="add" @click="store.commit('modalStore/showModal', '')">
      Добавить задание
    </button>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import TaskList from "@/components/TaskList.vue";
import {computed, onMounted} from "vue";

const store = useStore();

onMounted(async () => {
  await store.dispatch('taskStore/fetchTasks');
})
</script>

<style scoped>
.tasks-page {
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-page-link {
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-page-link a {
  margin: 24px;
}

.main-page-link a:hover {
  color: var(--blue);
  transition: var(--transition);
}

.tasks-list {
  display: flex;
  justify-content: center;
  align-items: center;
}

.button-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.add {
  background-color: var(--blue);
}

.add:hover {
  background-color: #001b4d;
  transition: var(--transition);
}
</style>
