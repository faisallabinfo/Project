import { createReducer, on } from "@ngrx/store";
import { Ingridient } from "../../shared/ingridient.model";
import * as ShoppingListAction from "./shopping-list.actions";
export interface State {
    ingridients:Ingridient[];
}

export interface AppState {
    shoppingList:State;
}

const initialState = {
    ingridients: [
        new Ingridient('Apple', 7),
        new Ingridient('Totmato', 10)
    ]
}

export const shoppinglistReducer = createReducer(
    initialState,
    on(ShoppingListAction.addIngridient, (state, actions) => {
        return {
            ...state,
            ingridients: [...state.ingridients, actions.ingridient]
        }
    }),
    on(ShoppingListAction.addIngridients, (state, action) => {
        return {
            ...state,
            ingridients: [...state.ingridients, ...action.ingridients]
        }
    }),
    on(ShoppingListAction.updateIngridient, (state, action) => {
        const ingridient = state.ingridients[action.index];
        const updatedIngridient = {...ingridient, ...action.ingridient};
        const updatedIngridients = [...state.ingridients];
        updatedIngridients[action.index]=updatedIngridient;
        return {
            ...state,
            ingridients:updatedIngridients
        }
    }),
    on(ShoppingListAction.deleteIngridient,(state,action)=>{
        return {
            ...state,
            ingridients:state.ingridients.filter((ing,index)=>{
                return index!==action.index;
            })
        }
    })

);



