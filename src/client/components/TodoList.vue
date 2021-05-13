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

import BackEndRouter from "@client/utils/http";
import TodoModel from "@client/models/Todo";
import Todo from "@client/components/Todo.vue";

@Component({ components: { Todo } })
export default class TodoList extends Vue {
  @Prop() addNewMode!: boolean;
  @Prop() toggleAddNewMode!: () => void;

  //* DATA
  isLoading = true;
  todos: TodoModel[] = [];
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
    BackEndRouter.TodoRouter.EndPoints.CREATE(this.newTodo)
      .then((newTodo) => this.todos.push(newTodo))
      .then(this.toggleAddNewMode)
      .catch(this.toggleAddNewMode);
  }

  deleteTodo(id: number, index: number) {
    BackEndRouter.TodoRouter.EndPoints.DELETE(id)
      .then(() => this.todos.splice(index, 1))
      .catch();
  }

  //* LIFECYCLE HOOKS
  created() {
    BackEndRouter.TodoRouter.EndPoints.LIST()
      .then((body) => {
        this.isLoading = false;
        this.todos = body;
      })
      .catch();
  }
}
</script>

<style scoped></style>
