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
                                v-if="starredBoards"
                                :boards="starredBoards"
                                @duplicateTemplate="saveNewBoard"
                                @updateRecentlyWatched="addLastTimeWatched"
                                @updateStarred="updateBoard"
                            />
                        </div>

                        <div class="border-list">
                            <div class="header">
                                <span class="icon-lg icon-clock-boards"></span>
                                <p>Recently viewed</p>
                            </div>
                            <board-list
                                v-if="recentlyBoards"
                                :boards="recentlyBoards"
                                @duplicateTemplate="saveNewBoard"
                                @updateRecentlyWatched="addLastTimeWatched"
                                @updateStarred="updateBoard"
                            />
                        </div>

                        <div class="border-list">
                            <div class="header">
                                <p>YOUR WORKSPACES</p>
                            </div>
                            <board-list
                                v-if="boards"
                                :boards="boards"
                                @duplicateTemplate="saveNewBoard"
                                @updateRecentlyWatched="addLastTimeWatched"
                                @updateStarred="updateBoard"
                            />
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
                            :style="{ 'right': setRightPos(pos.right) + 'px', 'bottom': '0' }"
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
                            <board-list
                                v-if="boards"
                                :boards="categoryBusiness"
                                @duplicateTemplate="saveNewBoard"
                                @updateRecentlyWatched="addLastTimeWatched"
                            />
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
                            <board-list
                                v-if="boards"
                                :boards="categoryDesign"
                                @duplicateTemplate="saveNewBoard"
                                @updateRecentlyWatched="addLastTimeWatched"
                            />
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
                            <board-list
                                v-if="boards"
                                :boards="categoryEducation"
                                @duplicateTemplate="saveNewBoard"
                                @updateRecentlyWatched="addLastTimeWatched"
                            />
                        </div>

                        <div class="border-list">
                            <div class="header-templates">
                                <img
                                    class="category-icon"
                                    src="../assets/svg/project-management-templates.svg"
                                    alt="business-icon"
                                />
                                <p class="category-title">Life style</p>
                            </div>
                            <board-list
                                v-if="boards"
                                :boards="categoryLifestyle"
                                @duplicateTemplate="saveNewBoard"
                                @updateRecentlyWatched="addLastTimeWatched"
                            />
                        </div>
                        <!-- 
                        <div class="border-list">
                            <div class="header-templates">
                                <img
                                    class="category-icon"
                                    src="../assets/svg/engineering-templates.svg"
                                    alt="business-icon"
                                />
                                <p class="category-title">Engineering</p>
                            </div>
                            <board-list
                                v-if="boards"
                                :boards="templates"
                                @updateRecentlyWatched="addLastTimeWatched"
                            />
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
                            <board-list
                                v-if="boards"
                                :boards="templates"
                                @updateRecentlyWatched="addLastTimeWatched"
                            />
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
                            <board-list
                                v-if="boards"
                                :boards="templates"
                                @updateRecentlyWatched="addLastTimeWatched"
                            />
                        </div>-->
                    </div>
                    <div v-if="isFolder.home" class="home-info">
                        <div class="activities">
                            <div class="side-bar-menu-activity-container">
                                <div class="activity-header flex">
                                    <span class="icon-sm icon-activity-home"></span>
                                    <h1>Activity</h1>
                                </div>
                                <div
                                    class="activities-render flex"
                                    v-for=" activity in allActivities"
                                    :key="activity"
                                >
                                    <div
                                        class="member-avatar-in-activity"
                                    >{{ setMemberLetters(activity.byMember.fullname) }}</div>
                                    <div class="activity-info">
                                        <div class="activities-info-txt flex">
                                            <p>
                                                <span>{{ activity.byMember.username }}</span>
                                                {{ activity.txt }}
                                            </p>
                                        </div>
                                        <div class="activity-timestamp">
                                            <!-- {{moment(activity.createdAt).startOf('hour').fromNow()}} -->
                                            {{ generateTime(activity.createdAt) }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="boards">
                            <div class="starred-boards">
                                <div class="starred-boards-header">
                                    <span class="icon-sm icon-star-home"></span>
                                    <p>Starred</p>
                                </div>
                                <div class="modal-starred-boards-list">
                                    <div class="modal-starred-board-list">
                                        <div
                                            class="boards-render-modal-starred"
                                            @click="goToDetails(board)"
                                            v-for="board in starredBoards"
                                            :board="board"
                                            :key="board"
                                        >
                                            <div
                                                class="board-background-starred-modal"
                                                :style="board.background ? { 'backgroundColor': board.background } : { 'background-image': `url(${board.backgroundPhoto})` }"
                                            ></div>

                                            <div class="modal-starred-board">{{ board.title }}</div>
                                            <span class="icon-sm icon-star-home-board"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <br />
                            <div class="starred-boards">
                                <div class="starred-boards-header">
                                    <span class="icon-sm icon-clock-home"></span>
                                    <p>Recently viewed</p>
                                </div>
                                <div class="modal-starred-boards-list">
                                    <div class="modal-starred-board-list">
                                        <div
                                            class="boards-render-modal-starred"
                                            @click="goToDetails(board)"
                                            v-for="board in recentlyBoards"
                                            :board="board"
                                            :key="board"
                                        >
                                            <div
                                                class="board-background-starred-modal"
                                                :style="board.background ? { 'backgroundColor': board.background } : { 'background-image': `url(${board.backgroundPhoto})` }"
                                            ></div>

                                            <div class="modal-starred-board">{{ board.title }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
import moment from 'moment';

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
            console.log('this.pos:',this.pos.right);
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
                board.members.push(this.loggedinUser)
                this.newActivity.byMember = this.loggedinUser
            }
            board.isTemplate = false
            this.newActivity.txt = 'created this board'
            board.activities.push(this.newActivity)
            this.$store.dispatch({ type: 'saveBoard', board: board })
            this.isEdit = false
            console.log('board in save new board:', board);
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
        addLastTimeWatched(board) {
            this.$store.dispatch({ type: 'saveBoard', board: board })
        },
        goToDetails(board) {
            this.$emit("close");
            this.$router.push(`/board/${board._id}`)
        },
        setMemberLetters(fullname) {
            const firstLetters = fullname.split(' ').map(word => word[0]).join('');
            return firstLetters.toUpperCase()
        },
        generateTime(time) {
            const dateTimeAgo = moment(time).fromNow();
            return dateTimeAgo
        },
        setRightPos(rightPos) {
            console.log('screen.height + "px"', window.innerWidth)
            if ((window.innerWidth - rightPos) < 390) {
                console.log('true')
                const right = window.innerWidth - 390
                console.log('bottom', right)
                return right
            } else {
                return rightPos + 8
            }
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
        categoryBusiness() {
            return this.$store.getters.categoryBusiness
        },
        categoryDesign() {
            return this.$store.getters.categoryDesign
        },
        categoryEducation() {
            return this.$store.getters.categoryEducation
        },
        categoryLifestyle() {
            return this.$store.getters.categoryLifestyle
        },
        allActivities() {
            return this.$store.getters.allActivities
        },
    },

    components: {
        boardList,
        unsplash,
        createBoardModal
    },
}
</script>
