<template>
    <section class="template-header flex">
        <span class="icon-sm icon-world"></span>
        <p>This is a public template for anyone on the internet to copy.</p>
        <button @click="duplicateTemplate">Create board from template</button>
    </section>
</template>

<script>
export default {
    props: {
        board: Object,
    },
    data() {
        return {

        }
    },
    created() {
    },
    methods: {
        duplicateTemplate() {
                const duplicatedBoard = JSON.parse(JSON.stringify(this.board))
                delete duplicatedBoard._id
                this.$emit('duplicateTemplate', duplicatedBoard)
                this.$router.push(`/board`)
            // this.$emit('duplicateBoard',)
        },
    },
    computed: {

    },
    watch: {

    },
    components: {

    },
}
</script>