import { Input,Button,FormErrorMessage, FormControl, Textarea} from "@chakra-ui/react"
import { Field, Form, Formik } from 'formik';
import { v4 } from "uuid"
import {useTodosStore} from "store"
import {useDatetime} from "hooks";
import { Todo } from "types";

export interface TodoFormOptions {
  todoInfo: Todo,
  textAreaHeight?: string,
  submitBtnName?: string,
  sumbitBtnAction: (todo:Todo) => void
}

export default function TodoForm({options}:{options?: TodoFormOptions}){
  const addTodo = useTodosStore(state => state.addTodo)
  const validateText = (text: string) => (text ? "" : 'Required')
  const datetime = useDatetime()

  return (
    <Formik
      initialValues={{
        title: options?.todoInfo.title || "",
        discription: options?.todoInfo.discription || "",
      }}

      onSubmit={(values, actions) => {
        const newTodo = {
          ...values,
          id: String(v4()),
          dateOfCreation: datetime("en-US")
        }

        setTimeout(() => {
          if(options) {
            options.sumbitBtnAction({
              ...values,
              id: options.todoInfo.id,
              dateOfCreation: options.todoInfo.dateOfCreation,
              editData: datetime("en-US")
            })
          }else{
            addTodo(newTodo)
          }
          
          actions.setSubmitting(false)
          actions.resetForm()
        }, 300)
      }}
    >
      {(props) => (
        <Form style={{width:"100%"}}>
          <Field name='title' validate={validateText}>
            {({ field, form }: { field: any, form: any }) => (
              <FormControl isInvalid={form.errors.title && form.touched.title}>
                <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                <Input mb={2} {...field} placeholder='Todo title...' maxLength={36} />
              </FormControl>
            )}
          </Field>

          <Field name='discription' validate={validateText}>
            {({ field, form }: { field: any, form: any }) => (
              <FormControl isInvalid={form.errors.discription && form.touched.discription}>
                <FormErrorMessage>{form.errors.discription}</FormErrorMessage>
                <Textarea {...field} placeholder='Todo discription...' maxLength={288} maxH="60vh" minH={options?.textAreaHeight || "20vh"}/>
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
            {options?.submitBtnName || "Save"}
          </Button>
        </Form>
      )}
    </Formik>
  )
}