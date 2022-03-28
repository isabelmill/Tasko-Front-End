<template>
    <section
        v-clickOutside="close"
        :style="{ top: pos.bottom + 8 + 'px', left: pos.left + 'px' }"
        class="label-modal"
    >
        <div class="main-title-container">
            <div class="icon-sm icon-close" @click.stop.prevent="close"></div>
            <span class="main-title">Attach from...</span>
        </div>
        <span class="mini-edit-title">Attach a link</span>
        <input placeholder="Paste any link here..." v-model="link" type="text" class="main-input" />
        <section v-if="link !== ''">
            <span class="mini-edit-title">Link name (optional)</span>
            <input placeholder v-model="name" type="text" class="main-input" />
        </section>
        <button class="save-btn" @click.stop.prevent="addAttachment">Attach</button>
    </section>
</template>

<script>
export default {
    name: 'attachment-modal',
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
            link: '',
            name: '',
            cardToEdit: null
        }
    },
    computed: {
    },
    created() {
    },
    methods: {
        close() {
            this.$emit('actionsClose');
        },
        addAttachment() {
            this.cardToEdit = JSON.parse(JSON.stringify(this.card))
            const attachment = {}
            if (this.name!=='') attachment.name = this.name
            else attachment.name = this.link
            attachment.link = this.link
            this.cardToEdit.attachments.push(attachment)
            this.$emit('cardEdit',this.cardToEdit)
        }

    },
    emits: ['actionsClose', 'cardEdit']
}
</script>

<style>
</style>