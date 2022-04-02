<template>
    <section
        v-clickOutside="close"
        :style="{ top: setBottomPos(pos.bottom) + 'px', left: pos.left + 'px' }"
        class="label-modal"
    >
        <div class="main-title-container">
            <div class="icon-sm icon-close" @click.stop.prevent="close"></div>
            <span class="main-title">Dates</span>
        </div>
        <section class="actions-modal-main">
            <section class="date-picker">
                <datepicker v-model="date" inline autoApply typeabble />
                <!-- <datepicker v-show="isStartDate" v-model="startDate" inline autoApply typeabble /> -->
                <!-- <button type="button" @click.stop.prevent="startDateInit" class="create-btn">init</button> -->
                <button type="button" @click.stop.prevent="saveDate" class="create-btn date-modal-btn">Save</button>
                <button
                    type="button"
                    @click.stop.prevent="remove"
                    class="create-btn delete-date"
                >Remove</button>
            </section>
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
        const startDate = ref(new Date());

        return {
            date,
            startDate
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
            isStartDate: false,
        }
    },
    computed: {
        cardToEdit() {
            return JSON.parse(JSON.stringify(this.card))
        }
    },
    created() {
        // console.log(this.pos)
    },
    methods: {
        setBottomPos(BottomPos) {
            console.log('screen.height + "px"', window.innerHeight)
            if ((window.innerHeight - BottomPos) < 480) {
                console.log('true')
                const bottom = window.innerHeight - 480
                console.log('bottom', bottom)
                return bottom
            } else {
                return BottomPos + 8
            }
        },
        close() {
            this.$emit('actionsClose')
        },
        saveDate() {
            this.cardToEdit.date = this.date.getTime()
            this.$emit('cardEdit', this.cardToEdit)
            this.$emit('actionsClose')
        },
        startDateInit() {
            this.isStartDate = !this.isStartDate
        }

    },
    emits: ['actionsClose', 'cardEdit']
}
</script>

<style>
</style>.stop.prevent