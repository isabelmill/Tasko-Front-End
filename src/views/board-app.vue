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
                            <div class="create-board-modal-header">
                                <div class="create-board-modal-header-items">
                                    <h1>Create board</h1>
                                    <button class="edit-close-btn" @click="closeBoardEdit">X</button>
                                </div>
                            </div>

                            <div class="create-board-background-preview" :style="{backgroundColor:setColor}">
                                <img
                                    src="https://a.trellocdn.com/prgb/dist/images/board-preview-skeleton.14cda5dc635d1f13bc48.svg"
                                    alt
                                />
                            </div>
                            <h1>Background</h1>
                            <div class="create-board-background-color">
                                <div @click="setBoardColor('#0079BF')" class="blue color-pref"></div>
                                <div @click="setBoardColor('#D29034')" class="yellow color-pref"></div>
                                <div @click="setBoardColor('#519839')" class="green color-pref"></div>
                                <div @click="setBoardColor('#B04632')" class="red color-pref"></div>
                                <div @click="setBoardColor('#89609E')" class="purple color-pref"></div>
                                <div class="more color-pref">...</div>
                            </div>
                            <label for>Board title</label>
                            <input type="text" v-model="newBoard.title" />
                            <button @click="saveNewBoard">Create</button>
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
            setColor: '',
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
        setBoardColor(color) {
            this.setColor = color
            this.newBoard.background = color
        },
    },
    components: {
        boardList,
    },
}
</script>