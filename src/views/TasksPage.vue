<template>
  <div class="main-page-link">
    <router-link to="main">Главная страница</router-link>
  </div>
  <div class="tasks-list">
    <TaskList />
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import TaskList from "@/components/TaskList.vue";

const store = useStore();

import { onMounted } from "vue";

onMounted(async () => {
  await store.dispatch("taskStore/fetchTasks");
});
</script>

<style scoped>
.main-page-link {
  display: flex;
  justify-content: start;
  align-items: center;
  background: var(--grey);
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
  flex-direction: column;
  margin-top: 30px;
}
</style>
