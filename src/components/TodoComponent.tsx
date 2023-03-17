import { VStack, Text, useColorMode } from "@chakra-ui/react"
import {TodoList, TodoForm} from "components/Todo"
import DrawerComponent from "components/DrawerComponent"

export const TodoComponent = () => {
  const { colorMode } = useColorMode()

  return (
    <VStack h="100%" w="100vw" overflowY="auto" overflowX="hidden"  pt="10px" direction="row" fill="red">

      <Text w="200px" textAlign="center" fontSize="3xl" fontWeight="bold" color={colorMode === "dark" ? "blackAlpha.900" : "#B7C2DA"}>TODOS</Text>
      
      <VStack minW="240px" w="300px" spacing={1}>
        <TodoForm />
        <TodoList/>
      </VStack>

      <DrawerComponent/>
    </VStack>
  )
}


