const margin = 3
const cellSize = 50
const regionSize = 3 * cellSize + 6 * margin
const boardSize = 3 * regionSize + 6 * margin

export default {
  darkMode: 'class',
  safelist: [
    'tabular-nums',
    'flex',
    'grid',
    'absolute',
    'left-0',
    'top-0',
    'min-h-screen',
    'w-board',
    'h-16',
    'mb-1',
    'mr-2',
    'flex-col',
    'float-left',
    'leading-none',
    'content-center',
    'items-center',
    'select-none',
    'cursor-pointer',
    { pattern: /text-(4xl|xl)/ },
    { pattern: /text-(white|black)/, variants: ['dark'] },
    { pattern: /text-(purple|gray)-(|500|600)/, variants: ['dark'] },
    {
      pattern:
        /bg-(purple|cyan|red|gray)-(100|200|300|400|500|600|700|800|900)/,
      variants: ['dark'],
    },
    { pattern: /size-(7|8|10|board|region|cell)/ },
    { pattern: /justify-(center|between)/ },
    { pattern: /m-(0|1|1.5|gap)/ },
    { pattern: /ml-(0.5|2)/ },
    { pattern: /rounded-(sm|md)/ },
  ],
  theme: {
    extend: {
      margin: {
        gap: `${margin}px`,
      },
      width: {
        board: `${boardSize}px`,
      },
      size: {
        cell: `${cellSize}px`,
        region: `${regionSize}px`,
        board: `${boardSize}px`,
      },
    },
  },
}
