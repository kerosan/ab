class Modal extends HTMLElement {
  constructor(text) {
    super()
    const modal = document.createElement('div')
    modal.classList.add('modal')
    const window = document.createElement('div')
    window.classList.add('window')
    const btn = document.createElement('button')
    btn.innerText = 'Restart'
    btn.addEventListener('click', Game.init)
    const title = document.createElement('span')
    title.innerText = text
    window.appendChild(title)
    window.appendChild(btn)
    modal.appendChild(window)
    this.element = modal
  }
}
