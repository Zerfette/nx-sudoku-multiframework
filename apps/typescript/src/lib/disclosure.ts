export class Disclosure {
  private element
  public isOpen = false

  constructor(element: HTMLDivElement) {
    this.element = element
  }

  private setIsOpen(value: boolean) {
    this.isOpen = value
    this.element.dispatchEvent(
      new CustomEvent<Disclosure>('disclosure', {
        detail: this,
      })
    )
  }

  onClose() {
    this.setIsOpen(false)
  }

  onOpen() {
    this.setIsOpen(true)
  }

  onToggle() {
    this.setIsOpen(!this.isOpen)
  }
}
