<script setup>
import TodoList from "../components/TodoList.vue";
import LogOut from "../components/LogOut.vue";
</script>

<template>
  <Suspense>
    <template #default>
      <div class="w-screen h-screen grid grid-cols-2">
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
