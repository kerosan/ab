export class Point {
    x: number // column
    y: number // row

    static getZero = ()=> new Point({x: 0, y: 0})

    constructor({x, y}: { x: number, y: number }) {
        this.x = x
        this.y = y
    }

    getSiblings = () => {
        return {
            top: new Point({x: this.x, y: this.y - 1}),
            left: new Point({x: this.x - 1, y: this.y}),
            right: new Point({x: this.x + 1, y: this.y}),
            bottom: new Point({x: this.x, y: this.y + 1})
        }

    }
}