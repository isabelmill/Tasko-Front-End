<template>
    <section class="toggle-input">
        <p v-if="!titleIsOpen" class="group-title cursor-pointer" @click="openTitleEdit">{{ txt }}</p>
        <input
            v-clickOutside="change"
            v-if="titleIsOpen"
            v-model="txt"
            type="text"
            @submit.prevent="change"
        />
        <span @click="openEditGroupModal($event)" class="icon-sm icon-overflow-menu-horizontal"></span>
        <group-edit 
            v-if="openGroupEdit"
            :style="{ top: distanceY + 'px', left: distanceX + 'px' }"
            v-clickOutside="closeEditMode"
            @close="closeEditMode"
            :id = "id"
            @remove="removeGroup"
        ></group-edit>
    </section>
</template>

<script>
import groupEdit from "./group-edit.vue"
export default {
    name: "toggle-input",
    props: {
        id: {
            type: String
        },
        title: {
            type: String
        }
    },
    data() {
        return {
            txt: "",
            titleIsOpen: false,
            openGroupEdit: false,
            distanceX: 0,
            distanceY: 0
        }
    },
    created() {
        this.txt = this.title
    },
    methods: {
        openTitleEdit() {
            this.titleIsOpen = true
        },
        change() {
            this.titleIsOpen = false;
            this.$emit('titleChange', { txt: this.txt, id: this.id })
        },
        openEditGroupModal(ev) {
            console.log('ev:', ev);
            this.openGroupEdit = true
            this.distanceX = ev.clientX
            this.distanceY = ev.clientY + 5
        },
        closeEditMode() {
            this.openGroupEdit = false;
        },
        removeGroup(id){
            console.log('id:',id);

        }
    },
    components: {
        groupEdit,
    },
    emits: ['titleChange']

}
</script>

<style>
</style>