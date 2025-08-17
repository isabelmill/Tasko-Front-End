import { asyncStorageService } from './storage.service.js'

const STORAGE_KEY = 'board'

_createBoards();

export const boardService = {
    query,
    getById,
    save,
    remove,
    addGroup,
    removeGroup,
    updateGroup,
    moveGroup,
    addCard,
    removeCard,
    updateCard,
    moveCard,
    moveCardsBulk,
    getEmptyBoard,
    getEmptyGroup,
    getEmptyCard,
    getEmptyActivity,
}

// ---------------------------
// BASIC CRUD
// ---------------------------
function query() {
    return asyncStorageService.query(STORAGE_KEY)
}

function getById(boardId) {
    return asyncStorageService.get(STORAGE_KEY, boardId)
}

function save(board) {
    if (board._id) return asyncStorageService.put(STORAGE_KEY, board)
    else return asyncStorageService.post(STORAGE_KEY, board)
}

function remove(boardId) {
    return asyncStorageService.remove(STORAGE_KEY, boardId)
}

// ---------------------------
// GROUPS & CARDS (existing logic stays intact)
// ---------------------------
function addGroup(boardId, newGroup) {
    return getById(boardId).then((board) => {
        board.groups = board.groups || []
        board.groups.push(newGroup)
        board.activities = board.activities || []
        board.activities.push({
            id: _makeId(),
            type: 'group-add',
            groupId: newGroup._id,
            timestamp: Date.now(),
        })
        return asyncStorageService.put(STORAGE_KEY, board).then(() => board)
    })
}

function removeGroup(boardId, groupId) {
    return getById(boardId).then((board) => {
        const idx = board.groups.findIndex((g) => g._id === groupId)
        if (idx === -1) return board

        board.groups.splice(idx, 1)
        board.activities = board.activities || []
        board.activities.push({
            id: _makeId(),
            type: 'group-remove',
            groupId,
            timestamp: Date.now(),
        })
        return asyncStorageService.put(STORAGE_KEY, board).then(() => board)
    })
}

function updateGroup(boardId, updatedGroup) {
    return getById(boardId).then((board) => {
        const idx = board.groups.findIndex((g) => g._id === updatedGroup._id)
        if (idx === -1) return board
        board.groups.splice(idx, 1, updatedGroup)
        return asyncStorageService.put(STORAGE_KEY, board).then(() => board)
    })
}

function moveGroup(boardId, fromIdx, toIdx) {
    return getById(boardId).then((board) => {
        const groups = board.groups || []
        if (fromIdx < 0 || fromIdx >= groups.length || toIdx < 0 || toIdx >= groups.length) {
            throw new Error('Invalid group indices')
        }
        const [moved] = groups.splice(fromIdx, 1)
        groups.splice(toIdx, 0, moved)

        board.activities = board.activities || []
        board.activities.push({
            id: _makeId(),
            type: 'group-move',
            groupId: moved._id,
            fromIdx,
            toIdx,
            timestamp: Date.now(),
        })
        return asyncStorageService.put(STORAGE_KEY, board).then(() => board)
    })
}

function addCard(boardId, groupId, newCard) {
    return getById(boardId).then((board) => {
        const group = board.groups.find((g) => g._id === groupId)
        if (!group) throw new Error('Group not found')
        group.cards = group.cards || []
        group.cards.push(newCard)

        board.activities = board.activities || []
        board.activities.push({
            id: _makeId(),
            type: 'card-add',
            groupId,
            cardId: newCard._id,
            timestamp: Date.now(),
        })
        return asyncStorageService.put(STORAGE_KEY, board).then(() => board)
    })
}

function removeCard(boardId, groupId, cardId) {
    return getById(boardId).then((board) => {
        const group = board.groups.find((g) => g._id === groupId)
        if (!group) return board
        const idx = group.cards.findIndex((c) => c._id === cardId)
        if (idx === -1) return board
        group.cards.splice(idx, 1)

        board.activities = board.activities || []
        board.activities.push({
            id: _makeId(),
            type: 'card-remove',
            groupId,
            cardId,
            timestamp: Date.now(),
        })
        return asyncStorageService.put(STORAGE_KEY, board).then(() => board)
    })
}

