import { Board } from "./Board";
import { Point } from "../Point";
import { State } from "../types";

describe("Board", function () {
    const renderer = (_: State) => document.createElement("div");

    it("should draw and flip", () => {
        const board = new Board(3, renderer);
        board.drawRandom();
        const zeroCell = Point.getZero();
        const prev = board.checkCell(zeroCell);
        const prevSibling = board.checkCell(new Point({ x: 1, y: 0 }));
        board.flipCell(zeroCell);
        const next = board.checkCell(zeroCell);
        const nextSibling = board.checkCell(new Point({ x: 1, y: 0 }));

        expect(prev).toEqual(!next);
        expect(prevSibling).toEqual(!nextSibling);
    });

    it("should have independent rows (no shared references)", () => {
        const board = new Board(3, renderer);
        board.state[0][0] = true;
        expect(board.state[1][0]).toBe(false);
        expect(board.state[2][0]).toBe(false);
    });

    it("should fail draw and throw", () => {
        const board = new Board(3, renderer);

        expect(() => {
            board.drawByTemplate([
                [true, false, false, false],
                [false, false, false, true],
                [false, false, false, true],
            ]);
        }).toThrow();
    });
    it("should check all true", function () {
        const board = new Board(3, renderer);
        board.drawByTemplate([
            [true, true, true],
            [true, true, true],
            [true, true, true],
        ]);

        expect(board.checkBoard()).toBeTruthy();
    });
    it("should check all false", function () {
        const board = new Board(3, renderer);
        board.drawByTemplate([
            [false, false, false],
            [false, false, false],
            [false, false, false],
        ]);

        expect(board.checkBoard()).toBeTruthy();
    });
    it("should fail check", () => {
        const board = new Board(3, renderer);
        board.drawByTemplate([
            [true, false, false],
            [false, false, false],
            [false, false, false],
        ]);

        expect(board.checkBoard()).toBeFalsy();
    });

    it("should flip only neighbors and self (corner case)", () => {
        const board = new Board(3, renderer);
        board.drawByTemplate([
            [false, false, false],
            [false, false, false],
            [false, false, false],
        ]);
        board.flipCell(new Point({ x: 0, y: 0 }));
        // Expected: (0,0), (0,1), (1,0) are flipped
        expect(board.checkCell(new Point({ x: 0, y: 0 }))).toBe(true);
        expect(board.checkCell(new Point({ x: 0, y: 1 }))).toBe(true);
        expect(board.checkCell(new Point({ x: 1, y: 0 }))).toBe(true);
        expect(board.checkCell(new Point({ x: 1, y: 1 }))).toBe(false);
    });

    it("should flip only neighbors and self (edge case)", () => {
        const board = new Board(3, renderer);
        board.drawByTemplate([
            [false, false, false],
            [false, false, false],
            [false, false, false],
        ]);
        board.flipCell(new Point({ x: 0, y: 1 }));
        // Expected: (0,1), (0,0), (0,2), (1,1) are flipped
        expect(board.checkCell(new Point({ x: 0, y: 1 }))).toBe(true);
        expect(board.checkCell(new Point({ x: 0, y: 0 }))).toBe(true);
        expect(board.checkCell(new Point({ x: 0, y: 2 }))).toBe(true);
        expect(board.checkCell(new Point({ x: 1, y: 1 }))).toBe(true);
    });
});
