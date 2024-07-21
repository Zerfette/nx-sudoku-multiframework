import { useState } from 'react'

export const useDisclosure = () => {
  const [isOpen, setIsOpen] = useState(false)
  return {
    isOpen,
    onClose: () => setIsOpen(false),
    onOpen: () => setIsOpen(true),
    onToggle: () => setIsOpen(!isOpen),
  }
}