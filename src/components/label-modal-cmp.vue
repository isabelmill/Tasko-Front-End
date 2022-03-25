<template>
    <section
        v-if="!isLabelEditOpen"
        v-clickOutside="close"
        :style="{ top: pos.bottom + 8 + 'px', left: pos.left + 'px' }"
        class="label-modal"
    >
        <div class="main-title-container">
            <span class="main-title">Labels</span>
        </div>
        <search></search>
        <section>
            <span class="mini-title">Labels</span>
            <section v-for="label in board.labels" :key="label.id" class="label-container flex">
                <div
                    class="label-color"
                    style="width:100px"
                    :style="{ backgroundColor: label.color }"
                    @click="addLabelToCard(label.id)"
                >{{ label.title }}</div>
                <button @click="openEditLabel(label)">edit</button>
            </section>
        </section>
    </section>
    <label-editor-modal-cmp
        v-if="isLabelEditOpen"
        :board="board"
        :label="currLabel"
        :pos="pos"
        @saveLabel="saveLabelToBoard"
        @closeEditLabel="closeLabelEdit"
        @closeBoth="closeModal"
    ></label-editor-modal-cmp>
</template>

<script>
import search from './search.vue'
import labelEditorModalCmp from "./label-editor-modal-cmp.vue"
export default {
    components: {
        search,
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
        },
        closeModal() {
            this.isLabelEditOpen = false;
            this.close()
        },
        close() {
            this.$emit('actionsClose')
        },
        addLabelToCard(labelId) {
            // console.log('new labal', label)
            if (!this.cardToEdit) this.cardToEdit = JSON.parse(JSON.stringify(this.card))
            if (this.cardToEdit.labels.length) {
                const idx = this.cardToEdit.labels.findIndex(cardLabel => cardLabel === labelId)
                if (idx === -1) this.cardToEdit.labels.push(labelId)
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
        saveLabelToBoard(label){
            this.currLabelIdx = this.board.labels.findIndex(labelToFind => labelToFind.id === label.id)
            this.labelsToEdit = JSON.parse(JSON.stringify(this.board.labels))
            this.labelsToEdit[this.currLabelIdx] = label
            this.$emit('boardEdit', {key : 'labels' , val: this.labelsToEdit})
        }
    },
    emits: ['actionsClose', 'cardEdit','boardEdit']

}
</script>

<style>
.label-modal {
    position: fixed;
    width: 280px;
    padding: 12px;
    background-color: white;
    border: 0;
}
.main-title-container {
    text-align: center;
}

.main-title {
    border-bottom: 1px solid #091e4221;
    box-sizing: border-box;
    color: #5e6c84;
    display: block;
    line-height: 40px;
    margin: 0 12px;
    overflow: hidden;
    padding: 0 32px;
    position: relative;
    text-overflow: ellipsis;
    white-space: nowrap;
    z-index: 1;
}
.label-container {
    margin-bottom: 2px;
}

.label-color:hover {
    opacity: 70%;
}
</style>