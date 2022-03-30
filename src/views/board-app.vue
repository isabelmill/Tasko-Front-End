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
                            <board-list v-if="boards" :boards="starredBoards" />
                        </div>

                        <div class="border-list">
                            <div class="header">
                                <span class="icon-lg icon-clock-boards"></span>
                                <p>Recently viewed</p>
                            </div>
                            <board-list v-if="boards" :boards="recentlyBoards" />
                        </div>
                        <button
                            class="create-btn"
                            @click="openBoardEdit(), calcPosOfBox('button')"
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
                            :style="{  'left': '730' + 'px' , 'bottom' : '0' }"
                            :newBoard="newBoard"
                        ></create-board-modal>
                         <!-- :style="{ 'top': pos.top + 'px', 'left': '830' + 'px', 'bottom': '0' }" -->
                    </div>
                    <div v-if="isFolder.templates" class="boards-info">
                        <div class="border-list">
                            <div class="header-templates">
                                <img
                                    class="category-icon"
                                    src="../assets/svg/business-templates.svg"
                                    alt="business-icon"
                                />
                                <p class="category-title">Business</p>
                            </div>
                            <board-list v-if="boards" :boards="templates" />
                        </div>

                        <div class="border-list">
                            <div class="header-templates">
                                <img
                                    class="category-icon"
                                    src="../assets/svg/design-templates.svg"
                                    alt="business-icon"
                                />
                                <p class="category-title">Design</p>
                            </div>
                            <board-list v-if="boards" :boards="categoryDesign" />
                        </div>

                        <div class="border-list">
                            <div class="header-templates">
                                <img
                                    class="category-icon"
                                    src="../assets/svg/education-templates.svg"
                                    alt="business-icon"
                                />
                                <p class="category-title">Education</p>
                            </div>
                            <board-list v-if="boards" :boards="categoryEducation" />
                        </div>

                        <div class="border-list">
                            <div class="header-templates">
                                <img
                                    class="category-icon"
                                    src="../assets/svg/engineering-templates.svg"
                                    alt="business-icon"
                                />
                                <p class="category-title">Engineering</p>
                            </div>
                            <board-list v-if="boards" :boards="templates" />
                        </div>

                        <div class="border-list">
                            <div class="header-templates">
                                <img
                                    class="category-icon"
                                    src="../assets/svg/marketing-templates.svg"
                                    alt="business-icon"
                                />
                                <p class="category-title">Marketing</p>
                            </div>
                            <board-list v-if="boards" :boards="templates" />
                        </div>

                        <div class="border-list">
                            <div class="header-templates">
                                <img
                                    class="category-icon"
                                    src="../assets/svg/project-management-templates.svg"
                                    alt="business-icon"
                                />
                                <p class="category-title">Project management</p>
                            </div>
                            <board-list v-if="boards" :boards="templates" />
                        </div>
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
            newActivity: boardService.getEmptyActivity(),
            setColor: '',
            pos: 0,
        }
    },
    created() {
        this.setFolder('boards')
    },
    methods: {
        calcPosOfBox(ref) {
            this.pos = this.$refs[ref].getBoundingClientRect()
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
            if (this.loggedinUser) {
                board.createdBy = this.loggedinUser
                this.newActivity.byMember = this.loggedinUser
            }
            this.newActivity.txt = 'created this board'
            board.activities.push(this.newActivity)
            this.$store.dispatch({ type: 'saveBoard', board: board })
            this.isEdit = false
            this.newBoard = boardService.getEmptyBoard()
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
        updateBoard(board) {
            this.$store.dispatch({ type: 'saveBoard', board: board })
        },
    },
    computed: {
        loggedinUser() {
            return this.$store.getters.loggedinUser
        },
        boards() {
            return this.$store.getters.boards
        },
        starredBoards() {
            return this.$store.getters.starredBoards
        },
        recentlyBoards() {
            return this.$store.getters.recentlyBoards
        },
        templates() {
            return this.$store.getters.templates
        },
        categoryDesign() {
            return this.$store.getters.categoryDesign
        },
        categoryEducation() {
            return this.$store.getters.categoryEducation
        },
    },

    components: {
        boardList,
        unsplash,
        createBoardModal
    },
}
</script>
