<template>
  <div class="modal-update-wrapper">
    <ModalUpdate />
  </div>
</template>

<script setup lang="ts">
import ModalUpdate from "@/components/ModalUpdate.vue";
</script>

<style scoped>
.modal-update-wrapper {
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
