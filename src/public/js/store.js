class Store {
  dimension = 6
  data = []

  constructor(n) {
    this.dimension = n
    const matrix = Array.from({length: this.dimension})
    matrix.forEach((_, i) => {
      this.data.push([])
      matrix.forEach((_, j) => {
        this.data[i] = Array.from({length: this.dimension}).map(_ => true)
      })
    })
    this.paint()
  }

  /**
   *
   * @param point Point
   */
  update = (point) => {
    this.data[point.r][point.c] = !this.data[point.r][point.c]
    this.updateSiblingCell(point)
  }

  /**
   *
   * @param point Point
   */
  updateSiblingCell = (point) => {
    if (point.r < 0 || point.r > this.dimension - 1 || point.c < 0 || point.c > this.dimension - 1) {
      return
    }
    const sibling = point.getSiblings()
    this.toggleByCell(sibling.top)
    this.toggleByCell(sibling.right)
    this.toggleByCell(sibling.bottom)
    this.toggleByCell(sibling.left)
  }
  /**
   *
   * @param point Point
   */
  toggleByCell = (point) => {
    if (point.r < 0 || point.r > this.dimension - 1 || point.c < 0 || point.c > this.dimension - 1) {
      return
    }
    this.data[point.r][point.c] = !this.pickByPoint(point)
  }

  /**
   *
   * @param point Point
   * @param color
   * @returns {boolean}
   */
  checkCrossCell = (point, color) => {

    const cross = point.getCross()

    return [this.pickByPoint(cross.topLeft),
      this.pickByPoint(cross.topRight),
      this.pickByPoint(cross.bottomLeft),
      this.pickByPoint(cross.bottomRight)].some(i => i === color)
  }

  /**
   *
   * @param point Point
   * @returns {null|boolean}
   */
  pickByPoint = (point) => {
    if (point.r < 0 || point.r > this.dimension - 1 || point.c < 0 || point.c > this.dimension - 1) {
      return null
    }
    return this.data[point.r][point.c]
  }

  paint = () => {
    for (let r = 0; r < this.dimension; r++) {
      for (let c = 0; c < this.dimension; c++) {
        if (r < 0 || r > this.dimension - 1 || c < 0 || c > this.dimension - 1) {
          continue
        }
        const color = Math.random() > .5
        if (r === 0 && c === 0) {
          this.data[r][c] = color
        }
        const point = new Point({r, c})
        const current = this.pickByPoint(point)


        this.data[r][c] = this.checkCrossCell(point, color) === current
      }
    }
  }
}