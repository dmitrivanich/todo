export interface Todo {
  id: string,
  date: number,
  title: string,
  text: string,
}

export interface TodosState {
  todos: Todo[] | [],
  addTodo: (newTodo:Todo) => void,
  removeTodo: () => void,
  editTodo: () => void
}
