import { VStack, Text, useColorMode,
  FormLabel,Input,Button,FormErrorMessage,
  Flex, FormControl, Textarea} from "@chakra-ui/react"
import { Todo } from "types"
import {useTodosStore} from "store"
import { useEffect, useState } from "react"
import { List } from 'antd';
import VirtualList from 'rc-virtual-list';
import { Field, Form, Formik } from 'formik';
import {v4} from "uuid"


import './pagination.css';

export const TodosList = () => {
  const { colorMode } = useColorMode()
  const todos = useTodosStore(state => state.todos)

  return (
    <VStack w="100%" spacing={1}>
        
        <TodoForm />

        <List
          dataSource={todos}
          renderItem={(todo:Todo) => (
            <List.Item>
              <Flex direction="column">
                <Text fontSize="2xl" fontWeight="semibold" color={colorMode === "dark" ? "white" : "black"}>{todo.text[0].toUpperCase() + todo.text.slice(1)}</Text>
                <Text color={colorMode === "dark" ? "white" : "black"}>{todo.title}</Text>
              </Flex>
            </List.Item>
          )}
        />

    </VStack>
  )
}

function TodoForm() {
  const addTodo = useTodosStore(state => state.addTodo)

  return (
    <Formik
      initialValues={{
        id: String(v4()),
        date: Date.now(),
        title: "",
        text: "",
      }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          addTodo(values)
          actions.setSubmitting(false)
          actions.resetForm()
        }, 1000)
      }}
    >
      {(props) => (
        <Form >

          <Field name='title'>
            {({ field, form }:{field:any, form:any}) => (
              <FormControl>
                <Input mb={2} {...field} placeholder='name' maxLength={36}/>
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Field name='text'>
            {({ field, form }:{field:any, form:any}) => (
              <FormControl>
                <Textarea {...field} placeholder='name' maxLength={288}/>
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Button
            mt={2}
            w="100%"
            colorScheme="facebook"
            isLoading={props.isSubmitting}
            type='submit'
          >
            Save
          </Button>
        </Form>
      )}
    </Formik>
  )
}