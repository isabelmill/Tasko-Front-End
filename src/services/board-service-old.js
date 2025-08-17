import {
    utilService
} from "../services/util.service.js"
import {
    asyncStorageService
} from "../services/storage-service.js"
import {
    httpService
} from './http.service.js'

const BOARDS_KEY = 'boards'

// _createBoards();

export const boardService = {
    query,
    getById,
    remove,
    // updateBoard,
    getEmptyComment,
    save,
    getEmptyCard,
    getEmptyGroup,
    getEmptyBoard,
    getEmptyActivity,
    getEmptyTodo
}

async function query() {
    // return asyncStorageService.query(BOARDS_KEY);
    try {
        return await httpService.get('/board')
    } catch (err) {
        console.log('query err:', err);
    }
}

async function getById(boardId) {
    // return asyncStorageService.get(BOARDS_KEY, boardId)
    try {
        const res = await httpService.get(`/board/${boardId}`)
        return res
    } catch (err) {
        console.log('getById err:', err);
    }
}

async function remove(boardId) {
    // return asyncStorageService.remove(BOARDS_KEY, boardId);
    try {
        return await httpService.delete(`/board/${boardId}`)
    } catch (err) {
        console.log('remove err:', err);
    }
}

// function updateBoard(board) {
//     return asyncStorageService.put(BOARDS_KEY, board)
// }

async function save(board) {
    // if (board._id) {
    //     return asyncStorageService.put(BOARDS_KEY, board);
    // } else {
    //     return asyncStorageService.post(BOARDS_KEY, board);
    // }
    try {
        if (board._id) {
            return await httpService.put(`/board/${board._id}`, board)
        } else {
            return await httpService.post(`/board/`, board)
        }
    } catch (err) {
        console.log('remove err:', err);
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

function getEmptyTodo() {
    return {
        id: utilService.makeId(),
        text: '',
        isComplete: false,
    }
}

function getEmptyActivity() {
    return {
        id: utilService.makeId(),
        txt: '',
        createdAt: Date.now(),
        byMember: {
            _id: "u101",
            fullname: "Guest User",
            username: "Guest User",
        },
        task: {}
    }
}

function getEmptyComment() {
    return {
        id: utilService.makeId(),
        txt: '',
        createdAt: Date.now(),
        byMember: {
            _id: "u101",
            fullname: "Guest User",
            username: "Guest User",
        },
    }
}

function getEmptyCard() {
    return {
        id: utilService.makeId(),
        isComplete: false,
        title: '',
        description: '',
        labels: [],
        createdAt: Date.now(),
        checklists: [],
        attachments: [],
        comments: [],
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
        // _id: '',
        title: '',
        lastTimeWatched: Date.now(),
        createdAt: Date.now(),
        createdBy: {
            _id: "u101",
            fullname: "Guest User",
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