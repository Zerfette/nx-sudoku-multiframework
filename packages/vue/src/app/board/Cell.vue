<script setup lang="ts">
import { mouseEnterEvent, mouseDownEvent } from 'core/events/cell'
import { style } from 'core/style'
import { isNonZero } from 'fns'
import { computed } from 'vue'
import { useEvent } from '~/lib/hooks'
import { useState } from '~/store'

const { i } = defineProps({ i: { type: Number, required: true } })
const state = useState()
const cell = computed(() => state.board[i])
const onMouseDown = useEvent(mouseDownEvent)({ cell: cell.value })
const onMouseEnter = useEvent(mouseEnterEvent)({ cell: cell.value, toggles: state.toggles })
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
