import {Board} from './Board';
import {Renderer} from "./Renderer";
import {Player} from "./Player";

export const bootstrap = (size: number) => {
    const board = new Board(size, Renderer.init(document.getElementById('root')));
    Player.listen(board.drawRandom());
};

const button = document.getElementById('reset') as HTMLButtonElement;
const input = document.querySelector('input') as HTMLInputElement;

bootstrap(Number(input?.value || 3));

button?.addEventListener('click', () => bootstrap(Number(input?.value || 3)));