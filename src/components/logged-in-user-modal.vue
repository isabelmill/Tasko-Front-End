<template>
    <div class="user-boards-modal">
        <div class="user-boards-header">
            <div class="header-text-user-boards-modal">
                <h1>Account</h1>
            </div>
            <div class="header-close-user-boards-modal" @click="closeModal">
                <span class="icon-sm icon-closed"></span>
            </div>
        </div>
        <div v-if="loggedinUser" class="user-details">{{ loggedinUser.username }}</div>
        <div v-if="!loggedinUser" class="user-details">Guest User</div>
        <hr />
        <div @click="login" v-if="!loggedinUser" class="login">Log in</div>
        <div @click="logout" v-if="loggedinUser" class="logout">Log out</div>
    </div>
</template>
<script>

export default {
    props: {
    },
    computed: {
        loggedinUser() {
            return this.$store.getters.loggedinUser
        },
    },
    methods: {
        closeModal() {
            this.$emit("close");
        },
        logout() {
            this.$emit("close");
            this.$store.dispatch({ type: "logout" })
            this.$router.push(`/`)
        },
        login() {
            this.$emit("close");
            this.$router.push(`/login`)
        },
    },
}
</script>