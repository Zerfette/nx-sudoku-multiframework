const margin = 3
const cellSize = 50
const regionSize = 3 * cellSize + 6 * margin
const boardSize = 3 * regionSize + 6 * margin

export default {
  content: ['./apps/**/*.{html,ts,js,jsx,tsx,vue}'],
  darkMode: 'class',
  safelist: [
    'tabular-nums',
    'border',
    'blur',
    'rounded',
    'shadow',
    'flex',
    'grid',
    'absolute',
    'left-0',
    'top-0',
    'min-h-screen',
    'flex-col',
    'float-left',
    'leading-none',
    'content-center',
    'items-center',
    'select-none',
    'cursor-pointer',
    'leading-tight',
    'backdrop:backdrop-blur-sm',
    {
      pattern:
        /m-(0|px|0.5|1|1.5|2|2.5|3|3.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96|auto|gap)/,
    },
    {
      pattern:
        /ml-(0|px|0.5|1|1.5|2|2.5|3|3.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96|auto|gap)/,
    },
    {
      pattern:
        /mr-(0|px|0.5|1|1.5|2|2.5|3|3.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96|auto|gap)/,
    },
    {
      pattern:
        /mb-(0|px|0.5|1|1.5|2|2.5|3|3.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96|auto|gap)/,
    },
    {
      pattern:
        /mt-(0|px|0.5|1|1.5|2|2.5|3|3.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96|auto|gap)/,
    },
    {
      pattern:
        /mx-(0|px|0.5|1|1.5|2|2.5|3|3.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96|auto|gap)/,
    },
    {
      pattern:
        /my-(0|px|0.5|1|1.5|2|2.5|3|3.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96|auto|gap)/,
    },
    {
      pattern:
        /p-(0|px|0.5|1|1.5|2|2.5|3|3.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96|auto|gap)/,
    },
    {
      pattern:
        /pl-(0|px|0.5|1|1.5|2|2.5|3|3.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96|auto|gap)/,
    },
    {
      pattern:
        /pr-(0|px|0.5|1|1.5|2|2.5|3|3.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96|auto|gap)/,
    },
    {
      pattern:
        /pb-(0|px|0.5|1|1.5|2|2.5|3|3.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96|auto|gap)/,
    },
    {
      pattern:
        /pt-(0|px|0.5|1|1.5|2|2.5|3|3.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96|auto|gap)/,
    },
    {
      pattern:
        /px-(0|px|0.5|1|1.5|2|2.5|3|3.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96|auto|gap)/,
    },
    {
      pattern:
        /py-(0|px|0.5|1|1.5|2|2.5|3|3.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96|auto|gap)/,
    },
    {
      pattern:
        /h-(0|px|0.5|1|1.5|2|2.5|3|3.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96|auto|1\/2|1\/3|2\/3|1\/4|2\/4|3\/4|1\/5|2\/5|3\/5|4\/5|1\/6|2\/6|3\/6|4\/6|5\/6|full|screen|svh|lvh|dvh|min|max|fit|board|region|cell)/,
    },
    {
      pattern:
        /w-(0|px|0.5|1|1.5|2|2.5|3|3.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96|auto|1\/2|1\/3|2\/3|1\/4|2\/4|3\/4|1\/5|2\/5|3\/5|4\/5|1\/6|2\/6|3\/6|4\/6|5\/6|full|screen|svh|lvh|dvh|min|max|fit|board|region|cell)/,
    },
    {
      pattern:
        /size-(0|px|0.5|1|1.5|2|2.5|3|3.5|4|5|6|7|8|9|10|11|12|14|16|20|24|28|32|36|40|44|48|52|56|60|64|72|80|96|auto|1\/2|1\/3|2\/3|1\/4|2\/4|3\/4|1\/5|2\/5|3\/5|4\/5|1\/6|2\/6|3\/6|4\/6|5\/6|full|screen|svh|lvh|dvh|min|max|fit|board|region|cell)/,
    },
    {
      pattern:
        /text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)/,
    },
    {
      pattern:
        /font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)/,
    },
    { pattern: /text-(white|black)/, variants: ['dark'] },
    {
      pattern:
        /text-(purple|cyan|red|gray)-(100|200|300|400|500|600|700|800|900)/,
      variants: ['dark'],
    },
    {
      pattern:
        /bg-(purple|cyan|red|gray)-(100|200|300|400|500|600|700|800|900|950)/,
      variants: ['dark'],
    },
    {
      pattern:
        /border-(purple|cyan|red|gray)-(100|200|300|400|500|600|700|800|900|950)/,
      variants: ['dark'],
    },
    {
      pattern:
        /justify-(normal|start|end|center|between|around|evenly|stretch)/,
    },
    { pattern: /m-(0|1|1.5|gap)/ },
    { pattern: /ml-(0.5|2)/ },
    { pattern: /rounded-(none|sm|md|lg|xl|2xl|3xl|full)/ },
    { pattern: /shadow-(none|sm|md|lg|xl|2xl|inner)/ },
    { pattern: /blur-(none|sm|md|lg|xl|2xl|3xl)/ },
    { pattern: /backdrop-blur-(none|sm|md|lg|xl|2xl|3xl)/ },
    { pattern: /opacity-(0|5|10|15|20|25|30|35|40|45|50|55|60|65|70|75|80|85|90|95|100)/ },
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
