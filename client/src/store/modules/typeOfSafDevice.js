// import Vue from 'vue'
// import Vuex from 'vuex'
import Api from '@/services/Api'

// Vue.use(Vuex)


const state = {
  
    Types: [],
    type: {}
     
};

const getters = {
    loadTypes(state) {
        return state.Types
    },
    loadType(state) {
        return state.type
    }
 
};

const mutations = {

    setType(state, types) {
        state.Types = types
    },
    setTyp(state, type) {
        state.type = type
    },
    addType(state, types) {
    //    console.log(types);
        state.Types.push(types)
    },
    changeType(state, type) {
        console.log(type);
           console.log(type._id);
                console.log(state.Types)
        
        for (let i=0; i< state.Types.length; i++ ) {
            if (state.Types[i]._id == type._id ) {
                console.log(state.Types[i]._id)
                state.Types[i].frequencyOfInspection = type.frequencyOfInspection;
                state.Types[i].prepared              = type.prepared;
                state.Types[i].precautions           = type.precautions;
                state.Types[i].procedure             = type.procedure;
                state.Types[i].purpose               = type.purpose;  
                state.Types[i].questions             = type.questions;
                state.Types[i].revisionDate          = type.revisionDate;
                state.Types[i].title                 = type.title;
                state.Types[i].toolsMaterials        = type.toolsMaterials;
                state.Types[i].importantText         = type.importantText;
            }else {
                console.log('Not Found');
            }
        }
        
        },
    deleteType(state, index) {
        state.Types.splice(index, 1)
    },

};

const actions = {

    getTypes ( { commit } ) {
        let self = this;
        return Api().get('devicetypes')
          .then(response => {
            console.log('response.data');
            console.log(response.data);

            commit('setType', response.data)
           // this.departments.push(response.data)
          })
          .catch(e=>{
            console.log(e);
          })
      },

      getTyp ( { commit }, typeTitle ) {
        let self = this;
        console.log(typeTitle);
        return Api().get('gettyp',{
            params: {
                typeTitle  : typeTitle
            }
        })
          .then(response => {
            console.log(response.data);
          })
          .catch(e=>{
            console.log(e);
          })
      },

      changeType ( { commit } , type ) {
          console.log(type);
        let self = this;
        return Api().patch('devicetypes', type)
          .then(response => {
            console.log(response.data);
            commit('changeType', response.data)
           // this.departments.push(response.data)
          })
          .catch(e=>{
            console.log(e);
          })
      },

    addType ( {commit}, type ) {

        console.log(type);
        
                 return Api().post('devicetypes', {
                      typeTitle     : type.title,
                      frequency     : type.frequencyOfInspection,
                      purpose       : type.purpose,
                      toolsMaterials: type.toolsMaterials,
                      precautions   : type.precautions,
                      questions     : type.questions,
                      prepared      : type.prepared,
                      revisionDate  : type.revisionDate,
                      importantText : type.importantText

            })
              .then(response => {
                  console.log(response)
                     commit('addType', response.data.type)     

              })
              .catch(e=>{
                console.log(e.message);
              })       
    },  
deleteType ( {commit}, data ) {
    console.log(data);

    return Api().delete('deviceTypes/'+data.id)
    .then(response => {

       commit('deleteType', data.index)
    })
    .catch(e=>{
      console.log(e);
    })  
},
    
};



export default ({
    state,
    getters,
    mutations,
    actions
})