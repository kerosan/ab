class Cell extends HTMLElement {
  isRotated = false

  rotate = () => {
    this.isRotated = !this.isRotated
    this.element.classList.toggle('rotated')
  }

  constructor(point, rotated = false) {
    super('td')
    this.isRotated = rotated
    this.element.classList.add('cell')
    this.element.addEventListener('click', this.rotate)
    this.element.setAttribute('data-hook', `cell-${point.r}-${point.c}`)
    if (this.isRotated) {
      this.element.classList.add('rotated')
    }
  }
}
