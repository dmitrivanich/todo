import { VStack, Text, useColorMode } from "@chakra-ui/react"
import TodosList from "./PaginatedTodoList"


export const TodoComponent = () => {
  const { colorMode } = useColorMode()

  return (
    <VStack h="100%" w="100%" overflowY="auto" overflowX="hidden"  pt="10px" direction="row" fill="red">

      <Text w="200px" textAlign="center" fontSize="3xl" fontWeight="bold" color={colorMode === "dark" ? "blackAlpha.900" : "blackAlpha.300"}>TODOS</Text>
      <TodosList />
    
    </VStack>
  )
}


