<script setup lang="ts">
import { style } from 'core/style'
import { PropType } from 'vue'
import Cell from './Cell.vue'

defineProps({ region: Array as PropType<Array<number>> })
</script>

<template>
  <div :class="style.board.region">
    <Cell v-for="i in region" :i="i" :key="i" />
  </div>
</template>