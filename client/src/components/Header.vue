<template>
<div>

<v-dialog v-model="helpDialog" width="700px">
    <v-card>
         <v-card-title>
          <span class="headline">Легенда</span>
        </v-card-title>
            <div class="legend">
             <div>
                <div class = "legend__action-completed">&nbsp</div>
                <div class="legend__title"><span>- завершенное действие</span></div> 
            </div> 

            <div>
                <div class = "legend__action-overdueHigh">&nbsp</div>
                <span class="legend__title">- просроченное действие, высокий приоритет</span> 
            </div> 

            <div>
                <div class = "legend__action-overdueMedium">&nbsp</div>
                <span class="legend__title">- просроченное действие, средний приоритет</span> 
            </div> 

            <div>
                <div class = "legend__action-overdueLow">&nbsp</div>
                <span class="legend__title">-  просроченное действие, низкий приоритет</span> 
            </div> 
           
            <div>
                <div class = "legend__action-notCompleteHigh">&nbsp</div>
                <span class="legend__title">- не завершенное действие, высокий приоритет</span> 
            </div>    

            <div>
                <div class = "legend__action-notCompleteMedium">&nbsp</div>
                <span class="legend__title">- не завершенное действие, средний приоритет</span> 
            </div>  

            <div>
                <div class = "legend__action-notCompleteLow">&nbsp</div>
                <span class="legend__title">- не завершенное действие, низкий приоритет</span> 
            </div>  
             
        </div>
<hr/>
         <div class="legend">
             <div>
                <div class = "legend__not-use">&nbsp</div>
                <div class="legend__title"><span>- УСТРОЙСТВО НЕ ИНСПЕКТИРУЕТСЯ</span></div> 
            </div> 

            <div>
                <div class = "legend__ok">&nbsp</div>
                <span class="legend__title">- ИНСПЕКЦИЯ НЕ ПРОСРОЧЕНА И В СТАТУСЕ "ОК"</span> 
            </div> 

            <div>
                <div class = "legend__this-month">&nbsp</div>
                <span class="legend__title">- ИНСПЕКЦИЯ, КОТОРАЯ ДОЛЖНА БЫТЬ ВЫПОЛНЕНА В ЭТОМ МЕСЯЦЕ</span> 
            </div> 

            <div>
                <div class = "legend__expired">&nbsp</div>
                <span class="legend__title">- ИНСПЕКЦИЯ ПРОСРОЧЕНА</span> 
            </div> 
           
            <div>
                <div class = "legend__nok">&nbsp</div>
                <span class="legend__title">- ИНСПЕКЦИЯ В СТАТУСЕ "NOK"</span> 
            </div>    
             
        </div> 
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click="helpDialog = false">OK</v-btn>
        </v-card-actions>
    </v-card>
    
      <!-- <v-card>
        <v-card-title>
          <span class="headline">Легенда</span>
        </v-card-title>
       
        <v-card-text>
        +</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click="helpDialog = false">Disagree</v-btn>
          <v-btn color="green darken-1" flat="flat" @click="helpDialog = false">Agree</v-btn>
        </v-card-actions>
      </v-card> -->
    </v-dialog>

    <v-toolbar dark color="primary" fixed app height="45">
    <v-toolbar-title class="white--text">
        <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-width="200"
            offset-x
        >    
            <v-avatar v-if="user" color="indigo"  slot="activator">
            <!-- <v-icon large dark>account_circle</v-icon> -->
                <img
                    v-if="user.imageLink"
                    :src=user.imageLink
                    alt="No Photo"
                >
                <v-icon v-else large dark>account_circle</v-icon>
            </v-avatar>
            <v-avatar v-else color="grey"  slot="activator">
                <v-icon large dark>account_circle</v-icon>
            </v-avatar>

            <v-card  v-if="user">
              <v-list>
                <v-list-tile avatar>
                  <v-list-tile-avatar>
                    <img :src="user.imageLink" alt="Photo">
                  </v-list-tile-avatar>

                  <v-list-tile-content>
                    <v-list-tile-title>
                       {{ user.userName }}
                    </v-list-tile-title>
                    <v-list-tile-sub-title>
                        {{ user.isAdmin == true ? "Администратор":""}}  
                        {{ user.isInspector == true ? "Инспектор":"" }}  
                        {{ user.isUser == true ? "Пользователь":"" }}
                    </v-list-tile-sub-title>
                  </v-list-tile-content>
                </v-list-tile>
              </v-list>

              <v-divider></v-divider>

              <v-list>
                <v-list-tile>
                  <v-list-tile-title>
                      Выбранный отдел: {{ user.department }}
                  </v-list-tile-title>
                </v-list-tile>
                <v-list-tile>
                  <v-list-tile-title>
                      Закрепеленный отдел: {{ user.assignedDepartment }}
                  </v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-card>
        </v-menu>
 
        <span 
            class="home"
            @click="navigateTo({name: 'MainTable'})"
        >
            Process Safety
        </span>

        <v-icon @click="openHelp" class="help">help_outline</v-icon>
        
        <selectColumns></selectColumns>  
        </v-toolbar-title>
     <!-- <select v-model="$i18n.locale">
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{ lang }}</option>
    </select> -->
    <v-spacer></v-spacer>
   
    <!-- <div v-if="user" >    
        {{ user.isAdmin == true ? "Администратор":""}}  
        {{ user.isInspector == true ? "Инспектор":"" }}  
        {{ user.isUser == true ? "Пользователь":"" }}
        {{ user.userName }} <br>  
        Отдел: {{ user.department }} <br>
        Закрепеленный отдел: {{ user.assignedDepartment }}
    </div> -->
    <v-toolbar-items>
        

      <v-menu offset-y>
      <v-btn
        slot="activator"
        flat
        color="primary"
        dark
      >
        <img :src="flagString" alt=""> 
      </v-btn>
      <v-list>
        <v-list-tile
          v-for="(item, index) in items"
          :key="index"
          @click="flagString = item.flag, $i18n.locale = item.lang"
        >
            <v-list-tile-title><img :src="item.flag" alt=""></v-list-tile-title>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-menu>

      

        <v-btn 
            v-for="(item, index) in links" 
            v-if="user && item.title != 'header.admin' || user && item.title == 'header.admin' && user.isAdmin == true "
            :key="index"
            :to="{name:item.routeName}"
            flat 
        >
            <v-icon left>{{item.icon}}</v-icon> {{ $t(item.title) }}
        </v-btn>
        
        <v-btn
            @click="exit"
            flat
        >
            <v-icon left>exit_to_app</v-icon>
           {{ $t('header.logout') }}
        </v-btn>
    </v-toolbar-items>
    
    </v-toolbar>

    <div class="locale-changer">
        <select v-model="$i18n.locale">
          <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{ lang }}</option>
        </select> 
        <p></p>
        </div>
    </div> 
