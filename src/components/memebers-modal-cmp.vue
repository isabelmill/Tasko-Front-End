<template>
    <section
        v-if="!isLabelEditOpen"
        v-clickOutside="close"
        :style="{ top: pos.bottom + 8 + 'px', left: pos.left + 'px' }"
        class="label-modal"
    >
        <div class="main-title-container">
            <span class="main-title">Members</span>
        </div>
         <input class="main-input" type="text" />
        <section>
            <span class="mini-title">Board members</span>
            <section
                @click="addMemberToCard(member)"
                v-for="member in board.members"
                :key="member._id"
                class="member-container"
                
            >
                <div class="member-div">
                    <img :src="member.imgUrl" class="profile-image" />
                    <span> {{member.fullname}} </span>
                    <div v-if="membersToEdit.includes(member._id)" class="icon-sm icon-check"></div>
                </div>
            </section>
        </section>
    </section>
</template>

<script>
// import search from './search.vue'
export default {
    components: {

    },
    name: 'members-modal',
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
            cardToEdit: JSON.parse(JSON.stringify(this.card)),
            isLabelEditOpen: false,
        }
    },
    computed: {
        membersToEdit(){
            return this.card.members.map((member => member._id))
        }
    },
    created() {
    },

    methods: {
       
        close() {
            this.$emit('actionsClose')
        },
        addMemberToCard(member) {
            // console.log('new labal', label)
            if (!this.cardToEdit) this.cardToEdit = JSON.parse(JSON.stringify(this.card))
            if (this.cardToEdit.members.length) {
                const idx = this.cardToEdit.members.findIndex(cardMember => cardMember._id === member._id)
                if (idx === -1) this.cardToEdit.members.push(member)
                else this.cardToEdit.members.splice(idx, 1)
            }
            else {
                this.cardToEdit.members.push(member)
            }
            this.$emit('cardEdit', this.cardToEdit)

        },
    },
    emits: ['actionsClose', 'cardEdit', 'boardEdit']

}
</script>

<style>
</style>