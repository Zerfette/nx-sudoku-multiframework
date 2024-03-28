<script setup lang="ts">
import {
  autosolveEvent,
  keyDownEvent,
  mouseDownEvent,
  mouseUpEvent,
} from 'core/events/app'
import { style } from 'core/style'
import { pipe } from 'fp-ts/function'
import { effect } from 'vue'
import { useKeyDown } from '~/lib/hooks'
import { dispatchFold, useState } from '~/store'
import Board from './board/Board.vue'
  import Confetti from './Confetti.vue'
  import Hint from './hint/Hint.vue'
import Menu from './menu/Menu.vue'

const state = useState()

const onMouseDown = (event: MouseEvent) => {
  const payload = {
    selection: state.selection,
    toggles: state.toggles,
  }
  const eventData = { event, payload }
  pipe(eventData, mouseDownEvent, dispatchFold)
}

const onMouseUp = (event: MouseEvent) =>
  dispatchFold(mouseUpEvent({ event, payload: {} }))

const onKeyDown = (event: KeyboardEvent) => {
  const payload = { selection: state.selection }
  const eventData = { event, payload }
  pipe(eventData, keyDownEvent, dispatchFold)
}

useKeyDown(onKeyDown)

effect(() => {
  if (state.canAutosolve) {
    const payload = {
      hints: state.hints,
      selectedNumber: state.selectedNumber,
      selection: state.selection,
    }
    const eventData = { event: {}, payload }
    pipe(eventData, autosolveEvent, dispatchFold)
  }
})
</script>

<template>
  <div
    :class="
      state.toggles.darkMode ? style.root.dark : style.root.light
    "
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
  >
    <Menu />
    <Board />
    <Hint />
    <Confetti />
  </div>
</template>
