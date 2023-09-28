<template>
  <div>
    <MainLayout>
      <router-view />
    </MainLayout>
  </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import MainLayout from "./layouts/MainLayout.vue";
</script>
