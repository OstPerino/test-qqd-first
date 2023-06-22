<template>
  <div class="main-page">
    <h1>Добро пожаловать на главную страницу</h1>
  </div>

  <div class="task-link">
    <router-link to="tasks">Добавить задачу</router-link>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.main-page {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.task-link {
  display: flex;
  justify-content: center;
  align-items: center;
}

.task-link a {
  margin: 24px;
}

.task-link a:hover {
  color: var(--blue);
  transition: var(--transition);
}
</style>
