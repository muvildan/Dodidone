<template>
  <li
    class="w-full block cursor-pointer hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition duration-150 ease-in-out"
  >
    <div class="flex items-center px-4 py-4 sm:px-6">
      <div class="min-w-0 flex-1 flex items-center">
        <div>
          <input
            @click="updateTaskCompletion(todo, !todo['is_complete'])"
            type="checkbox"
            class="w-4 h-4 bg-green-300 text-black border-0 rounded-md focus:ring-0 cursor-pointer mr-5"
            :checked="todo['is_complete']"
          />
        </div>
        <div class="text-sm leading-5 font-medium truncate">
          {{ todo.task }}
        </div>
      </div>
      <button
        @click="clearTodo()"
        class="w-4 h-4 ml-2 border-2 hover:border-black rounded"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="gray"
          aria-label="delete"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  </li>
</template>

<script>
import { PiniaVuePlugin } from "pinia";
import { defineComponent } from "vue";
import { todoStore, updateTaskCompletion, deleteTodo } from "../stores/todo";

export default defineComponent({
  name: "Todo",
  props: {
    todo: {
      required: true,
    },
  },
  setup(props) {
    const allTodos = todoStore();

    // Removes todo from supbase and also from app state
    function clearTodo() {
      console.log("delete");
      deleteTodo(props.todo).then(() => {
        allTodos.$state.allTodos = allTodos.$state.allTodos.filter(
          (todo) => todo.id != props.todo.id
        );
      });
    }

    return { todoStore, updateTaskCompletion, clearTodo };
  },
});
</script>

<style lang="scss" scoped></style>
