<script setup lang="ts">
import { mouseOutsideEvent } from 'core/events/board'
import { regionIndicies } from 'core/interface/toolkit'
import { style } from 'core/style'
import { useEvent } from '~/lib/hooks'
import Region from './Region.vue'

const setMouseOutside = useEvent(mouseOutsideEvent)
const onMouseOut = setMouseOutside({ value: true })
const onMouseOver = setMouseOutside({ value: false })
</script>

<template>
  <div
    :class="style.board.root"
    @mouseout="onMouseOut"
    @mouseover="onMouseOver"
  >
    <Region
      v-for="(region, i) in regionIndicies"
      :region="region"
      :key="i"
    />
  </div>
</template>
