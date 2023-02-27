System.register("Point/Point", [], function (exports_1, context_1) {
    "use strict";
    var Point;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            Point = class Point {
                constructor({ x, y }) {
                    this.getSiblings = () => {
                        return {
                            top: new Point({ x: this.x, y: this.y - 1 }),
                            left: new Point({ x: this.x - 1, y: this.y }),
                            right: new Point({ x: this.x + 1, y: this.y }),
                            bottom: new Point({ x: this.x, y: this.y + 1 })
                        };
                    };
                    this.x = x;
                    this.y = y;
                }
            };
            exports_1("Point", Point);
            Point.getZero = () => new Point({ x: 0, y: 0 });
        }
    };
});
System.register("Point/index", ["Point/Point"], function (exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_2(exports);
    }
    return {
        setters: [
            function (Point_1_1) {
                exportStar_1(Point_1_1);
            }
        ],
        execute: function () {
        }
    };
});
System.register("types", [], function (exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    return {
        setters: [],
        execute: function () {
        }
    };
});
System.register("Board/Board", [], function (exports_4, context_4) {
    "use strict";
    var Board;
    var __moduleName = context_4 && context_4.id;
    return {
        setters: [],
        execute: function () {
            Board = class Board {
                constructor(size, renderer) {
                    this.size = size;
                    this.renderer = renderer;
                    this.state = Array.from({ length: this.size })
                        .fill(Array.from({ length: this.size }));
                }
                draw(predefined) {
                    if (predefined && (predefined.length !== this.size || predefined.some(row => row.length !== this.size))) {
                        throw new Error(`Out of boundaries (limit: ${this.size})`);
                    }
                    this.state = predefined !== null && predefined !== void 0 ? predefined : this.state.map(row => row.map(() => Math.random() > .5));
                    this.table = this.renderer(this.state);
                    console.log('board.start', this);
                    return this;
                }
                flipCell(point) {
                    this.state[point.x][point.y] = !this.state[point.x][point.y];
                    const siblings = point.getSiblings();
                    Object.entries(siblings).forEach(([_, c]) => this.flipSiblings(c));
                    return this.state;
                }
                flipSiblings(point) {
                    if (point.y < 0 || point.y > this.size - 1 || point.x < 0 || point.x > this.size - 1) {
                        return;
                    }
                    this.state[point.x][point.y] = !this.state[point.x][point.y];
                }
                check(point) {
                    if (point !== undefined) {
                        return this.state[point.x][point.y];
                    }
                    return this.state.every(row => row.every(col => col))
                        || this.state.every(row => row.every(col => !col));
                }
            };
            exports_4("Board", Board);
        }
    };
});
System.register("Board/index", ["Board/Board"], function (exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    function exportStar_2(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_5(exports);
    }
    return {
        setters: [
            function (Board_1_1) {
                exportStar_2(Board_1_1);
            }
        ],
        execute: function () {
        }
    };
});
System.register("Renderer/Renderer", [], function (exports_6, context_6) {
    "use strict";
    var Renderer;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [],
        execute: function () {
            Renderer = class Renderer {
                static init(root) {
                    return (state) => {
                        const table = document.createElement('table');
                        const rows = state.map((row, x) => {
                            const tr = document.createElement('tr');
                            const td = row.map((cell, y) => {
                                const td = document.createElement('td');
                                td.classList.add('cell');
                                td.classList.add(cell ? 'black' : 'white');
                                td.dataset['x'] = x.toString();
                                td.dataset['y'] = y.toString();
                                return td;
                            });
                            td.forEach(c => tr.appendChild(c));
                            return tr;
                        });
                        rows.forEach(tr => {
                            table.appendChild(tr);
                        });
                        rows.forEach(tr => {
                            table.appendChild(tr);
                        });
                        root.replaceChildren(table);
                        return table;
                    };
                }
                static update(table, state) {
                    state.forEach((row, x) => row.forEach((col, y) => {
                        const td = table.querySelector(`[data-x="${x}"][data-y="${y}"]`);
                        col ? td === null || td === void 0 ? void 0 : td.classList.replace('white', 'black')
                            : td === null || td === void 0 ? void 0 : td.classList.replace('black', 'white');
                    }));
                }
            };
            exports_6("Renderer", Renderer);
        }
    };
});
System.register("Renderer/index", ["Renderer/Renderer"], function (exports_7, context_7) {
    "use strict";
    var __moduleName = context_7 && context_7.id;
    function exportStar_3(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_7(exports);
    }
    return {
        setters: [
            function (Renderer_1_1) {
                exportStar_3(Renderer_1_1);
            }
        ],
        execute: function () {
        }
    };
});
System.register("Modal/Modal", [], function (exports_8, context_8) {
    "use strict";
    var Modal;
    var __moduleName = context_8 && context_8.id;
    return {
        setters: [],
        execute: function () {
            Modal = class Modal {
                static show(params) {
                    // todo refactor
                    const root = document.getElementById('root');
                    const modal = document.createElement('div');
                    modal.classList.add('modal');
                    const window = document.createElement('div');
                    window.classList.add('window');
                    const btn = document.createElement('button');
                    btn.innerText = 'Restart';
                    btn.addEventListener('click', params.onReset);
                    const title = document.createElement('span');
                    title.innerText = params.text;
                    window.appendChild(title);
                    window.appendChild(btn);
                    modal.appendChild(window);
                    root === null || root === void 0 ? void 0 : root.appendChild(modal);
                    return () => {
                        btn.removeEventListener('click', params.onReset);
                        modal.remove();
                    };
                }
            };
            exports_8("Modal", Modal);
        }
    };
});
System.register("Modal/index", ["Modal/Modal"], function (exports_9, context_9) {
    "use strict";
    var __moduleName = context_9 && context_9.id;
    function exportStar_4(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_9(exports);
    }
    return {
        setters: [
            function (Modal_1_1) {
                exportStar_4(Modal_1_1);
            }
        ],
        execute: function () {
        }
    };
});
System.register("Player/Player", ["Renderer/index", "Point/index", "Modal/index"], function (exports_10, context_10) {
    "use strict";
    var Renderer_2, Point_2, Modal_2, Player;
    var __moduleName = context_10 && context_10.id;
    return {
        setters: [
            function (Renderer_2_1) {
                Renderer_2 = Renderer_2_1;
            },
            function (Point_2_1) {
                Point_2 = Point_2_1;
            },
            function (Modal_2_1) {
                Modal_2 = Modal_2_1;
            }
        ],
        execute: function () {
            Player = class Player {
                static listen(board) {
                    const table = board.table;
                    const onClick = (e) => {
                        var _a, _b, _c, _d;
                        const td = e.target;
                        if (table) {
                            Renderer_2.Renderer.update(table, board.flipCell(new Point_2.Point({
                                x: (_b = Number((_a = td.dataset) === null || _a === void 0 ? void 0 : _a.x)) !== null && _b !== void 0 ? _b : 0,
                                y: (_d = Number((_c = td.dataset) === null || _c === void 0 ? void 0 : _c.y)) !== null && _d !== void 0 ? _d : 0
                            })));
                        }
                        if (board.check()) {
                            Modal_2.Modal.show({
                                text: 'win', onReset: () => {
                                    table === null || table === void 0 ? void 0 : table.removeEventListener('click', onClick);
                                    Player.listen(board.draw());
                                    table === null || table === void 0 ? void 0 : table.addEventListener('click', onClick);
                                }
                            });
                        }
                    };
                    table === null || table === void 0 ? void 0 : table.removeEventListener('click', onClick);
                    table === null || table === void 0 ? void 0 : table.addEventListener('click', onClick);
                }
            };
            exports_10("Player", Player);
        }
    };
});
System.register("Player/index", ["Player/Player"], function (exports_11, context_11) {
    "use strict";
    var __moduleName = context_11 && context_11.id;
    function exportStar_5(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default") exports[n] = m[n];
        }
        exports_11(exports);
    }
    return {
        setters: [
            function (Player_1_1) {
                exportStar_5(Player_1_1);
            }
        ],
        execute: function () {
        }
    };
});
System.register("index", ["Board/index", "Renderer/index", "Player/index"], function (exports_12, context_12) {
    "use strict";
    var Board_2, Renderer_3, Player_2, bootstrap, button, input;
    var __moduleName = context_12 && context_12.id;
    return {
        setters: [
            function (Board_2_1) {
                Board_2 = Board_2_1;
            },
            function (Renderer_3_1) {
                Renderer_3 = Renderer_3_1;
            },
            function (Player_2_1) {
                Player_2 = Player_2_1;
            }
        ],
        execute: function () {
            exports_12("bootstrap", bootstrap = (size) => {
                const root = document.getElementById('root');
                if (root !== null) {
                    const board = new Board_2.Board(size, Renderer_3.Renderer.init(root));
                    Player_2.Player.listen(board.draw());
                }
            });
            button = document.getElementById('reset');
            input = document.querySelector('input');
            bootstrap(Number((input === null || input === void 0 ? void 0 : input.value) || 3));
            button === null || button === void 0 ? void 0 : button.addEventListener('click', () => bootstrap(Number((input === null || input === void 0 ? void 0 : input.value) || 3)));
        }
    };
});
