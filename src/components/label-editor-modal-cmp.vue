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
.create-board-background-color {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: rem(9px);
    padding-left: 12px;
    padding-right: 12px;
}
.blue {
    background-color: rgb(0, 121, 191);
}

.yellow {
    background-color: rgb(210, 144, 52);
}

.green {
    background-color: rgb(81, 152, 57);
}

.red {
    background-color: rgb(176, 70, 50);
}

.purple {
    background-color: rgb(137, 96, 158);
}

.more {
    background-color: rgb(245, 246, 248);
}

.color-pref {
    width: rem(40px);
    height: rem(32px);
    border-radius: 3px;
    cursor: pointer;
}

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

.edit-container {
    flex-direction: column;
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