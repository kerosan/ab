import {Board} from "../Board";
import {Renderer} from "../Renderer";
import {Point} from "../Point";
import {Modal} from "../Modal";

export class Player {
    static listen(board: Board) {
        const table = board.table;
        const onClick = (e: MouseEvent) => {
            const td = e.target as HTMLTableCellElement;

            if (table) {
                Renderer.update(table, board.flipCell(new Point({
                    x: Number(td.dataset?.x) ?? 0,
                    y: Number(td.dataset?.y) ?? 0
                })));
            }

            if (board.checkBoard()) {
                Modal.show({
                    text: 'win',
                    onReset: () => {
                        table?.removeEventListener('click', onClick);
                        Player.listen(board.drawRandom());
                        table?.addEventListener('click', onClick);
                    }
                });

            }
        };

        table?.removeEventListener('click', onClick);
        table?.addEventListener('click', onClick);
    }
}