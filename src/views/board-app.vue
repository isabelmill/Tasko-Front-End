<template>
    <section class="board-app-main">
        <div class="main-container">
            <!-- <unsplash></unsplash> -->
            <h1>Starred boards</h1>
            <h1>Recently viewed</h1>
            <div class="contact">
                <div class="folders">
                    <p>
                        <span class="icon-sm icon-board"></span>
                        Boards
                    </p>
                    <p>
                        <span class="icon-sm icon-template"></span>
                        templates
                    </p>
                    <p>
                        <span class="icon-sm icon-home"></span>
                        Home
                    </p>
                </div>

                <ul>
                    <li
                        @click="setFilter('inbox')"
                        class="inbox-folder"
                        :class="changeColor('inbox')"
                    >
                        <div>
                            <img :src="inboxRed" />
                        </div>Inbox
                        <small>{{ unreadMails.length }}</small>
                    </li>
                    <li @click="setFilter('starred')" :class="changeColor('starred')">
                        <div>
                            <img :src="starredRed" />
                        </div>Starred
                    </li>
                    <li @click="setFilter('important')" :class="changeColor('important')">
                        <div>
                            <img :src="importantRed" />
                        </div>Important
                    </li>
                    <li @click="setFilter('sent')" :class="changeColor('sent')">
                        <div>
                            <img :src="sentRed" />
                        </div>Sent
                    </li>
                    <li @click="setFilter('trash')" :class="changeColor('trash')">
                        <div>
                            <img :src="trashRed" />
                        </div>Trash
                    </li>
                </ul>

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
            console.log('newboard:', newboard);
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
