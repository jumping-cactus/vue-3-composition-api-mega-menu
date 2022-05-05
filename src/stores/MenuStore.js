import { defineStore } from "pinia";

export const useMenuStore = defineStore( "MenuStore", {
    // state
    state: () => {
        return { 
            menuData: [],
        }
    },

    // actions
    actions: {
        async fill() {
            this.menuData = (await import("@/data/menu.json")).default
            // this.menuData = (await axios.get("url/to/rest/api")).data
        },
    },

    // getters

})