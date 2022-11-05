<template>
  <div class="flex flex-col gap-3 w-screen min-h-screen max-h-fit p-10 xl:p-24">
    <div>
      <h1
        class="text-transparent font-bold text-4xl xl:text-6xl bg-gradient-to-r bg-clip-text from-indigo-500 via-green-600 to-indigo-500 animate-text"
      >
        Dodidone.
      </h1>
    </div>
    <div v-on:keyup.enter="addTask" class="flex gap-5 my-3">
      <input
        v-model="task"
        class="input-expand"
        type="text"
        placeholder="Add here your new task. Maybe those groceries you always forget to buy, that pending call you've been procrastinating for days, or just your new year resolutions. You do you!"
      />
      <button @click="addTask" class="primary-button">Add</button>
    </div>
    <div id="board" class="min-h-3/4 max-h-fit mb-25 xl:mb-5">
      <div
        class="sm:min-h-1/2 xl:min-h-1/3 py-8 flex flex-row flex-wrap justify-center gap-5"
      >
        <ul v-for="(todo, index) in allTodos.getAllTodos" :key="index">
          <Todo :todo="todo" />
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import Todo from "./Todo.vue";
import { userStore } from "../stores/user";
import { todoStore, addTodo } from "../stores/todo";

export default defineComponent({
  name: "TodoList",
  components: {
    Todo,
  },

  data() {
    return {
      newTask: false,
    };
  },

  async setup() {
    const allTodos = todoStore();
    await allTodos.fetchTodos();

    const auth = userStore();
    await auth.fetchUser();

    const task = ref("");
    /**
     * Wrapper function adding a new todo for additional client-side error handling.
     */
    async function addTask() {
      // Guard for short task descriptions which will fail db policy.
      if (task.value.length <= 3) {
        alert("Please make your task a little more descriptive");
        return;
      }

      // Type check to ensure user is still logged in.
      if (auth.$state.user.id === null) {
        alert("Please log in again");
        return;
      }
      try {
        // Try and write the data to the database.
        const todo = await addTodo({
          user_id: auth.$state.user.id,
          task: task.value,
        });

        // If there was no response, don't do anything.
        if (!todo) {
          return;
        }

        // Otherwise, push the response into allTodos.
        allTodos.$state.allTodos.push(todo);

        // Reset input field.
        task.value = "";
      } catch (err) {
        console.error("Unknown error when adding todo", err);
      }
    }

    return {
      task,
      allTodos,
      addTask,
      userStore,
    };
  },
});
</script>

<style scoped>
#board {
  background-color: #e0e7ff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23a5b4fc' fill-opacity='0.65'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  border-width: 0.5px;
  border-color: #a6aef6;
  border-radius: 0.5em;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
}
</style>
