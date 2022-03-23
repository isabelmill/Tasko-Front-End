<template>
    <section class="board-app-main">
        <div class="main-container">
            <h1>YOUR WORKSPACES</h1>
            <div class="contact">
                <div class="folders">
                    <p>Boards</p>
                    <p>templates</p>
                    <p>Home</p>
                </div>
                <div class="folder-info">
                    <board-list v-if="boards" :boards="boards" />

                    <button @click="openBoardEdit()" type="button">Create new board</button>

                    <div class="create-board-modal">
                        <form v-if="isEdit === true">
                            <h1>Create board</h1>
                            <div class="create-board-background-preview">
                                <img
                                    src="https://a.trellocdn.com/prgb/dist/images/board-preview-skeleton.14cda5dc635d1f13bc48.svg"
                                    alt
                                />
                            </div>
                            <div class="create-board-background-color">
                                <h1>Hey</h1>
                                <div class="blue">Hey</div>
                            </div>
                            <label for>Board title</label>
                            <input type="text" v-model="newBoard.title" />
                            <button @click="saveNewBoard">Create</button>
                            <button class="edit-close-btn" @click="closeBoardEdit">X</button>
                        </form>
                    </div>
                </div>
            </div>
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