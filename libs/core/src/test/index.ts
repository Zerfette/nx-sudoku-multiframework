const position = {
  ind: 0,
  row: 0,
  col: 0,
  reg: 0,
}

export const cellStates = {
  nonEmpty: {
    locked: {
      highlighted: {
        ...position,
        value: 4,
        selected: false,
        locked: true,
        highlighted: true,
        corner: [],
        middle: [],
      },
      dflt: {
        ...position,
        value: 4,
        selected: false,
        locked: true,
        highlighted: false,
        corner: [],
        middle: [],
      },
    },
    unlocked: {
      selected: {
        ...position,
        value: 4,
        selected: true,
        locked: false,
        highlighted: false,
        corner: [],
        middle: [],
      },
      highlighted: {
        ...position,
        value: 4,
        selected: false,
        locked: false,
        highlighted: true,
        corner: [],
        middle: [],
      },
      
    },
  },
}
