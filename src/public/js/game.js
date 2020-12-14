class Game extends HTML_Element {
  /**
   *
   * @type {Store}
   */
  store

  dimension = document.querySelector('input[type=number]').value

  static init() {
    const root = document.getElementById('root')
    const modal = document.querySelector('.modal')
    if (modal) {
      modal.remove()
    }

    const input = document.querySelector('input[type=number]')
    let size = 6
    if (/\d+/.test(input.value)) {
      size = input.value > 10 ? 10 : input.value
    }
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
    this.store = new Store(n)

    const rows = this.store.data.map((r, rk) => {
      const cells = r.map((c, ck) => {
        const point = new Point({r: rk, c: ck})
        return (new Cell(point, c)).render()
      })
      return (new Row(cells)).render()
    })


    this.element = new Board(rows).render()
    this.element.addEventListener('click', this.onClickCell)
    if (this.isPlayerWin()) {
      this.start(n)
    }
  }

  update = () => {
    this.store.data.forEach((r, rk) => {
      const cells = r.forEach((c, ck) => {
        const cell = document.querySelector(`[data-hook=cell-${rk}-${ck}]`)
        cell.classList.remove('rotated')
        if (c) {
          cell.classList.add('rotated')
        }
      })
      return (new Row(cells)).render()
    })

    if (this.isPlayerWin()) {
      this.showModal()
    }
  }

  constructor(n) {
    super()
    this.start(n)
  }

  onClickCell = e => {
    const [r, c] = e.target.dataset.hook.replace('cell-', '').split('-').map(i => parseInt(i))
    const point = new Point({r, c})
    this.store.update(point)
    this.update()
  }

  isPlayerWin = () => {
    const lightCells = this.store.data.every((row) => row.every(cell => cell))
    const darkCells = this.store.data.every((row) => row.every(cell => !cell))
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
