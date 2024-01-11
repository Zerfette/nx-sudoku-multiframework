import { createSignal } from 'solid-js'

export const useDisclosure = () => {
  const [isOpen, setIsOpen] = createSignal(false)
  return {
    isOpen,
    onClose: () => setIsOpen(false),
    onOpen: () => setIsOpen(true),
    onToggle: () => setIsOpen(!isOpen()),
  }
}