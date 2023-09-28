<template>
  <main class="main-layout">
    <Navbar class="px-[50px] py-[15px]" />
    <div class="main-wrapper flex flex-column p-5">
      <div class="main-router-content grow overflow-y-scroll">
        <slot />
      </div>
    </div>
  </main>
</template>

<script setup>
import Navbar from "./Navbar.vue";
</script>

<style>
.main-layout {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.main-layout .main-wrapper {
  flex-grow: 1;
}
.main-router-content::-webkit-scrollbar {
  display: none;
}
</style>
