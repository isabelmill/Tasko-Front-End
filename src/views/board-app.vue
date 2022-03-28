<template>
    <section class="board-app-main">
        <div class="main-container">
            <div class="contact">
                <div>
                    <ul class="folders">
                        <li @click="setFolder('boards')" :class="setColors('boards')">
                            <span class="icon-sm icon-board"></span>
                            <p>Boards</p>
                        </li>
                        <li @click="setFolder('templates')" :class="setColors('templates')">
                            <span class="icon-sm icon-template"></span>
                            <p>Templates</p>
                        </li>
                        <li @click="setFolder('home')" :class="setColors('home')">
                            <span class="icon-sm icon-home"></span>
                            <p>Home</p>
                        </li>
                    </ul>
                </div>

                <div class="folder-info">
                    <div v-if="isFolder.boards" class="boards-info">
                        <div class="border-list">
                            <div class="header">
                                <span class="icon-lg icon-star-boards"></span>
                                <p>Starred boards</p>
                            </div>
                            <board-list
                                v-if="boards"
                                :boards="boards"
                                @updateBoardLastWatched="upateBoard"
                            />
                        </div>
                        <div class="border-list">
                            <div class="header">
                                <span class="icon-lg icon-clock-boards"></span>
                                <p>Recently viewed</p>
                            </div>
                            <board-list
                                v-if="boards"
                                :boards="boards"
                                @updateBoardLastWatched="upateBoard"
                            />
                        </div>
                        <button
                            class="create-btn"
                            @click="openBoardEdit(), calcPosOfBox()"
                            ref="button"
                            type="button"
                        >
                            <p>Create new board</p>
                        </button>
                        <create-board-modal
                            v-if="isEdit"
                            v-clickOutside="closeBoardEdit"
                            @close="closeBoardEdit"
                            @add="saveNewBoard"
                            :style="{ top: pos.top + 'px', left: '830' + 'px' }"
                            :newBoard="newBoard"
                        ></create-board-modal>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { boardService } from '../services/board-service'
import boardList from '../components/board-list.vue'
import unsplash from '../components/unsplash.vue'
import createBoardModal from '../components/create-board-modal.vue'

export default {
    name: 'board-app',
    data() {
        return {
            preFolder: '',
            currFolder: '',
            isFolder: {
                boards: false,
                templates: false,
                home: false,
            },
            filterBy: null,
            isEdit: false,
            newBoard: boardService.getEmptyBoard(),
            setColor: '',
            pos: 0,
        }
    },
    created() {
        this.setFolder('boards')
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
        saveNewBoard(board) {
            if (!board.title) return
            this.$store.dispatch({ type: 'saveBoard', board: board })
            this.isEdit = false
            this.newBoard = boardService.getEmptyBoard()
        },
        calcPosOfBox() {
            this.pos = this.$refs['starred'].getBoundingClientRect()
        },
        calcPosOfBox() {
            this.pos = this.$refs['button'].getBoundingClientRect()
        },
        setFolder(folder) {
            this.currFolder = folder
            this.isFolder[this.preFolder] = !this.isFolder[this.preFolder]
            this.preFolder = folder
            this.isFolder[folder] = !this.isFolder[folder]
        },
        setColors(folder) {
            return this.isFolder[folder] ? 'selected-folder' : 'folder'
        },
        upateBoard(board) {
            this.$store.dispatch({ type: 'saveBoard', board: board })
        }
    },
    computed: {
        boards() {
            return this.$store.getters.boards
        },
    },
    components: {
        boardList,
        unsplash,
        createBoardModal
    },
}
</script>
