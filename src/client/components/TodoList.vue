<template>
  <div class="table-responsive-sm">
    <table class="table table-striped">
      <thead>
        <th style="width: 50%">Tasks</th>
        <th style="width: 15%">Due Date</th>
        <th style="width: 15%">Progress</th>
        <th style="width: 20%">Actions</th>
      </thead>
      <tbody>
        <tr v-if="this.todos.length === 0">
          <td colspan="4" class="text-center">No tasks found.</td>
        </tr>
        <template v-else v-for="(todo, index) in this.todos">
          <Todo
            :id="todo.id"
            :name="todo.name"
            :isDone="todo.isDone"
            :dueDate="todo.dueDate"
            :progress="todo.progress"
            @delete-todo="deleteTodo"
            v-bind:key="index"
          ></Todo>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import Todo from "./Todo.vue";

@Component({ components: { Todo } })
export default class TodoList extends Vue {
  //* DATA
  isLoading = true;
  todos = [];

  //* METHODS
  deleteTodo(id: number, index: number) {
    fetch(`/api/todos/${id}`, { method: "DELETE" })
      .then(() => this.todos.splice(index, 1))
      .catch((err) => console.log(err));
  }

  //* LIFECYCLE HOOKS
  created() {
    fetch("/api/todos")
      .then((response) => response.json())
      .then((body) => {
        this.isLoading = false;
        this.todos = body;
      })
      .catch((err) => console.log(err));
  }
}
</script>

<style scoped></style>
