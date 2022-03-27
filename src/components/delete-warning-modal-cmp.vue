<template>
    <section
        v-clickOutside="close"
        :style="{ top: pos.bottom + 8 + 'px', left: pos.left + 'px' }"
        class="label-modal"
    >
        <div class="main-title-container">
            <div class="icon-sm icon-back" type="button" @click="closeEditLabel"></div>
            <div class="icon-sm icon-close" @click="close"></div>
            <span class="main-title">{{title}}</span>
        </div>
        <section class="actions-modal-main">
            <section class="date-picker">
            </section>
            <button type="button" @click="confirmDelete" class="delete-btn">Delete</button>
        </section>
    </section>
</template>

<script>
export default {
    name: 'dates-modal',
    props: {
        title:{

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
    },
    created() {
    },
    methods: {
        close() {
            this.$emit('closeDeleteWarning');
        },
        confirmDelete(){
            this.$emit('deleteConfirmed')
        }

    },
    emits: ['closeDeleteWarning', 'deleteConfirmed']
}
</script>

<style>
</style>