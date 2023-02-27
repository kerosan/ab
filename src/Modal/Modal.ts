export class Modal {
    static show(params: {text: string, onReset: ()=> void, }) {
        // todo refactor
        const root = document.getElementById('root');

        const modal = document.createElement('div');

        modal.classList.add('modal')
        const window = document.createElement('div')
        window.classList.add('window')
        const btn = document.createElement('button')
        btn.innerText = 'Restart'
        btn.addEventListener('click', params.onReset)
        const title = document.createElement('span')
        title.innerText = params.text
        window.appendChild(title)
        window.appendChild(btn)
        modal.appendChild(window)

        root?.appendChild(modal);
        return () => {
            btn.removeEventListener('click', params.onReset)

            modal.remove();
        }

    }
}