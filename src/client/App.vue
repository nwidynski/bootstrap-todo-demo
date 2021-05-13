<template>
  <div id="app">
    <header>
      <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
        <a class="navbar-brand" href="/">ToDo Demo</a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navigation-menu"
          aria-controls="navigation-menu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navigation-menu">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/">Home</a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="/impressum.html">Impressum</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>

    <main class="mt-3" style="min-height: 100vh">
      <TodoManager></TodoManager>
    </main>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

import TodoManager from "@client/pages/TodoManager.vue";

@Component({ components: { TodoManager } })
export default class App extends Vue {}
</script>

<style scoped></style>
