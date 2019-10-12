/**
 * @jest-environment jsdom
 */

const {renderField, updateCell} = require('../src/public/js/field')

describe('field', () => {
	it('table 3x3', () => {
		expect(renderField(3).outerHTML).toBe(`<table data-hook="field"><tbody><tr role="grid" data-hook="row-0"><td role="gridcell" data-hook="cell-0-0"></td><td role="gridcell" data-hook="cell-0-1"></td><td role="gridcell" data-hook="cell-0-2"></td></tr><tr role="grid" data-hook="row-1"><td role="gridcell" data-hook="cell-1-0"></td><td role="gridcell" data-hook="cell-1-1"></td><td role="gridcell" data-hook="cell-1-2"></td></tr><tr role="grid" data-hook="row-2"><td role="gridcell" data-hook="cell-2-0"></td><td role="gridcell" data-hook="cell-2-1"></td><td role="gridcell" data-hook="cell-2-2"></td></tr></tbody></table>`)
	})

	it('table 4x4', () => {
		expect(renderField(4).outerHTML).toBe(`<table data-hook="field"><tbody><tr role="grid" data-hook="row-0"><td role="gridcell" data-hook="cell-0-0"></td><td role="gridcell" data-hook="cell-0-1"></td><td role="gridcell" data-hook="cell-0-2"></td><td role="gridcell" data-hook="cell-0-3"></td></tr><tr role="grid" data-hook="row-1"><td role="gridcell" data-hook="cell-1-0"></td><td role="gridcell" data-hook="cell-1-1"></td><td role="gridcell" data-hook="cell-1-2"></td><td role="gridcell" data-hook="cell-1-3"></td></tr><tr role="grid" data-hook="row-2"><td role="gridcell" data-hook="cell-2-0"></td><td role="gridcell" data-hook="cell-2-1"></td><td role="gridcell" data-hook="cell-2-2"></td><td role="gridcell" data-hook="cell-2-3"></td></tr><tr role="grid" data-hook="row-3"><td role="gridcell" data-hook="cell-3-0"></td><td role="gridcell" data-hook="cell-3-1"></td><td role="gridcell" data-hook="cell-3-2"></td><td role="gridcell" data-hook="cell-3-3"></td></tr></tbody></table>`)
	})

	it('paint cell black', () => {
		expect(updateCell(document.createElement('td'), 'black').outerHTML).toBe(`<td class="black"></td>`)
	})
	it('paint cell white', () => {
		expect(updateCell(document.createElement('td'), 'white').outerHTML).toBe(`<td class="white"></td>`)
	})
	it.todo('cell is clickable')
	it.todo('on click cell change color')
	it.todo('win when same color on all cells')
})