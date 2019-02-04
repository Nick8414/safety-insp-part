import Vue from 'vue'
import Vuex from 'vuex'
import Api from '@/services/Api'
import toolsMaterials from './modules/toolsMaterials'
import departments from './modules/departments'
import typeOfSafDevice from './modules/typeOfSafDevice'
import safetyDevice from './modules/safetyDevice'
import specPrecaution from './modules/specPrecaution'
import questions from './modules/questions'
import safetyForms from './modules/safetyForms'
import skills from './modules/skills'
import users from './modules/users'
import hazardRatings from './modules/hazardRatings'
import statuses from './modules/statuses'
import inspectionTypes from './modules/inspectionTypes'
import inspectionMethods from './modules/inspectionMethods'
import conditionOfEquipment from './modules/conditionOfEquipment'
import protocol from './modules/protocol'
import actionPlan from './modules/actionPlan'
import employee from './modules/employee'
import shared from './modules/shared'
import logs from './modules/logs'

import router from '@/router'


Vue.use(Vuex)

// function parseJwt (token) {
//     console.log('parse function');
//     var base64Url = token.split('.')[1];
//     var base64 = base64Url.replace('-', '+').replace('_', '/');
//     return JSON.parse(Base64.decode(base64));
// };

export const store = new Vuex.Store({
    state: {
        loadingIndicator : {status: false, text: ''} 
     
    },
    mutations: {
        changeLoadingIndicator(state, loadingIndicator) {
            state.loadingIndicator.status = loadingIndicator.status;
            state.loadingIndicator.text = loadingIndicator.text
        }
    
    },
    actions: {
       
    },
    getters: {
        loadingIndicator (state) {
            return state.loadingIndicator
        }
        
    },

    modules: {
        toolsMaterials,
        departments,
        typeOfSafDevice,
        safetyDevice,
        specPrecaution,
        questions,
        safetyForms,
        skills,
        users,
        hazardRatings,
        statuses,
        inspectionTypes,
        inspectionMethods,
        conditionOfEquipment,
        protocol,
        actionPlan,
        employee,
        shared,
        logs
    }
})