import { Board } from "../Board";
import { Renderer } from "../Renderer";
import { Point } from "../Point";
import { Modal } from "../Modal";
import { State } from "../types";

export class Player {
    static listen(board: Board) {
        const root = document.getElementById("root");
        if (!root) return;

        Renderer.clearHistory(root);

        // Record the initial state of the board
        const nav = root.querySelector(".history");
        if (nav instanceof HTMLElement) {
            Player.recordMove(nav, board.state, undefined, board);
        }

        // The container might not exist yet if this is called before the first render.
        // We use delegation on the root, but filter for clicks inside the board container.
        const onClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const container = root.querySelector(".board-container");

            // Ignore clicks if they aren't inside the board or are within the history UI
            if (!container || target.closest(".history")) return;

            const td = target.closest(".cell") as HTMLTableCellElement | null;
            const currentTable = container.querySelector("table") as HTMLElement;

            if (td && currentTable) {
                const point = new Point({
                    x: Number(td.dataset?.x) ?? 0,
                    y: Number(td.dataset?.y) ?? 0,
                });

                const state = board.flipCell(point);
                Renderer.update(currentTable, state);

                const nav = root?.querySelector(".history");
                if (nav instanceof HTMLElement) {
                    Player.recordMove(nav, state, point, board);
                }

                if (board.checkBoard()) {
                    Modal.show({
                        text: "win",
                        onReset: () => {
                            root.onclick = null;
                            Player.listen(board.drawRandom());
                        },
                    });
                }
            }
        };

        root.onclick = onClick;
    }

    private static recordMove(
        nav: HTMLElement,
        state: State,
        point: Point | undefined,
        board: Board,
    ) {
        const container = document.createElement("div");
        // Shallow copy rows to ensure the snapshot remains immutable for history
        const snapshot = state.map(row => [...row]);
        const miniBoard = new Board(
            state.length,
            Renderer.init(container, point, true),
        );
        miniBoard.drawByTemplate(snapshot);
        container.addEventListener("click", (e) => {
            e.stopPropagation();
            board.drawByTemplate(snapshot);
        });
        nav.prepend(container);
    }
}