function updateCard(boardId, groupId, updatedCard) {
    return getById(boardId).then((board) => {
        const group = board.groups.find((g) => g._id === groupId)
        if (!group) return board
        const idx = group.cards.findIndex((c) => c._id === updatedCard._id)
        if (idx === -1) return board
        group.cards.splice(idx, 1, updatedCard)
        return asyncStorageService.put(STORAGE_KEY, board).then(() => board)
    })
}

function moveCard(boardId, fromGroupId, toGroupId, fromIdx, toIdx) {
    return getById(boardId).then((board) => {
        const fromGroup = board.groups.find((g) => g._id === fromGroupId)
        const toGroup = board.groups.find((g) => g._id === toGroupId)
        if (!fromGroup || !toGroup) throw new Error('Group not found')

        const [movedCard] = fromGroup.cards.splice(fromIdx, 1)
        toGroup.cards.splice(toIdx, 0, movedCard)

        board.activities = board.activities || []
        board.activities.push({
            id: _makeId(),
            type: 'card-move',
            cardId: movedCard._id,
            fromGroupId,
            toGroupId,
            fromIdx,
            toIdx,
            timestamp: Date.now(),
        })

        return asyncStorageService.put(STORAGE_KEY, board).then(() => board)
    })
}

function moveCardsBulk(boardId, fromGroupId, toGroupId, cardIds, toIdx) {
    return getById(boardId).then((board) => {
        const fromGroup = board.groups.find((g) => g._id === fromGroupId)
        const toGroup = board.groups.find((g) => g._id === toGroupId)
        if (!fromGroup || !toGroup) throw new Error('Group not found')

        const movedCards = []
        fromGroup.cards = fromGroup.cards.filter((c) => {
            if (cardIds.includes(c._id)) {
                movedCards.push(c)
                return false
            }
            return true
        })
        toGroup.cards.splice(toIdx, 0, ...movedCards)

        board.activities = board.activities || []
        movedCards.forEach((card, i) => {
            board.activities.push({
                id: _makeId(),
                type: 'card-move-bulk',
                cardId: card._id,
                fromGroupId,
                toGroupId,
                fromIdx: null,
                toIdx: toIdx + i,
                timestamp: Date.now(),
            })
        })

        return asyncStorageService.put(STORAGE_KEY, board).then(() => board)
    })
}

// ---------------------------
// EMPTY TEMPLATES
// ---------------------------
function getEmptyBoard() {
    return {
        _id: _makeId(),
        title: '',
        isStarred: false,
        background: '#ffffff',
        backgroundPhoto: '',
        backgroundThumb: '',
        createdBy: null,
        members: [],
        groups: [],
        activities: [],
        isTemplate: false,
        category: '',
        lastTimeWatched: Date.now(),
    }
}

function getEmptyGroup() {
    return {
        _id: _makeId(),
        title: '',
        cards: [],
        style: {},
    }
}

function getEmptyCard() {
    return {
        _id: _makeId(),
        title: '',
        description: '',
        comments: [],
        attachments: [],
        checklists: [],
        members: [],
        dueDate: null,
        labels: [],
        style: {},
    }
}

function getEmptyActivity() {
    return {
        id: _makeId(),
        txt: '',
        byMember: null,
        createdAt: Date.now(),
    }
}

