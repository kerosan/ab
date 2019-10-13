function initGame(size) {
  const table = renderTable(size)
  setHandlers(table)
  setColors(table)
  return table
}

/**
 *
 * @param n Number
 * @returns {HTMLTableElement}
 */
function renderTable(n) {
  const table = document.createElement('table')
  table.setAttribute('data-hook', 'field')
  const body = table.createTBody()
  for (let i = 0; i < n; i++) {
    const row = body.insertRow()
    row.setAttribute('role', 'grid')
    row.setAttribute('data-hook', `row-${i}`)
    for (let j = 0; j < n; j++) {
      const cell = row.insertCell()
      cell.setAttribute('role', 'gridcell')
      cell.setAttribute('data-hook', `cell-${i}-${j}`)
    }
  }
  return table
}

/**
 *
 * @param table HTMLTableElement
 */
function setHandlers(table) {
  const n = table.rows.length
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      table.rows.item(i).cells[j].addEventListener('click', (e) => onClickHandler(e, table))
    }
  }
}

/**
 *
 * @param table HTMLTableElement
 */
function setColors(table) {
  const n = table.rows.length
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      updateCell(table.rows.item(i).cells[j], Math.random() > .5 ? 'black' : 'white')
    }
  }
}

/**
 *
 * @param cell HTMLTableCellElement
 * @param color 'black' | 'white'
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
 * @param e MouseEvent
 * @param table HTMLTableElement
 */
function onClickHandler(e, table) {
  const cell = e.target
  const updatedCell = toggleCell(cell)
  updateSiblingCell(table, updatedCell)
  const res = checkWin(table)
  // istanbul ignore next
  res && res.gameOver && alert(`Winner: ${res.winner}`) && initGame(table.rows.length)
}

/**
 *
 * @param table HTMLTableElement
 * @returns {null|{winner: (string), gameOver: boolean}}
 */
function checkWin(table) {
  if (!table) {
    return null
  }
  const n = table.rows.length
  const stats = {
    white: 0,
    black: 0
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      switch (table.rows.item(i).cells[j].classList.value) {
        case 'black':
          stats.black++
          break
        case 'white':
          stats.white++
      }
    }
  }
  return {
    gameOver: stats.white === n * n || stats.black === n * n,
    winner: stats.white > stats.black ? 'white' : 'black'
  }
}

function toggleByCell(table, {r, c}) {
  if (table) {
    const n = table.rows.length
    return r >= 0 &&
      c >= 0 &&
      r <= n - 1 &&
      c <= n - 1 &&
      toggleCell(table.rows.item(r).cells[c])
  }
}

/**
 *
 * @param table HTMLTableElement
 * @param cell HTMLTableCellElement
 */
function updateSiblingCell(table = document.querySelector('table'), cell) {

  const [r, c] = cell.dataset.hook.replace('cell-', '').split('-').map(i => parseInt(i))

  const top = {r: r - 1, c}
  toggleByCell(table, top)

  const left = {r, c: c - 1}
  toggleByCell(table, left)

  const right = {r, c: c + 1}
  toggleByCell(table, right)

  const bottom = {r: r + 1, c}
  toggleByCell(table, bottom)
}

/* istanbul ignore next */
if (typeof exports !== 'undefined') {
  module.exports = {
    initGame,
    renderTable,
    updateCell,
    setColors,
    setHandlers,
    toggleCell,
    onClickHandler,
    checkWin
  }
}