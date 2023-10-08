// // Packages:
// import { Component, createEffect, createSignal } from 'solid-js'
// import { styled } from 'solid-styled-components'


// // Typescript:
// import { Priority } from '../../extensions/Tasks/tabs/TasksTab'

// export interface PriorityDropdownProps { 
//   priority: Priority
// }


// // Imports:
// import { CgArrowsExchangeV } from 'solid-icons/cg'
// import sleep from 'sleep-promise'


// // Styles:
// const Wrapper = styled.div`
//   width: calc(30% - 1.025rem - 2px);
//   height: 1.25rem;
//   padding: 0.25rem 0.5rem;
//   background-color: #1D20207D;
//   border: 1px solid #3D4444B2;
//   border-radius: 5px;
//   transition: all 0.25s ease;

//   &:focus-within {
//     background-color: #1D61E533;
//     border: 1px solid #1D61E5B2;
//     transition: all 0.25s ease;
//   }
// `

// const Dot = styled.div`
//   width: 0.75rem;
//   height: 0.75rem;
//   border-radius: 50%;
// `

// const PriorityText = styled.div`
//   font-size: 0.8rem;
//   font-weight: 500;
//   color: #E2E2E2;
// `


// // Functions:
// const getPriorityColor = (priority: Priority) => {
//   switch (priority) {
//     case Priority.HIGH: return 1
//     case Priority.NORMAL: return 2
//     case Priority.LOW: return 3
//     default: return 4
//   }
// }

// const PriorityDropdown: Component<PriorityDropdownProps> = (props) => {
//   // Constants:
//   const Priority = {
//     [ Priority.LOW ]: {
//       color: SECONDARY_COLORS.ELEMENT.ACTIVE.DARK.hue(200).saturate(1.75).darken(0.25).hex(),
//       transform: 'translateY(0rem)'
//     },
//     [ Priority.NORMAL ]: {
//       color: SECONDARY_COLORS.ELEMENT.ACTIVE.DARK.hex(),
//       transform: 'translateY(-2rem)'
//     },
//     [ Priority.HIGH ]: {
//       color: SECONDARY_COLORS.ELEMENT.ACTIVE.DARK.hue(0).saturate(2).darken(0.45).hex(),
//       transform: 'translateY(-6rem)'
//     }
//   }

//   // Ref:
//   let wrapperRef: HTMLDivElement | undefined

//   // Signals:
//   const [ isOptionsOverlayVisible, setIsOptionsOverlayVisible ] = createSignal(false)
//   const [ optionsOverlayZIndex, setOptionsOverlayZIndex ] = createSignal(false)
//   const [ currentPriority, setCurrentPriority ] = createSignal(props.priority)

//   // Functions:
//   const handleClick = async (event: MouseEvent) => {
//     if (event.target && wrapperRef) if (!wrapperRef.contains(event.target) && isOptionsOverlayVisible()) setIsOptionsOverlayVisible(false)
//   }

//   const selectOption = async (newPriority: Priority) => {
//     setCurrentPriority(newPriority)
//     await sleep(250)
//     setIsOptionsOverlayVisible(false)
//   }

//   // Effects:
//   createEffect(() => {
//     document.addEventListener('click', handleClick)
//     return () => {
//       document.removeEventListener('click', handleClick)
//     }
//   })

//   // Return:
//   return (
//     <Wrapper ref={ wrapperRef }>
//       <Current onClick={ () => setIsOptionsOverlayVisible(!isOptionsOverlayVisible()) }>
//         <Details>
//           <Dot background-color={ getPriorityColor(props.priority) } />
//           <PriorityText>{ props.priority }</PriorityText>
//         </Details>
//         <CgArrowsExchangeV font-size='0.75rem' color='#3D4444' />
//       </Current>
//       <OptionsOverlay isVisible={ isOptionsOverlayVisible() } style={{ zIndex: optionsOverlayZIndex() ? 1 : -1, transform: Priority[ currentPriority() ].transform }}>
//         <Option onClick={ () => selectOption(Priority.LOW) }>
//           <PriorityDot style={{ backgroundColor: Priority[ Priority.LOW ].color }} />{ Priority[ Priority.LOW ].name }
//         </Option>
//         <Option onClick={ () => selectOption(Priority.NORMAL) }>
//           <PriorityDot style={{ backgroundColor: Priority[ Priority.NORMAL ].color }} />{ Priority[ Priority.NORMAL ].name }
//         </Option>
//         <Option onClick={ () => selectOption(Priority.HIGH) }>
//           <PriorityDot style={{ backgroundColor: Priority[ Priority.HIGH ].color }} />{ Priority[ Priority.HIGH ].name }
//         </Option>
//       </OptionsOverlay>
//     </Wrapper>
//   )
// }


// // Exports:
// export default PriorityDropdown
