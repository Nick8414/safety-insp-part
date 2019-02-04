import Api from '@/services/Api'

const state = {
    inspectionTypes: []   
};

const getters = {
    loadInspectionTypes (state) {
        return state.inspectionTypes
    } 
};

const mutations = {
    setInspectionType(state, inspectionTypes) {
        state.inspectionTypes = inspectionTypes
    },
    addInspectionType(state, inspectionType) {
        state.inspectionTypes.push(inspectionType)
    },
    changeInspectionType(state, inspectionType) { 
        console.log('inspectionType')      ;
        console.log(inspectionType)      ;
        for (let i=0; i< state.inspectionTypes.length; i++ ) {
            if (state.inspectionTypes[i]._id == inspectionType.result._id ) {
                state.inspectionTypes.splice(i, 1, inspectionType.result);
            }else {
                console.log('Not Found');
            }
        }  
    },
    deleteInspectionType(state, index) {
        state.inspectionTypes.splice(index, 1)
    }

};

const actions = {

    getInspectionTypes({ commit }) {
        let self = this;
        return Api().get('inspectiontypes')
            .then(response => {
                console.log(response.data);
                commit('setInspectionType', response.data)
            })
            .catch(e => {
                console.log(e);
            })
    },
    addInspectionType({ commit }, inspectionType) {
        console.log(inspectionType);
        return Api().post('inspectiontypes', {
            inspectionTypeName: inspectionType
        })
            .then(response => {
                console.log(response.data);
                let inspectionType = {
                    inspectionTypeName: response.data.createdInspectionType.inspectionTypeName,
                    _id: response.data.createdInspectionType._id
                }
                commit('addInspectionType', inspectionType)
            })
            .catch(e => {
                console.log(e.message);
            })      
    },
    changeInspectionType ( { commit } , status ) {
        console.log(status);
        let self = this;
        return Api().patch('inspectiontypes', status)
          .then(response => {
              console.log('response');
            console.log(response.data);
            commit('changeInspectionType', response.data)
           // this.departments.push(response.data)
          })
          .catch(e=>{
            console.log(e);
          })
      },
    deleteInspectionType({ commit }, data) {

        console.log(data);
        // console.log(index);
        return Api().delete('inspectiontypes/' + data.id)
            .then(response => {
                commit('deleteInspectionType', data.index)
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