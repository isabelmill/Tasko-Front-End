
<template>
    <section
        v-clickOutside="close"
        :style="{ top: pos.bottom + 8 + 'px', left: pos.left + 'px' }"
        class="label-modal"
    >
        <div class="main-title-container">
            <div class="icon-sm icon-close" @click.stop.prevent.stop.prevent="close"></div>
            <span class="main-title">Cover</span>
        </div>
        <section class="actions-modal-main">
            <span class="mini-title">Size</span>
            <section class="cover-size-select">
                <section
                    @click.stop.prevent="isSmall = true, setSize()"
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
                    @click.stop.prevent="isSmall = false, setSize()"
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
                @click.stop.prevent="removeCover"
                class="create-btn"
            >Remove cover</button>
            <section v-if="isAttachmentPicked && !isSmall">
                <span class="mini-title">Text color</span>
                <div class="cover-mode-container">
                    <div
                        class="dark"
                        @click.stop.prevent="setTheme('dark')"
                        :class="{ selected: (isDark) }"
                        :style="{ backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(' + card.cover.value + ')' }"
                    >
                        <span>{{ card.title }}</span>
                    </div>
                    <div
                        class="light"
                        @click.stop.prevent="setTheme('light')"
                        :class="{ selected: !(isDark) }"
                        :style="{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(' + card.cover.value + ')' }"
                    >
                        <span>{{ card.title }}</span>
                    </div>
                </div>
            </section>
            <span class="mini-title">Colors</span>
            <section class="cover-colors">
                <div
                    @click.stop.prevent="setCoverColor('#7BC86C')"
                    :class="{ selected: color === '#7BC86C' }"
                    class="green color-pref-cover"
                ></div>
                <div
                    @click.stop.prevent="setCoverColor('#F5DD29')"
                    :class="{ selected: color === '#F5DD29' }"
                    class="yellow color-pref-cover"
                ></div>
                <div
                    @click.stop.prevent="setCoverColor('#FFAF3F')"
                    :class="{ selected: color === '#FFAF3F' }"
                    class="orange color-pref-cover"
                ></div>
                <div
                    @click.stop.prevent="setCoverColor('#EF7564')"
                    :class="{ selected: color === '#EF7564' }"
                    class="red color-pref-cover"
                ></div>
                <div
                    @click.stop.prevent="setCoverColor('#CD8DE5')"
                    :class="{ selected: color === '#CD8DE5' }"
                    class="purple color-pref-cover"
                ></div>
                <div
                    @click.stop.prevent="setCoverColor('#5BA4CF')"
                    :class="{ selected: color === '#5BA4CF' }"
                    class="blue color-pref-cover"
                ></div>
                <div
                    @click.stop.prevent="setCoverColor('#29CCE5')"
                    :class="{ selected: color === '#29CCE5' }"
                    class="light-blue color-pref-cover"
                ></div>
                <div
                    @click.stop.prevent="setCoverColor('#6DECA9')"
                    :class="{ selected: color === '#6DECA9' }"
                    class="light-green color-pref-cover"
                ></div>
                <div
                    @click.stop.prevent="setCoverColor('#FF8ED4')"
                    :class="{ selected: color === '#FF8ED4' }"
                    class="pink color-pref-cover"
                ></div>
                <div
                    @click.stop.prevent="setCoverColor('#172B4D')"
                    :class="{ selected: color === '#172B4D' }"
                    class="dark-blue color-pref-cover"
                ></div>
            </section>
            <span class="mini-title">Attachments</span>
            <section class="attachment-container" v-if="card.attachments.length">
                <section v-for="(attachment, index) in card.attachments" :key="attachment.link">
                    <img
                        :class="{ selected: attachmentIdx === index }"
                        @click.stop.prevent="setAttachmentAsCover(index)"
                        :src="attachment.link"
                        class="attachment"
                    />
                </section>
            </section>
            <section v-if="isLoading" class="cover-loading">
                <img
                    class="loading-svg"
                    src="https://res.cloudinary.com/dw85wdwsw/image/upload/v1648563503/dlcjcnpz0afvbj2mgrqj.svg"
                />
            </section>
            <input
                @change="attachFileFromSystem($event)"
                type="file"
                ref="file"
                style="display: none"
            />
            <button
                type="button"
                @click="$refs['file'].click()"
                class="create-btn"
            >Upload a cover image</button>
        </section>
    </section>
</template>

<script>
import FastAverageColor from 'fast-average-color'
// import axios from "axios"
import { uploadService } from "../services/upload-service.js"
// import { isDate } from 'moment'
import { utilService } from '../services/util-service.js'
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
            isDark: true,
            attachmentIdx: '',
            isLoading: false,
        }
    },
    computed: {
    },
    created() {
        if (this.card.cover.type === 'color') {
            this.color = this.card.cover.value
            this.isSmall = (this.card.cover.size === 'small') ? true : false
            this.isDark = (this.card.cover.theme === 'dark') ? true : false
        }
        if (this.card.cover.type === 'attachment') {
            this.attachmentIdx = this.card.attachments.findIndex(attach => attach.link === this.card.cover.value)
            this.isSmall = (this.card.cover.size === 'small') ? true : false
            this.isDark = (this.card.cover.theme === 'dark') ? true : false
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
            this.$emit('cardEdit', this.cardToEdit)
        },
        setTheme(theme) {
            this.cardToEdit = JSON.parse(JSON.stringify(this.card))
            this.isDark = (theme === 'dark') ? true : false;
            this.cardToEdit.cover.theme = (this.isDark) ? 'dark' : 'light'
            this.$emit('cardEdit', this.cardToEdit)
        },
        async attachFileFromSystem(event) {
            this.cardToEdit = JSON.parse(JSON.stringify(this.card))
            this.isLoading = true
            const result = await uploadService.uploadFromSystem(event)
            this.isLoading = false
            this.cardToEdit.attachments.unshift({
                id : utilService.makeId(),
                name: result.original_filename,
                link: result.secure_url
            })
            this.$emit('cardEdit', this.cardToEdit)
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
                this.cardToEdit.cover.theme = (this.isDark) ? 'dark' : 'light'
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