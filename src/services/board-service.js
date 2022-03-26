import {
    utilService
} from "../services/util-service.js"
import {
    asyncStorageService
} from "../services/storage-service.js"

const BOARDS_KEY = 'boards'
_createBoards();

export const boardService = {
    query,
    getById,
    remove,
    updateBoard,
    save,
    getEmptyCard,
    getEmptyGroup,
    getEmptyBoard,
    getEmptyActivity,
}

function query() {
    return asyncStorageService.query(BOARDS_KEY);
}

function getById(boardId) {
    return asyncStorageService.get(BOARDS_KEY, boardId)
}

function remove(boardId) {
    return asyncStorageService.remove(BOARDS_KEY, boardId);
}

function updateBoard(board) {
    return asyncStorageService.put(BOARDS_KEY, board)
}

function save(board) {
    if (board._id) {
        return asyncStorageService.put(BOARDS_KEY, board);
    } else {
        return asyncStorageService.post(BOARDS_KEY, board);
    }
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
                    "title": "Group 1",
                    "props": {
                        "orientation": "vertical",
                        "className": "card-container",
                    },
                    "cards": [{
                            "id": "c101",
                            "title": "Replace logo",
                            "labels": [],
                            "members": [],
                            "date": '',
                            "props": {
                                "className": "card",
                                "style": {}
                            }
                        },
                        {
                            "id": "c102",
                            "title": "Add Samples",
                            "labels": [],
                            "members": [],
                            "date": '',
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
                    "title": "Group 2",
                    "props": {
                        "orientation": "vertical",
                        "className": "card-container",
                    },
                    "cards": [{
                            "id": "c103",
                            "title": "Do that",
                            "labels": [],
                            "members": [],
                            "date": '',
                            "props": {
                                "className": "card",
                                "style": {}
                            }
                        },
                        {
                            "id": "c104",
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
                }
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
    console.log('boards:', boards);
    return boards
}

function getEmptyActivity() {
    return {
        id: utilService.makeId(),
        txt: '',
        createdAt: Date.now(),
        isStarred: false,
        byMember: {
            _id: "u101",
            fullname: "Isabel Mill",
            imgUrl: "http://some-img"
        },
        task: {}
    }
}

function getEmptyCard() {
    return {
        id: utilService.makeId(),
        title: '',
        description: '',
        labels: [],
        createdAt: Date.now(),
        checklist: {
            title: 'Checklist',
            todos: [],
        },
        attachment: {},
        cover: {},
        members: [],
        dueDate: '',
        isWatched: false,
        props: {
            className: 'card',
            style: {}
        }
    }
}

function getEmptyGroup() {
    return {
        id: utilService.makeId(),
        title: '',
        cards: [],
        date: '',
        props: {
            orientation: 'vertical',
            className: 'card-container'
        }
    }
}

function getEmptyBoard() {
    return {
        _id: '',
        title: '',
        createdAt: Date.now(),
        createdBy: {
            _id: "u101",
            fullname: "Abi Abambi",
            imgUrl: "http://some-img"
        },
        background: '',
        labels: [{
                id: "l101",
                title: "",
                color: "#61BD4F"
            },
            {
                id: "l102",
                title: "",
                color: "#F2D600"
            },
            {
                id: "l103",
                title: "",
                color: "#FF9F1A"
            },
            {
                id: "l104",
                title: "",
                color: "#EB5A46"
            },
            {
                id: "l105",
                title: "",
                color: "#C377E0"
            },
            {
                id: "l106",
                title: "",
                color: "#0079BF"
            },
        ],
        members: [],
        groups: [],
        activities: [],
    }
}