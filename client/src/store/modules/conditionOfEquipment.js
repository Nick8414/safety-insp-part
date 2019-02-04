import Api from '@/services/Api'

const state = {
    conditionOfEquipments: []   
};

const getters = {
    loadConditionOfEquipments (state) {
        return state.conditionOfEquipments
    } 
};

const mutations = {
    setConditionOfEquipment(state, conditionOfEquipments) {
        state.conditionOfEquipments = conditionOfEquipments
    },
    addConditionOfEquipment(state, conditionOfEquipment) {
        state.conditionOfEquipments.push(conditionOfEquipment)
    },
    changeConditionOfEquipment(state, conditionOfEquipment) { 
        console.log('conditionOfEquipment')      ;
        console.log(conditionOfEquipment)      ;
        for (let i=0; i< state.conditionOfEquipments.length; i++ ) {
            if (state.conditionOfEquipments[i]._id == conditionOfEquipment.result._id ) {
                state.conditionOfEquipments.splice(i, 1, conditionOfEquipment.result);
            }else {
                console.log('Not Found');
            }
        }  
    },
    deleteConditionOfEquipment(state, index) {
        state.conditionOfEquipments.splice(index, 1)
    }
};

const actions = {

    getConditionOfEquipments({ commit }) {
        let self = this;
        return Api().get('conditionofequipments')
            .then(response => {
                console.log(response.data);
                commit('setConditionOfEquipment', response.data)
            })
            .catch(e => {
                console.log(e);
            })
    },
    addConditionOfEquipment({ commit }, conditionOfEquipment) {
        console.log(conditionOfEquipment);
        return Api().post('conditionofequipments', {
            conditionOfEquipmentName: conditionOfEquipment
        })
            .then(response => {
                console.log(response.data);
                let conditionOfEquipment = {
                    conditionOfEquipmentName: response.data.createdConditionOfEquipment.conditionOfEquipmentName,
                    _id: response.data.createdConditionOfEquipment._id
                }
                commit('addConditionOfEquipment', conditionOfEquipment)
            })
            .catch(e => {
                console.log(e.message);
            })      
    },
    changeConditionOfEquipment ( { commit } , status ) {
        console.log(status);
        let self = this;
        return Api().patch('conditionofequipments', status)
          .then(response => {
              console.log('response');
            console.log(response.data);
            commit('changeConditionOfEquipment', response.data)
           // this.departments.push(response.data)
          })
          .catch(e=>{
            console.log(e);
          })
      },
    deleteConditionOfEquipment({ commit }, data) {

        console.log(data);
        // console.log(index);
        return Api().delete('conditionofequipments/' + data.id)
            .then(response => {
                commit('deleteConditionOfEquipment', data.index)
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