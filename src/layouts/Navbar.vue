<template>
  <div class="navbar d-flex align-center justify-between">
    <div>
      <router-link to="/">
        <h1 class="text-2xl text-white font-bold">Quotes</h1>
      </router-link>
    </div>
    <div class="user-info flex items-center">
      <div class="text-content">
        <h4 class="user-name text-xl font-semibold text-white leading-3">
          Shahribonu
        </h4>
        <p class="text-xs font-semibold text-white text-right">admin</p>
      </div>
      <div class="profile-pic ml-2">
        <v-avatar color="white">
          <i class="fas fa-user"> </i>
        </v-avatar>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.navbar {
  background-color: #78c0a8;
}
@media (max-width: 640px) {
  .navbar {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1rem;
  }
  .user-info {
    display: none;
  }
}
</style>
