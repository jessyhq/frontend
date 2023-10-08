// Packages:
import { Component, Match, Setter, Switch, createEffect, createSignal } from 'solid-js'
import { createSortable, Id, useDragDropContext } from '@thisbeyond/solid-dnd'


// Typescript:
import { TaskItem } from '../tabs/TasksTab'

export interface TaskSortableProps {
  taskID: Id
  tasks: TaskItem[]
  toggleTaskDone: (id: Id, newValue: boolean) => void
  onTaskClick: (task?: TaskItem) => void
  updateTask: (newTask: TaskItem) => void
  newTaskID: string | null
  setNewTaskID: Setter<string | null>
  superficialEditingTaskID: Id | null
  setSuperficialEditingTaskID: Setter<Id | null>
}


// Imports:
import { VsEdit, VsCheck } from 'solid-icons/vs'


// Components:
import CheckBox from '../../../utils/CheckBox'


// Styles:
import {
  Wrapper,
  TaskName,
  TaskActionButtonWrapper,
  EditableTaskName
} from '../TaskStandalone/styles'
import { EditIconWrapper } from '../BoardStandalone/styles'


// Functions:
const TaskSortable: Component<TaskSortableProps> = (props) => {
  // Constants:
  const sortable = createSortable(props.taskID)
  const state = useDragDropContext()
  
  // Ref:
  let nameInputRef: HTMLInputElement | undefined

  // Signals:
  const [ task, setTask ] = createSignal(props.tasks.find(task => task.id === props.taskID))
  const [ oldTaskName, setOldTaskName ] = createSignal<string | undefined>(undefined)
  const [ taskName, setTaskName ] = createSignal(task()?.name)
  const [ editMode, setEditMode ] = createSignal(false)
  const [ showEditIcon, setShowEditIcon ] = createSignal(false)
  const [ highlightEditIcon, setHighlightEditIcon ] = createSignal(false)
  const [ canToggleTaskDone, setCanToggleTaskDone ] = createSignal(true)

  // Functions:
  const toggleTaskDone = (newValue: boolean) => {
    props.toggleTaskDone(props.taskID, newValue)
  }

  const setNewTaskName = (value: string) => {
    const focusedTask = task()
    if (!focusedTask) return
    const newTask: TaskItem = {
      ...focusedTask,
      name: value
    }
    if (props.superficialEditingTaskID === props.taskID) props.setSuperficialEditingTaskID(null)
    props.updateTask(newTask)
  }

  const onEditClick = () => {
    setOldTaskName(task()?.name)
    setEditMode(true)
    props.setSuperficialEditingTaskID(props.taskID)
    // Here, we have to wait for the next frame, because SolidJS
    // renders and assigns the ref in the previous one.
    requestAnimationFrame(() => {
      if (props.newTaskID === props.taskID) {
        props.setNewTaskID(null)
        nameInputRef?.select()
      } else nameInputRef?.focus()
    })
  }

  const updateTaskName = () => {
    const newName = taskName() ?? ''
    if (newName.trim().length === 0) return
    setNewTaskName(newName)
    setEditMode(false)
  }

  // Effects:
  createEffect(() => {
    setTask(props.tasks.find(task => task.id === props.taskID))
  })

  createEffect(() => {
    if (props.superficialEditingTaskID === props.taskID) onEditClick()
    else setEditMode(false)
  })

  // Return:
  return (
    <Wrapper
      ref={ sortable }
      isActive={ state?.[0].active.draggable?.id === props.taskID }
      onMouseOver={ () => setShowEditIcon(true) }
      onMouseOut={ () => setShowEditIcon(false) }
    >
      <div style={{ display: 'flex', 'align-items': 'center', width: '90%', height: '100%', cursor: 'pointer' }}>
        <CheckBox
          isDone={ props.tasks.find(task => task.id === props.taskID)?.isDone ?? false }
          onClick={(newValue: boolean) => {
            if (!editMode() && canToggleTaskDone()) toggleTaskDone(newValue)
          }}
        />
        {/* TODO: Change task()?.name to props.tasks.find(task => task.id === props.taskID)?.name ?? '' */}
        {/* <Scribble
          activate={ props.tasks.find(task => task.id === props.taskID)?.isDone ?? false }
          recalculateScribbleWidth={ !editMode() && task()?.name !== oldTaskName() }
          scribbleWidthRecalculationCallback={() => {
            setOldTaskName(task()?.name)
          }}
          setIsAnimating={ newValue => setCanToggleTaskDone(!newValue) }
          text={ task()?.name ?? '' }
        > */}
        <Switch>
          <Match when={ editMode() }>
            <EditableTaskName
              ref={ el => nameInputRef = el }
              type='text'
              placeholder='Task Name'
              value={ task()?.name }
              onInput={ e => setTaskName(e.currentTarget.value) }
              onKeyDown={ e => e.key === 'Enter' && updateTaskName() }
              />
          </Match>
          <Match when={ !editMode() }>
            <TaskName onClick={ () => props.onTaskClick(task()) }>{ task()?.name }</TaskName>
          </Match>
        </Switch>
        {/* </Scribble> */}
      </div>
      <Switch>
        <Match when={ editMode() }>
          <TaskActionButtonWrapper dontHide onClick={ updateTaskName }>
            <VsCheck color='#E2E2E2' font-size='1rem' />
          </TaskActionButtonWrapper>
        </Match>
        <Match when={ !editMode() }>
          <TaskActionButtonWrapper dontHide={ showEditIcon() } onClick={ onEditClick }>
            <EditIconWrapper
              onClick={ onEditClick }
              onMouseOver={ () => setHighlightEditIcon(true) }
              onMouseOut={ () => setHighlightEditIcon(false) }
              style={{
                width: '1.5rem',
                height: '1.5rem'
              }}
            >
              <VsEdit
                font-size={ '0.75rem' }
                color={ highlightEditIcon() ? '#ECECEC' : '#E2E2E2' }
              />
            </EditIconWrapper>
          </TaskActionButtonWrapper>
        </Match>
      </Switch>
    </Wrapper>
  )
}


// Exports:
export default TaskSortable
