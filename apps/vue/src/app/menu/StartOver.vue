<script setup lang="ts">
import { resetBoard } from 'core/actions'
import { style } from 'core/style'
import { faRotate } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useState } from 'apps/vue/store'

const state = useState()
const onClick = () => state.dispatch(resetBoard)
</script>

<template>
  <div :class="style.menu.btns.off" @click="onClick">
    <font-awesome-icon :icon="faRotate" size="xl" />
  </div>
</template>
