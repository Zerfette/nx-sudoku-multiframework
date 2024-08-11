<script setup lang="ts">
import { style } from 'core/style'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { inject, provide } from 'vue'
import {
  useDisclosure,
  useResume,
  type Stopwatch,
} from '~/lib/hooks'
import { Modal } from '~/lib/components'

const stopwatch = inject<Stopwatch>(
  'stopwatch'
) as Stopwatch
const { isOpen, onOpen, onClose } = useDisclosure()
useResume(stopwatch, isOpen)
provide('isOpen', isOpen)
</script>

<template>
  <div :class="style.menu.btns.off" @click="onOpen">
    <font-awesome-icon :icon="faQuestion" size="xl" />
  </div>
  <Modal
    :onClose="onClose"
    :className="style.component.modal"
  >
    <h1 :class="style.typography.h1">Getting Started</h1>
    <p :class="style.typography.p">
      Click cells to select them.
    </p>
    <p :class="style.typography.p">
      Hold
      <kbd :class="style.typography.kbd">CTRL</kbd>
      to select multiple cells.
    </p>
    <p :class="style.typography.p">
      Press
      <kbd :class="style.typography.kbd">CTRL</kbd>+
      <kbd :class="style.typography.kbd">A</kbd>
      to select all cells.
    </p>
    <p :class="style.typography.p">
      Press
      <kbd :class="style.typography.kbd">ENTER</kbd>
      or click off the board to clear the selection.
    </p>
    <p :class="style.typography.p">
      Press any number
      <kbd :class="style.typography.kbd">1</kbd>
      ...
      <kbd :class="style.typography.kbd">9</kbd>
      on the keyboard to place that number in the selected
      cells.
    </p>
    <p :class="style.typography.p">
      Press
      <kbd :class="style.typography.kbd">DEL</kbd>
      to remove numbers from selected cells.
    </p>
  </Modal>
</template>
