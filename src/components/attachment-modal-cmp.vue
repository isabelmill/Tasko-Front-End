<template>
    <section
        v-clickOutside="close"
        :style="{ top: setBottomPos(pos.bottom) + 'px', left: pos.left + 'px' }"
        class="label-modal"
    >
        <div class="main-title-container">
            <div class="icon-sm icon-close" @click.stop.prevent="close"></div>
            <span class="main-title">Attach from...</span>
        </div>
        <input @change="attachFileFromSystem($event)" type="file" ref="file" style="display: none" />
        <button type="button" @click.stop.prevent="$refs.file.click()" class="create-btn">Computer</button>
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
import { uploadService } from "../services/upload-service.js";
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
        setBottomPos(BottomPos) {
            console.log('screen.height + "px"', window.innerHeight)
            if ((window.innerHeight - BottomPos) < 240) {
                console.log('true')
                const bottom = window.innerHeight - 240
                console.log('bottom', bottom)
                return bottom
            } else {
                return BottomPos + 8
            }
        },
        close() {
            this.$emit('actionsClose');
        },
        addAttachment() {
            this.cardToEdit = JSON.parse(JSON.stringify(this.card))
            const attachment = {}
            if (this.name !== '') attachment.name = this.name
            else attachment.name = this.link
            attachment.link = this.link
            this.cardToEdit.attachments.push(attachment)
            this.$emit('cardEdit', this.cardToEdit)
        },
        async attachFileFromSystem(event) {
            this.cardToEdit = JSON.parse(JSON.stringify(this.card))
            this.$emit('uploading')
            const result = await uploadService.uploadFromSystem(event)
            this.$emit('uploadComplete')
            this.cardToEdit.attachments.push({
                name: result.original_filename,
                link: result.secure_url
            })
            // console.log(this.cardToEdit.attachments)
            this.$emit('cardEdit', this.cardToEdit)
        },
    },
    emits: ['actionsClose', 'cardEdit', 'uploadComplete', 'uploading']
}
</script>

<style>
</style>