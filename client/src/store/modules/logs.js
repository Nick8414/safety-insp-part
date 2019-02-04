import Api from '@/services/Api'
import router from '../../router'

const state = {
    Logs: [],
    Total:0   
};

const getters = {
    loadLogs (state) {

      let logArr = state.Logs.map( (value) => {
            if (value.meta === null) {
                value.meta = { isView: false } 
              return  value
            } else {
                return value
            }
        } )  

      return logArr
    },
    loadTotal (state) {
      return state.Total
    } 
};

const mutations = {
    SET_LOGS(state, logs) {
       state.Logs = logs;
    },
    SET_TOTAL(state, total) {
        state.Total = total;
    },
    SET_VIEW_STATE(state, id) {
        state.Logs.map((value)=>{
            if ( value._id == id ) {
                return value.meta.isView = true
            }
        })
     },

    // ADD_EMPLOYEE(state, employee) {
      
    // },
    // CHANGE_EMPLOYEE(state, employee) {     
       
    // },
    // DELETE_EMPLOYEE(state, index) {
       
    // }
};

const actions = {
    getLogs({ commit }, payload) {
        commit('changeLoadingIndicator', {status:true, text: ''} );
        return Api().get('logs', {params:payload})
            .then(response => {
                commit('changeLoadingIndicator', {status:false, text: ''} );
                commit('SET_LOGS', response.data.records);
                commit('SET_TOTAL', response.data.total);
            })
            .catch(e => {
                console.log(e);
            })
    },
    changeViewState({ commit }, id ) {
        
        console.log(id)
        return Api().patch('logs', {id:id})
            .then(response => {
             console.log(response.data);
             commit('SET_VIEW_STATE', id)   
            })
            .catch(e => {
                console.log(e);
            })
    }

    // changeLogs ( { commit } , employee ) {
    //     return Api().patch('employees', employee)
    //       .then(response => {
    //         console.log('response');
    //         console.log(response.data);
    //         commit('CHANGE_EMPLOYEE', response.data)
    //        // this.departments.push(response.data)
    //       })
    //       .catch(e=>{
    //         console.log(e);
    //       })
    // },
   
};

export default ({
    state,
    getters,
    mutations,
    actions
})