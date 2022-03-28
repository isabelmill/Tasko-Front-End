<template>
    <section :style="{ top: pos.top - 200 + 'px', left: pos.left + 'px' }" class="copy-modal-main">
        <div class="header-modal">
            <div>
                <p>Copy card</p>
                <span class="icon-sm icon-close" @click="close"></span>
            </div>
        </div>
        <div>
            <p class="header-second">Title</p>
            <textarea v-model="card.title" name="copy-card" id="copy-card"></textarea>
        </div>
        <div>
            <p class="header-second">Keep</p>
            <div class="keep-list">
                <div v-if="card.labels.length" class="keep-checkbox">
                    <div v-if="!keepList.labels" @click="toggleCardKeep('labels')" class="checkbox"></div>
                    <img
                        v-if="keepList.labels"
                        @click="toggleCardKeep('labels')"
                        class="done-img"
                        src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23fff' viewBox='-3 -4 16 16'%3E%3Cpath d='M1.49 3.215a.667.667 0 0 0-.98.903l2.408 2.613c.358.351.892.351 1.223.02l.243-.239a1689.645 1689.645 0 0 0 2.625-2.589l.027-.026a328.23 328.23 0 0 0 2.439-2.429.667.667 0 1 0-.95-.936c-.469.476-1.314 1.316-2.426 2.417l-.027.026a1368.126 1368.126 0 0 1-2.517 2.482L1.49 3.215z'/%3E%3C/svg%3E"
                    />
                    <p>
                        Labels
                        <span class="length">({{ card.labels.length }})</span>
                    </p>
                </div>
                <div v-if="card.members.length" class="keep-checkbox">
                    <div
                        v-if="!keepList.members"
                        @click="toggleCardKeep('members')"
                        class="checkbox"
                    ></div>
                    <img
                        v-if="keepList.members"
                        @click="toggleCardKeep('members')"
                        class="done-img"
                        src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23fff' viewBox='-3 -4 16 16'%3E%3Cpath d='M1.49 3.215a.667.667 0 0 0-.98.903l2.408 2.613c.358.351.892.351 1.223.02l.243-.239a1689.645 1689.645 0 0 0 2.625-2.589l.027-.026a328.23 328.23 0 0 0 2.439-2.429.667.667 0 1 0-.95-.936c-.469.476-1.314 1.316-2.426 2.417l-.027.026a1368.126 1368.126 0 0 1-2.517 2.482L1.49 3.215z'/%3E%3C/svg%3E"
                    />
                    <p>
                        Members
                        <span class="length">({{ card.members.length }})</span>
                    </p>
                </div>
            </div>
        </div>
        <div>
            <p class="header-second">Copy to...</p>
            <div class="selects-box">
                <label for></label>
                <select class="select-board" @change="setGroupPositions($event)">
                    <option
                        selected="selected"
                        v-for="group in board.groups"
                        :key="group.id"
                        :value="group.cards.length"
                    >{{ group.title }}</option>
                </select>
                <select class="select-pos-card">
                    <option v-for="pos in positions" :key="pos" :value="pos">{{ pos }}</option>
                </select>
            </div>
        </div>
        <button>Create card</button>
    </section>
</template>

<script>
export default {
    name: 'copy-modal',
    props: {
        board: {
            type: Object
        },
        card: {
            type: Object
        },
        group: {
            type: Object
        },
        pos: {
            type: Object
        }
    },
    data() {
        return {
            cardToCopy: null,
            keepList: {
                labels: false,
                members: false,
            },
            positions: []
        }
    },
    computed: {
    },
    created() {
    },
    methods: {
        toggleCardKeep(list) {
            this.keepList[list] = !this.keepList[list]
            console.log('keepList', list, this.keepList[list])
        },
        close() {
            this.$emit('actionsClose')
        },
        setGroupPositions(event) {
            this.positions = []
            var counter = 0
            var num = +event.target.value === 0 ? 1 : +event.target.value
            while (counter < num) {
                counter++;
                this.positions.push(counter)
            }
        },
    },
    emits: ['actionsClose']

}
</script>

<style>
</style>