<template>
  <ul class="task-list">
    <TaskItem v-for="i in task" :task="i" />
  </ul>
</template>

<script setup lang="ts">
import TaskItem from "@/components/TaskItem.vue";
import { db } from "@/firebase/db";
import { collection, onSnapshot } from "firebase/firestore";
import { computed, onMounted, ref } from "vue";
import store from "@/store";

const task = ref([]);

computed(() => store.getters.getTasks);


onMounted(() => {
    store.dispatch("getTasks", task)
  console.log(task);


  // onSnapshot(collection(db, "task"), (getTask) => {
  //   let fbTask = [];
  //   getTask.forEach((doc) => {
  //     const tasks = {
  //       id: doc.id,
  //       title: doc.data().title
  //     };
  //     fbTask.push(tasks);
  //   });
  //   task.value = fbTask;
  // });
});

</script>

<style scoped></style>
