<template>
  <section class="app-header-main" ref="appheader">
    <div class="app-header">
      <!-- :style="board && isOnBoard ? { 'background-color': lightenDarkenColor(board.background, -20) } : null" -->
      <router-link to="/board" class="logo-box">
        <span class="logo-img"></span>
        <p class="logo-txt">Tasko</p>
      </router-link>
      <a @click="openRecentBoardsModal(), calcPosOfBox()" class="link recent" to="/" ref="recent">
        Recent
        <svg width="16" height="16" role="presentation" focusable="false" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
            fill="currentColor" />
        </svg>
      </a>
      <recent-boards-modal v-if="openRecentModal && boards" :boards="boards"
        :style="{ top: '48' + 'px', left: posRecent.left + 'px' }" v-clickOutside="closeRecentModal"
        @close="closeRecentModal"></recent-boards-modal>
      <a @click="openStarredBoardsModal(), calcPosOfBox()" ref="starred" class="link starred">
        Starred
        <svg width="16" height="16" role="presentation" focusable="false" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
            fill="currentColor" />
        </svg>
      </a>
      <starred-boards-modal v-if="openStarredModal && boards" :boards="boards"
        :style="{ top: '48' + 'px', left: pos.left + 'px' }" v-clickOutside="closeEditMode" @close="closeEditMode">
      </starred-boards-modal>

      <a class="link templates" to="/" @click="openTemplateModal(), calcPosOfBox()" ref="template">
        Templates
        <svg width="16" height="16" role="presentation" focusable="false" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
            fill="currentColor" />
        </svg>
      </a>

      <template-modal v-if="openTemplate && boards" :boards="boards"
        :style="{ top: '48' + 'px', left: posTemplate.left + 'px' }" v-clickOutside="closeTemplate"
        @close="closeTemplate" @duplicateTemplate="saveNewBoard"></template-modal>

      <a ref="create" class="link create" to="/" @click="openCreateModal(), calcPosOfBox()" >
        Create
        <svg  width="16" height="16" role="presentation" focusable="false" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
            fill="currentColor" />
        </svg>
      </a>

      <a ref="more" class="link more" to="/" @click="openMoreModal(), calcPosOfBox()"> More
        <svg width="16" height="16" role="presentation" focusable="false" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
            fill="currentColor" />
        </svg>
      </a>

      <more-modal class="more-modal" v-if="openMore" :boards="boards" :style="{ top: '48' + 'px', left: posMore.left + 'px' }"  v-clickOutside="closeMoreModal" @close="closeMoreModal"></more-modal>

      <create-board-modal class="top-create-board" v-if="openCreate" :style="{ top: '48' + 'px', left: posCreate.left + 'px' }"
        v-clickOutside="closeCreateModal" :newBoard="newBoard" @add="saveNewBoard" @close="closeCreateModal">
      </create-board-modal>
      <!-- <button class="icon-btn"><font-awesome-icon icon="fa-regular fa-plus-large" /></button> -->
      <button class="icon-btn btn-plus" to="/" @click="openCreateModal(), calcPosOfBox()" ref="create2">
        <span class="icon-md icon-add-light"></span>
      </button>

    </div>

    <span class="search-nav">
      <search @setFilter="onSetFilter" @click="openSearchModal()" />
      <span class="span-icon info">
        <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
            fill="currentColor" />
          <path
            d="M11 11C11 10.4477 11.4477 10 12 10C12.5523 10 13 10.4477 13 11V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V11Z"
            fill="currentColor" />
          <path
            d="M13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8Z"
            fill="currentColor" />
        </svg>
      </span>
      <span class="span-icon">
        <svg width="24" height="24" role="presentation" focusable="false" viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M12 2C11.4477 2 11 2.44772 11 3V3.078C10.2728 3.19668 9.65318 3.44603 9.1328 3.79295C8.39456 4.28511 7.91489 4.93416 7.60557 5.55279C7.29822 6.1675 7.14952 6.77011 7.07611 7.2106C7.039 7.43322 7.02007 7.62092 7.01035 7.75688C7.00549 7.82503 7.0029 7.88067 7.00153 7.92176C7.00085 7.94232 7.00046 7.95929 7.00025 7.9724L7.00005 7.98916L7.00001 7.99533L7 7.99786L7 7.99898C7 7.9995 7 8 8 8H7V11.723L4.14251 16.4855C3.95715 16.7944 3.95229 17.1792 4.1298 17.4927C4.30731 17.8062 4.63973 18 5 18H19C19.3603 18 19.6927 17.8062 19.8702 17.4927C20.0477 17.1792 20.0429 16.7944 19.8575 16.4855L17 11.723V8H16C17 8 17 7.9995 17 7.99898L17 7.99786L17 7.99533L17 7.98916L16.9997 7.9724C16.9995 7.95929 16.9992 7.94232 16.9985 7.92176C16.9971 7.88067 16.9945 7.82503 16.9896 7.75688C16.9799 7.62092 16.961 7.43322 16.9239 7.2106C16.8505 6.77011 16.7018 6.1675 16.3944 5.55279C16.0851 4.93416 15.6054 4.28511 14.8672 3.79295C14.3468 3.44603 13.7272 3.19668 13 3.078V3C13 2.44772 12.5523 2 12 2ZM9.00042 7.98839L9 8.00435V12C9 12.1812 8.95074 12.3591 8.85749 12.5145L6.76619 16H17.2338L15.1425 12.5145C15.0493 12.3591 15 12.1812 15 12V8.00436L14.9996 7.98839C14.999 7.97089 14.9977 7.9406 14.9947 7.89937C14.9888 7.81658 14.9765 7.69178 14.9511 7.5394C14.8995 7.22989 14.7982 6.8325 14.6056 6.44721C14.4149 6.06584 14.1446 5.71489 13.7578 5.45705C13.3773 5.20338 12.825 5 12 5C11.175 5 10.6227 5.20338 10.2422 5.45705C9.85544 5.71489 9.58511 6.06584 9.39443 6.44721C9.20178 6.8325 9.10048 7.22989 9.04889 7.5394C9.0235 7.69178 9.01118 7.81658 9.00527 7.89937C9.00233 7.9406 9.001 7.97089 9.00042 7.98839ZM14 19C14 20.1046 13.1046 21 12 21C10.8954 21 10 20.1046 10 19H14Z"
            fill="currentColor" />
        </svg>
      </span>

      <search-modal v-if="openSearch" :boards="filteredBoards" :style="{ top: '48' + 'px', right: '4' + 'px' }"
        v-clickOutside="closeSearchModal" @close="closeSearchModal"></search-modal>

      <div @click="openLoggedInUserModal(), calcPosOfBox()" ref="user" class="user-avatar-in-app-header">
        <img v-if="loggedinUser?.imgUrl" :src="loggedinUser.imgUrl" alt />
        <div v-else class="user-avatar">{{ loggedinUser ? setMemberLetters(loggedinUser.fullname) : 'GU' }}</div>
      </div>

      <logged-in-user-modal v-if="openUserModal" :boards="boards" :style="{ top: '48' + 'px', right: 0 }"
        v-clickOutside="closeUserModal" @close="closeUserModal"></logged-in-user-modal>
    </span>

  </section>
