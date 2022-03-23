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
            "createdAt": 1589983468418,
            "createdBy": {
                "_id": "u101",
                "fullname": "Isabel Mill",
                "imgUrl": "http://some-img"
            },
            "background": {},
            "labels": [{
                    "id": "l101",
                    "title": "Done",
                    "color": "#61bd4f"
                },
                {
                    "id": "l102",
                    "title": "Progress",
                    "color": "#61bd33"
                }
            ],
            "members": [{
                "_id": "u101",
                "fullname": "Tal Tarablus",
                "imgUrl": "https://www.google.com"
            }],
            "groups": [{
                    "id": "g101",
                    "title": "Group 1",
                    "cards": [{
                            "id": "c101",
                            "title": "Replace logo"
                        },
                        {
                            "id": "c102",
                            "title": "Add Samples"
                        }
                    ],
                    "style": {}
                },
                {
                    "id": "g102",
                    "title": "Group 2",
                    "cards": [{
                            "id": "c103",
                            "title": "Do that"
                        },
                        {
                            "id": "c104",
                            "title": "Help me",
                            "status": "in-progress",
                            "description": "description",
                            "comments": [{
                                "id": "ZdPnm",
                                "txt": "also @yaronb please CR this",
                                "createdAt": 1590999817436.0,
                                "byMember": {
                                    "_id": "u101",
                                    "fullname": "Tal Tarablus",
                                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
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
                                "username": "Tal",
                                "fullname": "Tal Tarablus",
                                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                            }],
                            "labelIds": ["l101", "l102"],
                            "createdAt": 1590999730348,
                            "dueDate": 16156215211,
                            "byMember": {
                                "_id": "u101",
                                "username": "Tal",
                                "fullname": "Tal Tarablus",
                                "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
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
            // for monday
            "cmpsOrder": ["status-picker", "member-picker", "date-picker"]
        }]
        utilService.saveToStorage(BOARDS_KEY, boards)
    }
    console.log('boards:', boards);
    return boards
}

function getEmptyCard() {
    return {
        id: utilService.makeId(),
        title: '',
    }
}

function getEmptyGroup() {
    return {
        id: utilService.makeId(),
        title: '',
        cards: []
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
        labels: [],
        members: [],
        groups: [],
        activities: [],
    }
}