// ---------------------------
// UTILS
// ---------------------------
function _makeId(length = 8) {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let text = ''
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

function _createBoards() {
    let boards = utilService.loadFromStorage(BOARDS_KEY)
    if (!boards || !boards.length) {
        boards = [{
            "_id": "b101",
            "title": "Robot dev proj",
            "isStarred": false,
            "createdAt": 1589983468418,
            "createdBy": {
                "_id": "u101",
                "fullname": "Isabel Mill",
                "imgUrl": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
            },
            "background": '#0079BF',
            "labels": [{
                    "id": "l101",
                    "title": "Done",
                    "color": "#61BD4F"
                },
                {
                    "id": "l102",
                    "title": "Progress",
                    "color": "#F2D600"
                },
                {
                    "id": "l103",
                    "title": "",
                    "color": "#FF9F1A"
                },
                {
                    "id": "l104",
                    "title": "",
                    "color": "#EB5A46"
                },
                {
                    "id": "l105",
                    "title": "",
                    "color": "#C377E0"
                },
                {
                    "id": "l106",
                    "title": "",
                    "color": "#0079BF"
                },
            ],
            "members": [{
                    "_id": "u101",
                    "username": "Anna",
                    "fullname": "Anna Balinov",
                    "imgUrl": "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                },
                {
                    "_id": "u102",
                    "username": "Elias",
                    "fullname": "Elias Ghantous",
                    "imgUrl": "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                },
                {
                    "_id": "u103",
                    "username": "Isabel",
                    "fullname": "Isabel Mill",
                    "imgUrl": "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                },
            ],
            "groups": [{
                    "id": "g101",
                    "title": "FrontEnd",
                    "props": {
                        "orientation": "vertical",
                        "className": "card-container",
                    },
                    "cards": [{
                            "id": "c101",
                            "isComplete": false,
                            "title": "Replace logo",
                            "labels": [],
                            "members": [],
                            "date": '',
                            "cover": {},
                            "attachments": [],
                            "props": {
                                "className": "card",
                                "style": {}
                            }
                        },
                        {
                            "id": "c102",
                            "title": "Component: Menu",
                            "labels": [],
                            "members": [],
                            "date": '',
                            "cover": {},
                            "attachments": [],
                            "props": {
                                "className": "card",
                                "style": {}
                            }
                        },
                        {
                            "id": "c103",
                            "title": "Activities",
                            "labels": [],
                            "members": [],
                            "date": '',
                            "cover": {},
                            "attachments": [],
                            "props": {
                                "className": "card",
                                "style": {}
                            }
                        },
                        {
                            "id": "c104",
                            "title": "Clouding",
                            "labels": [],
                            "members": [],
                            "date": '',
                            "cover": {},
                            "attachments": [],
                            "props": {
                                "className": "card",
                                "style": {}
                            }
                        },
                        {
                            "id": "c105",
                            "title": "DeadLines (Date+Time)",
                            "labels": [],
                            "members": [],
                            "date": '',
                            "cover": {},
                            "attachments": [],
                            "props": {
                                "className": "card",
                                "style": {}
                            }
                        },
                        {
                            "id": "c106",
                            "title": "PWA",
                            "labels": [],
                            "members": [],
                            "date": '',
                            "cover": {},
                            "attachments": [],
                            "props": {
                                "className": "card",
                                "style": {}
                            }
                        },
                        {
                            "id": "c107",
                            "title": "Pages",
                            "labels": [],
                            "members": [],
                            "date": '',
                            "cover": {},
                            "attachments": [],
                            "props": {
                                "className": "card",
                                "style": {}
                            }
                        }
                    ],
                    "style": {}
                },
                {
                    "id": "g102",
                    "title": "Progress",
                    "props": {
                        "orientation": "vertical",
                        "className": "card-container",
                    },
                    "cards": [{
                            "id": "c111",
                            "title": "Layout",
                            "labels": [],
                            "members": [],
                            "date": '',
                            "cover": {},
                            "attachments": [],
                            "props": {
                                "className": "card",
                                "style": {}
                            }
                        },
                        {
                            "id": "c112",
                            "title": "CRUDL:Front",
                            "labels": [],
                            "members": [],
                            "date": '',
                            "cover": {},
                            "attachments": [],
                            "props": {
                                "className": "card",
                                "style": {}
                            }
                        },
                        {
                            "id": "c113",
                            "title": "Component: Card",
                            "labels": [],
                            "members": [],
                            "date": '',
                            "cover": {},
                            "attachments": [],
                            "props": {
                                "className": "card",
                                "style": {}
                            }
                        },
                        {
                            "id": "c114",
                            "title": "DND",
                            "labels": [],
                            "members": [],
                            "date": '',
                            "cover": {},
                            "attachments": [],
                            "props": {
                                "className": "card",
                                "style": {}
                            }
                        },
                        {
                            "id": "c115",
                            "title": "Help me",
                            "status": "in-progress",
                            "description": "description",
                            "props": {
                                "className": "card",
                                "style": {}
                            },

                            "comments": [{
                                "id": "ZdPnm",
                                "txt": "also @yaronb please CR this",
                                "createdAt": 1590999817436.0,
                                "byMember": {
                                    "_id": "u101",
                                    "fullname": "Tal Tarablus",
                                    "imgUrl": "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                }
                            }],
                            "checklists": [{
                                "id": "YEhmF",
                                "title": "Checklist",
                                "todos": [{
                                    "id": "212jX",
                                    "title": "To Do 1",
                                    "isDone": false
                                }]
                            }],
                            "members": [{
                                    "_id": "u101",
                                    "username": "Anna",
                                    "fullname": "Anna Balinov",
                                    "imgUrl": "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                },
                                {
                                    "_id": "u102",
                                    "username": "Elias",
                                    "fullname": "Elias Ghantous",
                                    "imgUrl": "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                },
                                {
                                    "_id": "u103",
                                    "username": "Isabel",
                                    "fullname": "Isabel Mill",
                                    "imgUrl": "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                                },
                            ],
                            "labels": [],
                            "createdAt": 1590999730348,
                            "date": '',
                            "cover": {},
                            "attachments": [],
                            "byMember": {
                                "_id": "u101",
                                "username": "Tal",
                                "fullname": "Tal Tarablus",
                                "imgUrl": "hhttps://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                            },
                            "style": {
                                "bgColor": "#26de81"
                            }
                        }
                    ],
                    "style": {}
                },
                {
                    "id": "g103",
                    "title": "Done",
                    "props": {
                        "orientation": "vertical",
                        "className": "card-container",
                    },
                    "cards": [{
                            "id": "c121",
                            "title": "Store",
                            "labels": [],
                            "members": [],
                            "cover": {},
                            "attachments": [],
                            "date": '',
                            "props": {
                                "className": "card",
                                "style": {}
                            }
                        },
                        {
                            "id": "c122",
                            "title": "Init-Vue",
                            "labels": [],
                            "members": [],
                            "cover": {},
                            "attachments": [],
                            "date": '',
                            "props": {
                                "className": "card",
                                "style": {}
                            }
                        },
                    ],
                    "style": {}
                },
                {
                    "id": "g104",
                    "title": "Backend",
                    "props": {
                        "orientation": "vertical",
                        "className": "card-container",
                    },
                    "cards": [{
                            "id": "c131",
                            "title": "UserData",
                            "labels": [],
                            "members": [],
                            "date": '',
                            "cover": {},
                            "attachments": [],
                            "props": {
                                "className": "card",
                                "style": {}
                            }
                        },
                        {
                            "id": "c132",
                            "title": "Socketting",
                            "labels": [],
                            "members": [],
                            "date": '',
                            "attachments": [],
                            "cover": {},
                            "props": {
                                "className": "card",
                                "style": {}
                            }
                        },
                        {
                            "id": "c133",
                            "title": "Connect with MongoDB",
                            "labels": [],
                            "members": [],
                            "date": '',
                            "attachments": [],
                            "cover": {},
                            "props": {
                                "className": "card",
                                "style": {}
                            }
                        },
                    ],
                    "style": {}
                },

            ],
            "activities": [{
                "id": "a101",
                "txt": "Changed Color",
                "createdAt": 154514,
                "byMember": {
                    "_id": "u101",
                    "fullname": "Abi Abambi",
                    "imgUrl": "http://some-img"
                },
                "task": {
                    "id": "c101",
                    "title": "Replace Logo"
                }
            }],
        }]
        utilService.saveToStorage(BOARDS_KEY, boards)
    }
    return boards
}
