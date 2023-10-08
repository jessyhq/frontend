// Packages:
import {
  Component,
  createEffect,
  createSignal,
  Show,
} from 'solid-js'
import { createDraggable, Id, transformStyle } from '@thisbeyond/solid-dnd'
import sleep from 'sleep-promise'
import { createStore } from 'solid-js/store'
import createSortableDragHandlers from '../../../utils/drag-drop/sortable'
import fuzzy from 'fuzzy'
import { v4 as uuidv4 } from 'uuid'


// Typescript:
export interface Dimensions {
  width: number
  height: number
}

export interface History {
  title: string
  placeholder: string
  footer: {
    info: string
    metaInfo: string
  }
}


// Imports:
import { RiSystemAddFill } from 'solid-icons/ri'
import { IoOptions } from 'solid-icons/io'
import { VsChevronLeft } from 'solid-icons/vs'


// Components:
import TopBar from '../../utils/TopBar'
import Search from '../../utils/Search'
import NavigationBar from '../../utils/NavigationBar'
import MicroButton from '../../utils/Buttons/MicroButton'
import ProjectsTab, { BoardItem, ProjectItem } from './tabs/ProjectsTab'
import TasksTab, { Priority, TaskItem } from './tabs/TasksTab'
import TaskTab from './tabs/TaskTab'
import Footer from '../../utils/Footer'


// Styles:
import {
  Wrapper,
  ScrollableBody,
  TabsHolder,
} from './styles'


