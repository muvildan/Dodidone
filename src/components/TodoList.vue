<template>
  <div class="w-screen p-12">
    <h1 class="text-white font-bold text-6xl bg-black px-5 ">Dodidone.</h1>
    <div class="flex gap-2 my-2">
      <input
        v-model="task"
        class="rounded bg-gray-300 placeholder-gray-900 focus:placeholder-gray-500 ...0 w-full p-2"
        type="text"
        placeholder="Add here your new todos"
      />
      <button @click="addTask" class="btn-black">Add</button>
    </div>
    <div class="bg-white shadow overflow-hidden rounded-md">
      <ul v-for="(todo, index) in allTodos.getAllTodos" :key="index">
        <Todo :todo="todo" />
      </ul>
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
