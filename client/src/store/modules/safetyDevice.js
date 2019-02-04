import Api from '@/services/Api'

const state = {
    devices                : [],
    numbersOfSafDev        : [],
    psdDescriptionsOfSafDev: [],
    fieldTAGsOfSafDev      : [],
    flowSheets             : [],
    installationPlaces     : [],
    responsible            : [],
    filterDepartments      : [],
    statuses               : [],
    quantitySafetyDevices  : 0
   // PSDForm              : {}
     
};

const getters = {
    loadDevices (state) {
        const devices  = state.devices.map( (value) => {
            if ( value.PSD_Description) {
                if ( value.lastInspectionDate === null ) {
                    return value;
                } 
                else {
                    let dateNext = new Date(value.nextInspectionDate);
                    let dateLast = new Date(value.lastInspectionDate);
                 //   dateNext.setMonth(dateNext.getMonth() + value.PSD_Description.frequencyOfInspection );
                    // value.nextInspectionDate = dateNext.toLocaleString(['ru-RU'], {year: 'numeric', month: 'numeric', day: 'numeric' });
                    // value.lastInspectionDate = dateLast.toLocaleString(['ru-RU'], {year: 'numeric', month: 'numeric', day: 'numeric' });

                    value.nextInspectionDate = dateNext;
                    value.lastInspectionDate = dateLast;

                //    value.nextInspectionDate = dateNext.toLocaleString('ru-RU', {year: 'numeric', month: 'numeric', day: 'numeric' });
                //    value.lastInspectionDate = dateLast.toLocaleString('ru-RU', {year: 'numeric', month: 'numeric', day: 'numeric' });
                    return value;   
                }
            } else  if ( value.PSD_Description == null ) {
                value.PSD_Description = {} ;
                value.PSD_Description.title = "not parring to type" 
                value.PSD_Description.frequencyOfInspection = 0;
                return value;
            }
        })
   
        return  devices;
    },

    loadFieldTAGs (state) {
        return state.fieldTAGsOfSafDev
    },

    loadPSDForm (state) {
        return state.PSDForm
    },
    loadNumbers (state) {
        return state.numbersOfSafDev;
    },
    loadPSDDescriptions (state) {
        return state.psdDescriptionsOfSafDev;
    },
    loadPSDDescriptionsFilter (state) {
         let newArr = state.psdDescriptionsOfSafDev.map(value => {
              return value.title;
        });
        return newArr.sort();
    },
    loadQuantitySafetyDevices (state) {
        return state.quantitySafetyDevices
    },
    loadFlowSheets (state) {
        return state.flowSheets
    },
    loadInstallationPlaces (state) {
        return state.installationPlaces
    },
    loadResponsible (state) {
        return state.responsible
    },
    loadFilterStatuses (state) {
        return state.statuses
    },
    loadFilterDepartments (state) {
        return state.filterDepartments
    }
 
};

