import { supabase } from "../supabase";
import { defineStore } from "pinia";

export const todoStore = defineStore("allTodos", {
  state: () => ({
    allTodos: [],
  }),
  getters: {
    getAllTodos(state) {
      return state.allTodos;
    },
  },
  actions: {
    async fetchTodos() {
      try {
        const { data: todos, error } = await supabase
          .from("todos")
          .select("*")
          .order("id");

        if (error) {
          console.log("error", error);
          return;
        }
        if (todos === null) {
          this.allTodos = [];
          return;
        }
        this.allTodos = todos;
        console.log("got todos!", this.allTodos);
      } catch (err) {
        console.error("Error retrieving data from db", err);
      }
    },
  },
});

async function addTodo(todo) {
  try {
    const { data, error } = await supabase.from("todos").insert(todo).single();

    if (error) {
      alert(error.message);
      console.error("There was an error inserting", error);
      return null;
    }

    return data;
  } catch (err) {
    alert("Error");
    console.error("Unknown problem inserting to db", err);
    return null;
  }
}

async function deleteTodo(todo) {
  try {
    await supabase.from("todos").delete().eq("id", todo.id);
    console.log("deleted todo", todo.id);
  } catch (error) {
    console.error("error", error);
  }
}

async function updateTaskCompletion(todo, isCompleted) {
  try {
    const { error } = await supabase
      .from("todos")
      .update({ is_complete: isCompleted })
      .eq("id", todo.id)
      .single();

    if (error) {
      alert(error.message);
      console.error("There was an error updating", error);
      return;
    }

    console.log("Updated task", todo.id);
  } catch (err) {
    alert("Error");
    console.error("Unknown problem updating record", err);
  }
}

export { updateTaskCompletion, deleteTodo, addTodo };
