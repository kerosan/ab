import { describe, it, expect, beforeEach } from 'vitest';
import { Renderer } from './Renderer';
import { Point } from '../Point';

describe('Renderer', () => {
    beforeEach(() => {
        document.body.innerHTML = '<div id="root"></div>';
    });

    it('should initialize a table based on state', () => {
        const root = document.getElementById('root');
        const render = Renderer.init(root);
        const state = [
            [true, false],
            [false, true],
        ];
        const table = render(state);

        expect(table.tagName).toBe('TABLE');
        expect(table.querySelectorAll('tr').length).toBe(2);
        expect(table.querySelectorAll('td').length).toBe(4);
        expect(
            table.querySelector('td[data-x="0"][data-y="0"]')?.classList.contains('black'),
        ).toBe(true);
        expect(
            table.querySelector('td[data-x="0"][data-y="1"]')?.classList.contains('white'),
        ).toBe(true);
    });

    it('should highlight specific cell', () => {
        const root = document.getElementById('root');
        const highlight = new Point({ x: 0, y: 1 });
        const render = Renderer.init(root, highlight);
        const table = render([[false, false]]);

        expect(table.querySelector('td[data-x="0"][data-y="0"]')?.classList.contains('highlight')).toBe(false);
        expect(table.querySelector('td[data-x="0"][data-y="1"]')?.classList.contains('highlight')).toBe(true);
    });

    it('should update existing table cells', () => {
        const root = document.getElementById('root');
        const render = Renderer.init(root);
        const table = render([[true]]);
        const cell = table.querySelector('td')!;

        expect(cell.classList.contains('black')).toBe(true);

        Renderer.update(table, [[false]]);
        expect(cell.classList.contains('white')).toBe(true);
        expect(cell.classList.contains('black')).toBe(false);
    });
});