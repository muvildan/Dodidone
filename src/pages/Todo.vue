<script setup>
import TodoList from "../components/TodoList.vue";
import LogOut from "../components/LogOut.vue";
</script>

<template>
  <Suspense>
    <template #default>
      <div
        class="w-screen min-h-screen h-full xl:max-h-screen flex flex-col bg-gradient-to-r bg-clip-background background-transparent from-indigo-100 via-green-200 to-indigo-100 animate-background"
      >
        <TodoList />
        <LogOut />
      </div>
    </template>
    <template #fallback>
      <Loading />
    </template>
  </Suspense>
</template>

<style></style>
