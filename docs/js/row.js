class Row extends HTMLElement {
  constructor(cells = []) {
    super('tr')
    cells.forEach(cell => this.element.appendChild(cell))
  }
}
