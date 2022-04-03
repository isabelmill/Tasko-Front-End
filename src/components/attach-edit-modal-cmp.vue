<template>
    <section>
        <section
            v-clickOutside="close"
            :style="{ top: setBottomPos(pos.bottom) + 'px', left: pos.left + 'px' }"
            class="label-modal"
        >
            <div class="main-title-container">
                <div class="icon-sm icon-close" @click.stop.prevent="close"></div>
                <span class="main-title">Edit attachment</span>
            </div>
            <section class="actions-modal-main">
                <span class="mini-title">Link name</span>
                <input
                    @click.stop.prevent
                    class="edit-input"
                    @submit.prevent
                    type="text"
                    v-model="name"
                />
                <button type="button" @click.stop.prevent="changeName" class="save-btn">Update</button>
            </section>
        </section>
    </section>
</template>

<script>
import { utilService } from '../services/util-service'
export default {
    components: {
        
    },
    name: 'label-modal',
    props: {
        linkName:{
            type: String
        },
        pos: {
            type: Object
        }
    },
    data() {
        return {
            name: this.linkName,
        }
    },
    computed: {
    },
    created() {
    },
    methods: {
        setBottomPos(BottomPos) {
            console.log('screen.height + "px"', window.innerHeight)
            if ((window.innerHeight - BottomPos) < 186) {
                console.log('true')
                const bottom = window.innerHeight - 186
                console.log('bottom', bottom)
                return bottom
            } else {
                return BottomPos + 8
            }
        },
        close() {
            this.$emit('close')
        },
        changeName() {
            if (this.name === '') return
            this.$emit('changeAttachmentName', this.name)
        }
    },
    emits: ['close', 'changeAttachmentName']

}
</script>

<style>
</style>