import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react'

import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { HiDotsVertical } from "react-icons/hi"
import { IconButton } from '@chakra-ui/react'
import { Todo } from 'types'

export interface MenuOptions {
  onRemove: (todo:Todo) => void,
  onEdit: (todo:Todo) => void
}

export function MenuComponent({options, todo}:{options: MenuOptions, todo:Todo}) {

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label='Options'
        icon={<HiDotsVertical />}
        variant='outline'
      />

      <MenuList>
        <MenuItem icon={<EditIcon />} onClick={() => options.onEdit(todo)}>
          Edit Todo
        </MenuItem>

        <MenuItem color="red" icon={<DeleteIcon />} onClick={() => options.onRemove(todo)}>
          Delete Todo
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
