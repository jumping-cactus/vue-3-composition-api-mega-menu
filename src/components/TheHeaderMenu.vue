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
    <MegaMenu v-if="hideMegaMenu" :curParentMenuId=curMenuId :menuData=menuData />
  </div>
</template>



<script setup>
import { ref, computed } from "vue";
import MegaMenu from "./MegaMenu.vue";

// replace this with a fetch
const menuData = ref([
  { id: 900123, text: "Services", parent: 0 },
  { id: 900124, text: "Admin", parent: 0 },
  { id: 900125, text: "Search", parent: 0 },
  { id: 900126, text: "My Services", parent: 900123 },
  { id: 900127, text: "New Service", parent: 900123 },
  { id: 900128, text: "Modify Service", parent: 900123 },
  { id: 900129, text: "ABC", parent: 900124 },
  { id: 900130, text: "EFG", parent: 900124 },
  { id: 900131, text: "XYZ", parent: 900124 },
  { id: 900132, text: "Service List", parent: 900126 },
  { id: 900133, text: "POC List", parent: 900126 },
  { id: 900134, text: "Admin Page 1", parent: 900129, url: "https://google.com" },
  { id: 900135, text: "Admin Page 2", parent: 900129 },
  { id: 900136, text: "New Service 1", parent: 900127 },
]);

const curMenuId = ref(900123)
const hideMegaMenu = ref(false)

const rootMenuItems = computed(() => {
  return menuData.value.filter((menuItem) => menuItem.parent === 0);
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