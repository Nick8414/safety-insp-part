<template>
    <v-layout>
      <v-flex xl1 lg1 md1 class="mt-3">
        
        <v-list dense>
            <v-list-tile
              v-for="(item, index) in items"
              :to="{name: item.component}"
              :key="index"
              @click=""
             
            >
             <!-- active-class="nickClass" -->
              <v-list-tile-content>
                <!-- <v-list-tile-title> -->
                  <div class="border_b">
                    {{ $t(item.title) }}
                  </div>
                  
                  
                <!-- </v-list-tile-title> -->
              </v-list-tile-content>
            </v-list-tile>
          </v-list>        
      </v-flex> 
      <v-flex xl11 lg11 md11>
        <router-view></router-view>
      </v-flex> 
    </v-layout>    
</template>
<script>
//import AdminPanel from '@/components/adminComponents/AdminPanel'
export default {
    data () {
        return {
          items: [
            { title: 'adminMenu.psd', icon: 'devices', view: false, component: 'SafetyDevice'},
            { title: 'adminMenu.departments', icon: 'meeting_room', view: false, component: 'Department'},
            { title: 'adminMenu.tools', icon: 'build', view: false, component: 'ToolsMaterials'},
            { title: 'adminMenu.psdTypes', icon: 'devices_other', view: false, component:'DeviceType'},
            { title: 'adminMenu.precautionary', icon: 'build', view: false, component:'SpecialPrecautions'},
            { title: 'adminMenu.users', icon: 'build', view: false, component:'Users'},
            { title: 'adminMenu.skillLevel', icon: 'build', view: false, component:'Skills'},
            { title: 'adminMenu.hazardRating', icon: 'build', view: false, component:'HazardRating'},
            { title: 'adminMenu.psdStatus', icon: 'build', view: false, component:'Status'},
            { title: 'adminMenu.equipmentState', icon: 'build', view: false, component:'ConditionOfEquipment'},
            { title: 'adminMenu.inspectionMethod', icon: 'build', view: false, component:'InspectionMethod'},
            { title: 'adminMenu.inspectionType', icon: 'build', view: false, component:'InspectionType'},
            { title: 'adminMenu.durations', icon: 'build', view: false, component:'SessionDuration'},
            { title: 'adminMenu.protocols', icon: 'build', view: false, component:'Protocol'},
            { title: 'adminMenu.employees', icon: 'build', view: false, component:'Employee'},
            { title: 'adminMenu.logs', icon: 'build', view: false, component:'Logs'}
          ]
        }
    },
         beforeRouteEnter (to, from, next) {
       console.log(to);
       console.log(from);
       next(vm => {
         console.log('vm.$store.getters');
           console.log(vm.$store.getters.user);
           if (!vm.$store.getters.user.isAdmin) {
             next({
			    path: '/maintable'
        })
         vm.$store.dispatch('setError', 'Only admin have access to this page.')
           }
       })
  },
    methods: {
    
    }
}
 
</script>
<style scoped>
  .list {
    font-size: 9px !important;
  }
  /deep/ a {
    height: 35px !important;
  }
  /deep/ .nickClass {
    background: #1976D2 !important;
    color: #FFF;
  }
  .border_b {
    /* display: block;  */
	  text-decoration: none;
	  font-weight: bold;
	  /* background-color:#F1F1F1; */
	  /* padding: 2px;
    margin: 0px; */
	  font-size: 10px;
	  /* border: 1px groove grey; */
    overflow: auto;
 
    
  }
</style>
