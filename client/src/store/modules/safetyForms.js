import Api from '@/services/Api'
import router from '@/router'
const state = {
  safetyForms : [],
  quantitySafetyForms:0
     
};
const getters = {
    loadSafetyForms: (state) => {
        return state.safetyForms
    },
    loadQuantitySafetyForms: (state) => {
      return state.quantitySafetyForms
  }
};
const mutations = {
    setSafetyForms(state, safetyForms) {
        state.safetyForms = safetyForms
        console.log(state.safetyForms)
    },
    setQuantitySafetyForms(state, quantity) {
      state.quantitySafetyForms = quantity; 
    }
};

const actions = {
  getProcedure ( { commit }, link ) {
    console.log(link);
    let self = this;
    return Api().get('procedures', {responseType: 'blob', params: {
              link: link
            }
          })
          .then(response => {
            console.log(response.data);
            //Create a Blob from the PDF Stream
           const file = new Blob(
           [response.data], 
           {type: 'application/pdf'});
           //Build a URL from the file
           const fileURL = URL.createObjectURL(file);
          //Open the URL on new Window
          window.open(fileURL);
          // const url = window.URL.createObjectURL(new Blob([response.data]));
          // const link = document.createElement('a');
          // link.href = url;
          // console.log(link)
          // link.setAttribute('download','file.pdf');
          // document.body.appendChild(link);
          // console.log(link);
          // link.click();
        })
      .catch(e=>{
        console.log(e);
      })
  },
  // getSafetyForms ( { commit } ) {
  //   console.log('getSafetyForms')
  //     commit('changeLoadingIndicator', {status:true, text:'loading'} );
  //     return Api().get('safetyforms')
  //         .then(response => {
  //           commit('changeLoadingIndicator', {status:false, text:''} );
  //           console.log(response.data);
  //           commit('setSafetyForms', response.data)
  //           localStorage.token = response.data.newToken;
  //         })
  //         .catch(e=>{
  //           commit('changeLoadingIndicator', false );
  //           console.log(e.message);
  //         })
  // },
  getFilteredSafetyForms ( { commit }, filter ) {
     console.log(filter);

     if (filter.department == 'All | ВСЕ') {
       filter.department = '';
     } 
     console.log(filter.department);
   // let self = this;
   commit('changeLoadingIndicator', {status:true, text: ''} );
     return Api().get('safetyforms', {
       params: filter
     })
     .then(response => {
       console.log(response.data);
       commit ('setSafetyForms', response.data.results);
       commit ('setQuantitySafetyForms', response.data.quantity);
       localStorage.token = response.data.newToken;
       commit('changeLoadingIndicator', {status:false, text: ''} );
     })
     .catch(e=>{
       console.log(e.message);
     })
  },  
  addSafetyForm({ commit }, safetyForm) {
    commit('changeLoadingIndicator', {status:true, text:'Saving'} );
    console.log(safetyForm);
    let prodAreas = safetyForm.prodAreas;
    return Api().post('safetyforms', {
      SafetyForm: safetyForm
    })
      .then(response => {
        commit('changeLoadingIndicator', {status:false, text:''} );
        localStorage.token = response.data.newToken;
        console.log('response==============>>>>>>>>')
        console.log(response.data);
        let safetyForm = response.data.createdForm;
        if (safetyForm.result == false) {
          let description = [];

          safetyForm.questions.forEach(question => {
            if (question.Status === false) {
              description.push(question.questionName + '\n')
            }
          })

          description.push(safetyForm.notes)

          let dataForAction = {
            createdDate: safetyForm.date,
            psd_TAG: safetyForm.PSD_TAG,
            fieldTAG: safetyForm.fieldTAG,
            PSD_Type: safetyForm.psd_Description,
            department: safetyForm.department,
            prodAreas:prodAreas,
            installationPlace: safetyForm.installationPlace,
            description: description,
            responsiblePerson: safetyForm.inspector
          }


          return { route: 'ActionPlan', dataForAction }
        } else if (safetyForm.result == true) {

          Api().patch('actions/closeAction', {
            flag: 'closeAction',
            psd_TAG: safetyForm.PSD_TAG,
            complete: 100,
            status: 'УСТРАНЕНО',
            endDate: new Date()
          })
            .then(response => {
              console.log(response.data);

            })
            .catch(e => {
              commit('changeLoadingIndicator', {status:false, text:''} );
              console.log(e.response);
            })
          return { route: 'MainTable', dataForAction: '' }
        }
            
      })
      .then((dataForAction) => {
        router.push({ name: dataForAction.route, params: { dataForAction: dataForAction.dataForAction } })
      })
      .catch(e => {
        console.log(e.message);
      })
  },  

  // savePDF ( {commit}, safetyForm ) {
  //   return Api().get('savepdf', {
  //     SafetyForm:safetyForm
  //   })
  //   .then(response => {
  //     window.open(response.data);
  //     let pdfWindow = window.open("")
  //     pdfWindow.document.write("<iframe width='100%' height='100%' src="+response.data+"></iframe>")
  //   })
  //   .catch(e=>{
  //     console.log(e.message);
  //   })       
  // }
};

export default ({
    state,
    getters,
    mutations,
    actions
})