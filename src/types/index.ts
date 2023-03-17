export interface Todo {
  id: string,
  dateOfCreation: string,
  editData?: string,
  title: string,
  discription: string,
}

export interface TodosState {
  todos: Todo[] | [],
  selectedTodo: Todo | null,
  isEditTodo: boolean,
  
  setIsEditTodo: (isEdit: boolean) => void,
  selectTodo: (todo:Todo | null) => void,
  addTodo: (newTodo:Todo) => void,
  deleteTodo: (todo:Todo) => void,
  editTodo: (newTodo:Todo) => void
}
