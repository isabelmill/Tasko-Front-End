<template>
    <div class="starred-boards-modal">
        <div class="starred-boards-header">
            <div class="header-text-starred-boards-modal">
                <h1>Account</h1>
            </div>
            <div class="header-close-starred-boards-modal" @click="closeModal">
                <span class="icon-sm icon-closed"></span>
            </div>
        </div>
    </div>
</template>
<script>

export default {
    props: {
    },
    methods: {
        closeModal() {
            this.$emit("close");
        },
    },
}
</script>