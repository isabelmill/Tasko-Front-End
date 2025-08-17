<template>
  <section class="board-app-main">
    <div class="main-container">
      <div class="contact">
        <!-- Sidebar -->
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

        <!-- Main content -->
        <div class="folder-info">
          <!-- BOARDS -->
          <div v-if="isFolder.boards">
            <BoardSection
              v-if="starredBoards && starredBoards.length"
              :title="'Starred boards'"
              icon="icon-star-boards"
              :boards="starredBoards"
              :showStar="true"
              @goToDetails="goToDetails"
            />

            <BoardSection
              v-if="boards && boards.length"
              :title="'Your Workspaces'"
              icon=""
              :boards="boards"
              @goToDetails="goToDetails"
            />

            <button
              class="create-btn-boards"
              @click="openBoardEdit(); calcPosOfBox('button')"
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
              class="create-board-modal-board-app"
              :style="{ right: setRightPos(pos.right) + 'px', bottom: '0' }"
              :newBoard="newBoard"
            />
          </div>

          <!-- TEMPLATES -->
          <div v-if="isFolder.templates">
            <BoardSection
              v-if="categoryBusiness && categoryBusiness.length"
              title="Business"
              icon=""
              :boards="categoryBusiness"
              @goToDetails="goToDetails"
            />
            <BoardSection
              v-if="categoryDesign && categoryDesign.length"
              title="Design"
              icon=""
              :boards="categoryDesign"
              @goToDetails="goToDetails"
            />
            <BoardSection
              v-if="categoryEducation && categoryEducation.length"
              title="Education"
              icon=""
              :boards="categoryEducation"
              @goToDetails="goToDetails"
            />
            <BoardSection
              v-if="categoryLifestyle && categoryLifestyle.length"
              title="Lifestyle"
              icon=""
              :boards="categoryLifestyle"
              @goToDetails="goToDetails"
            />
          </div>

          <!-- HOME -->
          <div v-if="isFolder.home">
            <div class="activities">
              <div class="side-bar-menu-activity-container">
                <div class="activity-header flex">
                  <span class="icon-sm icon-activity-home"></span>
                  <h1>Activity</h1>
                </div>

                <div
                  class="activities-render flex"
                  v-for="activity in allActivities"
                  :key="activity._id || activity.createdAt"
                >
                  <img
                    v-if="activity.byMember.imgUrl"
                    class="member-avatar"
                    :src="activity.byMember.imgUrl"
                    alt
                  />
                  <div v-else class="member-avatar-in-activity">
                    {{ setMemberLetters(activity.byMember.fullname) }}
                  </div>

                  <div class="activity-info">
                    <div class="activities-info-txt flex">
                      <p>
                        <span>{{ activity.byMember.username }}</span>
                        {{ activity.txt }}
                      </p>
                    </div>
                    <div class="activity-timestamp">
                      {{ generateTime(activity.createdAt) }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <BoardSection
              v-if="starredBoards && starredBoards.length"
              :boards="starredBoards"
              :showStar="true"
              title="Starred"
              icon="icon-star-home"
              @goToDetails="goToDetails"
            />
            <BoardSection
              v-if="recentlyBoards && recentlyBoards.length"
              :boards="recentlyBoards"
              title="Recently viewed"
              icon="icon-clock-home"
              @goToDetails="goToDetails"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { boardService } from '../services/board.service'
import BoardSection from '../views/board-section.vue'
import createBoardModal from '../components/create-board-modal.vue'
import moment from 'moment'

export default {
  name: 'board-app',
  components: { BoardSection, createBoardModal },
  data() {
    return {
      preFolder: '',
      currFolder: '',
      isFolder: { boards: false, templates: false, home: false },
      isEdit: false,
      newBoard: boardService.getEmptyBoard(),
      newActivity: boardService.getEmptyActivity(),
      pos: 0,
    }
  },
  created() {
    this.setFolder('boards')
  },
  methods: {
    setFolder(folder) {
      this.currFolder = folder
      if (this.preFolder) this.isFolder[this.preFolder] = false
      this.preFolder = folder
      this.isFolder[folder] = true
    },
    setColors(folder) {
      return this.isFolder[folder] ? 'selected-folder' : 'folder'
    },
    calcPosOfBox(ref) {
      this.pos = this.$refs[ref].getBoundingClientRect()
    },
    openBoardEdit() { this.isEdit = true },
    closeBoardEdit() { this.isEdit = false },
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
      this.$store.dispatch({ type: 'saveBoard', board })
      this.isEdit = false
      this.newBoard = boardService.getEmptyBoard()
    },
    goToDetails(board) {
      this.$router.push(`/board/${board._id}`)
    },
    setMemberLetters(fullname) {
      return fullname.split(' ').map(w => w[0]).join('').toUpperCase()
    },
    generateTime(time) {
      return moment(time).fromNow()
    },
    setRightPos(rightPos) {
      return (window.innerWidth - rightPos) < 390 ? window.innerWidth - 390 : rightPos + 8
    },
  },
  computed: {
    loggedinUser() { return this.$store.getters.loggedinUser },
    boards() {
      if (!this.$store.getters.boards || !this.loggedinUser) return []
      return this.$store.getters.boards
        .filter(b => b.members.some(m => m._id === this.loggedinUser._id) && !b.isTemplate)
    },
    starredBoards() {
      if (!this.$store.getters.boards || !this.loggedinUser) return []
      return this.$store.getters.boards
        .filter(b => b.isStarred && b.members.some(m => m._id === this.loggedinUser._id))
    },
    recentlyBoards() {
      if (!this.$store.getters.boards || !this.loggedinUser) return []
      return this.$store.getters.boards
        .filter(b => !b.isTemplate && b.members.some(m => m._id === this.loggedinUser._id))
        .sort((a, b) => b.lastTimeWatched - a.lastTimeWatched)
    },
    categoryBusiness() { return this.$store.getters.categoryBusiness },
    categoryDesign() { return this.$store.getters.categoryDesign },
    categoryEducation() { return this.$store.getters.categoryEducation },
    categoryLifestyle() { return this.$store.getters.categoryLifestyle },
    allActivities() { return this.$store.getters.allActivities },
  }
}
</script>
