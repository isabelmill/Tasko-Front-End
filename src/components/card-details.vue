<template>
    <section>
        <section
            v-if="Object.keys(card.cover).length"
            class="card-details-cover"
            ref="headerCover"
            :class="{ color: card.cover.type === 'color', attachmentofdetails: card.cover.type === 'attachment' }"
            v-bind:style="[(card.cover.type === 'color') ? { backgroundColor: card.cover.value } : { backgroundImage: 'url(' + card.cover.value + ')' }]"
        >
            <div
                v-if="card.cover.type"
                class="card-details-cover-close"
                @click.stop.prevent="closeModal"
            >
                <span class="icon-md icon-closed"></span>
            </div>
            <button
                class="card-details-btn-header"
                @click.stop.prevent="openThisModal('coverModal', $event)"
            >
                <span class="icon-sm icon-cover"></span>
                Cover
            </button>
        </section>

        <section class="card-details-container flex">
            <div class="card-details-header">
                <div class="card-details-header-icon">
                    <span class="icon-lg icon-card"></span>
                    <div class="card-details-title flex">
                        <p>{{ card.title }}</p>
                    </div>
                </div>
                <div
                    v-if="!Object.keys(card.cover).length"
                    class="card-details-no-cover-close"
                    @click.stop.prevent="closeModal"
                >
                    <span class="icon-md icon-closed"></span>
                </div>
            </div>

            <div class="card-details-list-name">
                <p>in list {{ group.title }}</p>
            </div>

            <!-- Lables members and date adding area  -->
            <section class="card-details-actions-container-edit-btns flex">
                <section class="card-details-actions-container">
                    <section class="card-details-main flex">
                        <div
                            v-if="card.members.length > 0 || card.labels.length > 0 || card.date"
                            class="card-details-members-labels-date"
                        >
                            <div
                                v-if="card.members.length > 0"
                                class="card-detail-member-container-main"
                            >
                                <label v-if="card.members.length > 0" for>Members</label>
                                <div
                                    class="card-details-members-container"
                                    v-if="card.members.length > 0"
                                    for
                                >
                                    <section
                                        class="card-details-members"
                                        v-for="member in card.members"
                                        :key="member._id"
                                    >
                                        <div class="card-details-member-img">
                                            <div
                                                class="member"
                                            >{{ setMemberLetters(member.fullname) }}</div>
                                        </div>
                                    </section>
                                </div>
                            </div>

                            <div class="card-detail-labels-container-main">
                                <label v-if="card.labels.length > 0" for>Labels</label>
                                <div
                                    class="card-details-labels-container"
                                    v-if="card.labels.length > 0"
                                    for
                                >
                                    <section
                                        class="card-details-labels"
                                        v-for="label in card.labels"
                                        :key="label"
                                    >
                                        <div
                                            class="card-details-label"
                                            :style="{ 'backgroundColor': board.labels[board.labels.findIndex(labelToFind => labelToFind.id === label)].color }"
                                        >
                                            <p>
                                                {{
                                                    board.labels[board.labels.findIndex(labelToFind => labelToFind.id ===
                                                        label)].title
                                                }}
                                            </p>
                                        </div>
                                    </section>
                                </div>
                            </div>

                            <div class="card-detail-date-container-main">
                                <label v-if="card.date" for>Due date</label>
                                <div class="card-details-dates-container" v-if="card.date" for>
                                    <section class="card-details-dates">
                                        <div
                                            v-if="!card.isComplete"
                                            @click.stop.prevent="toggleCardComplete"
                                            class="checkbox"
                                        ></div>

                                        <img
                                            v-if="card.isComplete"
                                            @click.stop.prevent="toggleCardComplete"
                                            class="done-img"
                                            src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23fff' viewBox='-3 -4 16 16'%3E%3Cpath d='M1.49 3.215a.667.667 0 0 0-.98.903l2.408 2.613c.358.351.892.351 1.223.02l.243-.239a1689.645 1689.645 0 0 0 2.625-2.589l.027-.026a328.23 328.23 0 0 0 2.439-2.429.667.667 0 1 0-.95-.936c-.469.476-1.314 1.316-2.426 2.417l-.027.026a1368.126 1368.126 0 0 1-2.517 2.482L1.49 3.215z'/%3E%3C/svg%3E"
                                            alt
                                        />

                                        <!-- <input @click="toggleCardComplete"  type="checkbox" /> -->

                                        <div class="card-details-date">
                                            <p>{{ setDateFormat(card.date) }} at {{ setHourFormat(card.date) }}</p>

                                            <span
                                                v-if="card.date < Date.now() && !card.isComplete"
                                                class="overdue"
                                            >overdue</span>
                                            <span v-if="card.isComplete" class="complete">complete</span>

                                            <svg
                                                class="down"
                                                width="20"
                                                height="20"
                                                role="presentation"
                                                focusable="false"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M11.2929 16.7071L4.22185 9.63606C3.83132 9.24554 3.83132 8.61237 4.22185 8.22185C4.61237 7.83133 5.24554 7.83133 5.63606 8.22185L12 14.5858L18.364 8.22185C18.7545 7.83132 19.3877 7.83132 19.7782 8.22185C20.1687 8.61237 20.1687 9.24554 19.7782 9.63606L12.7071 16.7071C12.3166 17.0977 11.6834 17.0977 11.2929 16.7071Z"
                                                    fill="currentColor"
                                                />
                                            </svg>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>

                        <!-- Description adding area  -->
                        <section v-clickOutside="closeTextArea">
                            <div class="card-details-description">
                                <span class="icon-lg icon-desc"></span>
                                <h3>Description</h3>
                                <button
                                    @click.stop.prevent="openTextArea"
                                    v-if="card.description"
                                >Edit</button>
                            </div>

                            <div
                                class="card-details-input"
                                :style="showDesc ? {
                                    'padding-left': '42px',
                                    'padding-top': '18px'
                                } : null"
                            >
                                <div
                                    v-if="!showDesc && !card.description"
                                    @click.stop.prevent="openTextArea"
                                    class="open-input-btn"
                                >Add a more detailed description...</div>
                                <div
                                    class="card-description"
                                    @click.stop.prevent="openTextArea"
                                    v-if="!showDesc"
                                >
                                    {{
                                        card.description
                                    }}
                                </div>
                                <textarea
                                    v-focus
                                    placeholder="Add a more detailed description..."
                                    v-if="showDesc"
                                    v-model="description"
                                    name="description"
                                    id
                                    cols="60"
                                    rows="4"
                                ></textarea>
                                <div v-if="showDesc" class="card-details-text-add-btn">
                                    <button @click.stop.prevent="updateCardDesc">Save</button>
                                    <span
                                        @click.stop.prevent="closeTextArea"
                                        class="icon-xl icon-closed"
                                    ></span>
                                </div>
                            </div>
                        </section>

                        <!-- Attachments area  -->
                        <div
                            v-if="isLoading || card.attachments.length > 0"
                            class="card-details-activity-show-attachments"
                        >
                            <div class="card-details-attachments">
                                <span class="icon-lg icon-attachment"></span>
                                <h3>Attachments</h3>
                            </div>
                            <div v-if="isLoading" class="loading-attachment">
                                <div class="loading-container">
                                    <img
                                        class="loading-svg"
                                        src="https://res.cloudinary.com/dw85wdwsw/image/upload/v1648563503/dlcjcnpz0afvbj2mgrqj.svg"
                                    />
                                    processing...
                                </div>
                            </div>
                            <div v-if="card.attachments.length">
                                <div
                                    v-for="attachment in card.attachments"
                                    class="card-attachments-area"
                                    :key="attachment.link"
                                >
                                    <img
                                        @vnode-mounted="attachmentBGC($event)"
                                        :src="attachment.link"
                                        alt
                                    />
                                    <div class="card-attachment-area-main">
                                        <div class="card-attachment-area-header">
                                            <p>{{ attachment.name }}</p>
                                            <span class="icon-sm icon-link-arrow"></span>
                                        </div>
                                        <div class="attachment-area-body flex">
                                            <p>When added... -</p>
                                            <a>Comment</a>
                                            <span>-</span>
                                            <a>Delete</a>
                                            <span>-</span>
                                            <a>Edit</a>
                                        </div>
                                        <div class="attachment-area-footer">
                                            <span class="icon-sm icon-cover"></span>
                                            <p>Make cover</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!--checkLIST area -->
                        <div class="checklist">
                            <div
                                v-if="card.checklists.length"
                                class="card-details-checklist-show-details"
                            >
                                <div
                                    v-for="checklist in card.checklists"
                                    :key="checklist.id"
                                    class="card-details-checklist"
                                >
                                    <div class="checklist-header">
                                        <div class="checklist-title">
                                            <div class="icon-lg icon-checklist"></div>
                                            <h3
                                                v-if="!isChecklistOpen || currChecklist.id !== checklist.id"
                                                @click.stop.prevent="openChecklist(checklist)"
                                            >{{ checklist.title }}</h3>
                                            <div
                                                v-if="isChecklistOpen && currChecklist.id === checklist.id"
                                            >
                                                <textarea
                                                    v-clickOutside="closeChecklist"
                                                    :style="{ height: parseInt((currChecklist.title.length / 64) + 1) * 24 + 'px' }"
                                                    class="edit-todo-text"
                                                    v-model="currChecklist.title"
                                                    @keydown.enter.stop.prevent="saveChecklistTitle"
                                                />
                                                <div class="edit-options">
                                                    <div class="main-actions">
                                                        <button
                                                            @click.stop.prevent="saveChecklistTitle"
                                                            class="checklist-btn save-btn"
                                                        >Save</button>
                                                        <div class="todo-discard">
                                                            <div class="icon-lg icon-closed"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            v-if="!isChecklistOpen"
                                            @click.stop.prevent="deleteChecklist(checklist.id)"
                                            class="checklist-btn checklkist-delete"
                                        >Delete</button>
                                    </div>

                                    <div class="todo-bar">
                                        <div class="bar-percentage">{{ todoPercentage(checklist) }}%</div>
                                        <el-progress
                                            class="bar"
                                            :stroke-width="8"
                                            :show-text="false"
                                            :percentage="todoPercentage(checklist)"
                                            :color="calcBarColor(checklist)"
                                        />
                                    </div>
                                    <div v-if="checklist.todos" class="todos-container">
                                        <div
                                            class="checklist-todo"
                                            v-for="todo in checklist.todos"
                                            :key="todo.id"
                                        >
                                            <!-- //STYLE CHECKBOX IF COMPLETE TODO AND UPDATE BAR -->
                                            <div class="todo-checkbox">
                                                <div
                                                    class="checkbox"
                                                    :class="{ checkboxchecked: todo.isComplete === true }"
                                                    @click.stop.prevent="checkboxTodo(checklist, todo)"
                                                >
                                                    <img
                                                        v-show="todo.isComplete"
                                                        style="z-index: 40"
                                                        src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23fff' viewBox='-3 -4 16 16'%3E%3Cpath d='M1.49 3.215a.667.667 0 0 0-.98.903l2.408 2.613c.358.351.892.351 1.223.02l.243-.239a1689.645 1689.645 0 0 0 2.625-2.589l.027-.026a328.23 328.23 0 0 0 2.439-2.429.667.667 0 1 0-.95-.936c-.469.476-1.314 1.316-2.426 2.417l-.027.026a1368.126 1368.126 0 0 1-2.517 2.482L1.49 3.215z'/%3E%3C/svg%3E"
                                                    />
                                                </div>
                                            </div>
                                            <div
                                                class="todo-preview"
                                                @click.stop.prevent="openTodo(checklist, todo)"
                                            >
                                                <span
                                                    v-if="!isOpen(checklist, todo)"
                                                    class="todo-text"
                                                >{{ todo.text }}</span>
                                                <div
                                                    v-if="!isOpen(checklist, todo)"
                                                    @click.stop.prevent="openChecklistOptions(checklist, todo, $event)"
                                                    class="todo-options"
                                                >
                                                    <div
                                                        class="icon-sm icon-overflow-menu-horizontal"
                                                    ></div>
                                                </div>
                                                <div v-if="isOpen(checklist, todo)">
                                                    <!-- <div style="fontSize: 11px, width: 100%, visibility:hidden"></div> -->
                                                    <textarea
                                                        @keydown.enter.prevent="saveTodo"
                                                        v-clickOutside.stop.prevent="closeTodo"
                                                        :style="{ height: parseInt((currOpenTodo.text.length / 64) + 1) * 24 + 'px' }"
                                                        v-model="currOpenTodo.text"
                                                        class="edit-todo-text"
                                                    ></textarea>
                                                    <div
                                                        @click.stop.prevent="closeTodo"
                                                        class="edit-options"
                                                    >
                                                        <div class="main-actions">
                                                            <button
                                                                @click.stop.prevent="saveTodo"
                                                                class="checklist-btn save-btn"
                                                            >Save</button>
                                                            <div class="todo-discard">
                                                                <div class="icon-lg icon-closed"></div>
                                                            </div>
                                                        </div>
                                                        <div
                                                            @click.stop.prevent="openChecklistOptions(checklist, todo, $event)"
                                                            class="more-options"
                                                        >
                                                            <div
                                                                class="icon-sm icon-overflow-menu-horizontal"
                                                            ></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="add-todo-container">
                                        <button
                                            v-if="!addingNewTodo || currChecklist.id !== checklist.id"
                                            @click.stop.prevent="openChecklistInput(checklist)"
                                            class="checklist-btn checklist-add-item"
                                        >Add an item</button>
                                        <div
                                            v-if="addingNewTodo && currChecklist.id === checklist.id"
                                            class="checklist-input-container"
                                        >
                                            <textarea
                                                @keydown.enter.stop.prevent="createTodo"
                                                class="add-todo-text"
                                                v-clickOutside="closeAdder"
                                                :style="{ minHeight: parseInt((currOpenTodo.text.length / 64) + 1) * 24 + 'px' }"
                                                v-model="currOpenTodo.text"
                                                placeholder="Add an item"
                                                type="text"
                                                ref="addingtextarea"
                                                v-focus
                                            />
                                            <div class="edit-options">
                                                <div class="main-actions">
                                                    <button
                                                        @click.stop.prevent="createTodo"
                                                        class="checklist-btn save-btn"
                                                    >Add</button>
                                                    <div class="todo-discard">
                                                        <div
                                                            class="icon-lg icon-closed cursor-pointer"
                                                        ></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Activity Area  -->
                        <div class="card-details-activity-show-details">
                            <div class="card-details-activity">
                                <span class="icon-lg icon-activity"></span>
                                <h3>Activity</h3>
                            </div>
                            <button>Show details</button>
                        </div>

                        <div class="card-details-user-comment flex">
                            <div class="card-details-user-avatar member">
                                <div>{{ loggedinUser ? setMemberLetters(loggedinUser.fullname) : 'GU' }}</div>
                            </div>
                            <div
                                v-if="!showInput"
                                class="card-details-input"
                                @click="showInput = true"
                                v-clickOutside="closeInput"
                            >Write a comment...</div>
                            <div
                                v-if="showInput"
                                class="card-details-input-show"
                                v-clickOutside="closeInput"
                            >
                                <input
                                    placeholder="Write a comment..."
                                    type="text"
                                    @keydown.enter="addCardComment"
                                    v-model="newComment.txt"
                                />
                                <div class="card-details-all-btns flex">
                                    <button
                                        v-if="showInput"
                                        class="card-details-save-btn"
                                        @click.stop.prevent="addCardComment"
                                    >Save</button>
                                    <!-- <div v-if="showInput" class="icon-btns-inside-input">
                                        <span class="icon-smd icon-attachment"></span>
                                        <span class="icon-smd icon-shtrudel"></span>
                                        <span class="icon-smd icon-smiley"></span>
                                        <span class="icon-smd icon-card"></span>
                                    </div>-->
                                </div>
                            </div>
                        </div>

                        <!-- comments render  -->
                        <div v-if="card.comments">
                            <div
                                class="comments-rendering flex"
                                v-for="comment in card.comments"
                                :key="comment"
                            >
                                <div class="card-details-user-avatar member">
                                    <div>{{ setMemberLetters(comment.byMember.fullname) }}</div>
                                </div>
                                <div class="comment-info">
                                    <div class="comment-info-name-date">
                                        <p>
                                            <span>{{ comment.byMember.username }}</span>
                                            {{ generateTime(comment.createdAt) }}
                                        </p>
                                    </div>
                                    <div class="comment-info-txt">
                                        <p>{{ comment.txt }}</p>
                                    </div>
                                    <div class="comment-info-btns flex">
                                        <!-- <p>Edit</p> -->
                                        <!-- <a>-</a> -->
                                        <p @click="deleteComment(comment.id)">Delete</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </section>

                <!-- the side-bar with all btn actions and editing  -->
                <section class="card-details-edit">
                    <label for>Add to card</label>

                    <button
                        ref="membersBtn"
                        class="card-details-btn"
                        @click.stop.prevent="openThisModal('membersModal', $event)"
                    >
                        <span class="icon-sm icon-member"></span>
                        Members
                    </button>

                    <button
                        ref="labelBtn"
                        class="card-details-btn"
                        @click.stop.prevent="openThisModal('labelModal', $event)"
                    >
                        <span class="icon-sm icon-label"></span>
                        Labels
                    </button>

                    <button
                        ref="checklistBtn"
                        @click.stop.prevent="openThisModal('checklistModal', $event)"
                        class="card-details-btn"
                    >
                        <span class="icon-sm icon-checklist"></span>
                        Checklist
                    </button>

                    <button
                        ref="datesBtn"
                        class="card-details-btn"
                        @click.stop.prevent="openThisModal('datesModal', $event)"
                    >
                        <svg
                            class="date-svg"
                            width="16"
                            height="16"
                            role="presentation"
                            focusable="false"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M13 6C13 5.44772 12.5523 5 12 5C11.4477 5 11 5.44772 11 6V12C11 12.2652 11.1054 12.5196 11.2929 12.7071L13.7929 15.2071C14.1834 15.5976 14.8166 15.5976 15.2071 15.2071C15.5976 14.8166 15.5976 14.1834 15.2071 13.7929L13 11.5858V6Z"
                                fill="currentColor"
                            />
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20Z"
                                fill="currentColor"
                            />
                        </svg>
                        Dates
                    </button>

                    <button
                        ref="attachmentBtn"
                        class="card-details-btn"
                        @click.stop.prevent="openThisModal('attachmentModal', $event)"
                    >
                        <span class="icon-sm icon-attachment"></span>
                        Attachment
                    </button>

                    <button
                        v-if="!card.cover.type"
                        ref="coverBtn"
                        class="card-details-btn"
                        @click.stop.prevent="openThisModal('coverModal', $event)"
                    >
                        <span class="icon-sm icon-cover"></span>
                        Cover
                    </button>

                    <label for>Actions</label>

                    <button
                        ref="copyBtn"
                        class="card-details-btn"
                        @click.stop.prevent="openThisModal('copyModal', $event)"
                    >
                        <span class="icon-sm icon-copy"></span>
                        Copy
                    </button>

                    <button
                        ref="deleteBtn"
                        class="card-details-btn"
                        @click.stop.prevent="deleteWarn"
                    >
                        <span class="icon-sm icon-archive"></span>
                        Delete
                    </button>
                </section>
            </section>
        </section>

        <!-- CR -->
        <!-- CR -->
        <!-- CR -->
        <section v-if="isModalShown">
            <component
                @uploadComplete="notifyComplete"
                @uploading="notifyUploading"
                @boardEdit="editBoard"
                @cardEdit="editCard"
                @actionsClose="closeMenu"
                @cardCopySave="sendCardCopyToStore"
                :board="board"
                :card="card"
                :group="group"
                :pos="pos"
                :is="currModal"
            ></component>
        </section>
        <!-- CR -->
        <!-- CR -->
        <!-- CR -->
        <todo-options
            @convertToCard="convertTodoToCard"
            @removeTodo="deleteTodo"
            @close="optionsOpen = false"
            v-if="optionsOpen"
            :checklistId="checklistId"
            :todoId="todoId"
            :pos="pos"
        ></todo-options>

        <delete-warning
            @closeDeleteWarning="closeWarning"
            @deleteConfirmed="deleteCard"
            v-if="warningOpen"
            :title="warningTitle"
            :pos="pos"
        ></delete-warning>
    </section>
