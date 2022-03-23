import {
    boardService
} from '../../services/board-service.js'

export default {
    state: {
        boards: null,
        filterBy: null,
    },
    getters: {
        boards(state) {
            return state.boards
        },
    },
    mutations: {
        setBoards(state, {
            boards
        }) {
            state.boards = boards;
        },
        removeBoard(state, {id}) {
            const idx = state.boards.findIndex((board) => board._id === id)
            state.boards.splice(idx, 1)
        },
        saveBoard(state, {board}) {
            const idx = state.boards.findIndex((currBoard) => currBoard._id === board._id)
            if (idx !== -1) state.boards.splice(idx, 1, board)
            else state.boards.push(board)
        },
        setFilter(state, {filterBy}) {
            state.filterBy = filterBy;
        },
    },
    actions: {
        async loadToys({
            commit,
            state
        }) {
            try {
                let toys = await toyService.query(state.filterBy)
                commit({
                    type: 'setToys',
                    toys
                });

            } catch (err) {
                console.log('err');
            }
        },
        async removeToy({
            commit
        }, {
            id
        }) {
            try {
                await toyService.remove(id)
                commit({
                    type: 'removeToy',
                    id
                });
            } catch (err) {
                console.log('err');
            }
        },
        async saveToy({
            commit
        }, {
            toy
        }) {
            try {
                await toyService.save(toy)
                console.log('res', toy);
                commit({
                    type: 'saveToy',
                    toy
                });
            } catch (err) {
                console.log('err');
            }
        },
        filter({
            commit,
            dispatch
        }, {
            filterBy
        }) {
            // toyService.query(filterBy).then((toys) => {
            //   commit({type: 'setToys', toys});
            // });
            commit({
                type: 'setFilter',
                filterBy
            });
            dispatch({
                type: 'loadToys'
            });
        },
    },
}