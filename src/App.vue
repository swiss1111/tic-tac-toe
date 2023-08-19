<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Game</RouterLink>
        <RouterLink to="/about">Saves</RouterLink>
      </nav>
<!--      <button class="login-button">Login</button>-->
    </div>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped>
header {
  padding: 10px;
}

.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

nav {
  display: flex;
}

nav a {
  padding: 10px 20px;
}

.login-button {
  background-color: hsla(160, 100%, 37%, 1);
  color: #fff;
  padding: 10px 20px;
  border: none;
  font-size: 15px;
  line-height: 1.6;
  cursor: pointer;
}

.login-button:hover {
  background-color: hsla(160, 100%, 27%, 1);
}

main {
  flex: 1;
  overflow: auto;
}
</style>
