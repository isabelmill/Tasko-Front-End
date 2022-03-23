import { boardService } from '../../services/board-service.js'

export default {
    state: {
        toys: null,
        filterBy: null,
    },
    getters: {
        toys(state) {
            return state.toys
        },
    },
    mutations: {
        setToys(state, {
            toys
        }) {
            state.toys = toys;
        },
        removeToy(state, {
            id
        }) {
            const idx = state.toys.findIndex((toy) => toy._id === id)
            state.toys.splice(idx, 1)
        },
        saveToy(state, {
            toy
        }) {
            const idx = state.toys.findIndex((currToy) => currToy._id === toy._id)
            if (idx !== -1) state.toys.splice(idx, 1, toy)
            else state.toys.push(toy)
        },
        setFilter(state, {
            filterBy
        }) {
            state.filterBy = filterBy;
        },
    },
    actions: {
        async loadToys({
            commit,
            state
        }) {
            try {
                let toys = await toyService.query(state.filterBy)
                commit({
                    type: 'setToys',
                    toys
                });

            } catch (err) {
                console.log('err');
            }
        },
        async removeToy({
            commit
        }, {
            id
        }) {
            try {
                await toyService.remove(id)
                commit({
                    type: 'removeToy',
                    id
                });
            } catch (err) {
                console.log('err');
            }
        },
        async saveToy({
            commit
        }, {
            toy
        }) {
            try {
                await toyService.save(toy)
                console.log('res', toy);
                commit({
                    type: 'saveToy',
                    toy
                });
            } catch (err) {
                console.log('err');
            }
        },
        filter({
            commit,
            dispatch
        }, {
            filterBy
        }) {
            // toyService.query(filterBy).then((toys) => {
            //   commit({type: 'setToys', toys});
            // });
            commit({
                type: 'setFilter',
                filterBy
            });
            dispatch({
                type: 'loadToys'
            });
        },
    },
}