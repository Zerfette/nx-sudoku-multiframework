import '../../../tailwind.css'
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
import { Stopwatch } from './lib/stopwatch'

setupApp(document.querySelector<HTMLDivElement>('#app')!)
setupBoard(
  document.querySelector<HTMLDivElement>('#board')!
)
setupCells(
  document.querySelectorAll<HTMLDivElement>('.cell')!
)

const timer = document.querySelector<HTMLDivElement>('#timer')!
const stopwatch = new Stopwatch(timer)

setupTimer(timer, stopwatch)
setupAutosolve(
  document.querySelector<HTMLDivElement>('#autosolve')!
)
setupColorMode(
  document.querySelector<HTMLDivElement>('#colorMode')!
)
setupConfetti(
  document.querySelector<HTMLDivElement>('#canvas')!
)
setupEdit(document.querySelector<HTMLDivElement>('#edit')!)
const helpBtn = document.querySelector<HTMLDivElement>('#help')!
setupHelp(helpBtn, stopwatch)
setupStartOver(
  document.querySelector<HTMLDivElement>('#startOver')!
)
setupHints(
  document.querySelectorAll<HTMLDivElement>('.hintDigit')!
)
setupFallback(
  document.querySelector<HTMLDivElement>('#hintFallback')!
)