const mutations = {

    setFieldTagOfSafetyDevices(state, fieldTAGs) {
        state.fieldTAGsOfSafDev = fieldTAGs

    },

    setNumberOfDevices(state, numbers) {
        state.numbersOfSafDev = numbers
    },

    setPsdDescriptionsOfSafDev(state, psdDescriptions) {
        state.psdDescriptionsOfSafDev = psdDescriptions
    },

    setFlowSheets(state, flowSheets) {
        state.flowSheets = flowSheets;
    },
    
    setInstallationPlaces(state, installationPlaces) {
        state.installationPlaces = installationPlaces;
    },

    setResponsible(state, responsible) {
        state.responsible = responsible;
    },
    setStatuses(state, statuses) {
        state.statuses = statuses;
    },
    setFilterDepartments(state, filterDepartments) {
        state.filterDepartments = filterDepartments;
    },



    addSafetyDevice(state, safetyDevice) {
        console.log(state);
        // state.psdDescriptionsOfSafDev.forEach(value => {
        //     if ( value.id === safetyDevice._id ) {
        //         console.log(safetyDevice)
        //         safetyDevice.PSD_Description = { id:safetyDevice._id, title:value.title }
        //     }
        // })
        console.log(`88888888888888888888888888888888`);
        console.log(safetyDevice);

        state.devices.push(safetyDevice)
      },
      setDevices(state, devices) {
   
          state.devices = devices
      },
      changeDevice(state, device) {    
          console.log('cnahge device');
          console.log(device);
        for (let i=0; i< state.devices.length; i++ ) {
            if (state.devices[i]._id == device._id ) {
                console.log(state.devices[i]._id)
                console.log(state.devices[i])
                state.devices.splice(i, 1, device);
            }else {
                console.log('Not Found');
            }
        }  
      },
      setPSDForm (state, psd) {
        //  console.log(psd);
          state.PSDForm = psd
         // state.PSDForm[0].titleDescription = 'УСТРОЙСТВО БЕЗОПАСНОСТИ (УБ):'
       //   console.log(state.PSDForm);
      },
      deleteDevice(state, id) {
          for (let i=0; i< state.devices.length; i++ ) {
            if (state.devices[i]._id == id ) {
                state.devices.splice(i, 1);
            }else {
                console.log('Not Found');
            }
        }  
      },
      setQuantityDevices(state, quantity) {
        state.quantitySafetyDevices = quantity; 
      }
      
};

