class HTMLElement {
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

class Cell extends HTMLElement {
  isRotated = false

  rotate = () => {
    this.isRotated = !this.isRotated
    this.element.classList.toggle('rotated')
  }

  constructor(r, c, rotated = false) {
    super('td')
    this.isRotated = rotated
    this.element.classList.add('cell')
    this.element.addEventListener('click', this.rotate)
    this.element.setAttribute('data-hook', `cell-${r}-${c}`)
    if (this.isRotated) {
      this.element.classList.add('rotated')
    }
  }
}

class Row extends HTMLElement {
  constructor(cells = []) {
    super('tr')
    cells.forEach(cell => this.element.appendChild(cell))
  }
}

class Board extends HTMLElement {
  constructor(rows = []) {
    super('table')
    rows.forEach(row => this.element.appendChild(row))
  }
}

class Game extends HTMLElement {
  board = []

  dimension = document.querySelector('input[type=number]').value

  static init = () => {
    const root = document.getElementById('root')
    const modal = document.querySelector('.modal')
    if (modal) {
      modal.remove()
    }
    const input = document.querySelector('input[type=number]')
    const size = input.value > 10 ? 10 : input.value
    input.value = size
    const oldTable = root.querySelector('table')
    const game = new Game(size)
    if (oldTable) {
      root.replaceChild(game.render(), oldTable)
    } else {
      root.appendChild(game.render())
    }
  }

  start = (n) => {
    this.dimension = n

    this.board = []
    const matrix = [...Array.from({length: this.dimension})]

    const rows = matrix.map((_, i) => {
      this.board.push([])
      const cells = matrix.map((_, j) => {
        const cell = new Cell(i, j, Math.random() > .5)
        this.board[i].push(cell)
        return cell.render()
      })
      const row = new Row(cells)
      return row.render()
    })
    this.element = new Board(rows).render()
    this.element.addEventListener('click', this.onClickCell)
    if (this.isPlayerWin()) {
      this.start(n)
    }
  }

  constructor(n) {
    super()
    this.start(n)
  }

  onClickCell = e => {
    this.updateSiblingCell(e.target)
    if (this.isPlayerWin()) {
      this.showModal()
    }
  }

  updateSiblingCell = (cell) => {
    const [r, c] = cell.dataset.hook.replace('cell-', '').split('-').map(i => parseInt(i))

    const top = {r: r - 1, c}
    this.toggleByCell(top)

    const left = {r, c: c - 1}
    this.toggleByCell(left)

    const right = {r, c: c + 1}
    this.toggleByCell(right)

    const bottom = {r: r + 1, c}
    this.toggleByCell(bottom)
  }

  toggleByCell = (cell) => {
    const {r, c} = cell
    if (r < 0 || r > this.dimension - 1 || c < 0 || c > this.dimension - 1) {
      return
    }
    this.board[r][c].rotate()
  }

  isPlayerWin = () => {
    const lightCells = this.board.every((row) => row.every(cell => cell.isRotated))
    const darkCells = this.board.every((row) => row.every(cell => !cell.isRotated))
    return lightCells || darkCells
  }

  showModal = () => {
    const timer = setTimeout(() => {
      clearTimeout(timer)
      const root = document.getElementById('root')
      root.appendChild(new Modal('you win').render())
    }, 400)
  }
}

class Modal extends HTMLElement {
  constructor(text) {
    super()
    const modal = document.createElement('div')
    modal.classList.add('modal')
    const window = document.createElement('div')
    window.classList.add('window')
    const btn = document.createElement('button')
    btn.innerText = 'Restart'
    btn.addEventListener('click', Game.init)
    const title = document.createElement('span')
    title.innerText = text
    window.appendChild(title)
    window.appendChild(btn)
    modal.appendChild(window)
    this.element = modal
  }
}
