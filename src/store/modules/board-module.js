import { boardService } from '../../services/board-service.js'

export default {
    state: {
        boards: null,
        selectedBoard: null,
        recentlyBoards: null,
        filterBy: null,
    },
    getters: {
        boards(state) {
            return state.boards
        },
        board(state) {
            return state.selectedBoard
        },
        starredBoards(state) {
            return state.boards.filter(board => board.isStarred)
        },
        recentlyBoards(state) {
            const recentlyBoards = JSON.parse(JSON.stringify(state.boards))
            return recentlyBoards.sort((a, b) => b.lastTimeWatched - a.lastTimeWatched);
        },
        templates(state) {
            return state.boards.filter(board => board.isTemplate)
        },
        categoryDesign(state) {
            return state.boards.filter(board => board.category === 'design')
        },
        categoryEducation(state) {
            return state.boards.filter(board => board.category === 'education')
        },
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
                board.lastTimeWatched = Date.now()
                console.log(board)
                commit({ type: 'saveBoard', board })
                commit({ type: 'setBoard', board })
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
                console.log('board._id:',board._id);
                if (board._id) commit({ type: 'setBoard', board });
                const savedBoard = await boardService.save(board)
                console.log('savedBoard:',savedBoard);
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