const actions = {

  addSafetyDevice ( {commit, dispatch }, safetyDevice ) {
                return Api().post('safetydevices', {
                    psd_TAG               : safetyDevice.psd_TAG,
                    fieldTAG              : safetyDevice.fieldTAG,
                    flowSheet             : safetyDevice.flowSheet,
                    flowSheetLink         : safetyDevice.flowSheetLink,
                    PSD_Description       : safetyDevice.PSD_Description,
                    installationPlace     : safetyDevice.installationPlace,
                    responsiblePerson     : safetyDevice.responsiblePerson,
                    lastInspectionDate    : safetyDevice.lastInspectionDate,
                    nextInspectionDate    : safetyDevice.nextInspectionDate,
                    hazard                : safetyDevice.hazard,
                    hazardRaiting         : safetyDevice.hazardRaiting,
                    otherPropertiesAndData: safetyDevice.otherPropertiesAndData,
                    safetyIntegretyLevel  : safetyDevice.safetyIntegretyLevel,
                    protectiveAction      : safetyDevice.protectiveAction,
                    department            : safetyDevice.department,
                    comments              : safetyDevice.comments,
                    settingSizePSData     : safetyDevice.settingSizePSData,
                    inOperationShutdown   : safetyDevice.inOperationShutdown,
                    typeInspection        : safetyDevice.typeInspection,
                    methodInspection      : safetyDevice.methodInspection,
                    PSI_Status            : safetyDevice.PSI_Status,
                    skillLevel            : safetyDevice.skillLevel ,
                    duration              : safetyDevice.duration,
                    numberPeople          : safetyDevice.numberPeople,
                    notes                 : safetyDevice.notes,
                    material              : safetyDevice.material,
                    procedureLink         : safetyDevice.procedureLink,
                    nameplate             : safetyDevice.nameplate      
            })
              .then(response => {
                console.log(response)
                safetyDevice._id = response.data.createdDevice._id;
                localStorage.token = response.data.newToken;
                commit('addSafetyDevice', response.data.createdDevice);
               // dispatch('getDevices') 
              })
              .catch(e=>{
                console.log(e.response);
              })      
    }, 
  deleteDevice ( { commit }, data ) {
    return Api().delete('safetydevices/' + data.id)
        .then(response => {
            console.log(response)
            localStorage.token = response.data.newToken;
            commit('deleteDevice', data.id)
        })
        .catch(e => {
           console.log(e);
        })
    },




    getSafDevNumber ( { commit }, filter ) {
        return Api().get('safetyDevices/numberOfSafetyDevices', { params: filter })
          .then(response => {
            commit('setNumberOfDevices', response.data)
          })
          .catch(e=>{
            console.log(e.response);
          })
    },




    getSafDevPSDDescriptions ( { commit }, filter ) {
        return Api().get('safetyDevices/psdDescriptionOfSafetyDevices', {params: filter})
          .then(response => {
            console.log(`response------------------------------------------------------------------------------------------------------------------`);
              console.log(response);
            commit('setPsdDescriptionsOfSafDev', response.data)
          })
          .catch(e=>{
            console.log(e.response);
          })
    },
    getFieldTAGs ( { commit }, filter ) {
        return Api().get('safetyDevices/fieldTagOfSafetyDevices', { params: filter })
          .then(response => {
            commit('setFieldTagOfSafetyDevices', response.data)
          })
          .catch(e=>{
            console.log(e.response);
          })
    },

    getFlowSheets ( { commit }, filter ) {
        return Api().get('safetyDevices/flowSheetOfSafetyDevices', { params: filter })
          .then(response => {
            commit('setFlowSheets', response.data)
          })
          .catch(e=>{
            console.log(e.response);
          })
    },
   
    getInstallationPlaces ( { commit }, filter ) {
        return Api().get('safetyDevices/installationPlaceOfSafetyDevices', { params: filter })
          .then(response => {
            commit('setInstallationPlaces', response.data)
          })
          .catch(e=>{
            console.log(e.response);
          })
    },
    getResponsible ( { commit }, filter ) {
        return Api().get('safetyDevices/responsibleOfSafetyDevices', { params: filter })
          .then(response => {
            console.log('responsibles')
              console.log(response)
            commit('setResponsible', response.data)
          })
          .catch(e=>{
            console.log(e.response);
          })
    },
    
    getFilterStatuses ( { commit }, filter ) {
        return Api().get('safetyDevices/statusesOfSafetyDevices', { params: filter })
          .then(response => {
            console.log('responsibles')
              console.log(response)
            commit('setStatuses', response.data)
          })
          .catch(e=>{
            console.log(e.response);
          })    
    },

    getFilterDepartments ( { commit }, filter ) {
        return Api().get('safetyDevices/filterDepartments', { params: filter })
          .then(response => {
            
              console.log(response)
            commit('setFilterDepartments', response.data)
         })
          .catch(e=>{
            console.log(e.response);
         })
    },


    getDevices ( { commit }, filter ) {
      return Api().get('safetyDevices', {
        params: {
          department:filter.department,
          dateOfLastInspection:filter.dateOfLastInspection,
          dateOfNextInspection:filter.dateOfNextInspection
        }
      })
      .then(response => { 
        console.log(response);   
        commit('setDevices', response.data.devices)
        localStorage.token = response.data.newToken;
      })
      .catch(e=>{
        console.log(e.response);
      })
    },
      getAdminDevices ( { commit }, filter ) {
    
      //  console.log(filter);

        if (filter.department == 'All | ВСЕ') {
            filter.department = '';
        } 
        
        return Api().get('safetyDevices/safetyDevicesAdmin', { params: filter })
          .then(response => {
            console.log(response)
            commit ('setDevices', response.data.results);
            commit ('setQuantityDevices', response.data.quantity);
            localStorage.token = response.data.newToken;
        
          })
          .catch(e=>{
            console.log(e.response);
          })
      },

  changeDevice ( { commit } , item ) {
     // console.log('change device data');
    //  console.log(item);
 
     return Api().patch('safetydevices', item)
            .then(response => {
                console.log('response data')
                console.log(response)
            
               commit('changeDevice', response.data.device);
               localStorage.token = response.data.newToken;
             })
            .catch( err => {
                 console.log(err.response)
             })
  },
//--------------------================================================------------------------------------------------------------------

      getPSDForm ( { commit }, psdTag ) {

        return Api().get('getpsdForm', {
            params: {
                PSD_TAG  : psdTag
            }
        })
          .then(response => {
    
            commit('setPSDForm', response.data[0])
                let psdDescription =response.data[0].PSD_Description;
    
                return Api().get('gettyp',{
                    params: {
                        id  : psdDescription._id
                    }
                })
                  .then(response => {
              
                    commit('setTyp', response.data[0])
                  })
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