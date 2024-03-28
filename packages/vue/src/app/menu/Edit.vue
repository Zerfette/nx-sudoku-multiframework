<script setup lang="ts">
import { clearBoard, lockBoard } from 'core/actions'
import { style } from 'core/style'
import { faLock, faPlus } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useDisclosure } from '~/lib/hooks'
import { useState } from '~/store'

library.add(faLock, faPlus)
const disclosure = useDisclosure()
const state = useState()
const onClick = () => {
  disclosure.isOpen.value
    ? state.dispatch(lockBoard)
    : state.dispatch(clearBoard)
  disclosure.onToggle()
}
</script>

<template>
  <div :class="style.menu.btns.off" @click="onClick">
    <font-awesome-icon v-if="disclosure.isOpen.value" icon="lock" size="lg"/>
    <font-awesome-icon v-else icon="plus" size="lg"/>
  </div>
</template>
