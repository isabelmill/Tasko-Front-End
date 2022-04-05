<template>
    <div class="unsplash-boards-modal">
        <div class="side-bar-menu-header-background-img flex">
            <!-- <span @click="closeBgcBarImg" class="icon-md icon-back"></span> -->
            <div class="side-bar-menu-header-text-background-img">
                <h3>
                    Photos by
                    <a
                        target="_blank"
                        href="https://unsplash.com/?utm_source=trello&utm_medium=referral&utm_campaign=api-credit"
                    >Unsplash</a>
                </h3>
            </div>
            <div class="header-close-img-boards-modal" @click="closeModal">
                <span class="icon-md icon-closed"></span>
            </div>
        </div>
        <hr />
        <div tabindex="0" class="search-unsplash">
            <span class="icon-sm icon-search"></span>
            <input  @keyup.enter.stop.prevent="onUploadImg" v-model="searchInput"  placeholder="Photos" type="text" />
        </div>
        <div class="side-bar-menu-background-container-img">
            <div class="unspash-imgs" v-for="photo in photos" :key="photo">
                <img @click="setBgc(photo.urls)" class="unspash-img" :src="photo.urls.thumb" alt />
            </div>
        </div>
    </div>
</template>

<script>
import { uploadImg } from '../services/unsplash-service.js';
// import unsplash from '../components/unsplash.vue'
export default {
    props: {
        // boards: {
        //     type: Array,
        //     required: true,
        // },
    },
    data() {
        return {
            isLoading: false,
            photos: null,
            searchInput: undefined,
            search: '',
        };
    },
    created() {
        this.onUploadImg()
    },
    methods: {
        closeModal() {
            this.$emit("close");
        },
        async onUploadImg() {
            const res = await uploadImg(this.searchInput, 20);
            this.photos = res.results
        },
        setBgc(photo) {
            this.$emit('changeBgc', photo)
        },
        updateSearch() {
            this.searchInput = this.search
        }
    },
    computed: {

    },
    components: {
    },
    emits: ['changeBgc', 'close']
}
</script>