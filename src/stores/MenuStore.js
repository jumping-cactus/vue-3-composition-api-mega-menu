import { defineStore } from "pinia";

import menuData from '@/data/menu.json';

export const useMenuStore = defineStore( "MenuStore", {
    // state
    state: () => {
        return { 
            menuData,
        }
    }
    // actions

    // getters

})