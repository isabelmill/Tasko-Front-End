<template>
    <section
        v-if="!isLabelEditOpen"
        v-clickOutside="close"
        :style="{ top: pos.bottom + 8 + 'px', left: pos.left + 'px' }"
        class="label-modal"
    >
        <div class="main-title-container">
            <div class="icon-sm icon-close" @click="close"></div>
            <span class="main-title">Labels</span>
        </div>
        <section class="actions-modal-main">
            <section class="date-picker">

            </section>
            <button type="button" @click="saveDate" class="create-btn">Save</button>
             <button type="button" @click="remove" class="create-btn">Remove</button>
        </section>
    </section>
</template>

<script>

import {ref} from 'vue'
import search from './search.vue'
export default {
    components: {
        search,
        

    },
    name: 'date-modal',
    setup() {
        const date = ref(new Date());
        return {
            date,
        }

    },
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
            inline: true,
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
        close() {
            this.$emit('actionsClose')
        },

    },
    emits: ['actionsClose', 'cardEdit', 'boardEdit']

}
</script>

<style>
</style>