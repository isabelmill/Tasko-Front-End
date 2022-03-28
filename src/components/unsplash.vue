<template>
    <div class="unspash-imgs" v-for="photo in photos" :key="photo">
        <img @click="setBgc(photo.urls.full)" class="unspash-img" :src="photo.urls.full" alt />
    </div>
</template>

<script>
import { uploadImg } from '../services/unsplash-service.js';
export default {
    props: {
        searchInput: String,
    },
    data() {
        return {
            isLoading: false,
            photos: null,
        };
    },
    created() {
        this.onUploadImg()
    },
    methods: {
        async onUploadImg() {
            const res = await uploadImg(this.searchInput);
            this.photos = res.results
            // this.photo = res.results[1].preview_photos[0].urls.regular
        },
        setBgc(photo) {
            console.log('photo:', photo);
            this.$emit('changeBgc',photo)
        }
    },
            emits: ['changeBgc']
};
</script>