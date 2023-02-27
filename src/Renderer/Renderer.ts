import {State} from "../types";

export class Renderer {
    static init(root: HTMLElement) {
        return (state: State) => {
            const table = document.createElement('table');

            const rows: HTMLTableRowElement[] = state.map((row, x) => {
                const tr = document.createElement('tr');
                const td: HTMLTableCellElement[] = row.map((cell, y) => {
                    const td = document.createElement('td')
                    td.classList.add('cell');
                    td.classList.add(cell ? 'black' : 'white');
                    td.dataset['x'] = x.toString();
                    td.dataset['y'] = y.toString();
                    return td;
                });
                td.forEach(c => tr.appendChild(c))
                return tr;
            });

            rows.forEach(tr => {
                table.appendChild(tr)
            });

            rows.forEach(tr => {
                table.appendChild(tr)
            });

            root.replaceChildren(table);
            return table;
        }
    }

    static update(table: HTMLElement, state: State) {
        state.forEach((row, x) => row.forEach((col, y) => {
            const td = table.querySelector(`[data-x="${x}"][data-y="${y}"]`)
            col ? td?.classList.replace('white', 'black')
                : td?.classList.replace('black', 'white');
        }))

    }
}