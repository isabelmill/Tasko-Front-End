<template>
    <section :style="{ top: setBottomPos(pos.bottom) + 'px', left: pos.left + 'px' }" class="copy-modal-main">
        <div class="header-modal">
            <div>
                <p>Copy card</p>
                <span class="icon-sm icon-close" @click.stop.prevent="close"></span>
            </div>
        </div>
        <div>
            <p class="header-second">Title</p>
            <textarea v-model="cardToCopy.title" name="copy-card" id="copy-card"></textarea>
        </div>
        <div v-if="card.labels.length || card.members.length">
            <p class="header-second">Keep</p>
            <div class="keep-list">
                <div v-if="card.labels.length" class="keep-checkbox">
                    <div
                        v-if="!keepList.labels"
                        @click.stop.prevent="toggleCardKeep('labels')"
                        class="checkbox"
                    ></div>
                    <img
                        v-if="keepList.labels"
                        @click.stop.prevent="toggleCardKeep('labels')"
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
                        @click.stop.prevent="toggleCardKeep('members')"
                        class="checkbox"
                    ></div>
                    <img
                        v-if="keepList.members"
                        @click.stop.prevent="toggleCardKeep('members')"
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
            <div class="selects-box-main">
                <div class="select-box">
                    <label for="group">List</label>
                    <select
                        placeholder="List"
                        class="select-board"
                        @change="setGroupPosition($event)"
                        id="group"
                        name="group"
                    >
                        <option
                            selected="selected"
                            v-for="(group) in board.groups"
                            :key="group.id"
                            :value="group.id"
                        >{{ group.title }}</option>
                    </select>
                </div>
                <div class="select-box">
                    <label for="position">Position</label>
                    <select
                        id="position"
                        name="position"
                        placeholder="Position"
                        class="select-pos-card"
                        @change="setCardPosition($event)"
                    >
                        <option
                            v-for="position in positions"
                            :key="position"
                            :value="position"
                        >{{ position }}</option>
                    </select>
                </div>
            </div>
        </div>
        <button @click.stop.prevent="setCardKeeps">Create card</button>
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
            keepList: {
                labels: true,
                members: true,
            },
            positions: [],
            cardToCopy: null,
            copyToPos: {
                group: '',
                position: 1,
            },
        }
    },
    created() {
        this.setCardToCopy()
    },
    methods: {
        setBottomPos(BottomPos) {
            console.log('screen.height + "px"', window.innerHeight)
            if ((window.innerHeight - BottomPos) < 290) {
                console.log('true')
                const bottom = window.innerHeight - 290
                console.log('bottom', bottom)
                return bottom
            } else {
                return BottomPos + 8
            }
        },
        setCardToCopy() {
            this.cardToCopy = JSON.parse(JSON.stringify(this.card))
            // this.cardToCopy.title += ' - copy'
        },
        close() {
            this.$emit('actionsClose')
        },
        toggleCardKeep(list) {
            this.keepList[list] = !this.keepList[list]
        },
        setGroupPosition(event) {
            // set group
            const groupId = event.target.value
            const selectedGroup = this.board.groups.find(group => group.id === groupId)
            this.copyToPos.group = selectedGroup
            // set positions
            this.positions = []
            var counter = 0
            var num = !selectedGroup.cards.length ? 1 : selectedGroup.cards.length
            while (counter < num) {
                counter++;
                this.positions.push(counter)
            }
        },
        setCardPosition(event) {
            const cardPos = event.target.value
            this.copyToPos.position = cardPos
        },
        setCardKeeps() {
            !this.keepList.labels ?
                this.cardToCopy.labels = [] : this.cardToCopy.labels = JSON.parse(JSON.stringify(this.card.labels));
            !this.keepList.members ?
                this.cardToCopy.members = [] : this.cardToCopy.members = JSON.parse(JSON.stringify(this.card.members));
            this.copyCard()
            this.close()
        },
        copyCard() {
            this.$emit('cardCopySave', { cardCopy: this.cardToCopy, posCopy: this.copyToPos })
        }
    },
    emits: ['actionsClose', 'cardCopySave']

}
</script>

<style>
</style>