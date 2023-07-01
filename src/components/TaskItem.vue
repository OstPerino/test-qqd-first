<template>
  <li class="task-item">
    <LoaderComp v-if="isLoad" />
    <div class="info">
      <div class="row title-container">
        <div class="text-container">
          <div class="task-title">
            {{ props.task.title }}
          </div>
        </div>
      </div>
    </div>
    <div class="actions">
      <div class="button-container">
        <span
          @click="isUpdate"
          class="update"
        >
          <EditIcon />
        </span>
      </div>
      <div class="button-container">
        <span @click="deleteTask" class="delete">
          <TrashIcon />
        </span>
      </div>
    </div>
  </li>

  <div class="update-container"
       v-if="editTask"
       @click.self="isUpdate"
  >
    <div class="update-content">
      <LoaderComp v-if="isLoad" />
      <div class="update-title">
        <div class="update-text-container">
          <span>Изменение задания</span>
        </div>
        <div class="update-button-container">
          <a @click="isUpdate">
            <CloseIcon />
          </a>
        </div>
      </div>
      <div class="update-actions">
        <input
          type="text"
          placeholder="Название задачи"
          v-model="updateTaskState"
        />
      </div>
      <div class="update-submit-button">
        <button @click="updateTask" class="add">Изменить задачу</button>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import { PropType, ref } from "vue";
import { ITask } from "@/types/types";
import { useStore } from "vuex";
import TrashIcon from "@/components/icons/TrashIcon.vue";
import EditIcon from "@/components/icons/EditIcon.vue";
import CloseIcon from "@/components/icons/CloseIcon.vue";
import LoaderComp from "@/components/LoaderComp.vue";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/db";
import { createToast } from "mosha-vue-toastify";

const props = defineProps({
  task: {
    type: Object as PropType<ITask>,
    required: true
  }
});

const store = useStore();

const isLoad = ref(false);

const deleteTask = async () => {
  isLoad.value = true;
  await store.dispatch("taskStore/deleteTask", props.task?.id);
  isLoad.value = false;
  createToast("Задача успешно удалена", {
    showIcon: true,
    type: "success",
    transition: "zoom"
  })
};

const editTask = ref(false);
const isUpdate = () => {
  editTask.value = !editTask.value;
};
const updateTaskState = ref("");

const updateTask = async () => {
  if (updateTaskState.value.length !== 0) {
    isLoad.value = true;
    const updatedDoc = doc(db, "task", props.task?.id);
    await updateDoc(updatedDoc, {
      title: updateTaskState.value
    });
    updateTaskState.value = "";
    await store.dispatch("taskStore/fetchTasks");
    isLoad.value = false;
    editTask.value = false;
    createToast("Задача успешно обновлена", {
      showIcon: true,
      type: "success",
      transition: "zoom"
    });
  } else {
    createToast("Поле не должно быть пустым!", {
      showIcon: true,
      type: "danger",
      transition: "zoom"
    });
  }
};
</script>

<style scoped>
.task-item {
  border-bottom: 1px solid #eee;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: .5rem .9rem .5rem .4rem;
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.row {
  display: flex;
  align-items: center;
}

.actions {
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: baseline;
  margin-left: 10px;
  margin-top: 10px;
}

.button-container span {
  cursor: pointer;
  margin-left: 10px;
}

.update:hover {
  color: var(--green);
  transition: var(--transition);
}

.delete:hover {
  color: var(--red);
  transition: var(--transition);
}

.update-container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.update-content {
  width: 300px;
  background-color: var(--white);
  padding: 15px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-radius: var(--br);
}

.update-text-container span {
  color: var(--black);
}

.update-title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.update-button-container a {
  color: var(--black);
  cursor: pointer;
}

.update-button-container a:hover {
  color: var(--red);
  transition: all 0.3s;
}

.update-submit-button {
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
