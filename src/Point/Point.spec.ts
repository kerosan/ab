import { describe, it, expect } from 'vitest';
import { Point } from './Point';

describe('Point', () => {
    it('should create a point with x and y', () => {
        const p = new Point({ x: 1, y: 2 });
        expect(p.x).toBe(1);
        expect(p.y).toBe(2);
    });

    it('should identify same points', () => {
        const p1 = new Point({ x: 1, y: 1 });
        const p2 = new Point({ x: 1, y: 1 });
        const p3 = new Point({ x: 2, y: 1 });
        expect(p1.isSame(p2)).toBe(true);
        expect(p1.isSame(p3)).toBe(false);
    });

    it('should return correct siblings', () => {
        const p = new Point({ x: 1, y: 1 });
        const siblings = p.getSiblings();
        expect(siblings.top.x).toBe(1);
        expect(siblings.top.y).toBe(0);
        expect(siblings.bottom.x).toBe(1);
        expect(siblings.bottom.y).toBe(2);
        expect(siblings.left.x).toBe(0);
        expect(siblings.left.y).toBe(1);
        expect(siblings.right.x).toBe(2);
        expect(siblings.right.y).toBe(1);
    });

    it('should return zero point', () => {
        const p = Point.getZero();
        expect(p.x).toBe(0);
        expect(p.y).toBe(0);
    });
});