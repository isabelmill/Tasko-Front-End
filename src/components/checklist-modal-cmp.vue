<template>
    <section>
        <section
            v-clickOutside="close"
            :style="{ top: pos.bottom + 8 + 'px', left: pos.left + 'px' }"
            class="label-modal"
        >
            <div class="main-title-container">
                <div class="icon-sm icon-close" @click.stop.prevent="close"></div>
                <span class="main-title">Checklist</span>
            </div>
            <section class="actions-modal-main">
                <span class="mini-title">Title</span>
                <input
                    @click.stop.prevent
                    class="edit-input"
                    @submit.prevent
                    type="text"
                    v-model="name"
                />
                <button type="button" @click.stop.prevent="addChecklist" class="create-btn">Add</button>
            </section>
        </section>
    </section>
</template>

<script>
import { utilService } from '../services/util-service'
import labelEditorModalCmp from "./label-editor-modal-cmp.vue"
export default {
    components: {
        // search,
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
            name: '',
        }
    },
    computed: {
    },
    created() {
    },
    methods: {
        close() {
            this.$emit('actionsClose')
        },
        addChecklist() {
            this.cardToEdit = JSON.parse(JSON.stringify(this.card))
            if (!this.cardToEdit.checklists) this.cardToEdit.checklists = []
            this.cardToEdit.checklists.push({
                id: utilService.makeId(),
                title: this.name,
                todos: [],
            })
            this.$emit('cardEdit', this.cardToEdit)
        }
    },
     emits: ['actionsClose', 'cardEdit', 'boardEdit']

}
</script>

<style>
</style>