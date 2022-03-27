
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
                <section class="cover-size-small">
                    <div class="cover-header"></div>
                    <div class="cover-main">
                        <div class="line-1"></div>
                        <div class="line-2"></div>
                        <div class="cover-footer">
                            <div class="box-1"></div>
                            <div class="box-2"></div>
                        <div class="circle"></div>
                        </div>
                    </div>
                </section>
                <section class="cover-size-all">
                    <div class="cover-main">
                        <div class="line-1"></div>
                        <div class="line-2"></div>
                    </div>
                </section>
            </section>
            <span class="mini-edit-title">Colors</span>
            <section class="cover-colors">
                <div @click="setCoverColor('#61BD4F')" :class="{ selected: color === '#61BD4F' }" class="green color-pref-cover"></div>
                <div @click="setCoverColor('#F2D600')" :class="{ selected: color === '#F2D600' }" class="yellow color-pref-cover"></div>
                <div @click="setCoverColor('#FF9F1A')" :class="{ selected: color === '#FF9F1A' }" class="orange color-pref-cover"></div>
                <div @click="setCoverColor('#EB5A46')" :class="{ selected: color === '#EB5A46' }" class="red color-pref-cover"></div>
                <div @click="setCoverColor('#C377E0')" :class="{ selected: color === '#C377E0' }" class="purple color-pref-cover"></div>
                <div @click="setCoverColor('#0079BF')" :class="{ selected: color === '#0079BF' }" class="blue color-pref-cover"></div>
                <div @click="setCoverColor('#00C2E0')" :class="{ selected: color === '#00C2E0' }" class="light-blue color-pref-cover"></div>
                <div @click="setCoverColor('#51E898')" :class="{ selected: color === '#51E898' }" class="light-green color-pref-cover"></div>
                <div @click="setCoverColor('#FF78CB')" :class="{ selected: color === '#FF78CB' }" class="pink color-pref-cover"></div>
                <div @click="setCoverColor('#344563')" :class="{ selected: color === '#344563' }" class="dark-blue color-pref-cover"></div>
            </section>
            <span class="mini-edit-title">Attachments</span>
            <button type="button" @click="createNewLabel" class="create-btn">Upload a cover image</button>
        </section>
    </section>
</template>

<script>
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
            color:'',
        }
    },
    computed: {
    },
    created() {
    },
    methods: {
        close() {
            this.$emit('actionsClose')
        },
        setCoverColor(color) {
            this.color = color



            // this.$emit('cardEdit', this.cardToEdit)

        },
    },
    emits: ['actionsClose', 'cardEdit']

}
</script>

<style>
</style>