class Row extends HTML_Element {
  constructor(cells = []) {
    super('tr')
    cells.forEach(cell => this.element.appendChild(cell))
  }
}
