import {boardService} from '../../services/board-service.js'

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
        setBoards(state, {boards}) {
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
        async loadBoards({commit,state}) {
            try {
                let boards = await boardService.query(state.filterBy)
                commit({type: 'setBoards',boards});
            } catch (err) {
                console.log('err');
            }
        },
        async removeBoard({commit}, {id}) {
            try {
                await boardService.remove(id)
                commit({type: 'removeBoard',id});
            } catch (err) {
                console.log('err');
            }
        },
        async saveBoard({commit}, {board}) {
            try {
                await boardService.save(board)
                commit({type: 'saveBoard',board});
            } catch (err) {
                console.log('err');
            }
        },
        filter({commit,dispatch}, {filterBy}) {
            commit({type: 'setFilter',filterBy});
            dispatch({
                type: 'loadBoards'
            });
        },
    },
}