export class Modal {
    static show(params: { text: string, onReset: () => void, }) {
        const modal = document.getElementById('modal');
        modal?.classList.remove('hidden');

        const btn = modal?.querySelector('.window button');
        const onReset = () => {
            params.onReset();
            modal?.classList.add('hidden');
            btn?.removeEventListener('click', onReset);
        };
        btn?.addEventListener('click', onReset);

        const title = modal?.querySelector('span');
        if (title) {
            title.innerText = params.text;
        }
    }
}