import { Action } from '../actions/Actions';
import { ActionTypes } from '../constants/ActionTypes.enum';

export type StoreState = ReturnType<typeof reducer>;

export interface ITask {
  title: string;
  id: number;
  additionalInformation?: string;
  finished: boolean;
}

export interface IRoom {
  title: string;
  id: number;
  description?: string;
  tasks: ITask[];
}

const initialState: IRoom[] = [
  {
    title: 'Wohnzimmer',
    description: 'Das Wohnzimmer soll einmal die Woche aufgeräumt werden.',
    id: 0,
    tasks: [
      {
        title: 'Staubsaugen',
        id: 0,
        additionalInformation: 'Bitte auch unter den Tischen saugen',
        finished: false,
      },
      {
        title: 'Fenster putzen',
        finished: true,
        id: 1,
      },
      {
        title: 'Staubwischen',
        finished: false,
        id: 2,
      },
      {
        title: 'Blumen gießen',
        finished: false,
        id: 3,
      },
    ],
  },
  {
    title: 'Schlafzimmer',
    description: 'Das Schlafzimmer soll einmal die Woche aufgeräumt werden.',
    id: 1,
    tasks: [],
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
          tasks: [],
        },
      ];
    }
    case ActionTypes.RemoveElementFromOverviewList: {
      return state.filter((item: IRoom) => item.id !== action.payload.id);
    }
    case ActionTypes.AddTaskToRoom: {
      const currentRoom = state[action.payload.id];
      const updatedRoom = {
        ...currentRoom,
        tasks: [
          ...currentRoom.tasks,
          {
            title: action.payload.title,
            finished: false,
            id: currentRoom.tasks.length,
          },
        ],
      };
      const newState = state.map((room: IRoom) =>
        room.id !== action.payload.id ? room : updatedRoom,
      );
      return newState;
    }
    case ActionTypes.RemoveTaskFromRoom: {
      const currentRoom = state[action.payload.roomId];
      const tasks = currentRoom.tasks.filter(
        (task: ITask) => task.id !== action.payload.taskId,
      );
      const updatedRoom = { ...currentRoom, tasks };
      const newState = state.map((room: IRoom) =>
        room.id !== action.payload.roomId ? room : updatedRoom,
      );
      return newState;
    }
    default: {
      return state;
    }
  }
};
