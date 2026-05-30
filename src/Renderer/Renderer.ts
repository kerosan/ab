import { State } from "../types";
import { Board } from "../Board";
import { Point } from "../Point";

export class Renderer {
    static init(
        root: HTMLElement | null,
        highlight?: Point,
        isHistory?: boolean,
    ): (state: State) => HTMLElement {
        return (state: State) => {
            const table = document.createElement("table");

            const rows: HTMLTableRowElement[] = state.map((row, x) => {
                const tr = document.createElement("tr");
                const td: HTMLTableCellElement[] = row.map((cell, y) => {
                    const td = document.createElement("td");
                    td.classList.add("cell");
                    td.classList.add(cell ? "black" : "white");
                    td.dataset["x"] = x.toString();
                    td.dataset["y"] = y.toString();
                    const point = new Point({ x, y });
                    if (highlight && point.isSame(highlight)) {
                        td.classList.add("highlight");
                    }
                    return td;
                });
                td.forEach((c) => tr.appendChild(c));
                return tr;
            });

            rows.forEach((tr) => {
                table.appendChild(tr);
            });

            table.classList.add("board");
            if (isHistory) table.classList.add("mini");

            if (!isHistory && root) {
                let boardContainer = root.querySelector(".board-container");
                if (!boardContainer) {
                    boardContainer = document.createElement("div");
                    boardContainer.classList.add("board-container");
                    root.prepend(boardContainer);
                }
                boardContainer.replaceChildren(table);
                Renderer.ensureHistory(root);
            } else {
                root?.replaceChildren(table);
            }

            return table;
        };
    }

    static update(table: HTMLElement, state: State) {
        state.forEach((row, x) =>
            row.forEach((col, y) => {
                const cell = table.querySelector(`[data-x="${x}"][data-y="${y}"]`);
                col
                    ? cell?.classList.replace("white", "black")
                    : cell?.classList.replace("black", "white");
            }),
        );
    }

    static ensureHistory(root: HTMLElement | null) {
        if (root?.querySelector(".history")) return;

        const navigation = document.createElement("navigation");
        navigation.classList.add("history");
        root?.append(document.createElement("br"));
        root?.append(document.createTextNode("History"));
        root?.append(document.createElement("hr"));
        root?.append(navigation);
        root?.append(document.createElement("hr"));
    }

    static clearHistory(root: HTMLElement | null) {
        const nav = root?.querySelector(".history");
        if (nav) {
            nav.replaceChildren();
        }
    }
}
