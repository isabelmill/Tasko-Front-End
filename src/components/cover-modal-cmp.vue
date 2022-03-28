
<template>
    <section
        v-clickOutside="close"
        :style="{ top: pos.bottom + 8 + 'px', left: pos.left + 'px' }"
        class="label-modal"
    >
        <div class="main-title-container">
            <div class="icon-sm icon-close" @click="close"></div>
            <span class="main-title">Cover</span>
        </div>
        <section class="actions-modal-main">
            <span class="mini-title">Size</span>
            <section class="cover-size-select">
                <section
                    @click="isSmall = true, setSize()"
                    :class="{ selected: (isColorPicked || isAttachmentPicked) && isSmall === true, nonselected: (isColorPicked || isAttachmentPicked) && isSmall === false }"
                    class="cover-size-small"
                    v-bind:style="[(isColorPicked || isAttachmentPicked) ? { cursor: 'pointer' } : {}]"
                >
                    <div
                        class="cover-header"
                        v-bind:style="[isColorPicked ? { backgroundColor: color } : (isAttachmentPicked) ? { backgroundImage: 'url(' + card.attachments[attachmentIdx].link + ')' } : { backgroundColor: '#CFD3DA' }]"
                    ></div>
                    <div class="cover-main">
                        <div
                            class="line-1"
                            v-bind:style="[isColorPicked ? { backgroundColor: '#6B778C' } : { backgroundColor: '#CFD3DA' }]"
                        ></div>

                        <div
                            class="line-2"
                            v-bind:style="[isColorPicked ? { backgroundColor: '#6B778C' } : { backgroundColor: '#CFD3DA' }]"
                        ></div>
                        <div class="cover-footer">
                            <div
                                class="box-1"
                                v-bind:style="[isColorPicked ? { backgroundColor: '#6B778C' } : { backgroundColor: '#CFD3DA' }]"
                            ></div>
                            <div
                                class="box-2"
                                v-bind:style="[isColorPicked ? { backgroundColor: '#6B778C' } : { backgroundColor: '#CFD3DA' }]"
                            ></div>
                            <div
                                class="circle"
                                v-bind:style="[isColorPicked ? { backgroundColor: '#6B778C' } : { backgroundColor: '#CFD3DA' }]"
                            ></div>
                        </div>
                    </div>
                </section>
                <section
                    class="cover-size-all"
                    @click="isSmall = false, setSize()"
                    :class="{ selected: (isColorPicked || isAttachmentPicked) && isSmall === false, nonselected: (isColorPicked || isAttachmentPicked) && isSmall === true }"
                    v-bind:style="[isColorPicked ? { backgroundColor: color, cursor: 'pointer' } : (isAttachmentPicked) ? { backgroundImage: 'url(' + card.attachments[attachmentIdx].link + ')', cursor: 'pointer' } : { backgroundColor: '#CFD3DA' }]"
                >
                    <div class="cover-main">
                        <div
                            class="line-1"
                            v-bind:style="[isColorPicked && color !== '#172B4D' ? { backgroundColor: 'rgba(9, 30, 66, 0.6)' } : { backgroundColor: '#FFFFFF' }]"
                        ></div>
                        <div
                            class="line-2"
                            v-bind:style="[isColorPicked && color !== '#172B4D' ? { backgroundColor: 'rgba(9, 30, 66, 0.6)' } : { backgroundColor: '#FFFFFF' }]"
                        ></div>
                    </div>
                </section>
            </section>
            <button
                v-if="isColorPicked || isAttachmentPicked"
                type="button"
                @click="removeCover"
                class="create-btn"
            >Remove cover</button>
            <span class="mini-title">Colors</span>
            <section class="cover-colors">
                <div
                    @click="setCoverColor('#7BC86C')"
                    :class="{ selected: color === '#7BC86C' }"
                    class="green color-pref-cover"
                ></div>
                <div
                    @click="setCoverColor('#F5DD29')"
                    :class="{ selected: color === '#F5DD29' }"
                    class="yellow color-pref-cover"
                ></div>
                <div
                    @click="setCoverColor('#FFAF3F')"
                    :class="{ selected: color === '#FFAF3F' }"
                    class="orange color-pref-cover"
                ></div>
                <div
                    @click="setCoverColor('#EF7564')"
                    :class="{ selected: color === '#EF7564' }"
                    class="red color-pref-cover"
                ></div>
                <div
                    @click="setCoverColor('#CD8DE5')"
                    :class="{ selected: color === '#CD8DE5' }"
                    class="purple color-pref-cover"
                ></div>
                <div
                    @click="setCoverColor('#5BA4CF')"
                    :class="{ selected: color === '#5BA4CF' }"
                    class="blue color-pref-cover"
                ></div>
                <div
                    @click="setCoverColor('#29CCE5')"
                    :class="{ selected: color === '#29CCE5' }"
                    class="light-blue color-pref-cover"
                ></div>
                <div
                    @click="setCoverColor('#6DECA9')"
                    :class="{ selected: color === '#6DECA9' }"
                    class="light-green color-pref-cover"
                ></div>
                <div
                    @click="setCoverColor('#FF8ED4')"
                    :class="{ selected: color === '#FF8ED4' }"
                    class="pink color-pref-cover"
                ></div>
                <div
                    @click="setCoverColor('#172B4D')"
                    :class="{ selected: color === '#172B4D' }"
                    class="dark-blue color-pref-cover"
                ></div>
            </section>
            <span class="mini-title">Attachments</span>
            <section class="attachment-container" v-if="card.attachments.length">
                <section v-for="(attachment, index) in card.attachments" :key="attachment.link">
                    <img
                        :class="{ selected: attachmentIdx === index }"
                        @click="setAttachmentAsCover(index)"
                        :src="attachment.link"
                        class="attachment"
                    />
                </section>
            </section>
            <input
                @change="attachFileFromSystem($event)"
                type="file"
                ref="file"
                style="display: none"
            />
            <button
                type="button"
                @click="$refs.file.click()"
                class="create-btn"
            >Upload a cover image</button>
        </section>
    </section>
