import { boardService } from './board.service.js'

export const groupService = {
    add,
    remove,
    update,
    move,
}

function add(boardId, newGroup) {
    return boardService.addGroup(boardId, newGroup)
}

function remove(boardId, groupId) {
    return boardService.removeGroup(boardId, groupId)
}

function update(boardId, updatedGroup) {
    return boardService.updateGroup(boardId, updatedGroup)
}

function move(boardId, fromIdx, toIdx) {
    return boardService.moveGroup(boardId, fromIdx, toIdx)
}
