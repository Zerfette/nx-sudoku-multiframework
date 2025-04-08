import { useState } from 'react'
import { IO } from 'fp-ts/lib/IO'

export type Disclosure = {
  isOpen: boolean
  onClose: IO<void>
  onOpen: IO<void>
  onToggle: IO<void>
}

export const useDisclosure = (): Disclosure => {
  const [isOpen, setIsOpen] = useState(false)
  return {
    isOpen,
    onClose: () => setIsOpen(false),
    onOpen: () => setIsOpen(true),
    onToggle: () => setIsOpen(!isOpen),
  }
}
