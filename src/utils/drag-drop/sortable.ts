// Packages:
import { createSignal } from 'solid-js'
import { DragEventHandler, Id } from '@thisbeyond/solid-dnd'


// Typescript:
export interface SortableItem {
  id: Id
}


// Functions:
const createSortableDragHandlers = <T>(props: { items: T[] }) => {
  const [ items, setItems ] = createSignal(props.items)
  const [ activeItem, setActiveItem ] = createSignal<Id | null>(null)
  const ids = () => items().map(item => (item as SortableItem).id)

  const onDragStart: DragEventHandler = ({ draggable }) => setActiveItem(draggable.id)

  const onDragEnd: DragEventHandler = ({ draggable, droppable }) => {
    if (draggable && droppable) {
      const currentItems = ids()
      const fromIndex = currentItems.indexOf(draggable.id)
      const toIndex = currentItems.indexOf(droppable.id)
      if (fromIndex !== toIndex) {
        const updatedItems = items().slice()
        updatedItems.splice(toIndex, 0, ...updatedItems.splice(fromIndex, 1))
        setItems(updatedItems)
      }
    }
  }

  return {
    ids,
    items,
    setItems,
    activeItem,
    onDragStart,
    onDragEnd
  }
}


// Exports:
export default createSortableDragHandlers
