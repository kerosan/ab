import {State} from "../types";
import {Board} from "../Board";
import { Point } from "../Point";

export class Renderer {
    static init(root: HTMLElement | null, highlight?: Point): (state: State) => HTMLElement {
        return (state: State) => {
            const table = document.createElement('table');

            const rows: HTMLTableRowElement[] = state.map((row, x) => {
                const tr = document.createElement('tr');
                const td: HTMLTableCellElement[] = row.map((cell, y) => {
                    const td = document.createElement('td');
                    td.classList.add('cell');
                    td.classList.add(cell ? 'black' : 'white');
                    td.dataset['x'] = x.toString();
                    td.dataset['y'] = y.toString();
                    const point = new Point({x,y})
                    if(highlight && point.isSame(highlight)) {
                        td.classList.add('highlight')
                    }
                    return td;
                });
                td.forEach(c => tr.appendChild(c));
                return tr;
            });

            rows.forEach(tr => {
                table.appendChild(tr);
            });

            table.classList.add('board')

            root?.replaceChildren(table);
            Renderer.history(root, state);
            return table;
        };
    }

    static update(table: HTMLElement, state: State) {
        state.forEach((row, x) => row.forEach((col, y) => {
            const cell = table.querySelector(`[data-x="${x}"][data-y="${y}"]`);
            col ? cell?.classList.replace('white', 'black')
                : cell?.classList.replace('black', 'white');
        }));

    }

    static history(root: HTMLElement | null, state: State) {
        const navigation = document.createElement('navigation');
        navigation.classList.add('history')

        const onAddHistory = (e: any)=> {
            const x = Number(e.target?.dataset?.x);
            const y = Number(e.target?.dataset?.y);

            const clickCell = new Point({x,y});

            console.log(clickCell, state);
            const miniTable = document.createElement('table')
            const miniBoard = new Board(state.length, Renderer.init(miniTable, clickCell))
            miniBoard.drawByTemplate(state)
            if(miniBoard.table) {
                navigation.prepend(miniBoard.table)
            }
        }

        root?.append(document.createElement('br'));
        root?.append(document.createTextNode('History'))
        root?.append(document.createElement('hr'));
        root?.append(navigation);
        root?.append(document.createElement('hr'));
        root?.removeEventListener('click', onAddHistory)
        root?.addEventListener('click', onAddHistory)
        
    }


}