import Api from '@/services/Api'
import router from '../../router'

const state = {
    Departments: []   
};

const getters = {
    loadDepartments (state) {
        state.Departments.push({departmentName:'All | ВСЕ'})
        return state.Departments
    },
    loadDepartmentsFilter (state) {
        let newArr = state.Departments.map(value => {
            return value.departmentName;
      });
      return newArr.sort();
    },
    loadDepartmentsForLoginForm (state) {
         state.Departments.push({departmentName:'All | ВСЕ'})
         return state.Departments
     }  
};

const mutations = {
    setDepartments(state, departments) {
        state.Departments = departments
    },
    addDepartments(state, department) {
        state.Departments.push(department)
    },
    changeDepartment(state, department) {
        for (let i=0; i< state.Departments.length; i++ ) {
            if (state.Departments[i]._id == department.result._id ) {
                state.Departments.splice(i, 1, department.result)
            }else {
                console.log('Not Found');
            }
        }  
    },

    changeProtocol(state, protocol) {     
        for (let i=0; i< state.Protocols.length; i++ ) {
            if (state.Protocols[i]._id == protocol.result._id ) {
                console.log(state.Protocols[i]._id)
                state.Protocols.splice(i, 1, protocol.result);
            } else {
                console.log('Not Found');
            }
        }  
    },


    deleteDepartments(state, index) {
        state.Departments.splice(index, 1)
    }

};

const actions = {
  getDepartments({ commit }) {
    return Api()
      .get("departments")
      .then(response => {
        console.log(response.data);

        commit("setDepartments", response.data);
        // this.departments.push(response.data)
      })
      .catch(e => {
        console.log(e);
      });
  },
  addDepartment({ commit }, department) {
    console.log(department);
    return Api()
      .post("departments", {
        departmentName: department.departmentName,
        eSystemDepartmentName: department.eSystemDepartmentName,
        productionAreas: department.productionAreas
      })
      .then(response => {
        console.log(response.data);
        let department = {
          departmentName: response.data.createdDepartment.departmentName,
          eSystemDepartmentName:
            response.data.createdDepartment.eSystemDepartmentName,
          productionAreas: response.data.createdDepartment.productionAreas,
          _id: response.data.createdDepartment._id
        };
        commit("addDepartments", department);
        localStorage.token = response.data.newToken;
      })
      .catch(e => {
        console.log(e.response.data.message);
        commit("setError", e.response.data.message);
        router.push("/");
        // router.push({name: 'Login'});
      });
  },
  changeDepartment({ commit }, department) {    
      return Api()
          .patch("departments", department)
          .then(response => {
              console.log("response");
              console.log(response.data);
              commit("changeDepartment", response.data);
          })
          .catch(e => {
              console.log(e.response);
          });
  },
  deleteDepartment({ commit }, data) {
    return Api()
      .delete("departments/" + data.id)
      .then(response => {
        commit("deleteDepartments", data.index);
      })
      .catch(e => {
        console.log(e);
      });
  }
};

export default ({
    state,
    getters,
    mutations,
    actions
})