<template>
    <div class="create-board-modal">
        <form>
            <div class="create-board-modal-header">
                <div class="header-text-create-boards-modal">
                    <h1>Create board</h1>
                </div>
                <div class="header-close-create-boards-modal" @click="closeModal">
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M5.58579 7L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683418 0.292893 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683418 14.0976 1.31658 13.7071 1.70711L8.41421 7L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L7 8.41421L1.70711 13.7071C1.31658 14.0976 0.683418 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L5.58579 7Z"
                            fill="currentColor"
                        />
                    </svg>
                </div>
            </div>

            <div class="create-board-background-preview">
                <div class="create-board-img-preview" :style="{ backgroundColor: setColor }">
                    <img
                        :style="{ backgroundColor: setColor }"
                        src="https://a.trellocdn.com/prgb/dist/images/board-preview-skeleton.14cda5dc635d1f13bc48.svg"
                        alt
                    />
                </div>
            </div>
            <label class="background-label">Background</label>
            <div class="create-board-background-color">
                <div @click="setBoardColor('#0079BF')" class="blue color-pref"></div>
                <div @click="setBoardColor('#D29034')" class="yellow color-pref"></div>
                <div @click="setBoardColor('#519839')" class="green color-pref"></div>
                <div @click="setBoardColor('#B04632')" class="red color-pref"></div>
                <div @click="setBoardColor('#89609E')" class="purple color-pref"></div>
                <div class="more color-pref">
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
                            d="M5 14C6.10457 14 7 13.1046 7 12C7 10.8954 6.10457 10 5 10C3.89543 10 3 10.8954 3 12C3 13.1046 3.89543 14 5 14ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14ZM21 12C21 13.1046 20.1046 14 19 14C17.8954 14 17 13.1046 17 12C17 10.8954 17.8954 10 19 10C20.1046 10 21 10.8954 21 12Z"
                            fill="currentColor"
                        />
                    </svg>
                </div>
            </div>
            <label for>Board title</label>
            <div class="create-board-title-add-btns">
                <input v-focus type="text" v-model="newBoard.title" />
                <button
                    :style="!newBoard.title ? {
                        'cursor': 'no-drop',
                        'background-color': '#F5F6F8',
                        'color': '#BFC4CE',
                    } : null"
                    @click="saveNewBoard"
                >Create</button>
            </div>
        </form>
    </div>
</template>      

<script>
export default {
    name: 'board-app',
    props: {
        newBoard: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            isEdit: false,
            setColor: '',
        }
    },
    computed: {
        boards() {
            return this.$store.getters.boards
        },
    },
    methods: {
        closeModal() {
            this.$emit("close");
        },
        setBoardColor(color) {
            this.setColor = color
        },
        saveNewBoard() {
            if (!this.newBoard.title) return
            this.$emit("add", this.newBoard)
        },
        setBoardColor(color) {
            this.setColor = color
            this.newBoard.background = color
        },
    },
    components: {
    },
}
</script>