</template>
<script>
import selectColumns from '@/components/selectColumns'
    export default {
         components: {
         selectColumns
       },
        name: 'locale-changer',
        data () {
            return {
                links: [
                    { title:'header.psiList', icon:'menu', routeName:'MainTable'},
                    { title:'header.actionPlan', icon:'list', routeName:'ActionPlan'},
                    { title:'header.arhiv', icon:'work', routeName:'Arhiv'},
                    { title:'header.admin', icon:'supervisor_account', routeName:'Administration'}
                ],
                langs: ['ru', 'en'] ,
                helpDialog: false,
                 
                items: [
                  { title: 'En', flag: '../../static/us.png', lang:'en' },
                  { title: 'Ru', flag:'../../static/ru.png', lang: 'ru' }
                ],
                flagString: '../../static/ru.png',
                menu: false
            }
        },
        computed: {
            user () {
                return this.$store.getters.user
            },
            visibleMenuItem (val) {
                if (this.user) {
                    return true
                }
            }
        },
        //  mounted() {
        // //     //Vue.config.locale = 'en'
        //      $i18n.locale = 'en'
        //  },
        methods: {
            navigateTo (route) {
                this.$router.push(route)
            },
            exit () {
                this.navigateTo({name: 'Login'})
                this.$store.dispatch('logout');
            },
            openHelp () {
                this.helpDialog = true;
            }
        }
    }
</script>
<style scoped>
    .home {
        cursor: pointer;
    }
    .home:hover {
        color: rgba(185, 179, 179, 0.658);
    }
    .help:hover {
        color: rgba(185, 179, 179, 0.658);
        cursor: pointer;
    }
    .legend {
        margin-left: 15px;
        display: inline-block;
    }
    .legend__title {
        
       height: 25px;
     width:600px;
        display: inline-block;
    
        
    }
    .legend__not-use {
        
        height: 25px;
        width:50px;
        display: inline-block;
        background-color: rgb(190, 190, 190);
        margin-bottom:5px;
    }
    .legend__ok {
        height: 25px;
        width:50px;
        display: inline-block;
        background-color: rgb(140, 255, 190);
        margin-bottom:5px;
    }
    .legend__this-month {
        height: 25px;
        width:50px;
        display: inline-block;
        background-color: rgb(255, 255, 155);
        margin-bottom:5px;
    }
    .legend__expired {
        height: 25px;
        width:50px;
        display: inline-block;
        background-color: rgb(255, 185, 185);
        margin-bottom:5px;
    }
    .legend__nok {
        height: 25px;
        width:50px;
        display: inline-block;
        background-color: rgb(255, 155, 155);
        margin-bottom:5px;
    }

    .legend__action-completed {
      height: 25px;
      width:50px;
      display: inline-block;
      margin-bottom:5px;
      background-color: rgb(107, 223, 92);
    }   
    .legend__action-overdueHigh {
      height: 25px;
      width:50px;
      display: inline-block;
      margin-bottom:5px;
      background-color:rgb(224, 32, 32);
    }
    .legend__action-overdueMedium {
      height: 25px;
      width:50px;
      display: inline-block;
      margin-bottom:5px;
      background-color:rgb(236, 89, 78);
    }
    .legend__action-overdueLow {
      height: 25px;
      width:50px;
      display: inline-block;
      margin-bottom:5px;
      background-color:rgb(241, 138, 138);
    }
    .legend__action-notCompleteHigh {
      height: 25px;
      width:50px;
      display: inline-block;
      margin-bottom:5px;
      background-color: rgb(255, 136, 0);
    }
    .legend__action-notCompleteMedium {
      height: 25px;
      width:50px;
      display: inline-block;
      margin-bottom:5px;
      background-color: rgb(255, 196, 0);
    }
    .legend__action-notCompleteLow {
      height: 25px;
      width:50px;
      display: inline-block;
      margin-bottom:5px;
      background-color: rgb(246, 246, 111);
    }
</style>
