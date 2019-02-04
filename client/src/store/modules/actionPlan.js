import Api from '@/services/Api'
import router from '../../router'

const state = {
    Actions: [],
    quantity:0   
};

const getters = {
    loadActions (state) {
        return state.Actions
    },
    loadQuantityActions (state) {
        return state.quantity
    } 
};

const mutations = {
    SET_ACTIONS(state, actions) {
        state.Actions = actions
    },
    ADD_ACTION(state, action) {
        console.log(action);
        state.Actions.unshift(action)
    },
    CHANGE_ACTION(state, action) {
        for (let i=0; i < state.Actions.length; i++ ) {
            if (state.Actions[i]._id == action._id ) {
                state.Actions.splice(i, 1, action);
            }else {
                console.log('Not Found');
            }
        }  
    },
    DELETE_ACTION(state, index) {
        state.Actions.splice(index, 1)
    },
    SET_QUANTITY(state, quantity) {
        state.quantity = quantity;
    }
};

const actions = {

    getActions({ commit }, filter) {
        return Api().get('actions', {params: filter})
            .then(response => {
                localStorage.token = response.data.newToken;
                commit('SET_ACTIONS', response.data.results)
                commit('SET_QUANTITY', response.data.quantity)
            })
            .catch(e => {
                console.log(e.response);
            })
    },
    addAction({ commit }, action) {
        return Api().post('actions', {
            createdDate      : action.createdDate,
            psd_TAG          : action.psd_TAG,
            fieldTAG         : action.fieldTAG,
            PSD_Type         : action.PSD_Type,
            department       : action.department,
            productionArea   : action.productionArea,
            productionArea   : action.productionArea,
            installationPlace: action.installationPlace,
            description      : action.description,
            responsiblePerson: action.responsiblePerson,
            assignedTo       : action.assignedTo,
            priority         : action.priority,
            complete         : action.complete,
            startDate        : action.startDate,
            endDate          : action.endDate,
            planingEndDate   : action.planingEndDate,
            status           : action.status,
            notes            : action.notes
        })
        .then(response => {
            let action = response.data.createdAction;
            commit('ADD_ACTION', action)
            console.log('debug action token');
            console.log(response.data.newToken);
            localStorage.token = response.data.newToken;
        })
        .catch(e => {
            console.log(e.response.data.message);
            commit('setError',e.response.data.message );
            router.push('/');
           // router.push({name: 'Login'});
        })      
    },
    changeAction ( { commit } , action ) {
        return Api().patch('actions', action)
        .then(response => {
          localStorage.token = response.data.newToken;
          commit('CHANGE_ACTION', response.data.action);
        })
        .catch(e=>{
          console.log(e);
        })
      },
    deleteAction({ commit }, data) {
        return Api().delete('actions/' + data.id)
        .then(response => {
            console.log(response)
            localStorage.token = response.data.newToken;
            commit('DELETE_ACTION', data.index)
        })
        .catch(e => {
            console.log(e.response);
        })
    }

};


export default ({
    state,
    getters,
    mutations,
    actions
})