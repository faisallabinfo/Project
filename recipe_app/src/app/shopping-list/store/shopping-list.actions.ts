import { createAction, props } from "@ngrx/store";
import { Ingridient } from "../../shared/ingridient.model";

//Action Idnettifier
export const ADD_INGRIDIENT = 'ADD_INGRIDIENT';
export const ADD_INGRIDIENTS = 'ADD_INGRIDIENTS';
export const UPDATE_INGRIDIENTS = 'UPDATE_INGRIDIENTS';
export const DELETE_INGRIDIENTS = 'DELETE_INGRIDIENTS';


//Add ingridient to shopping list via add component form
export const addIngridient = createAction(
  ADD_INGRIDIENT,
  props<{ ingridient: Ingridient }>()
);

//Add ingridients to the shopping list through recipe details
export const addIngridients = createAction(
  ADD_INGRIDIENTS,
  props<{ ingridients: Ingridient[] }>()
);

//Update ingridient list
export const updateIngridient = createAction(
  UPDATE_INGRIDIENTS,
  props<{ index: number, ingridient: Ingridient }>()
);

export const deleteIngridient = createAction(
  DELETE_INGRIDIENTS,
  props<{index: number}>()
);
