<template>
    <h1>HEY UNSPLASH</h1>
    <img :src="photo" alt="">
</template>

<script>
import { uploadImg } from '../services/unsplash-service.js';
export default {
    data() {
        return {
            isLoading: false,
            isDragOver: false,
            photo: null
        };
    },
    created() {
        this.onUploadImg()
    },
    methods: {
        async onUploadImg() {
            const res = await uploadImg();
            console.log(res.results[3].preview_photos[0].urls.regular);
            this.photo = res.results[1].preview_photos[0].urls.regular
        },
    },
};
</script>