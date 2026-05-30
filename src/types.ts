export type State = boolean[][];

export type RendererFn = (state: State) => HTMLElement;
