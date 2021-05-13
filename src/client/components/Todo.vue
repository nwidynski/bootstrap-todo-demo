<template>
  <tr>
    <td>
      <input
        v-if="editing"
        type="text"
        class="form-control"
        v-model="state.name"
        placeholder="Task name"
        aria-label="task name"
        aria-describedby="task-add-btn"
      />
      <div v-else class="custom-control custom-checkbox">
        <input
          type="checkbox"
          class="custom-control-input"
          :id="`task_${id}`"
          v-model="state.isDone"
          @change="onIsDone"
        />
        <label class="custom-control-label" :for="`task_${id}`">{{
          state.name
        }}</label>
      </div>
    </td>
    <td>
      <input
        v-if="editing"
        type="date"
        class="form-control"
        v-model="formattedDate"
        placeholder="Due date"
        aria-label="due date"
        aria-describedby="task-add-btn"
      />
      <p v-else>{{ localizeDate(formattedDate) }}</p>
    </td>
    <td>
      <div v-if="editing" class="form-group">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            v-model.number="state.progress"
            aria-label=""
          />
          <div class="input-group-append">
            <span class="input-group-text">%</span>
          </div>
        </div>
      </div>
      <div v-else class="progress">
        <div
          class="progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar"
          :aria-valuenow="state.progress"
          aria-valuemin="0"
          aria-valuemax="100"
          :style="{ width: state.progress + '%' }"
        >
          {{ state.progress }}%
        </div>
      </div>
    </td>
    <td>
      <button
        v-if="editing"
        type="button"
        class="btn btn-primary"
        @click="onSave"
      >
        Save
      </button>
      <div v-else class="btn-toolbar" role="toolbar" aria-label="Toolbar">
        <button
          type="button"
          class="btn btn-primary mb-1 mr-1"
          @click="toggleEdit"
        >
          Edit
        </button>
        <button type="button" class="btn btn-danger mb-1" @click="deleteTodo">
          Delete
        </button>
      </div>
    </td>
  </tr>
</template>

<script lang="ts">
import moment from "moment";
import { Vue, Component, Prop, Emit } from "vue-property-decorator";

import BackendRouter from "@client/utils/http";

@Component
export default class Todo extends Vue {
  //* PROPS
  @Prop() id!: number;
  @Prop() name!: string;
  @Prop() isDone!: boolean;
  @Prop() dueDate!: string;
  @Prop() progress!: number;

  //* DATA
  editing = false;
  state = {
    name: this.name,
    isDone: this.isDone,
    dueDate: this.dueDate,
    progress: this.progress,
  };

  //* COMPUTED
  get formattedDate() {
    return moment(this.state.dueDate).format("yyyy-MM-DD");
  }

  set formattedDate(dueDate: string) {
    this.state.dueDate = moment(dueDate, "yyyy-MM-DD").toISOString();
  }

  //* METHODS
  toggleEdit() {
    this.editing = !this.editing;
  }

  //* HELPER METHODS
  localizeDate(date: string) {
    return moment(date).format("DD.MM.YYYY");
  }

  onIsDone() {
    BackendRouter.TodoRouter.EndPoints.UPDATE(this.id, this.state).catch();
  }

  onSave() {
    BackendRouter.TodoRouter.EndPoints.UPDATE(this.id, this.state)
      .then((body) => (this.state = body))
      .then(this.toggleEdit)
      .catch(this.toggleEdit);
  }

  //* EVENT EMITTERS
  @Emit() deleteTodo() {
    return this.id;
  }
}
</script>

<style scoped></style>
