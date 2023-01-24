import {createSlice} from "@reduxjs/toolkit";

let product = createSlice({
    name : 'product',
    initialState : [
        {id : 3, name : 'White and Black', count : 2},
        {id : 4, name : 'Red Knit', count : 0},
        {id : 5, name : 'Grey Yordan', count : 1}
    ],
    reducers : {
        changeCount(state, action) {
            let idx = state.findIndex((item) => { return item.id == action.payload });
            state[idx].count += 1;
            // for(let i=0; i<state.length; i++) {
                // if(state[i].id == action.payload) {
                //     state[i].count += 1;
                // }
            // }
        },
        addList(state, action) {
            if(action.payload) {
                let isDuplicate = false;
                let idx = state.findIndex((item) => { return item.id == action.payload.id });
                if(idx > -1) {
                    state[idx].count += 1;
                    isDuplicate = true;
                }

                if(!isDuplicate) {
                    let copy = action.payload;
                    copy.name = copy.title;
                    copy.count = 1;
                    // state = [...state, copy];
                    state.push(copy);
                }
            }
            return state;
        }
    }
});

export let { changeCount, addList } = product.actions

export default product