class HTML_Element {
  /**
   *
   * @type {HTMLDivElement|HTMLTableElement|HTMLTableCellElement|HTMLTableRowElement}
   */
  element = null

  constructor(tag) {
    if (tag) {
      this.element = document.createElement(tag)
    }
  }

  render = () => this.element
}
