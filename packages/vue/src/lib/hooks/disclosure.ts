import { ref } from 'vue'

export const useDisclosure = () => {
  const isOpen = ref(false)
  return {
    isOpen,
    onClose: () => (isOpen.value = false),
    onOpen: () => (isOpen.value = true),
    onToggle: () => (isOpen.value = !isOpen.value),
  }
}
