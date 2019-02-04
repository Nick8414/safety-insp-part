
import Api from '@/services/Api'

const state = {
        precautions:[] 
};

const getters = {
    loadPrecautions: (state) => {
        return state.precautions
    },
    loadArrayPrecautions: (state) => {
        let result = [];
        state.precautions.forEach((val)=>{
            result.push(val.precautionsName)
        });
        return result;
    }
};

const mutations = {

    setPrecautions(state, precautions) {
        state.precautions = precautions
        console.log(state.precautions)
    },
    addPrecaution(state, precaution) {
        console.log(precaution);
        state.precautions.push(precaution)
    },
    changePrecaution(state, precaution) {
        console.log('mutaion');
        console.log(precaution);
           console.log(precaution.result._id);
                console.log(state.precautions)        
        for (let i=0; i< state.precautions.length; i++ ) {
            if (state.precautions[i]._id == precaution.result._id ) {
                console.log(state.precautions[i]._id)
                state.precautions[i].precautionName = precaution.result.precautionName;
            }else {
                console.log('Not Found');
            }
        }  
    }, 
    deletePrecaution(state, index) {
        state.precautions.splice(index, 1)
    }

};

const actions = {

    getPrecautions ( { commit } ) {
        let self = this;
        return Api().get('precautions')
          .then(response => {
            console.log(response.data);
          //  let departments = [];
          //  response.data.forEach(element => {
          //    self.departments.push(element)
           // });
    
            commit('setPrecautions', response.data)
           // this.departments.push(response.data)
          })
          .catch(e=>{
            console.log(e);
          })
      },
      addPrecaution ( {commit}, precaution ) {
        console.log('precaution');
        console.log(precaution);
                 return Api().post('precautions', {
                    precautionName:precaution
            })
              .then(response => {
                console.log(response.data);
                 let precaution = {
                    precautionName:response.data.createdPrecaution.precautionName,
                      _id:response.data.createdPrecaution._id
                     } 
    
                     commit('addPrecaution', precaution)     
    
              })
              .catch(e=>{
                console.log(e);
              })       
    },
    changePrecaution ( { commit } , precaution ) {
        console.log(precaution);
        let self = this;
        return Api().patch('precautions', precaution)
          .then(response => {
              console.log('response');
            console.log(response.data);
            commit('changePrecaution', response.data)
           // this.departments.push(response.data)
          })
          .catch(e=>{
            console.log(e);
          })
      },  
    deletePrecaution ( {commit}, data ) {
    
    console.log(data);
    // console.log(index);
    return Api().delete('precautions/'+data.id)
    .then(response => {
      console.log(data.index);
       
    
       commit('deletePrecaution', data.index)
    })
    .catch(e=>{
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