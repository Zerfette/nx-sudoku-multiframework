<script setup lang="ts">
import {
  type Dialog,
  inBounds,
} from 'core/lib/components/modal'
import { IO } from 'fp-ts/IO'
import { effect, inject, type Ref, ref } from 'vue'

interface Props {
  className?: string
  onClose: IO<void>
}
const { className, onClose } = defineProps<Props>()
const isOpen: Ref<boolean> | undefined = inject('isOpen')
let modal = ref(null) as unknown as Ref<Dialog>
const close = () => {
  if (!modal.value) return
  modal.value.close()
  onClose()
}

effect(() => {
  isOpen?.value ? modal.value.showModal() : close()
})

const onClick = (event: MouseEvent) => {
  if (inBounds(modal.value)(event)) return
  close()
}
</script>
<template>
  <dialog ref="modal" @click="onClick" :class="className">
    <slot></slot>
  </dialog>
</template>
