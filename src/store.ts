import { create } from 'zustand'
import { Todo, TodosState } from 'types'
import { devtools, persist } from 'zustand/middleware'
import ky from 'ky';


export const useTodosStore = create<TodosState>()(
  devtools(
    persist((set,get) => ({
      todos: [],
      selectedTodo: null,
      isEditTodo: false,

      addTodo: (newTodo) => {set({todos: [...get().todos, newTodo]})},

      setIsEditTodo: (isEdit) => {
        set({isEditTodo: isEdit})
      },

      deleteTodo: (todo) => {
        let filtredTodos = get().todos.filter(({id}) => id !== todo.id)
        set({todos: filtredTodos})
      },

      selectTodo: (todo) => {
        set({selectedTodo: todo})
      },
      
      editTodo: (newTodo) => {
        let newTodos = get().todos.map((todo:Todo) => {
          return todo.id === newTodo.id ? newTodo : todo 
        })

        set({todos: newTodos})
      }
    }),
    {
      name: "todos-storage" // name of the key, state will be saved under items
    })
  )
)