<template>
    <section class="toggle-input">
        <p v-if="!titleIsOpen" class="group-title cursor-pointer" @click="openTitleEdit">{{ txt }}</p>
        <input
            v-clickOutside="change"
            v-if="titleIsOpen"
            v-model="txt"
            type="text"
            @submit.prevent="change"
        />
        <span
            @click="calcPosOfBox(), openEditGroupModal()"
            ref="box"
            class="icon-sm icon-overflow-menu-horizontal"
        ></span>
        <group-edit
            v-if="openGroupEdit"
            :style="{ top: '143' + 'px', left: pos.left + 'px' }"
            v-clickOutside="closeEditMode"
            @close="closeEditMode"
            :id="id"
            @remove="removeGroup"
        ></group-edit>
    </section>
</template>

<script>
import groupEdit from "./group-edit.vue"
export default {
    name: "toggle-input",
    props: {
        id: {
            type: String
        },
        title: {
            type: String
        }
    },
    data() {
        return {
            txt: "",
            titleIsOpen: false,
            openGroupEdit: false,
            boards: this.$store.getters.boards,
            board: this.$store.getters.board,
            groups: null,
            pos: 0,
            boardToEdit: null,
        }
    },
    created() {
        this.txt = this.title
    },
    methods: {
        openTitleEdit() {
            this.titleIsOpen = true
        },
        change() {
            this.titleIsOpen = false;
            this.$emit('titleChange', { txt: this.txt, id: this.id })
        },
        openEditGroupModal() {
            this.openGroupEdit = true
        },
        closeEditMode() {
            this.openGroupEdit = false;
        },
        removeGroup(groupId) {
            this.boardToEdit = JSON.parse(JSON.stringify(this.board))
            const idx = this.boardToEdit.groups.findIndex((group) => group.id === groupId)
            this.boardToEdit.groups.splice(idx, 1)
            this.$store.dispatch({ type: 'saveBoard', board: this.boardToEdit })
            this.closeEditMode()
        },
        calcPosOfBox() {
            this.pos = this.$refs['box'].getBoundingClientRect()

        }
    },
    components: {
        groupEdit,
    },
    emits: ['titleChange']

}
</script>

<style>
</style>