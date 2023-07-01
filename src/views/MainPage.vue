<template>
  <div class="task-link">
    <router-link to="tasks">Страница задач</router-link>
  </div>
  <div class="main-page">
    <h1>Добро пожаловать на главную страницу</h1>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.main-page {
  display: flex;
  justify-content: center;
  margin-top: 15px;
}

.task-link {
  display: flex;
  justify-content: start;
  align-items: center;
  background: var(--grey);
}

.task-link a {
  margin: 24px;
}

.task-link a:hover {
  color: var(--blue);
  transition: var(--transition);
}
</style>
