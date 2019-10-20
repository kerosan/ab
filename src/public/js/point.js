class Point {
  r
  c

  constructor({r, c}) {
    this.r = r
    this.c = c
  }

  getSiblings = () => {
    return {
      top: new Point({r: this.r - 1, c: this.c}),
      left: new Point({r: this.r, c: this.c - 1}),
      right: new Point({r: this.r, c: this.c + 1}),
      bottom: new Point({r: this.r + 1, c: this.c})
    }

  }
  getCross = () => {
    return {
      topLeft: new Point({r: this.r - 1, c: this.c - 1}),
      topRight: new Point({r: this.r + 1, c: this.c - 1}),
      bottomLeft: new Point({r: this.r - 1, c: this.c + 1}),
      bottomRight: new Point({r: this.r + 1, c: this.c + 1})
    }
  }
}