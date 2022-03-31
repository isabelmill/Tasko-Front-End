<template>
    <section
        v-if="board"
        class="board-header-main"
        :style="{ 'backgroundColor': board.background }"
    >
        <nav>
            <button class="board-btn">
                <svg
                    width="16"
                    height="16"
                    role="presentation"
                    focusable="false"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2 7V15C2 16.1046 2.89543 17 4 17H6C7.10457 17 8 16.1046 8 15V7C8 5.89543 7.10457 5 6 5H4C2.89543 5 2 5.89543 2 7ZM4 7V15H6V7L4 7Z"
                        fill="currentColor"
                    />
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9 7V13C9 14.1046 9.89543 15 11 15H13C14.1046 15 15 14.1046 15 13V7C15 5.89543 14.1046 5 13 5H11C9.89543 5 9 5.89543 9 7ZM11 7V13H13V7L11 7Z"
                        fill="currentColor"
                    />
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M16 17V7C16 5.89543 16.8954 5 18 5H20C21.1046 5 22 5.89543 22 7V17C22 18.1046 21.1046 19 20 19H18C16.8954 19 16 18.1046 16 17ZM18 17V7L20 7V17H18Z"
                        fill="currentColor"
                    />
                </svg>
                <span>Board</span>
                <svg
                    width="16"
                    height="16"
                    role="presentation"
                    focusable="false"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
                        fill="currentColor"
                    />
                </svg>
            </button>
            <div class="board-name-edit">
                <p
                    :style="updateWidth"
                    class="board-name"
                    v-if="!titleIsOpen"
                    @click.stop.prevent="openTitleEdit"
                >{{ board.title }}</p>
                <input
                    maxlength="512"
                    v-clickOutside="changeTitle"
                    v-if="titleIsOpen"
                    v-model="title"
                    type="text"
                    @submit.prevent="changeBoardTitle"
                    @keyup="calculateTxtLen"
                    :style="updateLength"
                />
            </div>

            <button @click.stop.prevent="boardStared">
                <div :class="updateStar"></div>
            </button>
            <div class="invite">
                <div class="icon-sm icon-add-member"></div>
                <p>Invite</p>
            </div>
        </nav>
        <nav>
            <button @click.stop.prevent="openMenuBar">
                <div class="icon-sm icon-overflow-menu-horizontal"></div>
                <p>Show menu</p>
            </button>
        </nav>
        <transition name="slide">
            <menu-bar
                :board="board"
                v-if="showMenu"
                @close="closeMenuBar"
                @changeBgcColor="changeBoardBgcColor"
                @changeBgcPhoto="updatePhoto"
            ></menu-bar>
        </transition>
    </section>
</template>

<script>
import menuBar from "../components/menu-bar.vue"

export default {
    props: {
        board: Object,
    },
    data() {
        return {
            isStarred: false,
            titleIsOpen: false,
            // boardToEdit: null,
            titleLength: 0,
            title: '',
            showMenu: false,

        }
    },
    created() {
        // this.title = JSON.parse(JSON.stringify(this.board.title))
        // this.calculateTxtLen()
    },
    // computed: {
    //     boardToEdit() {
    //         return JSON.parse(JSON.stringify(this.board))
    //     }
    // },
    methods: {
        boardStared() {
            this.isStarred = !this.isStarred
            this.$emit('starredChange', this.isStarred)
        },
        openTitleEdit() {
            this.titleIsOpen = true;
            this.title = this.board.title
            this.calculateTxtLen()
        },
        changeTitle() {
            if (!this.title) return
            this.$emit('titleChange', this.title)
            this.titleIsOpen = false;
        },
        calculateTxtLen() {
            this.titleLength = this.title.length
        },
        closeMenuBar() {
            this.showMenu = false;
        },
        openMenuBar() {
            this.showMenu = true;
            // this.$emit("isMenuOpen",this.showMenu);
        },
        changeBoardBgcColor(color) {
            this.$emit("changeBgcColor", color);
        },
        updatePhoto(photo) {
            this.$emit("changeBoardBgc", photo);
        },
        updateWidth() {
            return `width: ${24 + (this.titleLength * 8) + 'px'};`
        }
    },
    computed: {
        updateStar() {
            if (this.board.isStarred) return `icon-sm icon-starred`
            else return `icon-sm icon-star`
        },
        updateLength() {
            return `width: ${24 + (this.titleLength * 8) + 'px'};`
        }

    },
    watch: {
        "$route.params.boardId": {
            async handler(newId) {
                this.title = JSON.parse(JSON.stringify(this.board.title))
                this.calculateTxtLen()
                this.updateWidth()
            },

        }

    },
    components: {
        menuBar,
    },
    emits: ['changeBoardBgc', 'changeBgcColor', 'starredChange', 'titleChange']
}
</script>