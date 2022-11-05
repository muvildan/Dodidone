<template>
  <Transition name="fade" mode="out-in">
    <li
      class="mx-2 sm:min-h-1/2 xl:min-h-1/3 xl:max-w-max bg-white border-teal xl:py-6 xl:px-2 border-t-12 rounded-lg shadow-xl cursor-pointer hover:bg-gray-200 focus:outline-none focus:bg-gray-200 transition duration-150 ease-in-out"
    >
      <div class="flex items-center p-2 xl:py-0 sm:px-6">
        <div class="min-w-0 flex-1 flex items-center">
          <div>
            <input
              @click="updateTaskCompletion(todo, !todo['is_complete'])"
              type="checkbox"
              class="xl:w-4 xl:h-4 accent-green-600 border-0 rounded-md focus:ring-0 focus:text-white cursor-pointer mr-2 xl:mr-5"
              :checked="todo['is_complete']"
            />
          </div>
          <div id="task" class="xl:w-fit xl:text-base leading-5 font-medium">
            {{ todo.task }}
          </div>
        </div>
        <button
          @click="clearTodo()"
          class="w-3 h-3 xl:w-4 xl:h-4 ml-2 border-2 hover:border-black rounded"
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
  </Transition>
</template>

<script>
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

<style scoped>
@media (max-width: 400px) {
  #task {
    font-size: 0.875rem;
    line-height: 1.25rem;
    max-width: 200px;
    overflow: scroll;
    white-space: nowrap;
  }
}
</style>