// Functions:
const Tasks: Component<{id: number}> = (props) => {
  // Ref:
  const draggable = createDraggable(props.id)

  // Signals:
  const [ dimensions, setDimensions ] = createStore<Dimensions>({
    width: 20 * 16,
    height: 30 * 16
  })
  const [ isMaximized, setIsMaximized ] = createSignal(false)
  const [ isMinimized, setIsMinimized ] = createSignal(false)
  const [ isWindowSizeTransitioning, setIsWindowSizeTransitioning ] = createSignal(false)
  const [ history, setHistory ] = createSignal<History[]>([
    {
      title: '✨ Projects',
      placeholder: 'Search for a project or board',
      footer: {
        info: '2 Projects',
        metaInfo: 'Last Edited at 7:20 PM',
      }
    }
  ])
  const [ navLevel, setNavLevel ] = createSignal(0)
  const [ isSearchActive, setIsSearchActive ] = createSignal(false)
  const [ searchQuery, setSearchQuery ] = createSignal('')
  const [ selectedBoardID, setSelectedBoardID ] = createSignal<string | null>(null)
  const [ superficialEditingTaskID, setSuperficialEditingTaskID ] = createSignal<Id | null>(null)
  const [ selectedTaskID, setSelectedTaskID ] = createSignal<string | null>(null)

  // Functions:
  const {
    ids: projectIds,
    items: projects,
    setItems: setProjects,
    onDragStart: onProjectDragStart,
    onDragEnd: onProjectDragEnd
  } = createSortableDragHandlers<ProjectItem>({
    items: [
      {
        id: '1',
        name: '🎈 school',
        boards: [{
          id: '2',
          name: '⚗️ chemistry'
        }, {
          id: 'af',
          name: '✍️ literature'
        }]
      },
      {
        id: '2',
        name: '😺 personal',
        boards: []
      }
    ]
  })
  const [ superficialEditingBoardID, setSuperficialEditingBoardID ] = createSignal<Id | null>(null)
  const [ newBoardID, setNewBoardID ] = createSignal<string | null>(null)
  const [ superficialEditingProjectID, setSuperficialEditingProjectID ] = createSignal<Id | null>(null)
  const [ newProjectID, setNewProjectID ] = createSignal<string | null>(null)
  const [ allProjects, setAllProjects ] = createSignal<ProjectItem[]>(projects())
  const [ processedProjects, setProcessedProjects ] = createSignal<ProjectItem[]>(projects())

  const {
    ids: taskIds,
    items: tasks,
    setItems: setTasks,
    onDragStart: onTaskDragStart,
    onDragEnd: onTaskDragEnd
  } = createSortableDragHandlers<TaskItem>({
    items: [
      {
        id: '1',
        name: 'finish reading through 2nd chapter',
        isDone: true,
        description: '',
        tags: [],
        priority: Priority.NORMAL,
        subtasks: []
      },
      {
        id: '2',
        name: 'practice stoichiometry',
        isDone: false,
        description: '',
        tags: [],
        priority: Priority.NORMAL,
        subtasks: []
      },
      {
        id: '3',
        name: 'work on homework',
        isDone: false,
        description: '',
        tags: [],
        priority: Priority.NORMAL,
        subtasks: []
      },
      {
        id: '4',
        name: '4complete summer assignment',
        isDone: false,
        description: '',
        tags: [],
        priority: Priority.NORMAL,
        subtasks: []
      },
      {
        id: '5',
        name: '5complete summer assignment',
        isDone: false,
        description: '',
        tags: [],
        priority: Priority.NORMAL,
        subtasks: []
      },
      {
        id: '6',
        name: '6complete summer assignment',
        isDone: false,
        description: '',
        tags: [],
        priority: Priority.NORMAL,
        subtasks: []
      },
      {
        id: '7',
        name: '7complete summer assignment',
        isDone: false,
        description: '',
        tags: [],
        priority: Priority.NORMAL,
        subtasks: []
      },
      {
        id: '8',
        name: '8complete summer assignment',
        isDone: false,
        description: '',
        tags: [],
        priority: Priority.NORMAL,
        subtasks: []
      },
    ]
  })
  const [ newTaskID, setNewTaskID ] = createSignal<string | null>(null)
  const [ allTasks, setAllTasks ] = createSignal<TaskItem[]>(tasks())
  const [ processedTasks, setProcessedTasks ] = createSignal<TaskItem[]>(tasks())

  const searchFunction = (query: string) => {
    if (navLevel() === 0) {
      const searchResults = fuzzy.filter(query, allProjects(), {
        extract: project => project.name
      })
      const matches = searchResults.map(result => result.original)
      for (const project of allProjects()) {
        const boardSearchResults = fuzzy.filter(query, project.boards, {
          extract: board => board.name
        })
        if (boardSearchResults.length === 0) continue
        const boardMatches = boardSearchResults.map(result => result.original)
        const hasProjectAlreadyBeenMatched = matches.findIndex(_project => _project.name === project.name)
        if (hasProjectAlreadyBeenMatched !== -1) {
          matches[ hasProjectAlreadyBeenMatched ] = {
            ...matches[ hasProjectAlreadyBeenMatched ],
            boards: boardMatches
          }
        } else {
          matches.push({
            ...project,
            boards: boardMatches
          })
        }
      }
      setProcessedProjects(matches)
    } else if (navLevel() === 1) {
      const searchResults = fuzzy.filter(query, allTasks(), {
        extract: task => task.name
      })
      const matches = searchResults.map(result => result.original)
      setProcessedTasks(matches)
    }
  }

  const toggleMaximize = async (newValue: boolean) => {
    setIsWindowSizeTransitioning(true)
    setIsMaximized(newValue)
    await sleep(250)
    setIsWindowSizeTransitioning(false)
  }

  const toggleMinimize = async (newValue: boolean) => {
    setIsWindowSizeTransitioning(true)
    setIsMaximized(newValue)
    await sleep(250)
    setIsWindowSizeTransitioning(false)
  }

  const unsetAllSuperficialEditIDs = () => {
    setSuperficialEditingBoardID(null)
    setSuperficialEditingProjectID(null)
    setSuperficialEditingTaskID(null)
  }

  const push = (newHistoryItem: History) => {
    setSearchQuery('')
    setIsSearchActive(false)
    const currentHistory = history()
    currentHistory.push(newHistoryItem)
    setHistory(currentHistory)
    setNavLevel(navLevel() + 1)
    unsetAllSuperficialEditIDs()
  }

  const pop = () => {
    setSearchQuery('')
    setIsSearchActive(false)
    const currentHistory = history()
    currentHistory.pop()
    setHistory(currentHistory)
    setNavLevel(navLevel() - 1)
    unsetAllSuperficialEditIDs()
  }

  const getNavChildren = (level: number) => {
    switch(level) {
      case 0:
        return (
          <>
            <MicroButton
              content={
                <>
                  <RiSystemAddFill style={{ 'margin-right': '0.175rem' }} />
                  <span>New Project</span>
                </>
              }
              onClick={ addNewProject }
            />
            {/* <IoOptions color='#869696' /> */}
          </>
        )
      case 1:
        return (
          <>
            <MicroButton
              content={
                <>
                  <VsChevronLeft style={{ 'margin-right': '0.175rem' }} />
                  <span>{ history()[ 0 ]?.title ?? '' }</span>
                </>
              }
              onClick={ pop }
              buttonStyle={{
                'font-weight': 500,
                'color': '#929292',
                backgroundColor: '#2A2E2FB2',
                hoverBackgroundColor: '#4A5052B2'
              }}
            />
            {/* <IoOptions color='#869696' /> */}
          </>
        )
      case 2:
        return (
          <>
            <MicroButton
              content={
                <>
                  <VsChevronLeft style={{ 'margin-right': '0.175rem' }} />
                  <span>{ history()[ 1 ]?.title ?? '' }</span>
                </>
              }
              onClick={() => {
                pop()
                setSelectedTaskID(null)
              }}
              buttonStyle={{
                'font-weight': 500,
                'color': '#929292',
                backgroundColor: '#2A2E2FB2',
                hoverBackgroundColor: '#4A5052B2'
              }}
            />
            <span />
          </>
        )
    }
  }

  const toggleTaskDone = (id: Id, newValue: boolean) => {
    setTasks(tasks => tasks.map(task => {
      if (task.id === id) task.isDone = newValue
      return task
    }))
    if (processedTasks().findIndex(task => task.id === id) !== -1) {
      setProcessedTasks(tasks().map(task => {
        if (task.id === id) task.isDone = newValue
        return task
      }))
    }
  }

  const onTaskClick = (task?: TaskItem) => {
    if (!task) return
    setSelectedTaskID(task.id)
    push({
      title: `${ task.isDone ? '✅' : '⏳' } ${ task.name }`,
      placeholder: 'Search for a subtask',
      footer: {
        info: '0 Subtasks',
        metaInfo: 'Last Edited at 5:43 PM',
      }
    })
  }

  const updateProject = (newProject: ProjectItem) => {
    setProjects(projects => projects.map(project => {
      if (project.id === newProject.id) project = { ...project, ...newProject }
      return project
    }))
  }

  const updateBoard = (projectID: Id, newBoard: BoardItem) => {
    setProjects(projects => projects.map(project => {
      if (project.id === projectID) {
        project['boards'] = project.boards.map(board => {
          if (board.id === newBoard.id) board = { ...board, ...newBoard }
          return board
        })
      }
      return project
    }))
  }

  const updateTask = (newTask: TaskItem) => {
    setTasks(tasks => tasks.map(task => {
      if (task.id === newTask.id) task = { ...task, ...newTask }
      return task
    }))
  }

  const deleteTask = (taskID: Id) => {
    setTasks(tasks => tasks.filter(task => task.id !== taskID))
    pop()
  }

  const addNewProject = () => {
    if (isSearchActive()) return
    const projectID = uuidv4()
    const newProject = {
      id: projectID,
      name: '☕ untitled',
      boards: []
    }

    setProjects(projects => [ newProject, ...projects ])
    setSuperficialEditingProjectID(projectID)
    setNewProjectID(projectID)
  }

  const addNewBoard = (projectID: Id) => {
    const boardID = uuidv4()
    const newBoard: BoardItem = {
      id: boardID,
      name: '☕ untitled'
    }

    setProjects(projects => projects.map(project => {
      if (project.id === projectID) project = {
        ...project,
        boards: [ newBoard, ...project.boards ]
      }
      return project
    }))
    setSuperficialEditingBoardID(boardID)
    setNewBoardID(boardID)
  }

  const addNewTask = (boardID: string) => {
    console.log('TODO: boardID will be needed in the future')
    const taskID = uuidv4()
    const newTask: TaskItem = {
      id: taskID,
      name: 'Untitled',
      description: '',
      isDone: false,
      priority: Priority.NORMAL,
      subtasks: [],
      tags: []
    }

    setTasks(tasks => [ newTask, ...tasks ])
    setSuperficialEditingTaskID(taskID)
    setNewTaskID(taskID)
  }

  // Effects:
  createEffect(() => {
    if (!isSearchActive()) {
      setAllProjects(projects())
      setProcessedProjects(projects())
      setAllTasks(tasks())
      setProcessedTasks(tasks())
    }
  })

  // Return:
  return (
    <Wrapper
      ref={ draggable.ref }
      style={ transformStyle(draggable.transform) }
      isMaximized={ isMaximized() }
      isWindowSizeTransitioning={ isWindowSizeTransitioning() }
      dimensions={ dimensions }
    >
      <div {...draggable.dragActivators}>
        <TopBar
          title={ `${ history()[ navLevel() ].title.length > 17 ? `${ history()[ navLevel() ].title.substring(0, 17) }..` : history()[ navLevel() ].title } - Tasks` }
          isMaximized={ isMaximized() }
          toggleMaximize={ toggleMaximize }
          isMinimized={ isMinimized() }
          toggleMinimize={ toggleMinimize }
        />
      </div>
      <Show when={ navLevel() < 2 }>
        <Search
          placeholder={ history()[ navLevel() ].placeholder }
          searchQuery={ searchQuery() }
          setSearchQuery={ setSearchQuery }
          searchFunction={ searchFunction }
          setIsSearchActive={ setIsSearchActive }
        />
      </Show>
      <NavigationBar children={ getNavChildren(navLevel()) } />
      <ScrollableBody>
        <TabsHolder
          width={ dimensions.width }
          navLevel={ navLevel() }
          isMaximized={ isMaximized() }
        >
          <ProjectsTab
            push={ push }
            dimensions={ dimensions }
            isMaximized={ isMaximized() }
            isFocused={ navLevel() === 0 }
            ids={ projectIds() }
            onDragEnd={ onProjectDragEnd }
            onDragStart={ onProjectDragStart }
            allProjects={ projects() }
            processedProjects={ processedProjects() }
            isSearchActive={ isSearchActive() }
            addNewBoard={ addNewBoard }
            updateProject={ updateProject }
            newProjectID={ newProjectID() }
            setNewProjectID={ setNewProjectID }
            superficialEditingProjectID={ superficialEditingProjectID() }
            setSuperficialEditingProjectID={ setSuperficialEditingProjectID }
            updateBoard={ updateBoard }
            newBoardID={ newBoardID() }
            setNewBoardID={ setNewBoardID }
            superficialEditingBoardID={ superficialEditingBoardID() }
            setSuperficialEditingBoardID={ setSuperficialEditingBoardID }
          />
          <TasksTab
            dimensions={ dimensions }
            ids={ taskIds() }
            isMaximized={ isMaximized() }
            onDragEnd={ onTaskDragEnd }
            onDragStart={ onTaskDragStart }
            onTaskClick={ onTaskClick }
            allTasks={ tasks() }
            processedTasks={ processedTasks() }
            toggleTaskDone={ toggleTaskDone }
            isFocused={ navLevel() === 1 }
            isSearchActive={ isSearchActive() }
            addNewTask={ addNewTask }
            updateTask={ updateTask }
            newTaskID={ newTaskID() }
            setNewTaskID={ setNewTaskID }
            superficialEditingTaskID={ superficialEditingTaskID() }
            setSuperficialEditingTaskID={ setSuperficialEditingTaskID }
          />
          <TaskTab
            dimensions={ dimensions }
            isMaximized={ isMaximized() }
            taskID={ selectedTaskID() }
            tasks={ tasks() }
            toggleTaskDone={ toggleTaskDone }
            isFocused={ navLevel() === 2 }
            updateTask={ updateTask }
            deleteTask={ deleteTask }
          />
        </TabsHolder>
      </ScrollableBody>
      <Footer
        info={ history()[ navLevel() ].footer.info }
        metaInfo={ history()[ navLevel() ].footer.metaInfo }
      />
    </Wrapper>
  )
}


// Exports:
export default Tasks
