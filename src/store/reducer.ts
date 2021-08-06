import {Todo, TodoStatus} from '../models/todo';
import {
  AppActions,
  CREATE_TODO,
  DELETE_ALL_TODOS,
  DELETE_TODO,
  TOGGLE_ALL_TODOS,
  UPDATE_TODO_STATUS,
  UPDATE_TODO_ITEM
} from './actions';

export interface AppState {
  todos: Array<Todo>
}

export const initialState: AppState = {
  todos: []
}

function reducer(state: AppState, action: AppActions): AppState {
  switch (action.type) {
    case CREATE_TODO:
      return {
        ...state,
        todos: [
          ...state.todos,
          action.payload
        ]
      };

    case UPDATE_TODO_STATUS:
      const existedItem = state.todos.findIndex((todo) => todo.id === action.payload.todoId)
      state.todos[existedItem].status = action.payload.checked ? TodoStatus.COMPLETED : TodoStatus.ACTIVE;

      return {
        ...state,
        todos: [
          ...state.todos,
        ]
      }

    case UPDATE_TODO_ITEM:
      const findItem = state.todos.findIndex((todo) => todo.id === action.payload.id);
      state.todos[findItem].content = action.payload.content

      return {
        ...state,
        todos: state.todos
      }

    case TOGGLE_ALL_TODOS:
      const tempTodos = state.todos.map((e)=>{
        return {
          ...e,
          status: action.payload ? TodoStatus.COMPLETED : TodoStatus.ACTIVE
        }
      })

      return {
        ...state,
        todos: tempTodos
      }

    case DELETE_TODO:
      const items = state.todos.filter((todo) => todo.id !== action.payload);

      return {
        ...state,
        todos: items
      }
    case DELETE_ALL_TODOS:
      return {
        ...state,
        todos: []
      }
    default:
      return state;
  }
}

export default reducer;