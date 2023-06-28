<template>
  <ul class="task-list">
    <TaskItem v-for="task in tasks" :task="task"/>
  </ul>
</template>

<script setup lang="ts">
import {useStore} from "vuex";
import {computed, onMounted, ref} from "vue";
import TaskItem from "@/components/TaskItem.vue";

const store = useStore();

const tasks = computed(() => store.state.taskStore.tasks);
</script>

<style scoped></style>
