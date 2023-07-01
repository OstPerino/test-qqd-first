<template>
  <div class="modal-container">
    <LoaderComp v-if="isLoad" />
    <div class="title">
      <div class="text-container">
        <span>Создание задания</span>
      </div>
      <div class="button-container">
        <a @click="store.commit('modalStore/closeModal')">
          <CloseIcon />
        </a>
      </div>
    </div>
    <div class="actions">
      <input
        type="text"
        placeholder="Название задачи"
        v-model="createTaskState"
      />
    </div>
    <div class="submit-button">
      <button @click="createTask" class="add">Создать задание</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useStore } from "vuex";
import { ref } from "vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import LoaderComp from "@/components/LoaderComp.vue";
import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

const store = useStore();

const createTaskState = ref("");
const isLoad = ref(false);

const createTask = async () => {
  if (createTaskState.value.length !== 0) {
    isLoad.value = true;
    await store.dispatch("taskStore/createTask", {
      title: createTaskState.value
    });
    createTaskState.value = "";
    store.commit("modalStore/closeModal");
    isLoad.value = false;
    createToast("Задача успешно добавлена", {
      showIcon: true,
      type: "success",
      transition: "zoom"
    })
  } else {
    createToast("Поле не должно быть пустым!", {
      showIcon: true,
      type: "danger",
      transition: "zoom",
    });
  }
};
</script>

<style scoped>
.modal-container {
  width: 300px;
  background-color: var(--white);
  padding: 15px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-radius: var(--br);
}

.text-container span {
  color: var(--black);
}

.title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.button-container a {
  color: var(--black);
  cursor: pointer;
}

.button-container a:hover {
  color: var(--red);
  transition: all 0.3s;
}

.submit-button {
  display: flex;
  justify-content: center;
}

.add {
  background-color: var(--blue);
}

.add:hover {
  background-color: #001b4d;
  transition: var(--transition);
}

input {
  display: block;
  width: 100%;
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857143;
  color: #555;
  background-color: var(--white);
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border-color ease-in-out 0.15s,
  -webkit-box-shadow ease-in-out 0.15s;
  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
  margin-bottom: 15px;
}

input:focus {
  border-color: #66afe9;
  outline: 0;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
  0 0 8px rgba(102, 175, 233, 0.6);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
  0 0 8px rgba(102, 175, 233, 0.6);
}
</style>
