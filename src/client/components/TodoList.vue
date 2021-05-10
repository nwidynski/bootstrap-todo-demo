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
        <tr v-if="todos.length === 0">
          <td colspan="4" class="text-center">No tasks found.</td>
        </tr>
        <template v-else v-for="(todo, index) in todos">
          <Todo
            :id="todo.id"
            :name="todo.name"
            :isDone="todo.isDone"
            :dueDate="todo.dueDate"
            :progress="todo.progress"
            @delete-todo="(id, e) => deleteTodo(id, index, e)"
            v-bind:key="todo.id"
          ></Todo>
        </template>
        <tr v-if="addNewMode">
          <td>
            <input
              type="text"
              class="form-control"
              v-model="newTodo.name"
              placeholder="Task name"
              aria-label="task name"
              aria-describedby="task-add-btn"
            />
          </td>
          <td>
            <input
              type="date"
              class="form-control"
              v-model="formattedDate"
              placeholder="Due date"
              aria-label="due date"
              aria-describedby="task-add-btn"
            />
          </td>
          <td>
            <div class="form-group">
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  v-model.number="newTodo.progress"
                  aria-label=""
                />
                <div class="input-group-append">
                  <span class="input-group-text">%</span>
                </div>
              </div>
            </div>
          </td>
          <td>
            <button type="button" class="btn btn-primary" @click="addTodo">
              Save
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import moment from "moment";
import { Vue, Component, Prop } from "vue-property-decorator";

import Todo from "@components/Todo.vue";

@Component({ components: { Todo } })
export default class TodoList extends Vue {
  @Prop() addNewMode!: boolean;
  @Prop() toggleAddNewMode!: () => void;

  //* DATA
  isLoading = true;
  todos: Object[] = [];
  newTodo = {
    name: "",
    isDone: false,
    dueDate: "",
    progress: 0,
  };

  //* COMPUTED
  get formattedDate() {
    return moment(this.newTodo.dueDate).format("yyyy-MM-DD");
  }

  set formattedDate(dueDate: string) {
    this.newTodo.dueDate = moment(dueDate, "yyyy-MM-DD").toISOString();
  }

  //* METHODS
  addTodo() {
    fetch(`/api/todos`, {
      method: "POST",
      headers: {
        Accept: "Application/json",
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(this.newTodo),
    })
      .then((response) => {
        if (response.status !== 200) throw new Error("request failed");
        return response;
      })
      .then((response) => response.json())
      .then((newTodo) => this.todos.push(newTodo))
      .then(this.toggleAddNewMode)
      .catch(this.toggleAddNewMode);
  }

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
