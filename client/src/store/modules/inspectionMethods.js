import Api from '@/services/Api'

const state = {
    inspectionMethods: []   
};

const getters = {
    loadInspectionMethods (state) {
        return state.inspectionMethods
    } 
};

const mutations = {
    setInspectionMethod(state, inspectionMethods) {
        state.inspectionMethods = inspectionMethods
    },
    addInspectionMethod(state, inspectionMethod) {
        state.inspectionMethods.push(inspectionMethod)
    },
    changeInspectionMethod(state, inspectionMethod) { 
        console.log('inspectionMethod')      ;
        console.log(inspectionMethod)      ;
        for (let i=0; i< state.inspectionMethods.length; i++ ) {
            if (state.inspectionMethods[i]._id == inspectionMethod.result._id ) {
                state.inspectionMethods.splice(i, 1, inspectionMethod.result);
            }else {
                console.log('Not Found');
            }
        }  
    },
    deleteInspectionMethod(state, index) {
        state.inspectionMethods.splice(index, 1)
    }
};

const actions = {

    getInspectionMethods({ commit }) {
        let self = this;
        return Api().get('inspectionmethods')
            .then(response => {
                console.log(response.data);
                commit('setInspectionMethod', response.data)
            })
            .catch(e => {
                console.log(e);
            })
    },
    addInspectionMethod({ commit }, inspectionMethod) {
        console.log(inspectionMethod);
        return Api().post('inspectionmethods', {
            inspectionMethodName: inspectionMethod
        })
            .then(response => {
                console.log(response.data);
                let inspectionMethod = {
                    inspectionMethodName: response.data.createdInspectionMethod.inspectionMethodName,
                    _id: response.data.createdInspectionMethod._id
                }
                commit('addInspectionMethod', inspectionMethod)
            })
            .catch(e => {
                console.log(e.message);
            })      
    },
    changeInspectionMethod ( { commit } , status ) {
        console.log(status);
        let self = this;
        return Api().patch('inspectionmethods', status)
          .then(response => {
              console.log('response');
            console.log(response.data);
            commit('changeInspectionMethod', response.data)
           // this.departments.push(response.data)
          })
          .catch(e=>{
            console.log(e);
          })
      },
    deleteInspectionMethod({ commit }, data) {

        console.log(data);
        // console.log(index);
        return Api().delete('inspectionmethods/' + data.id)
            .then(response => {
                commit('deleteInspectionMethod', data.index)
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