<template>
    <section
        v-clickOutside="close"
        :style="{ top: pos.bottom + 8 + 'px', left: pos.left + 'px' }"
        class="label-modal"
    >
        <p class="main-title">Labels</p>
        <hr />
        <search></search>
        <p class="mini-title">Labels</p>
        <section v-for="label in board.labels" :key="label.id" class="label-container flex">
            <div
                class="label-color"
                style="width:100px"
                :style="{ backgroundColor: label.color }"
                @click="addLabelToCard(label)"
            ></div>
            <button>edit</button>
        </section>
    </section>
</template>

<script>
import search from './search.vue'
export default {
    components: { search },
    name: 'label-modal',
    props: {
        board: {
            type: Object
        },
        card: {
            type: Object
        },
        groupId: {
            type: String
        },
        pos: {
            type: Object
        }
    },
    data() {
        return {
            cardToEdit: null,
        }
    },
    created() {
        // console.log(this.board.labels[0].color)
    },
    methods: {
        close() {
            this.$emit('actionsClose')
        },
        addLabelToCard(label) {
            console.log('new label', label)
            this.cardToEdit = JSON.parse(JSON.stringify(this.card))
            console.log(this.cardToEdit)
            if (this.cardToEdit.labels) {
                console.log('yes')
                this.$emit('cardEdit', this.cardToEdit)
            const labelIdx = this.cardToEdit.labels.findIndex(cardLabel => cardLabel.id === label.id)
            if(labelIdx === -1)
                this.cardToEdit.labels.splice(labelIdx, 1)
                else this.cardToEdit.labels.push(label)
                return
            }
            this.cardToEdit['labels'] = []
            this.cardToEdit.labels.push(label)
            this.$emit('cardEdit', this.cardToEdit)
},
    },
emits: ['actionsClose', 'cardEdit']

}
</script>

<style>
.label-modal {
    position: fixed;
    background-color: white;
    border: 1px solid black;
}
.main-title {
    text-align: center;
}
.label-container {
    margin-bottom: 2px;
}

.label-color:hover {
    opacity: 70%;
}
</style>