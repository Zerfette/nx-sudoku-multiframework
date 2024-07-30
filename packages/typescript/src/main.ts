import './style.css'
import {
  setupApp,
  setupBoard,
  setupCells,
  setupAutosolve,
  setupColorMode,
  setupConfetti,
  setupFallback,
  setupHelp,
  setupEdit,
  setupStartOver,
  setupTimer,
  setupHints,
} from './app'

setupApp(document.querySelector<HTMLDivElement>('#app')!)
setupBoard(
  document.querySelector<HTMLDivElement>('#board')!
)
setupCells(
  document.querySelectorAll<HTMLDivElement>('.cell')!
)
setupAutosolve(
  document.querySelector<HTMLDivElement>('#autosolve')!
)
setupTimer(
  document.querySelector<HTMLDivElement>('#timer')!
)
setupColorMode(
  document.querySelector<HTMLDivElement>('#colorMode')!
)
setupConfetti(
  document.querySelector<HTMLDivElement>('#canvas')!
)
setupEdit(document.querySelector<HTMLDivElement>('#edit')!)
setupHelp(document.querySelector<HTMLDivElement>('#help')!)
setupStartOver(
  document.querySelector<HTMLDivElement>('#startOver')!
)
setupHints(
  document.querySelectorAll<HTMLDivElement>('.hintDigit')!
)
setupFallback(
  document.querySelector<HTMLDivElement>('#hintFallback')!
)
