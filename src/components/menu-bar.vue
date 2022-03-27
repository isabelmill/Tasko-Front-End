<template>
    <section class="side-bar-menu-main">
        <!-- main modal open  -->
        <section v-if="!showMenuBgc && !showMenuBgcRegular" class="side-bar-menu-start">
            <div class="side-bar-menu-header">
                <div class="side-bar-menu-header-text">
                    <h3>Menu</h3>
                </div>
                <div class="header-close-starred-boards-modal" @click="closeModal">
                    <span class="icon-sm icon-close"></span>
                </div>
            </div>
            <div class="side-bar-menu-container flex">
                <!-- here comes the backround of current board -->
                <p @click="openBgcBar">Change background</p>
            </div>
            <div class="side-bar-menu-activity-container flex">
                <span class="icon-sm icon-activity"></span>
                <h1>Activity</h1>
            </div>
        </section>

        <!-- open bgc modal open choose -->

        <transition name="slide">
            <section v-if="showMenuBgc && !showMenuBgcRegular" class="side-bar-menu-background">
                <div class="side-bar-menu-header-background">
                    <span @click="closeBgcBar" class="icon-sm icon-back"></span>
                    <div class="side-bar-menu-header-text-background">
                        <h3>Change background</h3>
                    </div>
                    <div class="header-close-starred-boards-modal" @click="closeModal">
                        <span class="icon-sm icon-close"></span>
                    </div>
                </div>
                <div class="side-bar-menu-background-container flex">
                    <img
                        src="https://a.trellocdn.com/prgb/dist/images/photos-thumbnail@3x.8f9c1323c9c16601a9a4.jpg"
                        alt
                    />
                    <img
                        @click="openBgcBarRegular"
                        src="https://a.trellocdn.com/prgb/dist/images/colors@2x.ec32a2ed8dd8198b8ef0.jpg"
                        alt
                    />
                </div>
            </section>
        </transition>

        <!-- choose regular color modal  -->

        <transition name="slide">
            <section v-if="showMenuBgcRegular" class="side-bar-menu-background-regular">
                <div class="side-bar-menu-header-background-regular">
                    <span @click="closeBgcBarRegular" class="icon-sm icon-back"></span>
                    <div class="side-bar-menu-header-text-background-regular">
                        <h3>Colors</h3>
                    </div>
                    <div class="header-close-starred-boards-modal" @click="closeModal">
                        <span class="icon-sm icon-close"></span>
                    </div>
                </div>
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
    </section>
</template>

<script>

export default {
    props: {
    },
    data() {
        return {
            menuBackground: false,
            showMenuBgc: false,
            showMenuBgcRegular: false,

        }
    },
    created() {
    },
    computed: {
    },
    methods: {
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
        setColor(color) {
            this.$emit('changeBgcColor',color)
        }
    },
    computed: {


    },
    components: {
    },
}
</script>