</template>

<script>
import FastAverageColor from 'fast-average-color'
import axios from "axios"
export default {
    components: {

    },
    name: 'cover-modal',
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
            cardToEdit: null,
            color: '',
            isSmall: true,
            file: '',
            attachmentIdx: '',
        }
    },
    computed: {
    },
    created() {
        if (this.card.cover.type === 'color') {
            this.color = this.card.cover.value
            this.isSmall = (this.card.cover.size === 'small') ? true : false
        }
        if (this.card.cover.type === 'attachment') {
            this.attachmentIdx = this.card.attachments.findIndex(attach => attach.link === this.card.cover.value)
            this.isSmall = (this.card.cover.size === 'small') ? true : false
        }
    },
    computed: {
        isColorPicked() {
            return !(this.color === '')
        },
        isAttachmentPicked() {
            return !(this.attachmentIdx === '')
        }
    },
    methods: {
        close() {
            this.$emit('actionsClose')
        },
        setCoverColor(color) {
            this.cardToEdit = JSON.parse(JSON.stringify(this.card))
            if (this.color === color) {
                this.color = ''
                this.cardToEdit.cover = {}
            }
            else {
                this.color = color
                this.cardToEdit.cover.type = 'color'
                this.cardToEdit.cover.value = this.color
                this.cardToEdit.cover.size = (this.isSmall) ? 'small' : 'large'
            }
            this.attachmentIdx = ''
            this.$emit('cardEdit', this.cardToEdit)
        },
        setSize() {
            this.cardToEdit = JSON.parse(JSON.stringify(this.card))
            this.cardToEdit.cover.size = (this.isSmall) ? 'small' : 'large'
            console.log(this.cardToEdit)
            this.$emit('cardEdit', this.cardToEdit)
        },
        async attachFileFromSystem(event) {
            this.cardToEdit = JSON.parse(JSON.stringify(this.card))
            this.file = event.target.files[0]
            let formdata = new FormData()
            formdata.append('file', this.file)
            formdata.append('upload_preset', 'cajan_2022')
            try {
                const res = await axios.post(`https://api.cloudinary.com/v1_1/dw85wdwsw/image/upload`, formdata)
                console.log(res.data)
                this.cardToEdit.attachments.push({
                    name: res.data.original_filename,
                    link: res.data.secure_url
                })
                console.log(this.cardToEdit)
                this.$emit('cardEdit', this.cardToEdit)
            }
            catch (err) {
                console.log('ERROR', err)
            }
        },
        setAttachmentAsCover(attachIdx) {
            this.cardToEdit = JSON.parse(JSON.stringify(this.card))
            if (this.attachmentIdx === attachIdx) {
                this.attachmentIdx = ''
                this.cardToEdit.cover = {}
            }
            else {
                this.attachmentIdx = attachIdx
                this.cardToEdit.cover.type = 'attachment'
                this.cardToEdit.cover.value = this.cardToEdit.attachments[attachIdx].link
                this.cardToEdit.cover.size = (this.isSmall) ? 'small' : 'large'
            }
            this.color = ''
            this.$emit('cardEdit', this.cardToEdit)
        },
        removeCover() {
            this.cardToEdit = JSON.parse(JSON.stringify(this.card))
            this.cardToEdit.cover = {}
            this.color = ''
            this.attachmentIdx = ''
            this.$emit('cardEdit', this.cardToEdit)
        },
    },
    emits: ['actionsClose', 'cardEdit']
}
</script>

<style>
</style>