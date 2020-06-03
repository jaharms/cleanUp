import { Action } from "../actions/Actions";
import { ActionTypes } from "../constants/ActionTypes.enum";

export type StoreState = ReturnType<typeof reducer>;

export interface ITask {
  title: string;
  id: number;
  description?: string;
}

const initialState: ITask[] = [
  {
    title: "Wohnzimmer",
    description: "Das Wohnzimmer soll einmal die Woche aufgeräumt werden.",
    id: 0,
  },
  {
    title: "Schlafzimmer",
    description: "Das Schlafzimmer soll einmal die Woche aufgeräumt werden.",
    id: 1,
  },
];

export const reducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ActionTypes.AddElementToOverviewList: {
      return [
        ...state,
        {
          title: action.payload.title,
          description: undefined,
          id: state.length,
        },
      ];
    }case ActionTypes.RemoveElementFromOverviewList: {
      return state.filter((item : ITask) =>  item.id !== action.payload.id);
    }
    default: {
      return state;
    }
  }
};
