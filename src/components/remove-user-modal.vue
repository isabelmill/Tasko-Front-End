<template>
    <div class="starred-boards-modal">
        <div class="starred-boards-header">
            <div class="header-text-starred-boards-modal">
                <h1>Remove from board...</h1>
            </div>
            <div class="header-close-starred-boards-modal" @click="closeModal">
                <span class="icon-sm icon-closed"></span>
            </div>
        </div>
        <div class="remove-member-info">
            <p>
                <span>{{ currUser.fullname }}</span> will be removed from all cards on this board. They will recieve a notification.
            </p>
            <button @click="removeMember(currUser)">Remove member</button>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        currUser: {
            type: Object,
            required: true,
        },
    },
    methods: {
        closeModal() {
            this.$emit("close");
        },
        removeMember(user) {
            this.$emit('remove', user)
        }
    },
    computed: {
        starredBoards() {
            return this.$store.getters.starredBoards
        },
    },
}
</script>