<template>
    <section class="board-app-main">
        <div class="main-container">
            <!-- <unsplash></unsplash> -->
            <h1>Starred boards</h1>
            <h1>Recently viewed</h1>
            <div class="contact">
                <div class="folders">
                    <p>Boards</p>
                    <p>templates</p>
                    <p>Home</p>
                </div>
                <div class="folder-info">
                    <board-list v-if="boards" :boards="boards" />
                    <button
                        @click="openBoardEdit(), calcPosOfBox()"
                        ref="button"
                        type="button"
                    >Create new board</button>
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
            filterBy: null,
            isEdit: false,
            newBoard: boardService.getEmptyBoard(),
            setColor: '',
            pos: 0,
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
        saveNewBoard(newboard) {
            if (!newboard.title) return
            this.$store.dispatch({ type: 'saveBoard', board: newboard })
            this.newBoard = boardService.getEmptyBoard()
            this.isEdit = false
            console.log('newboard:',newboard);
            this.$router.push(`/board/${newboard._id}`)
        },
        calcPosOfBox() {
            this.pos = this.$refs['starred'].getBoundingClientRect()
        },
        calcPosOfBox() {
            this.pos = this.$refs['button'].getBoundingClientRect()

        }
    },
    components: {
        boardList,
        unsplash,
        createBoardModal
    },
}
</script>
