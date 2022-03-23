<template>
    <section class="board-app-main">
        <div class="main-container">
            <div class="folders">
                <p>Boards</p>
            </div>
            <h1>YOUR WORKSPACES</h1>
            <board-list v-if="boards" :boards="boards" />

            <button @click="openBoardEdit()" type="button">Create new board</button>

            <form v-if="isEdit === true" class="create-board-modal">
                <h1>Create board</h1>
                <label for>Title</label>
                <input type="text" v-model="newBoard.title" />
                <button @click="saveNewBoard">Create</button>
                <button class="edit-close-btn" @click="closeBoardEdit">X</button>
            </form>
        </div>
    </section>
</template>

<script>
import { boardService } from '../services/board-service'
import boardList from '../components/board-list.vue'

export default {
    name: 'board-app',
    data() {
        return {
            filterBy: null,
            isEdit: false,
            newBoard: boardService.getEmptyBoard(),
        }
    },
    computed: {
        boards() {
            return this.$store.getters.boards
        },
    },
    methods: {
        loadBoards() {
            boardService.query().then((Boards) => (this.Boards = Boards))
        },
        setFilter(filterBy) {
            this.$store.dispatch({ type: 'filter', filterBy });
        },
        openBoardEdit() {
            this.isEdit = true;
        },
        closeBoardEdit() {
            this.isEdit = false;
        },
        saveNewBoard() {
            this.$store.dispatch({ type: 'saveBoard', board: this.newBoard })
            this.newBoard = boardService.getEmptyBoard()
            this.isEdit = false
        },
    },
    components: {
        boardList,
    },
}
</script>