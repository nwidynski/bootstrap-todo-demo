<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <TodoList
          :addNewMode="addNewMode"
          :toggleAddNewMode="toggleAddNewMode"
        ></TodoList>
      </div>
    </div>

    <div v-if="!addNewMode" class="row">
      <div class="col-12">
        <button
          type="button"
          class="btn btn-outline-primary w-100"
          style="border-style: dashed"
          @click="toggleAddNewMode"
        >
          Add
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Vue, Component } from "vue-property-decorator";

import TodoList from "@client/components/TodoList.vue";

@Component({ components: { TodoList } })
export default class TodoManager extends Vue {
  addNewMode = false;

  //* METHODS
  toggleAddNewMode() {
    this.addNewMode = !this.addNewMode;
  }
}
</script>

<style scoped></style>
