<script lang="ts">
  import { style } from 'core/style'
  import Cell from './Cell.svelte'

  type Props = { region: number[] }
  let { region }: Props = $props()
</script>

<div class={style.board.region}>
  {#each region as i}
    <Cell {i} />
  {/each}
</div>