</template>

<script>
import search from "./search.vue"
import starredBoardsModal from "./starred-boards-modal.vue"
import recentBoardsModal from "./recent-boards-modal.vue"
import loggedInUserModal from "./logged-in-user-modal.vue"
import templateModal from "./template-modal.vue"
import FastAverageColor from 'fast-average-color'
import createBoardModal from "./create-board-modal.vue"
import { boardService } from '../services/board-service'
import searchModal from "./search-modal.vue"
import moreModal from "./more-modal.vue"

export default {
  name: 'app-header',
  data() {
    return {
      openStarredModal: false,
      openRecentModal: false,
      openUserModal: false,
      openTemplate: false,
      openCreate: false,
      openSearch: false,
      openMore: false,
      pos: 0,
      posRecent: 0,
      posUser: 0,
      posTemplate: 0,
      posCreate: 0,
      posCreate2: 0,
      posMore: 0,
      newBoard: boardService.getEmptyBoard(),
      newActivity: boardService.getEmptyActivity(),
      filter: '',
    }
  },
  methods: {
    onSetFilter(filterBy) {
      this.filter = filterBy
      // this.$store.commit({ type: 'setFilter', filterBy })
    },
    openSearchModal() {
      this.openSearch = true
    },
    closeSearchModal() {
      this.openSearch = false;
    },
    openStarredBoardsModal() {
      this.openStarredModal = true
    },
    closeEditMode() {
      this.openStarredModal = false;
    },
    openRecentBoardsModal() {
      this.openRecentModal = true
    },
    closeRecentModal() {
      this.openRecentModal = false;
    },
    calcPosOfBox() {
      this.pos = this.$refs['starred'].getBoundingClientRect()
      this.posRecent = this.$refs['recent'].getBoundingClientRect()
      this.posUser = this.$refs['user'].getBoundingClientRect()
      this.posTemplate = this.$refs['template'].getBoundingClientRect()
      this.posCreate = this.$refs['create'].getBoundingClientRect()
      this.posCreate2 = this.$refs['create2'].getBoundingClientRect()
      this.posMore = this.$refs['more'].getBoundingClientRect()
    },
    openLoggedInUserModal() {
      this.openUserModal = true
    },
    closeUserModal() {
      this.openUserModal = false;
    },
    openTemplateModal() {
      this.openTemplate = true
    },
    closeTemplate() {
      this.openTemplate = false;
    },
    closeMoreModal() {
      this.openMore = false;
    },
    openCreateModal() {
      this.openCreate = true
    },
    openMoreModal() {
      this.openMore = true
    },
    closeCreateModal() {
      this.openCreate = false;
    },
    setMemberLetters(fullname) {
      const firstLetters = fullname.split(' ').map(word => word[0]).join('');
      return firstLetters.toUpperCase()
    },
    saveNewBoard(board) {
      if (!board.title) return
      if (this.loggedinUser) {
        board.createdBy = this.loggedinUser
        board.members.push(this.loggedinUser)
        this.newActivity.byMember = this.loggedinUser
      }
      this.newActivity.txt = 'created this board'
      board.activities.push(this.newActivity)
      board.isTemplate = false
      this.$store.dispatch({ type: 'saveBoard', board: board })
      this.isEdit = false
      this.newBoard = boardService.getEmptyBoard()
      if (this.isOnBoard) this.$router.push(`/board`)
    },
    lightenDarkenColor(colorCode, amount) {
      if (colorCode === '#0079BF') return '#0066A0'
      if (colorCode === '#00AECC') return '#0092AB'
      if (colorCode === '') return 'rgba(0,0,0,.32)'
      var usePound = false;
      if (colorCode[0] == "#") {
        colorCode = colorCode.slice(1);
        usePound = true;
      }
      var num = parseInt(colorCode, 16);
      var r = (num >> 16) + amount;
      if (r > 255) {
        r = 255;
      } else if (r < 0) {
        r = 0;
      }
      var b = ((num >> 8) & 0x00FF) + amount;
      if (b > 255) {
        b = 255;
      } else if (b < 0) {
        b = 0;
      }
      var g = (num & 0x0000FF) + amount;
      if (g > 255) {
        g = 255;
      } else if (g < 0) {
        g = 0;
      }

      return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
    }
  },
  computed: {
    board() {
      return this.$store.getters.board
    },
    boards() {
      return this.$store.getters.boards
    },
    filteredBoards() {
      if (this.$store.getters.boards && this.loggedinUser) {
        const boards = JSON.parse(JSON.stringify(this.boards))
        if (!this.filter.txt) return boards.filter(board => !board.isTemplate && board.members.some(member => member._id === this.loggedinUser._id))
        if (this.filter.txt) {
          const regexTxt = new RegExp(this.filter.txt, 'i')
          return boards.filter(board =>
            regexTxt.test(board.title) && !board.isTemplate && board.members.some(member => member._id === this.loggedinUser._id))
        }
      }
      // return this.$store.getters.filteredBoards
    },
    isOnBoard() {
      const { boardId } = this.$route.params
      return boardId
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },
    async appHeaderColor() {
      if (this.board && this.isOnBoard) {
        if (this.board.backgroundPhoto) {
          const fac = new FastAverageColor()
          try {
            const color = await fac.getColorAsync(this.board.backgroundPhoto)
            this.$refs['appheader'].style.backgroundColor = color.hex
            return color.hex
          }
          catch (err) {
            console.log(err)
          }
        }
        if (this.board.background && this.isOnBoard) {
          this.$refs['appheader'].style.backgroundColor = this.lightenDarkenColor(this.board.background, -20)
        }
      }
    }
  },
  watch: {
    appHeaderColor: {
      async handler(newColor) {
        this.$refs['appheader'].style.backgroundColor = newColor
      }
    },
    isOnBoard: {
      async handler(newId) {
        if (!newId) this.$refs['appheader'].style.backgroundColor = '#026AA7'
      }
    },
    loggedinUser: {
      async handler(newId) {
        // if (!newId) this.$refs['appheader'].style.backgroundColor = '#026AA7'
      }
    }
  },
  components: {
    search,
    recentBoardsModal,
    starredBoardsModal,
    loggedInUserModal,
    templateModal,
    createBoardModal,
    searchModal,
    moreModal,
  },
}
</script>
