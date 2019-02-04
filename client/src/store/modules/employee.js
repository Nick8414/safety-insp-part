import Api from '@/services/Api'
import router from '../../router'

const state = {
    Employees: []   
};

const getters = {
    loadEmployees (state) {
        return _.orderBy(state.Employees, ['fullName'], ['asc'])
    } 
};

const mutations = {
    SET_EMPLOYEES(state, employees) {
        state.Employees = employees
    },
    ADD_EMPLOYEE(state, employee) {
        state.Employees.push(employee)
    },
    CHANGE_EMPLOYEE(state, employee) {     
        for (let i=0; i< state.Employees.length; i++ ) {
            if (state.Employees[i]._id == employee.result._id ) {
                console.log(state.Employees[i]._id)
                state.Employees.splice(i, 1, employee.result);
            } else {
                console.log('Not Found');
            }
        }  
    },
    DELETE_EMPLOYEE(state, index) {
        state.Employees.splice(index, 1)
    }
};

const actions = {
    getEmployees({ commit }) {
        commit('changeLoadingIndicator', {status:true, text: ''} );
        return Api().get('employees')
            .then(response => {
                console.log(response.data);
                commit('changeLoadingIndicator', {status:false, text: ''} );
                commit('SET_EMPLOYEES', response.data)
            })
            .catch(e => {
                console.log(e);
            })
    },
    addEmployee({ commit }, employee) {
        return Api().post('employees', employee)
            .then(response => {
                console.log(response.data);
                let employee = {
                    _id      : response.data.createdEmployee._id,
                    login    : response.data.createdEmployee.login,
                    fullName : response.data.createdEmployee.fullName,
                    email    : response.data.createdEmployee.email
                }
                commit('ADD_EMPLOYEE', employee)
                localStorage.token = response.data.newToken;
            })
            .catch(e => {
                console.log(e.response.data.message);
                commit('setError',e.response.data.message );
                router.push('/');
               // router.push({name: 'Login'});
            })      
    },
    changeEmployee ( { commit } , employee ) {
        let self = this;
        return Api().patch('employees', employee)
          .then(response => {
            console.log('response');
            console.log(response.data);
            commit('CHANGE_EMPLOYEE', response.data)
           // this.departments.push(response.data)
          })
          .catch(e=>{
            console.log(e);
          })
    },
    deleteEmployee({ commit }, data) {
        return Api().delete('employees/' + data.id)
            .then(response => {
                commit('DELETE_EMPLOYEE', data.index)
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