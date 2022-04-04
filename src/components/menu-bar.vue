<template>
    <section class="side-bar-menu-main">
        <!-- main modal open  -->
        <section
            v-if="!showMenuBgc && !showMenuBgcRegular && !showMenuBgcImg"
            class="side-bar-menu-start"
        >
            <div class="side-bar-menu-header">
                <div class="side-bar-menu-header-text">
                    <h3>Menu</h3>
                </div>
                <div class="header-close-side-bar-menu" @click="closeModal">
                    <span class="icon-md icon-closed"></span>
                </div>
            </div>
            <hr />
            <div class="side-bar-menu-container flex">
                <div
                    :style="board.background ? { 'backgroundColor': board.background } : { 'background-image': `url(${board.backgroundThumb})` }"
                    class="board-background"
                ></div>
                <p @click="openBgcBar">Change background</p>
            </div>
            <hr />
            <div class="side-bar-menu-activity-container">
                <div class="activity-header flex">
                    <span class="icon-sm icon-activity"></span>
                    <h1>Activity</h1>
                </div>
                <div
                    class="activities-render flex"
                    v-for=" activity in board.activities"
                    :key="activity"
                >
                    <img class="member-avatar" v-if="activity.byMember.imgUrl" :src="activity.byMember.imgUrl" alt />
                    <div
                        v-else class="member-avatar-in-activity"
                    >{{ setMemberLetters(activity.byMember.fullname) }}</div>
                    <div class="activity-info">
                        <div class="activities-info-txt flex">
                            <p>
                                <span>{{ activity.byMember.username }}</span>
                                {{ activity.txt }}
                            </p>
                        </div>
                        <div class="activity-timestamp">
                            <!-- {{moment(activity.createdAt).startOf('hour').fromNow()}} -->
                            {{ generateTime(activity.createdAt) }}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- open bgc modal open choose -->

        <transition name="slide">
            <section
                v-if="showMenuBgc && !showMenuBgcRegular && !showMenuBgcImg"
                class="side-bar-menu-background"
            >
                <div class="side-bar-menu-header-background">
                    <span @click="closeBgcBar" class="icon-md icon-back"></span>
                    <div class="side-bar-menu-header-text-background">
                        <h3>Change background</h3>
                    </div>
                    <div class="header-close-background-boards-modal" @click="closeModal">
                        <span class="icon-md icon-closed"></span>
                    </div>
                </div>
                <hr />
                <div class="side-bar-menu-background-container flex">
                    <div class="bgc-photos">
                        <img
                            @click="openBgcBarImg"
                            src="https://a.trellocdn.com/prgb/dist/images/photos-thumbnail@3x.8f9c1323c9c16601a9a4.jpg"
                            alt
                        />
                        <p>Photos</p>
                    </div>
                    <div class="regular-bgc-color">
                        <img
                            @click="openBgcBarRegular"
                            src="https://a.trellocdn.com/prgb/dist/images/colors@2x.ec32a2ed8dd8198b8ef0.jpg"
                            alt
                        />
                        <p>Colors</p>
                    </div>
                </div>
            </section>
        </transition>

        <!-- choose regular color modal  -->

        <transition name="slide">
            <section
                v-if="showMenuBgcRegular && !showMenuBgcImg"
                class="side-bar-menu-background-regular"
            >
                <div class="side-bar-menu-header-background-regular">
                    <span @click="closeBgcBarRegular" class="icon-md icon-back"></span>
                    <div class="side-bar-menu-header-text-background-regular">
                        <h3>Colors</h3>
                    </div>
                    <div class="header-close-img-boards-modal" @click="closeModal">
                        <span class="icon-md icon-closed"></span>
                    </div>
                </div>
                <hr />
                <div class="side-bar-menu-background-container-regular flex">
                    <div @click="setColor('#0079BF')" class="color-menu blue"></div>
                    <div @click="setColor('#D29034')" class="color-menu yellow"></div>
                    <div @click="setColor('#519839')" class="color-menu green"></div>
                    <div @click="setColor('#B04632')" class="color-menu red"></div>
                    <div @click="setColor('#89609E')" class="color-menu purple"></div>
                    <div @click="setColor('#CD5A91')" class="color-menu pink"></div>
                    <div @click="setColor('#4BBF6B')" class="color-menu light-green"></div>
                    <div @click="setColor('#00AECC')" class="color-menu light-blue"></div>
                    <div @click="setColor('#838C91')" class="color-menu grey"></div>
                </div>
            </section>
        </transition>

        <transition name="slide">
            <section v-if="showMenuBgcImg" class="side-bar-menu-background-img">
                <div class="side-bar-menu-header-background-img flex">
                    <span @click="closeBgcBarImg" class="icon-md icon-back"></span>
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
                    <input
                        v-model="searchInput"
                        @keyup.enter="updateSearchinput"
                        placeholder="Photos"
                        type="text"
                    />
                </div>
                <div class="side-bar-menu-background-container-img flex">
                    <unsplash
                        v-if="unsplashOpen"
                        :searchInput="unsplashSearch"
                        @changeBgc="updateBgc"
                    ></unsplash>
                </div>
            </section>
        </transition>
    </section>
</template>

<script>
import moment from 'moment';
import unsplash from '../components/unsplash.vue'
export default {
    props: {
        board: Object,
    },
    data() {
        return {
            menuBackground: false,
            showMenuBgc: false,
            showMenuBgcRegular: false,
            showMenuBgcImg: false,
            searchInput: '',
            unsplashSearch: 'background',
            unsplashOpen: true,

        }
    },
    created() {

    },
    methods: {
        generateTime(time) {
            const dateTimeAgo = moment(time).fromNow();
            return dateTimeAgo
        },
        closeModal() {
            this.$emit("close");
        },
        closeBgcBar() {
            this.showMenuBgc = false;
        },
        openBgcBar() {
            this.showMenuBgc = true;
        },
        closeBgcBarRegular() {
            this.showMenuBgcRegular = false;
        },
        openBgcBarRegular() {
            this.showMenuBgcRegular = true;
        },
        closeBgcBarImg() {
            this.showMenuBgcImg = false;
        },
        openBgcBarImg() {
            this.showMenuBgcImg = true;
        },
        setColor(color) {
            this.$emit('changeBgcColor', color)
        },
        async updateSearchinput() {
            this.unsplashOpen = !this.unsplashOpen
            this.unsplashOpen = await !this.unsplashOpen
            this.unsplashSearch = this.searchInput
        },
        updateBgc(photo) {
            console.log('photo:', photo);
            this.$emit('changeBgcPhoto', photo)
        },
        setMemberLetters(fullname) {
            const firstLetters = fullname.split(' ').map(word => word[0]).join('');
            return firstLetters.toUpperCase()
        },
    },
    computed: {


    },
    components: {
        unsplash,
        moment
    },
    emits: ['changeBgcPhoto', 'changeBgcColor']
}
</script>