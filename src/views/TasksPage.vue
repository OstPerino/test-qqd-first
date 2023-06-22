<template>
  <div class="tasks-page">
    <TaskList/>
    <div class="button-container">
      <button @click="store.commit('modalStore/showModal', '')">
        Create task
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useStore} from "vuex";
import TaskList from "@/components/TaskList.vue";

const store = useStore();
</script>

<style scoped>

</style>