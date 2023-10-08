// Packages:
import { DragEventHandler } from '@thisbeyond/solid-dnd'


// Functions:
const createArbitraryDragHandlers = () => {
  let transform = { x: 0, y: 0 }

  const onDragMove: DragEventHandler = ({ draggable }) => {
    const bounds = draggable.node.getBoundingClientRect()
    const withinBounds = (
      draggable &&
      bounds.x > 0 &&
      bounds.x + bounds.width <= window.innerWidth &&
      bounds.y > 0 &&
      bounds.y + bounds.height <= window.innerHeight
    )
    if (!withinBounds) return
    transform = { ...draggable.transform }
  }
  
  const onDragEnd: DragEventHandler = ({ draggable }) => {
    const node = draggable.node
    node.style.setProperty('top', node.offsetTop + transform.y + 'px')
    node.style.setProperty('left', node.offsetLeft + transform.x + 'px')
  }

  return {
    onDragMove,
    onDragEnd
  }
}


// Exports:
export default createArbitraryDragHandlers
