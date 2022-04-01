<template>
    <div class="group-edit-modal "
    :style="{ top: pos.bottom + 6 + 'px', left: pos.left + 'px' }"
    v-clickOutside.stop.prevent="closeModal"
    >
        <div class="group-modal-header">
            <div class="header-text-group-modal">
                <h1>Item actions</h1>
            </div>
            <div class="header-close-edit-group-modal" @click="closeModal">
                <svg
                    width="10"
                    height="10"
                    viewBox="0 0 18 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.58579 7L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683418 0.292893 0.292893C0.683418 -0.0976311 1.31658 -0.0976311 1.70711 0.292893L7 5.58579L12.2929 0.292893C12.6834 -0.0976311 13.3166 -0.0976311 13.7071 0.292893C14.0976 0.683418 14.0976 1.31658 13.7071 1.70711L8.41421 7L13.7071 12.2929C14.0976 12.6834 14.0976 13.3166 13.7071 13.7071C13.3166 14.0976 12.6834 14.0976 12.2929 13.7071L7 8.41421L1.70711 13.7071C1.31658 14.0976 0.683418 14.0976 0.292893 13.7071C-0.0976311 13.3166 -0.0976311 12.6834 0.292893 12.2929L5.58579 7Z"
                        fill="currentColor"
                    />
                </svg>
            </div>
        </div>

        <div class="group-modal-actions-list">
            <!-- <div class="group-modal-action">Add card...</div> -->
            <!-- <div class="group-modal-action" >Copy list...</div> -->
            <div class="group-modal-action" @click="convertToCard">Convert to card</div>
            <div class="group-modal-action" @click="removeTodo">Delete</div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        todoId: {
            type: String
        },
        checklistId: {
            type: String
        },
        pos: {
            type: Object
        }

    },
    methods: {
        closeModal() {
            this.$emit("close");
        },
        convertToCard() {
            this.$emit('convertToCard', { checklistId:this.checklistId, todoId:this.todoId })
            this.$emit("close");
        },
        removeTodo() {
            this.$emit('removeTodo', { checklistId:this.checklistId, todoId:this.todoId })
            this.$emit("close");
        },
    },
    emits: ['close', 'convertToCard', 'removeTodo']
}
</script>