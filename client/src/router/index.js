import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import InspectionForm from '@/components/InspectionForm'
import MainTable from '@/components/MainTable'
import Department from '@/components/adminComponents/Department'
import SafetyDevice from '@/components/adminComponents/SafetyDevice'
import DeviceType from '@/components/adminComponents/DeviceType'
import ToolsMaterials from '@/components/adminComponents/ToolsMaterials'
import SpecialPrecautions from '@/components/adminComponents/SpecialPrecautions'
import Users from  '@/components/adminComponents/Users'
import Questions from '@/components/adminComponents/Questions'
import Status from '@/components/adminComponents/Status'
import Administration from '@/components/Administration'
import ActionPlan from '@/components/ActionPlan'
import Arhiv from '@/components/Arhiv'
import Skills from '@/components/adminComponents/SkillLevel'
import Logs from '@/components/adminComponents/Logs'

import HazardRating from '@/components/adminComponents/HazardRating'

import AuthGuard from './auth-guard'

    import ConditionOfEquipment from '@/components/adminComponents/ConditionOfEquipment'
    import InspectionMethod from '@/components/adminComponents/InspectionMethod'
    import InspectionType from '@/components/adminComponents/InspectionType'
    import SessionDuration from '@/components/adminComponents/SessionDuration'
    import Protocol from '@/components/adminComponents/Protocol'
    import Employee from '@/components/adminComponents/Employee'

    import Error404 from '@/components/errorsComponents/Error404'  


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    // {
    //   path: '/login',
    //   name: 'Login',
    //   component: Login
    // },
    {
      path: '/admin',
      redirect: {name: 'SafetyDevice'},
      name: 'Administration',
      component: Administration,
      beforeEnter: AuthGuard,
      children: [
        {
          path: 'department',
          name: 'Department',
          component: Department
        },
        {
          path: 'tools',
          name: 'ToolsMaterials',
          component: ToolsMaterials
        },
        {
          path: 'psdtype',
          name: 'DeviceType',
          component: DeviceType
        },
        {
          path: 'safetydevice',
          name: 'SafetyDevice',
          component: SafetyDevice
        },
        {
          path: 'precautions',
          name: 'SpecialPrecautions',
          component: SpecialPrecautions
        },
        {
          path: 'users',
          name: 'Users',
          component: Users
        },
        {
          path: 'skills',
          name: 'Skills',
          component: Skills
        },
        {
          path: 'hazardratings',
          name: 'HazardRating',
          component: HazardRating
        },
        {
          path: 'status',
          name: 'Status',
          component: Status
        },
        {
          path: 'conditionofequipment',
          name: 'ConditionOfEquipment',
          component: ConditionOfEquipment
        },
        {
          path: 'inspectionmethod',
          name: 'InspectionMethod',
          component: InspectionMethod
        },
        {
          path: 'inspectiontype',
          name: 'InspectionType',
          component: InspectionType
        },
        {
          path: 'sessionduration',
          name: 'SessionDuration',
          component: SessionDuration
        },
        {
          path: 'protocol',
          name: 'Protocol',
          component: Protocol
        },
        {
          path: 'employee',
          name: 'Employee',
          component: Employee
        },
        {
          path: 'logs',
          name: 'Logs',
          component: Logs
        }
      ]
    },
    {
      path: '/inspectionform',
      name: 'InspectionForm',
      component: InspectionForm,
      beforeEnter: AuthGuard,
      props: true
    },
    {
      path: '/maintable',
      name: 'MainTable',
      component: MainTable,
      beforeEnter: AuthGuard
    },
    // {
    //   path: '/questions',
    //   name: 'Questions',
    //   component: Questions
    // },
    {
      path: '/actionplan',
      name: 'ActionPlan',
      component: ActionPlan,
      beforeEnter: AuthGuard,
      props: true
    },
    {
      path: '/arhiv',
      name: 'Arhiv',
      component: Arhiv,
      beforeEnter: AuthGuard
    },
    {
      path:'*',
      name: 'Error404',
      component: Error404
    } 

  ],
  mode:'history'
})
