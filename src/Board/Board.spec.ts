import {Board} from './Board';
import {Point} from '../Point'
import { State } from '../types';

describe('Board', function () {

    const renderer = (_: State) => document.createElement('div')

    it('should draw and flip', () => {
        const board = new Board(3, renderer);
        board.draw();
        const zeroCell = Point.getZero();
        const prev = board.check(zeroCell);
        const prevSibling = board.check(new Point({x: 1, y: 0}));
        board.flipCell(zeroCell);
        const next = board.check(zeroCell);
        const nextSibling = board.check(new Point({x: 1, y: 0}));

        expect(prev).toEqual(!next);
        expect(prevSibling).toEqual(!nextSibling);
    })
    it('should fail draw and throw', () => {
        const board = new Board(3, renderer);

        expect(() => {
            board.draw([[true, false, false, false], [false, false, false, true], [false, false, false, true]]);
        }).toThrowError();
    })
    it('should check all true', function () {
        const board = new Board(3, renderer);
        board.draw([[true, true, true], [true, true, true], [true, true, true]]);

        expect(board.check()).toBeTruthy()
    });
    it('should check all false', function () {
        const board = new Board(3, renderer);
        board.draw([[false, false, false], [false, false, false], [false, false, false]]);

        expect(board.check()).toBeTruthy()
    });
    it('should fail check', () => {
        const board = new Board(3, renderer);
        board.draw([[true, false, false], [false, false, false], [false, false, false]]);

        expect(board.check()).toBeFalsy()
    });
});