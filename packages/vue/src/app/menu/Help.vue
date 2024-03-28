<script setup lang="ts">
import { style } from 'core/style'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faQuestion)
</script>

<template>
  <div :class="style.menu.btns.off">
    <font-awesome-icon icon="question" size="lg"/>
  </div>
</template>
