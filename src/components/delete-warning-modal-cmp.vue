<template>
    <section
        v-clickOutside="close"
        :style="{ top: pos.bottom + 8 + 'px', left: pos.left + 'px' }"
        class="label-modal"
    >
        <div class="main-title-container">
            <!-- <div class="icon-sm icon-back" type="button" @click="close"></div> -->
            <div class="icon-sm icon-close" @click="close"></div>
            <span class="main-title">Delete {{title}}?</span>
        </div>
        <section class="delete-modal-main">
            <span class="delete-txt">There is no undo. This will remove this {{title}} and destroy its history.</span> 
            <button type="button" @click="confirmDelete" class="delete-btn">Delete</button>
            </section>
        </section>
    
</template>

<script>
export default {
    name: 'delete-modal',
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