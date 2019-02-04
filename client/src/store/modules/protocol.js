import Api from '@/services/Api'
import router from '../../router'

const state = {
    Protocols: []   
};

const getters = {
    loadProtocols (state) {
        return state.Protocols
    } 
};

const mutations = {
    setProtocols(state, protocols) {
        state.Protocols = protocols
    },
    addProtocol(state, protocols) {
        state.Protocols.push(protocols)
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
    deleteProtocol(state, index) {
        state.Protocols.splice(index, 1)
    }

};

const actions = {
    getProtocols({ commit }, filter) {

        console.log('getting protocols...', filter);
        return Api().get('protocols', {
            params: filter
        })
            .then(response => {
                commit('setProtocols', response.data)
            })
            .catch(e => {
                console.log(e);
            })
    },
    addProtocol({ commit }, protocol) {
        console.log(protocol);
        return Api().post('protocols', protocol)
            .then(response => {
                console.log(response.data);
                let protocol = {
                    number    : response.data.createdProtocol.number,
                    department: response.data.createdProtocol.department,
                    material  : response.data.createdProtocol.material,
                    deviceType: response.data.createdProtocol.deviceType,
                    _id       : response.data.createdProtocol._id
                }
                commit('addProtocol', protocol)
                localStorage.token = response.data.newToken;
            })
            .catch(e => {
                console.log(e.response.data.message);
                commit('setError',e.response.data.message );
                router.push('/');
               // router.push({name: 'Login'});
            })      
    },
    changeProtocol ( { commit } , protocol ) {
        let self = this;
        return Api().patch('protocols', protocol)
          .then(response => {
            console.log('response');
            console.log(response.data);
            commit('changeProtocol', response.data)
           // this.departments.push(response.data)
          })
          .catch(e=>{
            console.log(e);
          })
    },
    deleteProtocol({ commit }, data) {

        console.log(data);
        // console.log(index);
        return Api().delete('protocols/' + data.id)
            .then(response => {
                commit('deleteProtocol', data.index)
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