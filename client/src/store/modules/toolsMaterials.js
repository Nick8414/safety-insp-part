// import Vue from 'vue'
// import Vuex from 'vuex'
import Api from '@/services/Api'

// Vue.use(Vuex)

const state = {
        tools:[]
};
const getters = {
    loadTools: (state) => {
        return state.tools
    },
    loadArrayTools: (state) => {
        let result = [];
        state.tools.forEach((val)=>{
            result.push(val.toolsName)
        });
        return result;
    }
};

const mutations = {

    setTools(state, tools) {
        state.tools = tools
        console.log(state.tools)
    },
    addTool(state, tool) {
        console.log(tool);
        state.tools.push(tool)
    },
    changeTool(state, tool) {
        for (let i=0; i< state.tools.length; i++ ) {
            if (state.tools[i]._id == tool.result._id ) {
                console.log(state.tools[i]._id)
                state.tools[i].toolName = tool.result.toolName;
            }else {
                console.log('Not Found');
            }
        }  
    }, 
    deleteTool(state, index) {
        state.tools.splice(index, 1)
    }

};

const actions = {

    getTools ( { commit } ) {
        let self = this;
        return Api().get('tools')
          .then(response => {
            console.log(response.data);
            commit('setTools', response.data)
           // this.departments.push(response.data)
          })
          .catch(e=>{
            console.log(e);
          })
      },
    addTool ( {commit}, tool ) {
        console.log(tool);
                 return Api().post('tools', {
              toolName:tool
            })
              .then(response => {
                console.log('response tool data');
                console.log(response.data);
                 let tool = {
                      toolName:response.data.tool.toolName,
                      _id:response.data.tool._id
                     } 
    
                     commit('addTool', tool)     
    
              })
              .catch(e=>{
                console.log(e);
              })       
    },
    changeTool ( { commit } , tool ) {
        console.log(tool);
        let self = this;
        return Api().patch('tools', tool)
          .then(response => {
            console.log(response.data);
            commit('changeTool', response.data)
           // this.departments.push(response.data)
          })
          .catch(e=>{
            console.log(e);
          })
      },
    
    deleteTool ( {commit}, data ) {
    
    console.log(data);
    // console.log(index);
    return Api().delete('tools/'+data.id)
    .then(response => {
      console.log(data.index);
       commit('deleteTool', data.index)
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