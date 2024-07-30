<script setup lang="ts">
import { style } from 'core/style'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>

<template>
  <div :class="style.menu.btns.off">
    <font-awesome-icon :icon="faQuestion" size="xl"/>
  </div>
</template>
