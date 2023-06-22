<template>
  <li class="task-item">
    <div class="info">
      <div class="row title-container">
        <div class="text-container">
          <span class="title">{{ task.title }}</span>
        </div>
        <div class="button-container update-button-container">
          <button>Update</button>
        </div>
      </div>
      <div class="row subtitle-container">{{ task.description }}</div>
    </div>
    <div class="actions">
      <div class="button-container">
        <button>Delete task</button>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import {PropType} from "vue";
import {ITask} from "@/types/types";

const props = defineProps({
  task: {
    type: Object as PropType<ITask>,
    required: true
  }
})

</script>

<style scoped lang="scss">
.task-item {
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
}

button {
  background-color: #070783;
  padding: 0.5rem 1rem;
  color: white;
}

.row {
  display: flex;
  align-items: center;
}

.update-button-container {
  margin-left: 1.5rem;
}
</style>