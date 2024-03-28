<script setup lang="ts">
import { toggle } from 'core/actions'
import { darkModeLens } from 'core/interface/optics'
import { style } from 'core/style'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useState } from '~/store'

library.add(faMoon, faSun)
const state = useState()
const onClick = () => state.dispatch(toggle({ lens: darkModeLens }))
</script>

<template>
  <div :class="style.menu.btns.off" @click="onClick">
    <font-awesome-icon
      v-if="state.toggles.darkMode"
      icon="sun"
      size="lg"
    />
    <font-awesome-icon v-else icon="moon" size="lg" />
  </div>
</template>
