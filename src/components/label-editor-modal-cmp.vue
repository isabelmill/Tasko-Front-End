<template>
    <section
        v-clickOutside="close"
        :style="{ top: pos.bottom + 8 + 'px', left: pos.left + 'px' }"
        class="label-modal"
    >
        <div class="main-title-container">
            <div class="icon-sm icon-back" type="button" @click.stop.prevent="closeEditLabel"></div>
             <div class="icon-sm icon-close" @click.stop.prevent="close"></div>
            <span class="main-title">{{txt}}</span>
        </div>
        <section class="actions-modal-main">
            <span class="mini-edit-title">Name</span>
            <input @click.stop.prevent class="edit-input" @submit.prevent type="text" v-model="name" />
            <span class="mini-edit-title">Color</span>
            <section class="create-board-background-color">
                <div
                    :class="{ checked: color === '#61BD4F' }"
                    @click.stop.prevent="setLabelColor('#61BD4F')"
                    class="green color-pref"
                ></div>
                <div
                    :class="{ checked: color === '#F2D600' }"
                    @click.stop.prevent="setLabelColor('#F2D600')"
                    class="yellow color-pref"
                ></div>
                <div
                    :class="{ checked: color === '#FF9F1A' }"
                    @click.stop.prevent="setLabelColor('#FF9F1A')"
                    class="orange color-pref"
                ></div>
                <div
                    :class="{ checked: color === '#EB5A46' }"
                    @click.stop.prevent="setLabelColor('#EB5A46')"
                    class="red color-pref"
                ></div>
                <div
                    :class="{ checked: color === '#C377E0' }"
                    @click.stop.prevent="setLabelColor('#C377E0')"
                    class="purple color-pref"
                ></div>
                <div
                    :class="{ checked: color === '#0079BF' }"
                    @click.stop.prevent="setLabelColor('#0079BF')"
                    class="blue color-pref"
                ></div>
                <div
                    :class="{ checked: color === '#00C2E0' }"
                    @click.stop.prevent="setLabelColor('#00C2E0')"
                    class="light-blue color-pref"
                ></div>
                <div
                    :class="{ checked: color === '#51E898' }"
                    @click.stop.prevent="setLabelColor('#51E898')"
                    class="light-green color-pref"
                ></div>
                <div
                    :class="{ checked: color === '#FF78CB' }"
                    @click.stop.prevent="setLabelColor('#FF78CB')"
                    class="pink color-pref"
                ></div>
                <div
                    :class="{ checked: color === '#344563' }"
                    @click.stop.prevent="setLabelColor('#344563')"
                    class="dark-blue color-pref"
                ></div>
                <div
                    :class="{ checked: color === '#B3BAC5' }"
                    @click.stop.prevent="setLabelColor('#B3BAC5')"
                    class="no-color color-pref"
                ></div>
                <div class="no-color-container">
                    <span class="no-color-title">No color.</span>
                    <span class="no-color-text">This won't show up on the front of cards</span>
                </div>
            </section>
            <button class="save-btn" @click.stop.prevent="save">{{btnTxt}}</button>
            <button v-if="!isCreate" class="delete-btn" @click.stop.prevent="deleteLabel">Delete</button>
        </section>
    </section>
</template>

<script>
import { utilService } from '../services/util-service.js'
export default {
    name: 'label-editor',
    props: {
        label: {
            type: Object
        },
        pos: {
            type: Object
        },
        board: {
            type: Object
        },
        new: {
            type: Boolean
        }
    },
    data() {
        return {
            name: '',
            color: '',
            labelToEdit: '',
            txt:'Create label',
            btnTxt: 'Create',
            isCreate : this.new
        }
    },
    created() {
        if (!this.new) {
            this.name = this.label.title
            this.color = this.label.color
            this.txt = 'Change label'
            this.btnTxt = 'Save'
        }
    },
    methods: {
        setLabelColor(color) {
            this.color = color
        },
        save() {
            if (this.new) {
                if (!this.color) this.color = '#61BD4F'
                this.labelToEdit = {
                    id: utilService.makeId(),
                    title: this.name,
                    color: this.color
                }
            }
            else {
                this.labelToEdit = JSON.parse(JSON.stringify(this.label))
                this.labelToEdit.title = this.name
                this.labelToEdit.color = this.color
            }
            this.$emit('saveLabel', this.labelToEdit)
            this.closeEditLabel()
        },
        deleteLabel(){
            this.$emit('deleteLabel',this.label)
            //TO ADD AGREE AFTER DELETE PROMPT
            this.closeEditLabel()
        },

        close() {
            this.$emit('closeBoth')
        },
        closeEditLabel() {
            this.$emit('closeEditLabel')
        }
    },
    emits: ['closeBoth', 'closeEditLabel', 'saveLabel','deleteLabel']
}
</script>

<style>
</style>