<script setup lang="ts">
import { mouseOutsideEvent } from 'core/events/board'
import { regionIndicies } from 'core/interface/toolkit'
import { style } from 'core/style'
import { pipe } from 'fp-ts/function'
import { dispatchFold } from '~/store'
import Region from './Region.vue'

const setMouseOutside = (value: boolean) => (event: MouseEvent) => {
  const payload = { value }
  const eventData = { event, payload }
  pipe(eventData, mouseOutsideEvent, dispatchFold)
}
const onMouseOut = setMouseOutside(true)
const onMouseOver = setMouseOutside(false)
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
