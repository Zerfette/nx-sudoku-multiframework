import { Decoration, Editable } from 'core/interface/types'

export const style = {
  root: {
    light:
      'bg-gray-200 dark:bg-gray-900 flex min-h-screen flex-col items-center justify-center select-none',
    dark: 'dark bg-gray-900 flex min-h-screen flex-col items-center justify-center select-none',
  },
  menu: {
    root: 'flex justify-between w-board',
    btns: {
      root: 'flex justify-between',
      on: 'flex justify-center items-center cursor-pointer size-10 rounded-md m-1.5 text-white dark:text-black bg-purple-700 dark:bg-purple-300',
      off: 'flex justify-center items-center cursor-pointer size-10 rounded-md m-1.5 text-black dark:text-white bg-gray-300 dark:bg-gray-700',
    },
    timer: {
      root: 'flex items-center m-1',
      txt: 'tabular-nums leading-none text-4xl text-black dark:text-white m-0 ml-0.5 mb-1',
      btn: 'flex justify-center items-center ml-2 text-black dark:text-white rounded-md cursor-pointer bg-gray-300 dark:bg-gray-700 size-7',
    },
    confetti: 'absolute left-0 top-0',
  },
  board: {
    root: 'size-board mb-1',
    region: 'size-region m-gap float-left',
    cell: {
      [Editable.LOCKED]: {
        [Decoration.CONFLICTED]:
          'size-cell m-gap float-left grid justify-center content-center rounded-sm text-4xl text-black dark:text-white bg-red-300 dark:bg-red-700',
        [Decoration.HIGHLIGHTED]:
          'size-cell m-gap float-left grid justify-center content-center rounded-sm text-4xl text-black dark:text-white bg-cyan-300 dark:bg-cyan-700',
        [Decoration.SELECTED]:
          'size-cell m-gap float-left grid justify-center content-center rounded-sm text-4xl text-black dark:text-white bg-purple-400 dark:bg-purple-600',
        [Decoration.NONE]:
          'size-cell m-gap float-left grid justify-center content-center rounded-sm text-4xl text-black dark:text-white bg-purple-300 dark:bg-purple-800',
      },
      [Editable.UNLOCKED]: {
        [Decoration.CONFLICTED]:
          'size-cell m-gap float-left grid justify-center content-center rounded-sm text-4xl text-purple-600 dark:text-purple-300 bg-red-300 dark:bg-red-700',
        [Decoration.HIGHLIGHTED]:
          'size-cell m-gap float-left grid justify-center content-center rounded-sm text-4xl text-purple-600 dark:text-purple-300 bg-cyan-300 dark:bg-cyan-700',
        [Decoration.SELECTED]:
          'size-cell m-gap float-left grid justify-center content-center rounded-sm text-4xl text-purple-600 dark:text-purple-300 bg-purple-400 dark:bg-purple-600',
        [Decoration.NONE]:
          'size-cell m-gap float-left grid justify-center content-center rounded-sm text-4xl text-purple-600 dark:text-purple-300 bg-purple-300 dark:bg-purple-800',
      },
    },
  },
  hint: {
    root: 'w-board flex flex-col items-center leading-none text-black dark:text-white',
    numbers: 'flex',
    number: {
      on: 'flex mr-2 items-center justify-center size-8 rounded-sm leading-none text-xl bg-purple-300 dark:bg-purple-600',
      off: 'flex mr-2 items-center justify-center size-8 rounded-sm leading-none text-xl text-gray-500 bg-gray-300 dark:bg-gray-700',
    },
    fallback: 'h-16 text-xl text-black dark:text-white',
  },
  component: {
    modal: 'p-24 rounded dark:text-white dark:bg-gray-950 backdrop:backdrop-blur-sm'
  },
  typography: {
    h1: 'mb-2 text-3xl font-extrabold leading-tight',
    p: 'text-lg my-6',
    kbd: 'px-2 py-2 m-2 text-xs font-semibold bg-white border border-gray-200 rounded',
  },
}
