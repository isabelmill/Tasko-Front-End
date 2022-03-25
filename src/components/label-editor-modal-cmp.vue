<template>
    <section
        v-clickOutside="close"
        :style="{ top: pos.bottom + 8 + 'px', left: pos.left + 'px' }"
        class="label-modal"
    >
        <div class="main-title-container flex">
            <button type="button" @click="closeEditLabel">back</button>
            <span class="main-title">Change label</span>
        </div>
        <section class="edit-container flex">
            <span class="mini-title">name</span>
            <input @submit.prevent type="text" v-model="name" />
            <span class="mini-title">Color</span>
            <section class="create-board-background-color">
                <div @click="setLabelColor('#0079BF')" class="blue color-pref"></div>
                <div @click="setLabelColor('#D29034')" class="yellow color-pref"></div>
                <div @click="setLabelColor('#519839')" class="green color-pref"></div>
                <div @click="setLabelColor('#B04632')" class="red color-pref"></div>
                <div @click="setLabelColor('#89609E')" class="purple color-pref"></div>
                <div class="more color-pref">...</div>
            </section>
            <button @click="save">save</button>
            <button @click="closeEditLabel">exit</button>
        </section>
    </section>
</template>

<script>
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
        }
    },
    data() {
        return {
            name: '',
            color: '',
            labelToEdit: '',
        }
    },
    created() {
        this.name = this.label.title
        this.color = this.label.color
    },
    methods: {
        setLabelColor(color) {
            this.color = color
        },
        save() {
            this.labelToEdit = JSON.parse(JSON.stringify(this.label))
            this.labelToEdit.title = this.name
            this.labelToEdit.color = this.color
            this.$emit('saveLabel', this.labelToEdit)
            this.closeEditLabel()
        },
        close() {
            this.$emit('closeBoth')
        },
        closeEditLabel() {
            this.$emit('closeEditLabel')
        }
    },
    emits: ['closeBoth', 'closeEditLabel', 'saveLabel']
}
</script>

<style>


</style>