</template>

<script>
import labelModal from "./label-modal-cmp.vue";
import membersModal from "./memebers-modal-cmp.vue";
import datesModal from "./date-modal-cmp.vue";
import coverModal from "./cover-modal-cmp.vue";
import attachmentModal from "./attachment-modal-cmp.vue";
import deleteWarning from "./delete-warning-modal-cmp.vue";
import FastAverageColor from 'fast-average-color';
import copyModal from "./copy-modal-cmp.vue";
import checklistModal from "./checklist-modal-cmp.vue";
import { boardService } from "../services/board-service.js"
import moment from 'moment';
import todoOptions from "./todo-options-cmp.vue";

export default {

    name: 'card-details',
    props: {
        card: {
            type: Object
        },
        group: {
            type: Object
        },
        board: {
            type: Object
        }
    },
    components: {
        labelModal,
        membersModal,
        datesModal,
        deleteWarning,
        coverModal,
        attachmentModal,
        copyModal,
        checklistModal,
        moment,
        todoOptions
    },
    created() {
        this.description = this.card.description
    },
    mounted() {

    },
    data() {
        return {
            currModal: null,
            isModalShown: false,
            warningOpen: false,
            warningTitle: '',
            pos: 0,
            showInput: false,
            showDesc: false,
            description: '',
            newComment: boardService.getEmptyComment(),
            isLoading: false,
            currOpenTodo: {},
            currChecklist: {},
            isChecklistOpen: false,
            addingNewTodo: false,
            optionsOpen: false,
            checklistId: '',
            todoId: '',
        }
    },
    computed: {
        cardToEdit() {
            return JSON.parse(JSON.stringify(this.card))
        },
        loggedinUser() {
            return this.$store.getters.loggedinUser
        },
        async backgroundCoverColor() {
            if (this.card.cover.type) {
                if (this.card.cover.type === 'attachment') {
                    const fac = new FastAverageColor()
                    try {
                        const color = await fac.getColorAsync(this.card.cover.value)
                        this.$refs['headerCover'].style.backgroundColor = color.hex
                        return color.hex
                    }
                    catch (err) {
                        console.log(err)
                    }
                }
            }
        }
    },
    watch: {
        backgroundCoverColor: {
            async handler(newColor) {
                if (Object.keys(this.card.cover).length) this.$refs['headerCover'].style.backgroundColor = newColor
            }
        }
    },
    methods: {
        setMemberLetters(fullname) {
            const firstLetters = fullname
                .split(' ')
                .map(word => word[0])
                .join('');
            return firstLetters.toUpperCase()
        },
        closeModal() {
            this.$emit('closeDialog')
        },

        //CR
        //CR
        //CR
        openThisModal(modalName, event) {
            if (this.isModalShown === true && modalName === this.currModal) this.isModalShown = false
            else {
                this.pos = event.target.getBoundingClientRect()
                this.pos = JSON.parse(JSON.stringify(this.pos))
                if(this.pos.top > 430) this.pos.top = 430;
                this.isModalShown = true
                this.currModal = modalName
            }
        },
        // CR
        // CR
        // CR

        closeMenu() {
            this.isModalShown = false;
        },

        editCard(card) {
            console.log(card)
            this.$emit('cardModified', { card, group: this.group })
        },
        async attachmentBGC(el) {
            // console.log(el)
            const fac = new FastAverageColor()
            const img = el.props.src
            // var color= '';\
            try {
                const color = await fac.getColorAsync(img)
                // console.log(color)
                el.props['background-color'] = color.hex
            }
            catch (err) {
                console.log(err)
            }
            // // console.log(color.hex)
            //     return color

        },
        sendCardCopyToStore(copy) {
            this.$emit('saveCopy', copy)
        },
        deleteWarn() {
            this.pos = this.$refs['deleteBtn'].getBoundingClientRect()
            this.warningTitle = 'card'
            this.warningOpen = true
        },
        closeWarning() {
            this.warningOpen = false
        },
        deleteCard() {
            this.$emit('deleteCardFromGroup', { card: this.cardToEdit, group: this.group })
            this.closeModal()
        },
        closeInput() {
            this.showInput = false
        },
        closeTextArea() {
            this.showDesc = false
        },
        openTextArea() {
            this.showDesc = true
        },
        editBoard(editedAttribute) {
            this.$emit('boardModified', editedAttribute)
        },
        updateCardDesc() {
            this.cardToEdit.description = this.description
            this.$emit('cardModified', { card: this.cardToEdit, group: this.group })
            this.showDesc = false
        },
        generateTime(time) {
            const dateTimeAgo = moment(time).fromNow();
            return dateTimeAgo
        },
        addCardComment() {
            if (!this.newComment.txt) return
            this.newComment.byMember = this.loggedinUser
            this.cardToEdit.comments.unshift(this.newComment)
            this.$emit('cardModified', { card: this.cardToEdit, group: this.group })
            this.newComment = boardService.getEmptyComment()
            this.showInput = false
        },
        setDateFormat(timestamp) {
            let dt = new Date(timestamp)
            const date = Intl.DateTimeFormat('en-Us', { month: 'short', day: 'numeric' }).format(dt)
            return date
        },
        setHourFormat(timestamp) {
            let hr = new Date(timestamp)
            const hour = hr.toLocaleTimeString().replace(/(.*)\D\d+/, '$1');
            return hour
        },
        toggleCardComplete() {
            this.cardToEdit.isComplete = !this.cardToEdit.isComplete
            this.$emit('cardModified', { card: this.cardToEdit, group: this.group })
        },
        notifyUploading() {
            this.isLoading = true
        },
        notifyComplete() {
            this.isLoading = false
        },
        deleteComment(commentId) {
            const commentIdx = this.cardToEdit.comments.findIndex(comment => comment.id === commentId)
            this.cardToEdit.comments.splice(commentIdx, 1)
            this.$emit('cardModified', { card: this.cardToEdit, group: this.group })
        },
        isOpen(checklist, todo) {
            if (Object.keys(this.currChecklist).length && Object.keys(this.currOpenTodo).length)
                if (this.currChecklist.id === checklist.id && this.currOpenTodo.id === todo.id)
                    return true
            return false
        },
        openTodo(checklist, todo) {
            this.currChecklist = JSON.parse(JSON.stringify(checklist))
            this.currOpenTodo = JSON.parse(JSON.stringify(todo))
        },
        async checkboxTodo(checklist, todo) {
            this.cardToEdit = JSON.parse(JSON.stringify(this.card))
            this.currChecklist = JSON.parse(JSON.stringify(checklist))
            this.currOpenTodo = JSON.parse(JSON.stringify(todo))
            this.currOpenTodo.isComplete = !this.currOpenTodo.isComplete
            const checklistIdx = this.cardToEdit.checklists.findIndex(checklistToFind => checklistToFind.id = this.currChecklist.id)
            const todoIdx = this.cardToEdit.checklists[checklistIdx].todos.findIndex(todoToFind => todoToFind.id === this.currOpenTodo.id)
            this.cardToEdit.checklists[checklistIdx].todos[todoIdx] = this.currOpenTodo
            this.$emit('cardModified', { card: this.cardToEdit, group: this.group })
            this.closeTodo()
        },
        closeTodo() {
            this.currChecklist = {}
            this.currOpenTodo = {}
        },
        openChecklist(checklist) {
            this.currChecklist = JSON.parse(JSON.stringify(checklist))
            this.isChecklistOpen = true
        },
        saveChecklistTitle() {
            this.cardToEdit = JSON.parse(JSON.stringify(this.card))
            const checklistIdx = this.cardToEdit.checklists.findIndex(checklistToFind => checklistToFind.id === this.currChecklist.id)
            this.cardToEdit.checklists[checklistIdx] = this.currChecklist
            this.$emit('cardModified', { card: this.cardToEdit, group: this.group })
            this.currChecklist = {}

        },
        closeChecklist() {
            this.currChecklist = {}
            this.isChecklistOpen = false
        },
        openChecklistInput(checklist) {
            this.currChecklist = checklist
            this.addingNewTodo = true
            this.currOpenTodo = boardService.getEmptyTodo()
        },
        saveTodo() {
            this.cardToEdit = JSON.parse(JSON.stringify(this.card))
            const checklistIdx = this.cardToEdit.checklists.findIndex(checklistToFind => checklistToFind.id = this.currChecklist.id)
            const todoIdx = this.cardToEdit.checklists[checklistIdx].todos.findIndex(todoToFind => todoToFind.id === this.currOpenTodo.id)
            this.cardToEdit.checklists[checklistIdx].todos[todoIdx] = this.currOpenTodo
            this.$emit('cardModified', { card: this.cardToEdit, group: this.group })
            this.currChecklist = {}
            this.currOpenTodo = {}
        },
        deleteChecklist(id) {
            this.currChecklist = {}
            this.cardToEdit = JSON.parse(JSON.stringify(this.card))
            const checklistIdx = this.cardToEdit.checklists.findIndex(checklistToFind => checklistToFind.id === id)
            this.cardToEdit.checklists.splice(checklistIdx, 1)
            this.$emit('cardModified', { card: this.cardToEdit, group: this.group })
        },
        createTodo() {
            if (this.currOpenTodo.text === '') return
            this.cardToEdit = JSON.parse(JSON.stringify(this.card))
            const checklistIdx = this.cardToEdit.checklists.findIndex(checklistToFind => checklistToFind.id = this.currChecklist.id)
            this.cardToEdit.checklists[checklistIdx].todos.push(this.currOpenTodo)
            this.$emit('cardModified', { card: this.cardToEdit, group: this.group })
            this.currOpenTodo = boardService.getEmptyTodo()
        },
        closeAdder() {
            this.addingNewTodo = false
        },
        todoPercentage(checklist) {
            var todoPercentage = 0
            if (checklist.todos.length) {
                checklist.todos.forEach(todo => {
                    if (todo.isComplete) todoPercentage++
                })
                todoPercentage = parseInt(todoPercentage / checklist.todos.length * 100)
            }
            return todoPercentage
        },
        calcBarColor(checklist) {
            if (this.todoPercentage(checklist) === 100) return '#61bd4f'
            else return '#5ba4cf'
        },
        openChecklistOptions(checklist, todo, ev) {
            this.checklistId = checklist.id
            this.todoId = todo.id
            this.pos = ev.target.getBoundingClientRect()
            this.optionsOpen = true
        },
        convertTodoToCard({ checklistId, todoId }) {
            const groupToEdit = JSON.parse(JSON.stringify(this.group))
            this.cardToEdit = JSON.parse(JSON.stringify(this.card))
            const cardIdx = groupToEdit.cards.findIndex(cardToFind => cardToFind.id === this.cardToEdit.id)
            const checklistIdx = this.cardToEdit.checklists.findIndex(checklistToFind => checklistToFind.id === checklistId)
            const todoIdx = this.cardToEdit.checklists[checklistIdx].todos.findIndex(todoToFind => todoToFind.id === todoId)
            const newCard = boardService.getEmptyCard()
            newCard.title = this.cardToEdit.checklists[checklistIdx].todos[todoIdx].text
            groupToEdit.cards.push(newCard)
            groupToEdit.cards[cardIdx].checklists[checklistIdx].todos.splice(todoIdx, 1)
            this.$emit('groupUpdate', groupToEdit)
        },
        deleteTodo({ checklistId, todoId }) {
            this.cardToEdit = JSON.parse(JSON.stringify(this.card))
            const checklistIdx = this.cardToEdit.checklists.findIndex(checklistToFind => checklistToFind.id === checklistId)
            const todoIdx = this.cardToEdit.checklists[checklistIdx].todos.findIndex(todoToFind => todoToFind.id === todoId)
            this.cardToEdit.checklists[checklistIdx].todos.splice(todoIdx, 1)
            this.$emit('cardModified', { card: this.cardToEdit, group: this.group })
            this.currOpenTodo = {}
            this.currChecklist = {}

        }
    },
    emits: ['groupUpdate', 'cardCopySave', 'closeDialog', 'cardModified', 'boardModified', 'deleteCardFromGroup', 'saveCopy']
}
</script>

<style>
.card-details-main {
    flex-direction: column;
    justify-content: space-around;
}
</style>