<template>
  <div class="modal-wrapper"
  @click.self="store.commit('modalStore/closeModal')"
  >
    <ModalContainer />
  </div>
</template>

<script setup lang="ts">
import ModalContainer from "@/components/ModalContainer.vue";
import store from "@/store";
</script>

<style scoped>
.modal-wrapper {
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
</style>
