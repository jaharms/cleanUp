import { ActionTypes } from '../constants/ActionTypes.enum';

export type Action =
  | {
      type: ActionTypes.AddElementToOverviewList;
      payload: {
        title: string;
      };
    }
  | {
      type: ActionTypes.RemoveElementFromOverviewList;
      payload: {
        id: number;
      };
    }
  | {
      type: ActionTypes.AddTaskToRoom;
      payload: {
        title: string;
        id: number;
      };
    }
  | {
      type: ActionTypes.RemoveTaskFromRoom;
      payload: {
        taskId: number;
        roomId: number;
      };
    };

export const addElementToOverviewList = (title: string) => {
  return { type: ActionTypes.AddElementToOverviewList, payload: { title } };
};

export const addTaskToRoom = (title: string, id: number) => {
  return { type: ActionTypes.AddTaskToRoom, payload: { title, id } };
};

export const removeTaskFromRoom = (taskId: number, roomId: number) => {
  return { type: ActionTypes.RemoveTaskFromRoom, payload: { taskId, roomId } };
};

export const removeElementFromOverviewList = (id: number) => {
  return { type: ActionTypes.RemoveElementFromOverviewList, payload: { id } };
};
