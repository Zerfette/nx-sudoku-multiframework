<script lang="ts">
  import { style } from 'core/style'
  import Cell from './Cell.svelte'
  export let region: number[]
</script>

<div class={style.board.region}>
  {#each region as i}
    <Cell {i} />
  {/each}
</div>
