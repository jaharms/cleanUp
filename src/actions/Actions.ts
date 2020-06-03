import { ActionTypes } from "../constants/ActionTypes.enum";

export type Action = {
  type: ActionTypes.AddElementToOverviewList;
  payload: {
    title: string 
      
  } 
} |{
  type: ActionTypes.RemoveElementFromOverviewList;
  payload: {
    id: number 
      
  } 
} ;

export const addElementToOverviewList = (title: string ) => {
  return { type: ActionTypes.AddElementToOverviewList, payload:{ title} };
};


export const removeElementFromOverviewList = (id: number) => {
  return { type: ActionTypes.RemoveElementFromOverviewList, payload: {id} };
};

