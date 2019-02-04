import Api from '@/services/Api'

const state = {
    statuses: []   
};

const getters = {
    loadStatuses (state) {
        return state.statuses
    } 
};

const mutations = {
    setStatus(state, statuses) {
        state.statuses = statuses
    },
    addStatus(state, status) {
        state.statuses.push(status)
    },
    changeStatus(state, status) { 
        console.log('status')      ;
        console.log(status)      ;
        for (let i=0; i< state.statuses.length; i++ ) {
            if (state.statuses[i]._id == status.result._id ) {
                state.statuses.splice(i, 1, status.result);
            }else {
                console.log('Not Found');
            }
        }  
    },
    deleteStatus(state, index) {
        state.statuses.splice(index, 1)
    }

};

const actions = {

    getStatuses({ commit }) {
        let self = this;
        return Api().get('statuses')
            .then(response => {
                console.log(response.data);
                commit('setStatus', response.data)
            })
            .catch(e => {
                console.log(e);
            })
    },
    addStatus({ commit }, status) {
        console.log(status);
        return Api().post('statuses', {
            statusName: status
        })
            .then(response => {
                console.log(response.data);
                let status = {
                    statusName: response.data.createdStatus.statusName,
                    _id: response.data.createdStatus._id
                }
                commit('addStatus', status)
            })
            .catch(e => {
                console.log(e.message);
            })      
    },
    changeStatus ( { commit } , status ) {
        console.log(status);
        let self = this;
        return Api().patch('statuses', status)
          .then(response => {
              console.log('response');
            console.log(response.data);
            commit('changeStatus', response.data)
           // this.departments.push(response.data)
          })
          .catch(e=>{
            console.log(e);
          })
      },
    deleteStatus({ commit }, data) {

        console.log(data);
        // console.log(index);
        return Api().delete('statuses/' + data.id)
            .then(response => {
                commit('deleteStatus', data.index)
            })
            .catch(e => {
                console.log(e);
            })
    }

};



export default ({
    state,
    getters,
    mutations,
    actions
})