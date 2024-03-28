<script setup lang="ts">
import {
  mouseEnterEvent,
  mouseDownEvent
} from 'core/events/cell'
import { style } from 'core/style'
import { isNonZero } from 'fns'
import { pipe } from 'fp-ts/function'
import { computed } from 'vue'
import { useState, dispatchFold } from '~/store'

const { i } = defineProps({ i: { type: Number, required: true } })
const state = useState()
const cell = computed(() => state.board[i])

const onMouseDown = (event: MouseEvent) => {
  const payload = { cell: cell.value }
  const eventData = { event, payload }
  pipe(eventData, mouseDownEvent, dispatchFold)
}
const onMouseEnter = (event: MouseEvent) => {
  const payload = { cell: cell.value, toggles: state.toggles }
  const eventData = { event, payload }
  pipe(eventData, mouseEnterEvent, dispatchFold)
}
</script>

<template>
  <div
    :class="style.board.cell[cell.editable][cell.decoration]"
    @mouseenter="onMouseEnter"
    @mousedown="onMouseDown"
  >
    <p v-show="isNonZero(cell.value)">{{ cell.value }}</p>
  </div>
</template>
