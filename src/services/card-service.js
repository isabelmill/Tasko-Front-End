import { boardService } from './board.service.js'

export const cardService = {
    add,
    remove,
    update,
    move,
    moveBulk,
}

function add(boardId, groupId, newCard) {
    return boardService.addCard(boardId, groupId, newCard)
}

function remove(boardId, groupId, cardId) {
    return boardService.removeCard(boardId, groupId, cardId)
}

function update(boardId, groupId, updatedCard) {
    return boardService.updateCard(boardId, groupId, updatedCard)
}

function move(boardId, fromGroupId, toGroupId, fromIdx, toIdx) {
    return boardService.moveCard(boardId, fromGroupId, toGroupId, fromIdx, toIdx)
}

function moveBulk(boardId, fromGroupId, toGroupId, cardIds, toIdx) {
    return boardService.moveCardsBulk(boardId, fromGroupId, toGroupId, cardIds, toIdx)
}
