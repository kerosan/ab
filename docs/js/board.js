class Board extends HTMLElement {
  constructor(rows = []) {
    super('table')
    rows.forEach(row => this.element.appendChild(row))
  }
}
