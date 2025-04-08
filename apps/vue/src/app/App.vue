<script setup lang="ts">
import {
  autosolveEvent,
  keyDownEvent,
  mouseDownEvent,
  mouseUpEvent,
} from 'core/events/app'
import { style } from 'core/style'
import { effect } from 'vue'
import { useEvent } from 'apps/vue/lib/hooks'
import { dispatchFold, useState } from 'apps/vue/store'
import Board from './board/Board.vue'
import Confetti from './Confetti.vue'
import Hint from './hint/Hint.vue'
import Menu from './menu/Menu.vue'
import { pipe } from 'fp-ts/lib/function'

const state = useState()

const onMouseDown = (event: MouseEvent) => {
  const payload = {
    selection: state.selection,
    toggles: state.toggles,
  }
  const eventData = { event, payload }
  pipe(eventData, mouseDownEvent, dispatchFold)
}

const onMouseUp = useEvent(mouseUpEvent)({})
const onKeyDown = (event: KeyboardEvent) => {
  const payload = { selection: state.selection }
  const eventData = { event, payload }
  pipe(eventData, keyDownEvent, dispatchFold)
}
const onAutosolve = useEvent(autosolveEvent)

effect(() => {
  if (state.canAutosolve)
    onAutosolve({
      hints: state.hints,
      selectedNumber: state.selectedNumber,
      selection: state.selection,
    })({})
})
</script>

<template>
  <div
    :class="
      state.toggles.darkMode
        ? style.root.dark
        : style.root.light
    "
    :tabindex="0"
    @mousedown="onMouseDown"
    @mouseup="onMouseUp"
    @keydown="onKeyDown"
  >
    <Menu />
    <Board />
    <Hint />
    <Confetti />
  </div>
</template>
