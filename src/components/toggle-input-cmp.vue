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
        <span class="icon-sm icon-overflow-menu-horizontal"></span>
    </section>
</template>

<script>
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
    },
    emits: ['titleChange']

}
</script>

<style>
</style>