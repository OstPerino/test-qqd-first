<template>
  <div class="modal-container">
    <div class="title">
      <div class="text-container">
        <span>Create task</span>
      </div>
      <div class="button-container">
        <button @click="store.commit('modalStore/closeModal')">
          Close
        </button>
      </div>
    </div>
    <div class="actions">
      <input type="text" v-model="createTaskState.title">
      <input type="text" v-model="createTaskState.description">
    </div>
    <div class="submit-button">
      <button @click="create">
        Create
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useStore} from "vuex";
import {reactive} from "vue";

const store = useStore();

const createTaskState = reactive({
  title: "",
  description: ""
})

const create = () => {
  const id = Date.now();
  const task = {title: createTaskState.title, description: createTaskState.description, id};
  store.commit('taskStore/addTask', task);
  store.commit('modalStore/closeModal');
}
</script>

<style scoped lang="scss">
.modal-container {
  width: 800px;
  height: 600px;
  background-color: white;
  padding: 1.5rem;
}

.title {
  display: flex;
  justify-content: space-between;
}
</style>