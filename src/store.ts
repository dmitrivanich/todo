import { create } from 'zustand'
import { Todo, TodosState } from 'types'
import { devtools, persist } from 'zustand/middleware'
import ky from 'ky';


export const useTodosStore = create<TodosState>()(
  devtools(
    persist((set,get) => ({
      todos: [],
      addTodo: (newTodo) => {set({todos: [...get().todos, newTodo]})},
      removeTodo: () => {},
      editTodo: () => {}
    }),
    {
      name: "todos-storage" // name of the key, state will be saved under items
    })
  )
)