<template>
  <ModalWrapper v-if="showModal"/>
  <router-view/>
</template>

<style lang="scss">
@import "@/styles/base.css";
</style>

<script setup lang="ts">
import {computed} from "vue";
import {useStore} from "vuex";
import ModalWrapper from "@/components/ModalWrapper.vue";

const store = useStore();

const showModal = computed(() => store.state.modalStore.isShownModal);
</script>
