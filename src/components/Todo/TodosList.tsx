import { Text, useColorMode, Flex, Card, Heading, Divider, CardHeader, CardBody, IconButton, Box, useDisclosure} from "@chakra-ui/react"
import { Todo } from "types"
import {useTodosStore} from "store"
import { Empty, List } from 'antd';
import AlertComponent from "components/AlertComponent";
import { useState } from "react";
import {useCapitalize} from "hooks"
import { RiFileForbidLine } from "react-icons/ri"
import  {MenuComponent, MenuOptions } from "components/MenuComponent";


export default function TodoList() {
  const alertState = useDisclosure()
  const { colorMode } = useColorMode()
  const capitalize = useCapitalize()

  const todos = useTodosStore(state => state.todos)
  const deleteTodo = useTodosStore(state => state.deleteTodo)
  const selectTodo = useTodosStore(state => state.selectTodo)
  const selectedTodo = useTodosStore(state => state.selectedTodo)
  const setEditTodo = useTodosStore(state => state.setIsEditTodo)

  const menuOptions: MenuOptions = {
    onRemove: (todo) => {
      selectTodo(todo)
      alertState.onOpen()
    },
    onEdit: (todo) => {
      selectTodo(todo)
      setEditTodo(true)
    }
  }

  const alertOptions = {
    header: "Delete Todo",
    message: "Are you sure? You can't undo this action afterwards.",
    confirmBtnText: "Delete",
    discardBtnText: "Cancel",
    confirmAction: () => {
      selectedTodo && deleteTodo(selectedTodo)
      selectTodo(null)
      alertState.onClose()
    },
    discardAction: () => {
      selectTodo(null)
      alertState.onClose()
    }
  }

  return (
    <>
      <AlertComponent
        options={alertOptions} 
        state={alertState}
      />

      <List
        style={{width:"100%", color: "white"}}
        locale={{ emptyText: (<>
          <Text fontSize="4xl" fontWeight="bold"  >No data</Text>
          <Flex>
            <RiFileForbidLine size="lg"/>
          </Flex>
        </>)}}
        dataSource={todos}
        renderItem={(todo:Todo) => (
          <List.Item>

            <Card minW="100%">

              <CardHeader>
                <Flex justifyContent="space-between">
                  <Box>
                    <Heading fontSize="2xl" fontWeight="semibold" color={colorMode === "dark" ? "white" : "black"}>{capitalize(todo.title)}</Heading>
                    <Text fontSize="small">Created: {todo.dateOfCreation}</Text>
                    {todo.editData && <Text fontSize="small">Edited: {todo.editData}</Text>}
                  </Box>
                  <MenuComponent options={menuOptions} todo={todo}/>
                </Flex>
              </CardHeader>

              <CardBody>
                <Text color={colorMode === "dark" ? "white" : "black"}>{capitalize(todo.discription)}</Text>
              </CardBody>

            </Card>
            
          </List.Item>
        )}
      />
    </>
  )
}