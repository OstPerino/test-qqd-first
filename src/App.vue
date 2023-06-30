<template>
  <ModalWrapper v-if="showModal"/>
  <ModalUpdateWrapper v-if="showUpdateModal" />
  <router-view/>
</template>

<style lang="scss">
@import "@/styles/base.scss";
</style>

<script setup lang="ts">
import {computed} from "vue";
import {useStore} from "vuex";
import ModalWrapper from "@/components/ModalWrapper.vue";
import ModalUpdateWrapper from "@/components/ModalUpdateWrapper.vue";

const store = useStore();

const showModal = computed(() => store.state.modalStore.isShownModal);
const showUpdateModal = computed(() => store.state.modalStore.isShownUpdateModal);
</script>
