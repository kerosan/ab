/**
 * @jest-environment jsdom
 */

const {initGame, renderTable, updateCell, toggleCell, setColors, setHandlers, onClickHandler, checkWin} = require('../src/public/js/field')

describe('Table', () => {
	it('init game', () => {
		expect(initGame(2).outerHTML).toMatch(/table.*class=\"black|white\"/)
	})
	it('render table 3x3', () => {
		expect(renderTable(3).outerHTML).toBe(`<table data-hook="field"><tbody><tr role="grid" data-hook="row-0"><td role="gridcell" data-hook="cell-0-0"></td><td role="gridcell" data-hook="cell-0-1"></td><td role="gridcell" data-hook="cell-0-2"></td></tr><tr role="grid" data-hook="row-1"><td role="gridcell" data-hook="cell-1-0"></td><td role="gridcell" data-hook="cell-1-1"></td><td role="gridcell" data-hook="cell-1-2"></td></tr><tr role="grid" data-hook="row-2"><td role="gridcell" data-hook="cell-2-0"></td><td role="gridcell" data-hook="cell-2-1"></td><td role="gridcell" data-hook="cell-2-2"></td></tr></tbody></table>`)
	})
	it('render table 4x4', () => {
		expect(renderTable(4).outerHTML).toMatch(/(.*<\/tr>.*){4}/)//toBe(`<table data-hook="field"><tbody><tr role="grid" data-hook="row-0"><td role="gridcell" data-hook="cell-0-0"></td><td role="gridcell" data-hook="cell-0-1"></td><td role="gridcell" data-hook="cell-0-2"></td><td role="gridcell" data-hook="cell-0-3"></td></tr><tr role="grid" data-hook="row-1"><td role="gridcell" data-hook="cell-1-0"></td><td role="gridcell" data-hook="cell-1-1"></td><td role="gridcell" data-hook="cell-1-2"></td><td role="gridcell" data-hook="cell-1-3"></td></tr><tr role="grid" data-hook="row-2"><td role="gridcell" data-hook="cell-2-0"></td><td role="gridcell" data-hook="cell-2-1"></td><td role="gridcell" data-hook="cell-2-2"></td><td role="gridcell" data-hook="cell-2-3"></td></tr><tr role="grid" data-hook="row-3"><td role="gridcell" data-hook="cell-3-0"></td><td role="gridcell" data-hook="cell-3-1"></td><td role="gridcell" data-hook="cell-3-2"></td><td role="gridcell" data-hook="cell-3-3"></td></tr></tbody></table>`)
	})
	it('paint table 4x4', () => {
		const table = renderTable(4)

		expect(table.outerHTML).toBe(`<table data-hook="field"><tbody><tr role="grid" data-hook="row-0"><td role="gridcell" data-hook="cell-0-0"></td><td role="gridcell" data-hook="cell-0-1"></td><td role="gridcell" data-hook="cell-0-2"></td><td role="gridcell" data-hook="cell-0-3"></td></tr><tr role="grid" data-hook="row-1"><td role="gridcell" data-hook="cell-1-0"></td><td role="gridcell" data-hook="cell-1-1"></td><td role="gridcell" data-hook="cell-1-2"></td><td role="gridcell" data-hook="cell-1-3"></td></tr><tr role="grid" data-hook="row-2"><td role="gridcell" data-hook="cell-2-0"></td><td role="gridcell" data-hook="cell-2-1"></td><td role="gridcell" data-hook="cell-2-2"></td><td role="gridcell" data-hook="cell-2-3"></td></tr><tr role="grid" data-hook="row-3"><td role="gridcell" data-hook="cell-3-0"></td><td role="gridcell" data-hook="cell-3-1"></td><td role="gridcell" data-hook="cell-3-2"></td><td role="gridcell" data-hook="cell-3-3"></td></tr></tbody></table>`)
	})
	it('set Black cell', () => {
		expect(updateCell(document.createElement('td'), 'black').outerHTML).toBe(`<td class="black"></td>`)
	})
	it('set White cell', () => {
		expect(updateCell(document.createElement('td'), 'white').outerHTML).toBe(`<td class="white"></td>`)
	})
	it('toggle cell color', () => {
		expect(toggleCell(updateCell(document.createElement('td'), 'white')).outerHTML).toBe(`<td class="black"></td>`)
	})

	it('onClick cell toggle color', () => {
		const table = renderTable(3)
		setHandlers(table)
		const cell = table.rows.item(1).cells[1]
		updateCell(cell, 'white')
		const e = {
			target: cell
		}
		onClickHandler(e)
		expect(cell.classList.value).toBe('black')
	})

	it('onClick cell toggle sibling cell', () => {
		const table = renderTable(3)
		const n = table.rows.length
		// ooo
		// ooo
		// ooo
		for (let i = 0; i < n; i++) {
			for (let j = 0; j < n; j++) {
				updateCell(table.rows.item(i).cells[j], 'white')
			}
		}

		const e = {
			target: table.rows.item(1).cells[1]
		}

		// o*o
		// ***
		// o*o
		onClickHandler(e, table)

		expect(table.rows.item(1).cells[1].classList.value).toBe('black')
		expect(table.rows.item(0).cells[1].classList.value).toBe('black')
		expect(table.rows.item(1).cells[2].classList.value).toBe('black')
		expect(table.rows.item(1).cells[0].classList.value).toBe('black')
		expect(table.rows.item(2).cells[1].classList.value).toBe('black')

	})

	it('win when white color on all cells', () => {
		const table = renderTable(2)
		setColors(table)
		setHandlers(table)
		const n = table.rows.length
		for (let i = 0; i < n; i++) {
			for (let j = 0; j < n; j++) {
				const cell = table.rows.item(i).cells[j]
				if (cell.classList.value !== 'white') {
					toggleCell(cell)
				}
			}
		}
		const win = checkWin(table)
		expect(win).toMatchObject({gameOver: true, winner: 'white'})
	})

	it('win when black color on all cells', () => {
		const table = renderTable(2)
		setColors(table)
		setHandlers(table)
		const n = table.rows.length
		for (let i = 0; i < n; i++) {
			for (let j = 0; j < n; j++) {
				const cell = table.rows.item(i).cells[j]
				if (cell.classList.value !== 'black') {
					toggleCell(cell)
				}
			}
		}
		const win = checkWin(table)
		expect(win).toMatchObject({gameOver: true, winner: 'black'})
	})

	it.todo('should win with any preset')
})