<template>
    <div class="create-board-modal">
        <form>
            <div class="create-board-modal-header">
                <div class="create-board-modal-header-items">
                    <h1>Create board</h1>
                </div>
                <button class="edit-close-btn" @click="closeModal">X</button>
            </div>

            <div class="create-board-background-preview" >
                <div class="create-board-img-preview" :style="{ backgroundColor: setColor }">
                <img :style="{ backgroundColor: setColor }"
                    src="https://a.trellocdn.com/prgb/dist/images/board-preview-skeleton.14cda5dc635d1f13bc48.svg"
                    alt
                />
                </div>
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
            // this.newBoard.background = color
        },
        saveNewBoard() {
            console.log('this.n:', this.newBoard);
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