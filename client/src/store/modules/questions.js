
import Api from '@/services/Api'

const state = {
        questions:[] 
};

const getters = {
    loadQuestions: (state) => {
        return state.questions
    },
    loadArrayQuestions: (state) => {
        let result = [];
        state.questions.forEach((val)=>{
            result.push(val.QuestionName)
        });
        return result;
    }
};

const mutations = {

    setQuestions(state, questions) {
        state.questions = questions
        console.log(state.questions)
    },
    addQuestion(state, question) {
        console.log(question);
        state.questions.push(question)
    },
    chngQuestion(state, question) {
        console.log("question");
        console.log(question);
        console.log(state.questions);
       // state.PSD = psd
       for (let i=0; i< state.questions.length; i++ ) {
        if (state.questions[i]._id == question.result._id ) {
            console.log(state.questions[i]._id)
            state.questions[i].QuestionName = question.result.QuestionName;
            state.questions[i].Items = question.result.Items;
        }else {
            console.log('Not Found');
        }
    }     


    },
    deleteQuestion(state, index) {
        state.questions.splice(index, 1)
    }

};

const actions = {

    getQuestions ( { commit } ) {
        let self = this;
        return Api().get('questions')
          .then(response => {
            console.log(response.data);
          //  let departments = [];
          //  response.data.forEach(element => {
          //    self.departments.push(element)
           // });
    
            commit('setQuestions', response.data)
           // this.departments.push(response.data)
          })
          .catch(e=>{
            console.log(e);
          })
      },
    addQuestion ( {commit}, question ) {
        console.log(question);
                 return Api().post('questions', {
                    Question:question
            })
              .then(response => {
                console.log(response.data);
                 let question = response.data.question
                     commit('addQuestion', question)     
              })
              .catch(e=>{
                console.log(e);
              })       
    },  
    deleteQuestion ( {commit}, data ) {
    
    console.log(data);
    // console.log(index);
    return Api().delete('questions/'+data.id)
    .then(response => {
      console.log(data.index);
       
    
       commit('deleteQuestion', data.index)
    })
    .catch(e=>{
      console.log(e);
    })  
    },
    editQuestion ( {commit}, data ) {
        
        console.log(data);
        
        return Api().patch('questions', data)
        .then(response => {
           commit('chngQuestion', response.data)
        })
        .catch(e=>{
          console.log(e.message);
        })  
        }
};



export default ({
    state,
    getters,
    mutations,
    actions
})