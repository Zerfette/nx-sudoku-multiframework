<script setup lang="ts">
import { toggle } from 'core/actions'
import { autosolveLens } from 'core/interface/optics'
import { style } from 'core/style'
import { faHatWizard } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { useState } from '~/store'

library.add(faHatWizard)
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
    <font-awesome-icon icon="hat-wizard" size="lg"/>
  </div>
</template>
