<template>
<section>
    <section
        v-if="!isLabelEditOpen"
        v-clickOutside="close"
        :style="{ top: pos.bottom + 8 + 'px', left: pos.left + 'px' }"
        class="label-modal"
    >
        <div class="main-title-container">
            <div class="icon-sm icon-close" @click.stop.prevent="close"></div>
            <span class="main-title">Labels</span>
        </div>
        <section class="actions-modal-main">
            <input class="main-input" type="text" />
            <span class="mini-title">Labels</span>
            <section v-for="label in board.labels" :key="label.id" class="label-container flex">
                <div
                    class="label-color"
                    :style="{ backgroundColor: label.color }"
                    @click.stop.prevent="addLabelToCard(label.id)"
                    
                >
                    {{ label.title }}
                    <div v-if="card.labels.includes(label.id)" class="icon-sm icon-check"></div>
                </div>
                <button class="icon-sm icon-edit" @click.stop.prevent="openEditLabel(label)"></button>
            </section>
            <button type="button" @click.stop.prevent="createNewLabel" class="create-btn">Create a new label</button>
        </section>
    </section>
    <label-editor-modal-cmp
        v-if="isLabelEditOpen"
        :board="board"
        :label="currLabel"
        :pos="pos"
        :new="isCreate"
        @saveLabel="saveLabelToBoard"
        @deleteLabel="deleteLabelFromBoard"
        @closeEditLabel="closeLabelEdit"
        @closeBoth="closeModal"
    ></label-editor-modal-cmp>
    </section>
</template>

<script>
import labelEditorModalCmp from "./label-editor-modal-cmp.vue"
export default {
    components: {
        labelEditorModalCmp
    },
    name: 'label-modal',
    props: {
        board: {
            type: Object
        },
        card: {
            type: Object
        },
        group: {
            type: Object
        },
        pos: {
            type: Object
        }
    },
    data() {
        return {
            cardToEdit: null,
            isLabelEditOpen: false,
            currLabelIdx: null,
            labelsToEdit: null,
            isCreate: false,
        }
    },
    computed: {
        currLabel() {
            return this.board.labels[this.currLabelIdx]
        },
    },
    created() {
    },
    methods: {
        closeLabelEdit() {
            this.isLabelEditOpen = false
            this.isCreate = false

        },
        closeModal() {
            this.isLabelEditOpen = false;
            this.close()
        },
        close() {
            this.isCreate = false
            this.$emit('actionsClose')
        },
        addLabelToCard(labelId) {
            this.cardToEdit = JSON.parse(JSON.stringify(this.card))
            if (this.cardToEdit.labels.length) {
                const boardLabelIdx = this.board.labels.findIndex(labelToFind => labelToFind.id === labelId)
                const idx = this.cardToEdit.labels.findIndex(cardLabel => cardLabel === labelId)
                if (idx === -1) this.cardToEdit.labels.splice(boardLabelIdx, 0, labelId)
                else this.cardToEdit.labels.splice(idx, 1)
            }
            else {
                this.cardToEdit.labels.push(labelId)
            }
            this.$emit('cardEdit', this.cardToEdit)

        },
        openEditLabel(label) {
            this.isLabelEditOpen = true;
            this.currLabelIdx = this.board.labels.findIndex(labelToFind => labelToFind.id === label.id)
        },
        saveLabelToBoard(label) {
            this.currLabelIdx = this.board.labels.findIndex(labelToFind => labelToFind.id === label.id)
            this.labelsToEdit = JSON.parse(JSON.stringify(this.board.labels))
            if (this.currLabelIdx === -1) this.labelsToEdit.push(label)
            else this.labelsToEdit[this.currLabelIdx] = label
            this.$emit('boardEdit', { key: 'labels', val: this.labelsToEdit })
        },
        deleteLabelFromBoard(label) {
            this.currLabelIdx = this.board.labels.findIndex(labelToFind => labelToFind.id === label.id)
            this.labelsToEdit = JSON.parse(JSON.stringify(this.board.labels))
            this.labelsToEdit.splice(this.currLabelIdx, 1)
            this.$emit('boardEdit', { key: 'labels', val: this.labelsToEdit })
        },
        createNewLabel() {
            this.isLabelEditOpen = true
            this.isCreate = true
        }
    },
    emits: ['uploadComplete','uploading','actionsClose', 'cardEdit', 'boardEdit','cardCopySave']

}
</script>

<style>
</style>