import { boardService } from '../../services/board-service.js'

export default {
    state: {
        boards: null,
        selectedBoard: null,
        filterBy: null,
    },
    getters: {
        boards(state) {
            return state.boards
        },
        board(state) {
            return state.selectedBoard
        },
        // starredBoards(state) {
        //     return state.boards.filter(board => {
        //         board.isStarred
        //     })
        // }
    },
    mutations: {
        setBoards(state, { boards }) {
            state.boards = boards;
        },
        setBoard(state, { board }) {
            state.selectedBoard = board;
        },
        removeBoard(state, { id }) {
            const idx = state.boards.findIndex((board) => board._id === id)
            state.boards.splice(idx, 1)
        },
        saveBoard(state, { board }) {
            const idx = state.boards.findIndex((currBoard) => currBoard._id === board._id)
            if (idx !== -1) state.boards.splice(idx, 1, board)
            else state.boards.push(board)
        },
        setFilter(state, { filterBy }) {
            state.filterBy = filterBy;
        },
    },
    actions: {
        async loadBoards({ commit, state }) {
            try {
                const boards = await boardService.query(state.filterBy)
                commit({ type: 'setBoards', boards });
            } catch (err) {
                console.log('err');
            }
        },
        async loadBoardById({ commit }, { newId }) {
            try {
                const board = await boardService.getById(newId)
                commit({ type: 'setBoard', board });
            } catch (err) {
                console.log('err!!');
            }
        },
        async removeBoard({ commit }, { id }) {
            try {
                await boardService.remove(id)
                commit({ type: 'removeBoard', id });
            } catch (err) {
                console.log('err!!');
            }
        },
        async saveBoard({ commit }, { board }) {
            try {
                if (board._id) commit({ type: 'setBoard', board });
                const savedBoard = await boardService.save(board)
                // console.log(savedBoard);
                commit({ type: 'saveBoard', board: savedBoard });
                // commit({ type: 'setBoard', board: newBoard });
            } catch (err) {
                console.log('sorry user connot do that!!!');
            }
        },
        filter({ commit, dispatch }, { filterBy }) {
            commit({ type: 'setFilter', filterBy });
            dispatch({
                type: 'loadBoards'
            });
        },
    },
}