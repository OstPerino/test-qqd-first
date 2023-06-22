<template>
  <li class="task-item">
    <div class="info">
      <div class="row title-container">
        <div class="text-container">
          <span class="title">Задание:{{ props.task.title }}</span>
        </div>
      </div>
    </div>
    <div class="actions">
      <div class="button-container">
        <span
          @click="store.commit('modalStore/showUpdateModal', '')"
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
</template>

<script setup lang="ts">
import { PropType, reactive } from "vue";
import { ITask } from "@/types/types";
import { useStore } from "vuex";
import TrashIcon from "@/components/icons/TrashIcon.vue";
import EditIcon from "@/components/icons/EditIcon.vue";

const props = defineProps({
  task: {
    type: Object as PropType<ITask>,
    required: true,
  },
});

const store = useStore();

import db from "@/db/db";
import { doc, deleteDoc } from "firebase/firestore";

const id = props.task.id;

const deleteTask = () => {
  deleteDoc(doc(db, "task", id));
};
</script>

<style scoped>
.task-item {
  background-color: var(--white);
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
  padding: 24px;
  border-radius: 5px;
  margin: 8px;
  flex-direction: row;
  align-items: center;
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: center;
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
</style>
