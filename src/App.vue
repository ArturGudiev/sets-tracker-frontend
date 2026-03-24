<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div style="display: flex" class="flex mb-3">
    <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div class="container-fluid">
        <!-- Логотип/Название -->
        <a class="navbar-brand fw-bold" href="#">Sets Tracker</a>

        <!-- Кнопка для мобильных -->
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#topbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>

        <!-- Ссылки (Router Links) -->
        <div class="collapse navbar-collapse" id="topbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Main Page</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/big-sets/add" class="nav-link">Big Set +</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/sets/add" class="nav-link">Set +</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>


  </div>

  <div class="ps-4">
    <RouterView />
  </div>
  <div class="toast-container position-fixed top-0 end-0 p-3"></div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  /*border: 1px solid red;
*/
  background: #41B883 !important;

  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    /* place-items: center; */
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}

</style>
