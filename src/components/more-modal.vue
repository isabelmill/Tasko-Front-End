<template>
    <div class="starred-boards-modal">
        <div class="starred-boards-header">
            <div class="header-text-starred-boards-modal">
                <h1>More</h1>
            </div>
            <div class="header-close-starred-boards-modal" @click="closeModal">
                <span class="icon-sm icon-closed"></span>
            </div>
        </div>

        <div class="modal-starred-boards-list">
            <div class="modal-starred-board-more">
                <div class="boards-render-modal-more">
                    <!-- <div class="board-background-starred-modal"></div> -->
                    <div class="modal-more-boards" @click="openRecentBoardsModal()">
                        <p>Recent boards</p>
                        <svg width="17" height="17" role="presentation" focusable="false" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M16.7071 12.7071L9.63606 19.7781C9.24554 20.1687 8.61237 20.1687 8.22185 19.7781C7.83132 19.3876 7.83132 18.7544 8.22185 18.3639L14.5858 12L8.22185 5.636C7.83132 5.24548 7.83132 4.61231 8.22185 4.22179C8.61237 3.83126 9.24554 3.83126 9.63606 4.22179L16.7071 11.2929C17.0977 11.6834 17.0977 12.3165 16.7071 12.7071Z"
                                fill="currentColor"></path>
                        </svg>
                    </div>
                    
                    <recent-boards-modal v-if="openRecentModal && boards" :boards="boards"
                        :style="{ top: '48' + 'px', left: 0 }" v-clickOutside="closeRecentModal"
                        @close="closeRecentModal"></recent-boards-modal>

                    <div @click="openStarredBoardsModal()" class="modal-more-boards">
                        <p>Starred boards</p>
                        <svg width="17" height="17" role="presentation" focusable="false" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M16.7071 12.7071L9.63606 19.7781C9.24554 20.1687 8.61237 20.1687 8.22185 19.7781C7.83132 19.3876 7.83132 18.7544 8.22185 18.3639L14.5858 12L8.22185 5.636C7.83132 5.24548 7.83132 4.61231 8.22185 4.22179C8.61237 3.83126 9.24554 3.83126 9.63606 4.22179L16.7071 11.2929C17.0977 11.6834 17.0977 12.3165 16.7071 12.7071Z"
                                fill="currentColor"></path>
                        </svg>
                    </div>

                    <starred-boards-modal v-if="openStarredModal && boards" :boards="boards"
                        :style="{ top: '48' + 'px', left: 0 }" v-clickOutside="closeEditMode" @close="closeEditMode">
                    </starred-boards-modal>

                    <div class="modal-more-boards" @click="openTemplateModal()">
                        <p>Templates</p>
                        <svg width="17" height="17" role="presentation" focusable="false" viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M16.7071 12.7071L9.63606 19.7781C9.24554 20.1687 8.61237 20.1687 8.22185 19.7781C7.83132 19.3876 7.83132 18.7544 8.22185 18.3639L14.5858 12L8.22185 5.636C7.83132 5.24548 7.83132 4.61231 8.22185 4.22179C8.61237 3.83126 9.24554 3.83126 9.63606 4.22179L16.7071 11.2929C17.0977 11.6834 17.0977 12.3165 16.7071 12.7071Z"
                                fill="currentColor"></path>
                        </svg>
                    </div>

                    <template-modal v-if="openTemplate && boards" :boards="boards"
                        :style="{ top: '48' + 'px', left: 0 }" v-clickOutside="closeTemplate" @close="closeTemplate"
                        @duplicateTemplate="saveNewBoard"></template-modal>
                </div>
            </div>

        </div>
    </div>
</template>
<!-- :style="openStarredModal ? { visibility: 'hidden' } : { visibility: 'visible' }" -->
<script>
import templateModal from "./template-modal.vue"
import starredBoardsModal from "./starred-boards-modal.vue"
import recentBoardsModal from "./recent-boards-modal.vue"

export default {
    props: {
        boards: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            openStarredModal: false,
            openRecentModal: false,
            openTemplate: false,
            pos: 0,
            posRecent: 0,
            posTemplate: 0,
        }
    },
    methods: {
        closeModal() {
            this.$emit("close");
        },
        openTemplateModal() {
            this.openTemplate = true
        },
        closeTemplate() {
            this.openTemplate = false;
        },
        openRecentBoardsModal() {
            this.openRecentModal = true
            // this.$emit("close");
        },
        closeRecentModal() {
            this.openRecentModal = false;
        },
        openStarredBoardsModal() {
            this.openStarredModal = true
        },
        closeEditMode() {
            this.openStarredModal = false;
        },
        calcPosOfBox() {
            this.pos = this.$refs['starred'].getBoundingClientRect()
            this.posRecent = this.$refs['recent'].getBoundingClientRect()
            this.posTemplate = this.$refs['template'].getBoundingClientRect()
        },
        saveNewBoard(board) {
            this.$emit("duplicateTemplate", board);
        }
    },
    computed: {

    },
    components: {
        recentBoardsModal,
        starredBoardsModal,
        templateModal,
    },
}
</script>