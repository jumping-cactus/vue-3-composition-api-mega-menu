<template>
  <div>
    <div class="menu-container">
      <div class="logo">
        <img alt="Vue logo" class="logo" src="../assets/logo.svg" width="125" height="125" />
      </div>
    

      <div class="items">
        <a class="item" v-for="menuItem in rootMenuItems" :key="menuItem.id" @click="menuClick(menuItem.id)">
          {{ menuItem.text }}
        </a>
      </div>
      <div class="icons"></div>
    </div>
    <MegaMenu v-if="hideMegaMenu" :curParentMenuId=curMenuId />
  </div>
</template>



<script setup>
import { ref, computed } from "vue";
import MegaMenu from "./MegaMenu.vue";
import { useMenuStore } from "@/stores/MenuStore";

const menuStore = useMenuStore()
const curMenuId = ref(0)
const hideMegaMenu = ref(false)

const rootMenuItems = computed(() => {
  return menuStore.menuData.filter((menuItem) => menuItem.parent === 0);
});


const menuClick = (menuItemId) => {
    // console.log(menuItemId)
    // always show if clicking on new parent menu item
    if ( curMenuId.value !== menuItemId ) {
        hideMegaMenu.value = true
    } else {
        hideMegaMenu.value = !hideMegaMenu.value
    }

    curMenuId.value = menuItemId

    
}


</script>




<style scoped>
.menu-container {
  display: flex;
  justify-content: space-between;
  height: 77px;
  align-items: center;
  border-bottom: 1px solid #a4a4a4;
}

.logo {
  display: flex;
  height: 33px;
  cursor: pointer;
  padding-left: 30px;
}

.icons {
  display: inline-flex;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon {
  cursor: pointer;
  display: flex;
  padding: 22px 30px;
}

.icon:hover {
  background: #efefef;
}



.items {
  display: inline-flex;
  height: 101%;
  overflow: hidden;
  /* @media (max-width: 920px) {
    display: none;
  } */
}

.item {
  cursor: pointer;
  height: 100%;
  align-items: center;
  height: 100%;
  display: flex;
  padding: 0 15px;
}

.item:hover {
  background: #efefef;
}

</style>