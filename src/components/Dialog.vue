<template>
  <v-dialog v-model="isOpen" :width="width">
    <v-card>
      <slot />
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref, defineProps } from "vue";

const { width } = defineProps(["width"]);
const isOpen = ref(false);
</script>
