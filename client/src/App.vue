<template>
  <div id="app">
    <v-app>
      <page-header></page-header>
      <main>
        <v-content style="padding: 5px 0px 0px;">
          <!-- <v-container fluid> -->
            <template>
              <v-layout row justify-center>
                 <v-dialog
      v-model="loadingIndicatorStatus"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="primary"
        dark
      >
        <v-card-text>
          <h1 style="color:white; text-align:center"> {{ loadingIndicatorText }}</h1>
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
                <v-dialog v-model="expiredDialog" persistent max-width="350">
                  <v-card>
                    <v-card-title class="headline red darken-1">Session Expired</v-card-title>
                    <v-card-text> <v-icon large color="red darken-1">av_timer</v-icon> Your session has expired.</v-card-text>
                    <v-card-text>You will be redirected to the Login page.</v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="red darken-1" @click.native="expiredDialogClose">OK</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-layout>
            </template>
            <router-view></router-view> 
          <!-- </v-container> -->
        </v-content> 
        <template v-if="error" >  
          <v-snackbar
            :timeout="5000"
            :multi-line = "true"
            color = "error"
            @input ="closeError"
            :value="true"
          >
            {{ error }}
            <v-btn flat dark @click.native="closeError">Close</v-btn>
          </v-snackbar>
        </template>
      </main>    
      <!-- <v-footer dark color="primary" app height="1" ></v-footer>     -->
    </v-app>
  </div>
</template>

<script>
  import router from '@/router'
  import PageHeader from '@/components/Header'
  export default {
    name: 'app',
    components: {
      PageHeader
    },
    data () {
      return {
       
      }
    },
    beforeCreate() {
      this.$store.dispatch('autoLoginUser'); //проверяет наличие токена в localStorage и устанавливает пользователя
    },
    mounted() {
      this.$store.dispatch('authInterval'); //проверяет актуальность токена каждую минуту, в случае его просрочки выкидывает на главную страницу
    //  this.$store.dispatch('autoLoginUser');
    },

    computed: {
      error () {
        return this.$store.getters.error
      },
      expiredDialog () {
        return this.$store.getters.expiredSessionDialog
      },
      loadingIndicatorStatus () {
        return this.$store.getters.loadingIndicator.status
      },
      loadingIndicatorText () {
        return this.$store.getters.loadingIndicator.text
      }
    },
    methods: {
      closeError() {
        this.$store.dispatch('clearError')
      },
      expiredDialogClose() {
        this.$store.dispatch('expiredDialogClose', false)
      }
    }
  }

</script>
<style global>
/* html, body {
   overflow: hidden; 
  
} */
th {
  font-size: 10px !important;
  vertical-align: center;
  background: rgb(79, 129, 189) !important;
}

td {
  padding: 1px !important;
}

.standart-cell {
  font-size: 8px;
   font-weight:300; 
   font-family: Verdana, Geneva, sans-serif

}  

.cell {
  letter-spacing: normal;
  line-height: normal !important; 
  color: black;
  padding: 1px !important;
  vertical-align: top;
  /* white-space: pre !important; */
  word-wrap: break-word !important; /* Перенос слов */
} 

</style>



