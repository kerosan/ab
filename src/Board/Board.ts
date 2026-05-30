import { Point } from "../Point";
import { State, RendererFn } from "../types";

export class Board {
  state: State;
  table?: HTMLElement;
  private changeListeners: Array<(state: State) => void> = [];

  constructor(
    private size: number,
    private renderer?: RendererFn,
  ) {
    // initialize independent rows to avoid shared references
    this.state = Array.from({ length: this.size }, () =>
      Array.from({ length: this.size }, () => false),
    );
  }

  onChange(cb: (state: State) => void) {
    this.changeListeners.push(cb);
  }

  private emitChange() {
    this.changeListeners.forEach((cb) => cb(this.state));
  }

  public drawByTemplate(template: State): Board {
    if (
      template &&
      (template.length !== this.size ||
        template.some((row) => row.length !== this.size))
    ) {
      throw new Error(`Out of boundaries (limit: ${this.size})`);
    }

    this.state = template;
    if (this.renderer) {
      this.table = this.renderer(this.state);
    }
    this.emitChange();
    return this;
  }

  public drawRandom(): Board {
    this.state = this.state.map((row) => row.map(() => Math.random() > 0.5));
    if (this.renderer) {
      this.table = this.renderer(this.state);
    }
    this.emitChange();
    return this;
  }

  flipCell(point: Point) {
    this.state[point.x][point.y] = !this.state[point.x][point.y];
    const siblings = point.getSiblings();
    Object.entries(siblings).forEach(([_, c]) => this.flipSiblings(c));
    this.emitChange();
    return this.state;
  }

  flipSiblings(point: Point) {
    if (
      point.y < 0 ||
      point.y > this.size - 1 ||
      point.x < 0 ||
      point.x > this.size - 1
    ) {
      return;
    }
    this.state[point.x][point.y] = !this.state[point.x][point.y];
  }

  checkCell(point: Point): boolean {
    return this.state[point.x][point.y];
  }

  checkBoard(): boolean {
    return (
      this.state.every((row) => row.every((col) => col)) ||
      this.state.every((row) => row.every((col) => !col))
    );
  }
}
