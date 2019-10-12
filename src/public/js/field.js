/**
 *
 * @param n Number
 * @returns {HTMLTableElement}
 */
function renderField(n) {
	const table = document.createElement('table')
	table.setAttribute('data-hook', 'field')
	const body = table.createTBody()
	for (let i = 0; i < n; i++) {
		const row = body.insertRow()
		row.setAttribute('role', 'grid')
		row.setAttribute('data-hook', `row-${i}`)
		for (let j = 0; j < n; j++) {
			const cell = row.insertCell()//document.createElement('td')
			cell.setAttribute('role', 'gridcell')
			cell.setAttribute('data-hook', `cell-${i}-${j}`)
		}
	}
	return table
}

/**
 *
 * @param cell HTMLTableCellElement
 * @param color 'black' || 'white'
 * @returns HTMLTableCellElement
 */
function updateCell(cell, color) {
	cell.classList.remove('black', 'white')
	cell.classList.add(color)
	return cell
}

/**
 *
 * @param cell HTMLTableCellElement
 * @returns HTMLTableCellElement
 */
function toggleCell(cell) {
	const oldColor = cell.classList.value
	cell.classList.remove('black', 'white')
	cell.classList.add(oldColor === 'black' ? 'white' : 'black')
	return cell
}

/**
 *
 * @param e Event
 */
function onClickHandler(e) {
	const cell = e.target
	console.log(cell)
	const updatedCell = updateCell(e.target, Math.random() > .5 ? 'black' : 'white')
	updateSiblingCell(updatedCell)

}

/**
 *
 * @param cell HTMLTableCellElement
 */
function initCell(cell) {
	cell.addEventListener('click', onClickHandler)
}

/**
 *
 * @param cell HTMLTableCellElement
 */
function updateSiblingCell(cell) {
	const [x, y] = cell.dataset.hook.replace('cell-', '').split('-')
	console.log('cell position', x, y)
	// todo find sibling
}


if (typeof exports !== 'undefined') {
	module.exports = {
		renderField,
		updateCell,
		initCell,
		toggleCell
	}
}