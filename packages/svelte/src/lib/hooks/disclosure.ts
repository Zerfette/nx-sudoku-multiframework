import { get, writable } from 'svelte/store'

export const useDisclosure = () => {
  const isOpen = writable(false)
  return {
    isOpen,
    onClose: () => isOpen.set(false),
    onOpen: () => isOpen.set(true),
    onToggle: () => isOpen.set(!get(isOpen)),
  }
}
