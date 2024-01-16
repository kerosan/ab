import {Point} from '../Point';
import {State} from "../types";

export class Board {

    state: State;
    table?: HTMLElement;

    constructor(private size: number, private renderer: (state: State) => HTMLElement) {
        
        this.state = Array.from<boolean[]>({length: this.size})
            .fill(Array.from<boolean>({length: this.size}));
    }

    public drawByTemplate(template: State): Board {
        if (template && (template.length !== this.size || template.some(row => row.length !== this.size))) {
            throw new Error(`Out of boundaries (limit: ${this.size})`);
        }

        this.state = template;
        this.table = this.renderer(this.state);
        return this;
    }

    public drawRandom(): Board {
        this.state = this.state.map(row => row.map(() => Math.random() > .5));
        this.table = this.renderer(this.state);
        return this;
    }

    flipCell(point: Point) {
        this.state[point.x][point.y] = !this.state[point.x][point.y];
        const siblings = point.getSiblings();
        Object.entries(siblings).forEach(([_, c]) => this.flipSiblings(c));
        return this.state;
    }

    flipSiblings(point: Point) {
        if (point.y < 0 || point.y > this.size - 1 || point.x < 0 || point.x > this.size - 1) {
            return;
        }
        this.state[point.x][point.y] = !this.state[point.x][point.y];
    }

    checkCell(point: Point): boolean {
        return this.state[point.x][point.y];
    }

    checkBoard(): boolean {
        return this.state.every(row => row.every(col => col))
            || this.state.every(row => row.every(col => !col));
    }
}