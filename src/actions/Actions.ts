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
    }
  | {
      type: ActionTypes.ChangeRoomDescription;
      payload: {
        id: number;
        description: string;
      };
    }
  | {
      type: ActionTypes.ChangeTaskDescription;
      payload: {
        roomId: number;
        taskId: number;
        additionalInformation: string;
      };
    }
  | {
      type: ActionTypes.CheckTask;
      payload: {
        roomId: number;
        taskId: number;
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

export const changeRoomDescription = (id: number, description: string) => {
  return {
    type: ActionTypes.ChangeRoomDescription,
    payload: { id, description },
  };
};

export const changeTaskDescription = (
  roomId: number,
  taskId: number,
  additionalInformation: string,
) => {
  return {
    type: ActionTypes.ChangeTaskDescription,
    payload: { roomId, taskId, additionalInformation },
  };
};

export const checkTask = (roomId: number, taskId: number) => {
  return {
    type: ActionTypes.CheckTask,
    payload: { roomId, taskId },
  };
};
