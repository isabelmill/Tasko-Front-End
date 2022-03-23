<template>
    <div class="group-edit-modal">
        <div class="group-modal-header">
            <h1>List actions</h1>
            <button @click="closeModal">X</button>
        </div>
        <div class="group-modal-actions-list">
            <a @click="removeList(id)">Remove this list</a>
        </div>
    </div>
</template>

<script>

export default {
        props: {
        id: {
            type: String
        }
    },
    methods: {
        closeModal() {
            this.$emit("close");
        },
        removeList(id) {
           this.$emit('remove', id)
        },
    },
}
</script>