import { asyncStorageService } from './async-storage.service.js'

const STORAGE_KEY = 'board'

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
}

// Basic board CRUD
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
// GROUPS
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

        const [removed] = board.groups.splice(idx, 1)
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

// ---------------------------
// CARDS
// ---------------------------
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
                fromIdx: null, // optional, could be tracked if needed
                toIdx: toIdx + i,
                timestamp: Date.now(),
            })
        })

        return asyncStorageService.put(STORAGE_KEY, board).then(() => board)
    })
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
