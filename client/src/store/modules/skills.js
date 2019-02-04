import Api from '@/services/Api'

const state = {
    skills: []   
};

const getters = {
    loadSkills (state) {
        return state.skills
    } 
};

const mutations = {
    setSkills(state, skills) {
       
        state.skills = skills
    },
    addSkills(state, skill) {
        state.skills.push(skill)
    },
    changeSkill(state, skill) {
               
        for (let i=0; i< state.skills.length; i++ ) {
            if (state.skills[i]._id == skill.result._id ) {
                state.skills[i].skillName = skill.result.skillName;
            }else {
                console.log('Not Found');
            }
        }  
    },
    deleteSkill(state, index) {
        state.skills.splice(index, 1)
    }

};

const actions = {

    getSkills({ commit }) {
        console.log('getskills actions')
        let self = this;
        return Api().get('skills')
            .then(response => {
                console.log('skillllllls');
                console.log(response);
               // localStorage.token = response.data.newToken;
                commit('setSkills', response.data)
            })
            .catch(e => {
                console.log(e);
            })
    },

    addSkill({ commit }, skill) {
        console.log(skill);
        return Api().post('skills', {
            skillName: skill
        })
            .then(response => {
                let skill = {
                    skillName: response.data.createdSkill.skillName,
                    _id: response.data.createdSkill._id
                }
                commit('addSkills', skill)
            })
            .catch(e => {
                console.log(e.message);
            })      
    },
    changeSkill ( { commit } , skill ) {
      
        return Api().patch('skills', skill)
        .then(response => {
          commit('changeSkill', response.data)
        })
        .catch(e=>{
          console.log(e);
        })
    },
    deleteSkill({ commit }, data) {
        return Api().delete('skills/' + data.id)
            .then(response => {
                commit('deleteSkill', data.index)
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