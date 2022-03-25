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
        <!-- <search></search> -->
        <section>
            <span class="mini-title">Board members</span>
            <section  @click="addMemberToCard(member)" v-for="member in board.members" :key="member._id" class="label-container flex">
                <img :src="member.imgUrl" class="profile-image">
                <div
                    class="label-color"
                    style="width:100px"
                >{{ member.fullname }}</div>
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
            currLabelIdx: null,
            labelsToEdit: null,
        }
    },
    computed: {
    },
    created() {
    },
    methods: {
        closeLabelEdit() {
            this.isLabelEditOpen = false
        },
        closeModal() {
            this.isLabelEditOpen = false;
            this.close()
        },
        close() {
            this.$emit('actionsClose')
        },
        addMemberToCard(member) {
            // console.log('new labal', label)
            if (!this.cardToEdit) this.cardToEdit = JSON.parse(JSON.stringify(this.card))
            console.log(this.cardToEdit)
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
    emits: ['actionsClose', 'cardEdit','boardEdit']

}
</script>

<style>
.label-modal {
    position: fixed;
    width: 280px;
    padding: 12px;
    background-color: white;
    border: 0;
}
.main-title-container {
    text-align: center;
}

.main-title {
    border-bottom: 1px solid #091e4221;
    box-sizing: border-box;
    color: #5e6c84;
    display: block;
    line-height: 40px;
    margin: 0 12px;
    overflow: hidden;
    padding: 0 32px;
    position: relative;
    text-overflow: ellipsis;
    white-space: nowrap;
    z-index: 1;
}
.label-container {
    margin-bottom: 2px;
}

.label-color:hover {
    opacity: 70%;
}

.profile-image{
    height: 40px;
    width: 40px;
    border-radius: 50%;
    border: 2px solid white;
    /* filter: drop-shadow(0 0 8px #ff5722); */
}
</style>