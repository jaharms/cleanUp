import { ActionTypes } from "../constants/ActionTypes.enum";

export type Action = {
  type: ActionTypes;
  payload: {
    title: string;
  };
};

export const addElementToOverviewList = (data: { title: string }) => {
  return { type: ActionTypes.AddElementToOverviewList, payload: data };
};
