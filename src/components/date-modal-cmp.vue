<template>
    <section
        v-clickOutside="close"
        :style="{ top: pos.bottom + 8 + 'px', left: pos.left + 'px' }"
        class="label-modal"
    >
        <div class="main-title-container">
            <div class="icon-sm icon-close" @click="close"></div>
            <span class="main-title">Dates</span>
        </div>
        <section class="actions-modal-main">
            <section class="date-picker">
                <datepicker v-model="date" inline autoApply typeabble />
            </section>
            <button type="button" @click="saveDate" class="create-btn">Save</button>
            <button type="button" @click="remove" class="create-btn">Remove</button>
        </section>
    </section>
</template>

<script>
import { ref } from 'vue'
import search from './search.vue'
export default {
    components: {
        search,
    },
    name: 'dates-modal',
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
            
        }
    },
    computed: {
        cardToEdit(){
            return JSON.parse(JSON.stringify(this.card))
        }
    },
    created() {
    },
    methods: {
        close() {
            this.$emit('actionsClose')
        },
        saveDate(){
            this.cardToEdit.date = this.date.getTime()
            this.$emit('cardEdit',this.cardToEdit)
            this.$emit('actionsClose')
        }

    },
    emits: ['actionsClose', 'cardEdit']
}
</script>

<style>
</style>