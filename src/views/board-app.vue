<template>
    <section class="board-app-main">
        <board-list v-if="boards" :boards="boards" />
    </section>
</template>

<script>
import { boardService } from '../services/board-service'
import boardList from '../components/board-list.vue'

export default {
        name: 'board-app',
            data() {
        return {
            filterBy: null,
        }
    },
        computed: {
        boards() {
            return this.$store.getters.boards
        },
    },
        methods: {
        loadBoards() {
            boardService.query().then((Boards) => (this.Boards = Boards))
        },
        setFilter(filterBy) {
            this.$store.dispatch({ type: 'filter', filterBy });
        },
        addNew() {
        },
    },
        components: {
        boardList,
    },
}
</script>