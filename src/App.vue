<template>
  <TheHeaderMenu />
</template>

<script setup>
import TheHeaderMenu from "./components/TheHeaderMenu.vue"
import { useMenuStore } from "@/stores/MenuStore";

const menuStore = useMenuStore()
menuStore.fill()
</script>

<style>
</style>
