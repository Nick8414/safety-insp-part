import Api from '@/services/Api'
import router from '../../router'

function parseJwt (token) {
    if (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        //console.log(base64);
        return JSON.parse(Base64.decode(base64));
    }
    
}

const state = {
    Users: [],
    user: null,
    expiredSessionDialog: false   
};

const getters = {
    loadUsers (state) {
        return state.Users
    },
    user (state) {
            return state.user;
    },
    expiredSessionDialog (state) {
        return state.expiredSessionDialog;
    }
};

const mutations = {

    expiredSessionDialog (state, status) {
        state.expiredSessionDialog = status;
    },
    setUser (state, user) {
        state.user = Object.assign({}, user);
      //  console.log(state.user);
    },
    logoutUser (state) {
        state.user = null;
        delete localStorage.token;
    },
    setUsers(state, users) {
        state.Users = users
    },
    addUser(state, user) {
        state.Users.push(user)
    },
    changeUser(state, user) {       
        for (let i=0; i< state.Users.length; i++ ) {
            if (state.Users[i]._id == user.result._id ) {
             //   console.log(state.Users[i]._id)
                state.Users.splice(i, 1, user.result);
            }else {
                console.log('Not Found');
            }
        }  
    },
    changeUserHeadersTable(state, headersTable) {
        console.log(headersTable);
        state.user.headersTable = headersTable;
        console.log(state.user);
    },
    deleteUser(state, index) {
        state.Users.splice(index, 1)
    }
};

const actions = {

    changeExpirationStatusDialog ( {commit}, status ) {
        commit('expiredSessionDialog', status );
    },  

    expiredDialogClose ( {commit, dispatch},  status ) {
        commit('expiredSessionDialog', status );
        router.push({name: 'Login'});
    },

    getUsers({ commit }) {
        return Api().get('users')
            .then(response => {
             //   console.log(response.data);
                commit('setUsers', response.data)
            })
            .catch(e => {
                console.log(e.response);
            })
    },

    addUser({ commit }, user) {
        return Api().post('users', user)
        .then(response => {
            let user = {
                userName   : response.data.createdUser.userName,
                ddsID      : response.data.createdUser.ddsID,
                isInspector: response.data.createdUser.isInspector,
                isAdmin    : response.data.createdUser.isAdmin,
                isUser     : response.data.createdUser.isUser,
                _id        : response.data.createdUser._id
            }
            commit('addUser', user)
        })
        .catch(e => {
            console.log(e.message);
        })      
    },

    changeUser ( { commit } , user ) {
        return Api().patch('users', user)
          .then(response => {
            commit('changeUser', response.data)
          })
          .catch(e=>{
            console.log(e);
          })
    },

    deleteUser({ commit }, data) {
        return Api().delete('users/' + data.id)
            .then(response => {
                commit('deleteUser', data.index)
            })
            .catch(e => {
                console.log(e.response);
            })
    },

    setUser( { commit }, user ) {
        commit('setUser', user)
    },

    saveUserColumns( { commit }, headersTable ) {
        let user = {}
        user.user = Object.assign({}, state.user);
        user.headersTable = headersTable;
        return Api().patch('users', user)
          .then(response => {
            commit('changeUserHeadersTable', response.data.result.headersTable)
          })
          .catch(e=>{
            console.log(e);
          })
    },

    login( {commit, dispatch}, user ) {
        commit('changeLoadingIndicator', {status:true, text: 'Вход в систему'} );
        return Api().post('users/signin', {
            username:user.userName,
            password:user.password,
            department:user.department 
        })
        .then(response => {
            commit('changeLoadingIndicator', {status:false, text: ''} );
            let token = response.data.token;
            localStorage.token = token;
            commit('setUser', parseJwt(token))
            dispatch('authInterval');
            router.push({name: 'MainTable'})
        })
        .catch(e => {
            commit('changeLoadingIndicator', {status:false, text: ''} );
            console.log(e.response);
            commit('setError',e.response.data.message )
        })
    },

    autoLoginUser({commit}) {
        // Check if the ID exists
        if(localStorage.getItem('token')) {
            // Replace the state object with the stored item
           commit('setUser', parseJwt(localStorage.getItem('token')))
        }  else {
            router.push({name: 'Login'});
        }
    },

    authInterval ( {commit, state, dispatch } ) {
      //  if (state.user && localStorage.token) {
        //    console.log('interval 1')
            let checkAuthInterval = setInterval ( ()=>{
                if (state.user && localStorage.token && localStorage.token !== 'undefined') {
                    console.log('interval 2')
                let current_time = Date.now() / 1000;
               // console.log(`it's auth interval` );
               // console.log(localStorage.token);
                let jwt = parseJwt(localStorage.token);
                if ( jwt.exp < current_time) {
                    /* expired */ 
                    clearInterval(checkAuthInterval);
                    dispatch('changeExpirationStatusDialog', true)
                    dispatch('logout');
                } 
            } else {
                console.log('interval 3')
                clearInterval(checkAuthInterval);
                //dispatch('changeExpirationStatusDialog', true)
                dispatch('logout');
            }
            }, 1 * 5 * 1000 ) 
      //  } 
        //else {
           // clearInterval(checkAuthInterval);
         //       dispatch('changeExpirationStatusDialog', true)
           //     dispatch('logout');
       // }      
    },

    logout( { commit } ) {
        commit('logoutUser')
        router.push({name: 'Login'});
        
    }

};

export default ({
    state,
    getters,
    mutations,
    actions
})
