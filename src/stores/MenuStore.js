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

            // dynamically add data
            const parentIds = [ 900127, 900128, 900132, 900133, 900141, 900142 ];
            // { "id": 900136, "text": "Page 1", "parent": 900141 },
            parentIds.forEach(parentId => {
                
                const min = Math.ceil(2);
                const max = Math.floor(14);
                const randLimit = Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive

                for(let i = 1; i <= randLimit; i++) {
                    const newObj = { "id": 900579 + i, "text": "Page " + i, "parent": parentId };
                    this.menuData.push(newObj);
                }
                
            });
        },
    },

    // getters

})