<script setup lang="ts">
import { toggle } from 'core/actions'
import { autosolveLens } from 'core/interface/optics'
import { style } from 'core/style'
import { faHatWizard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useState } from 'apps/vue/store'

const state = useState()
const onClick = () => state.dispatch(toggle({ lens: autosolveLens }))
</script>

<template>
  <div
    :class="
      state.toggles.autosolve
        ? style.menu.btns.on
        : style.menu.btns.off
    "
    @click="onClick"
  >
    <font-awesome-icon :icon="faHatWizard" size="xl"/>
  </div>
</template>
