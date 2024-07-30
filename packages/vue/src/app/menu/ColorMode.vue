<script setup lang="ts">
import { toggle } from 'core/actions'
import { darkModeLens } from 'core/interface/optics'
import { style } from 'core/style'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useState } from '~/store'

const state = useState()
const onClick = () => state.dispatch(toggle({ lens: darkModeLens }))
</script>

<template>
  <div :class="style.menu.btns.off" @click="onClick">
    <font-awesome-icon
      v-if="state.toggles.darkMode"
      :icon="faSun"
      size="xl"
    />
    <font-awesome-icon v-else :icon="faMoon" size="xl" />
  </div>
</template>
