class Board extends HTML_Element {
    constructor(rows = []) {
        super('table')
        rows.forEach(row => this.element.appendChild(row))
    }
}
