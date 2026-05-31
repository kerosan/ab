import { describe, it, expect, beforeEach } from 'vitest';
import { Board } from './Board/Board';
import { Renderer } from './Renderer/Renderer';
import { Player } from './Player/Player';

describe('Lights Out Integration - Chasing Strategy', () => {
    beforeEach(() => {
        // Prepare a clean DOM before each test
        document.body.innerHTML = '<div id="root"></div>';
    });

    it('should solve a 3x3 board by chasing a single move pattern', () => {
        const root = document.getElementById('root')!;
        const size = 3;

        // 1. Initialize the board with a real renderer
        const board = new Board(size, Renderer.init(root));

        // 2. Set a pre-defined state
        // This pattern corresponds to a click in the center (1, 1)
        // W B W
        // B B B
        // W B W
        const initialState = [
            [false, true, false],
            [true, true, true],
            [false, true, false]
        ];
        board.drawByTemplate(initialState);

        // 3. Connect the player (event listener)
        Player.listen(board);

        // Verify that there are indeed 5 black cells in the DOM
        const blackCellsInitial = root.querySelectorAll('.board-container .cell.black');
        expect(blackCellsInitial.length).toBe(5);

        // 4. Apply the "Chasing the Lights" strategy
        // Iterate through the rows from top to bottom (up to the penultimate one)
        for (let x = 0; x < size - 1; x++) {
            for (let y = 0; y < size; y++) {
                // Find the cell in the current row via the DOM to ensure Renderer.update works
                const cell = root.querySelector(`td[data-x="${x}"][data-y="${y}"]`);

                if (cell?.classList.contains('black')) {
                    // If the cell is "on" (black), "click" the cell below it in the next row
                    const belowCell = root.querySelector(`td[data-x="${x + 1}"][data-y="${y}"]`) as HTMLElement;
                    belowCell?.click();
                }
            }
        }

        // 5. Verify the final state
        // In this scenario, the strategy should lead to complete victory (all cells are white)
        expect(board.checkBoard()).toBe(true);

        const blackCellsFinal = root.querySelectorAll('.board-container .cell.black');
        expect(blackCellsFinal.length).toBe(0);
    });
});