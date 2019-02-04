import Api from '@/services/Api'

const state = {
    ratings: []   
};

const getters = {
    loadRatings (state) {
        return state.ratings
    } 
};

const mutations = {
    setRating(state, ratings) {
        state.ratings = ratings
    },
    addRating(state, rating) {
        state.ratings.push(rating)
    },
    changeRating(state, rating) { 
        console.log('rating')      ;
        console.log(rating)      ;
        for (let i=0; i< state.ratings.length; i++ ) {
            if (state.ratings[i]._id == rating.result._id ) {
                state.ratings.splice(i, 1, rating.result);
            }else {
                console.log('Not Found');
            }
        }  
    },
    deleteRating(state, index) {
        state.ratings.splice(index, 1)
    }

};

const actions = {

    getRatings({ commit }) {
        let self = this;
        return Api().get('hazardratings')
            .then(response => {
                console.log(response.data);
                commit('setRating', response.data)
            })
            .catch(e => {
                console.log(e);
            })
    },
    addRating({ commit }, rating) {
        console.log(rating);
        return Api().post('hazardratings', {
            ratingName: rating
        })
            .then(response => {
                console.log(response.data);
                let rating = {
                    ratingName: response.data.createdRating.ratingName,
                    _id: response.data.createdRating._id
                }
                commit('addRating', rating)
            })
            .catch(e => {
                console.log(e.message);
            })      
    },
    changeRating ( { commit } , rating ) {
        console.log(rating);
        let self = this;
        return Api().patch('hazardratings', rating)
          .then(response => {
              console.log('response');
            console.log(response.data);
            commit('changeRating', response.data)
           // this.departments.push(response.data)
          })
          .catch(e=>{
            console.log(e);
          })
      },
    deleteRating({ commit }, data) {

        console.log(data);
        // console.log(index);
        return Api().delete('hazardratings/' + data.id)
            .then(response => {
                commit('deleteRating', data.index)
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