import {Board} from './Board';
import {Renderer} from "./Renderer";
import {Player} from "./Player";

export const bootstrap = (size: number) => {
    const root = document.getElementById('root');
    if (root !== null) {
        const board = new Board(size, Renderer.init(root))
        Player.listen(board.draw());
    }
}

const button = document.getElementById('reset') as HTMLButtonElement;
const input = document.querySelector('input') as HTMLInputElement;

bootstrap(Number(input?.value || 3))

button?.addEventListener('click', () => bootstrap(Number(input?.value || 3)))