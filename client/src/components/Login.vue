<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex md6 sm10>
       <div class="headline text-md-center"> {{ $t('forms.loginFormTitle') }} </div>
          <v-card ref="form">
            <v-card-text>
              <form>
                <v-text-field
                  prepend-icon="person"
                  name="login"
                  type="text"
                  v-model="name"
                  :label="$t('forms.login')"
                  :error-messages="errors.collect('name')"
                  v-validate="'required'"
                  data-vv-name="name"
                  required
                ></v-text-field>
                <v-text-field
                  name="password"
                  :label="$t('forms.pass')"
                  prepend-icon="lock"
                  v-model="password"
                  min="8"
                  :append-icon="e1 ? 'visibility' : 'visibility_off'"
                   @click:append="e1 = !e1"
                  :type="e1 ? 'password' : 'text'"
                  :error-messages="errors.collect('password')"
                  v-validate="'required'"
                  data-vv-name="password"
                  required
                ></v-text-field>
                <v-select
                  v-bind:items="departments"
                  v-model="department"
                  :label="$t('forms.department')"
                  :error-messages="errors.collect('select')"
                  v-validate="'required'"
                  data-vv-name="select"
                  item-text = departmentName
                  item-value = departmentName
                  required
                ></v-select>
                <v-btn @click="submit">{{ $t('forms.submit') }} </v-btn>
                <v-btn @click="clear">{{ $t('forms.clear') }}</v-btn>
               </form>
            </v-card-text>
          </v-card>
      </v-flex>
    </v-layout>  
  </v-container>
 </template>

<script>
export default {
    $validates: true,
    data () {
      return {
        name: '',
        e1: true,
        password: '',
        department: null,
        //checkbox: null
      }
    },
    computed: {
      departments () {
        return this.$store.getters.loadDepartmentsForLoginForm
      }
    },
    created () {
      if (this.$route.query['loginError']) {
       this.$store.dispatch('setError', 'Please log in to access this. page.')
      }
    },
    mounted () {
      this.getDepartments ();
    },
    methods: {
      getDepartments () {
        this.$store.dispatch('getDepartments')
      },
      navigateTo (route) {
        this.$router.push(route)
      },
      submit () {
        this.$validator.validateAll()
          .then(result=>{
                if (!result) {
                  return
                 // alert('Error!!!');
              } else {
                  const user = {
                    userName  : this.name,
                    password  : this.password,
                    department: this.department
                  }
                  this.$store.dispatch('login', user);
                //  this.navigateTo({name: 'MainTable'});
              } 
          })
          .catch(err => {
             console.log(err);
          })
      },
      clear () {
        this.name = ''
        this.password = ''
        this.department = null
        this.$validator.reset()
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus" scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
.loading-dialog {
   background-color: #303030; 
}

</style>
