<template>
    <div class="megamenu-wrapper">
        <div class="main-categories">
            <div v-for="menuItem in childRootMenuItems" :key="menuItem.id" @mouseover="childItemHover(menuItem.id)" :class="['main-category', isActive(menuItem.id) ? 'active' : '']" >
                
                <div class="icon"><img src="../assets/main-category.svg" /></div>
                <div class="label">{{ menuItem.text }}</div>
            </div>
            
        </div>
        <div class="sub-categories">
            <div v-for="childSubMenuItem in childSubMenuItems" :key="childSubMenuItem.key" class="sub-category">
                <div class="icon"><img src="../assets/sub-category.svg" /></div>
                <div class="label"><a :href="childSubMenuItem.url">{{ childSubMenuItem.text }}</a></div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, defineProps, computed, onMounted, onUnmounted } from "vue";

const thisProps = defineProps({
    'menuData': {
        type: Array,
        default: ()=>[]
    },
    'curParentMenuId': {
        type: Number,
        default: 0
    }
})

const curChildMenuId = ref(0)

const mouseData = ref({ 
    lastX: 0,
    lastY: 0,
    direction: "",
    throttle: false,

})

const isActive = (key) => {
    return curChildMenuId.value === key;
}

const mouseDirection = (e) => {
    if (!mouseData.value.throttle) {
        mouseData.value.throttle = true;
        let theta = Math.abs(
            (180 * Math.atan2(e.pageY - mouseData.value.lastY, e.pageX - mouseData.value.lastX)) /
            Math.PI
        );
        mouseData.value.direction = theta > 75 ? "vertical" : "horizontal";
        mouseData.value.lastX = e.pageX;
        mouseData.value.lastY = e.pageY;
        setTimeout(() => {
            mouseData.value.throttle = false;
        }, 50);
    }
}

onMounted(() => {
  window.addEventListener("mousemove", mouseDirection);
})

onUnmounted(() => {
  window.removeEventListener("mousemove", mouseDirection);
})

const childRootMenuItems = computed(() => {
  return thisProps.menuData.filter((menuItem) => menuItem.parent === thisProps.curParentMenuId);
});

const childSubMenuItems = computed(() => {
  return thisProps.menuData.filter((menuItem) => menuItem.parent === curChildMenuId.value);
});

const childItemHover = (activeChildMenuId) => {
    
    // console.log(activeChildMenuId)
    if (mouseData.value.direction === "vertical") {
        curChildMenuId.value = activeChildMenuId
    }

}

</script>

<style scoped>
.megamenu-wrapper {
  border: 1px solid #a4a4a4;
  border-top: none;
  max-width: 1120px;
  margin: 0 auto;
  height: 500px;
  background: #f8f8f8;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 1fr;
  gap: 0px 0px;
  grid-template-areas: ". .";
}

.main-categories {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  gap: 0px 0px;
  border-right: 1px solid #a4a4a4;
}

.main-category {
  display: flex;
  cursor: pointer;
  flex-direction: row;
  align-items: center;
  padding-left: 30px;
}

.main-category:not(:last-of-type) {
  border-bottom: 1px solid #a4a4a4;
}

.main-category .icon {
  margin-right: 15px;
}

.main-category.active {
  background: #efefef;
}

.sub-categories {
  background: #efefef;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    ". . . . ."
    ". . . . ."
    ". . . . .";
}

.sub-category {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.sub-category:hover {
  background: #dedede;
}

.sub-category .label {
  margin-top: 15px;
}
</style>