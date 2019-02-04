<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm10 md10 lg10>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-btn color="primary" dark slot="activator" class="mb-2">новый сотрудник</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12 md12>
                <v-text-field 
                  label="Введите логин" 
                  :error-messages="errors.collect('number')"
                  v-validate="'required'"
                  data-vv-name="number"
                  required
                  v-model="item.login"
                >
                </v-text-field>   
                <v-text-field 
                  label="Введите полное имя" 
                  :error-messages="errors.collect('material')"
                  v-validate="'required'"
                  data-vv-name="material"
                  required
                  v-model="item.fullName"
                >
                </v-text-field>
                <v-text-field 
                  label="Введите e-mail пользователя" 
                  :error-messages="errors.collect('material')"
                  v-validate="'required'"
                  data-vv-name="material"
                  required
                  v-model="item.email"
                >
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
        <el-table
      :default-sort = "{prop: 'login', order: 'ascending'}"  
      :data="employees"
      border
      cell-class-name="standart-cell"
      height="750"
      style="width: 100%"
    >
      <el-table-column
        header-align="center"
        align="center"
        type="index"
        width="30"
      >
      </el-table-column>
      <el-table-column
        sortable
        prop="login"
        label="Логин:"
        header-align="center"
        align="left"
        width="100"
      >
      </el-table-column>
       <el-table-column
        prop="fullName"
        label="Полное имя:"
        header-align="center"
        align="left"
        width="100"
      >
      </el-table-column>
       <el-table-column
        prop="email"
        label="эл. почта:"
        header-align="center"
        align="left"
        width="100"
      >
      </el-table-column>
       <el-table-column
        label="Действия"
        header-align="center"
        align="center"
        width="150"
      >
        <template slot-scope="props">
          <v-btn icon class="mx-0" @click="editItem(props.row)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteItem(props.$index, props.row._id )">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </template>
      </el-table-column>
    </el-table>

      </v-flex>
    </v-layout>  
  </v-container>
</template>

<script>
import Api from '@/services/Api'

export default {
    $_veeValidate: {
      validator: 'new'
    },

  data () {
    return {
      item: {
        login   : '',
        fullName: '',
        email   : ''
      },
      defaultItem: {
        login   : '',
        fullName: '',
        email   : ''
      },
      dialog: false,
      edit  : false,
      headers: [
          {
            text: '№',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { 
            text: 'Логин:',
            align: 'left',
            sortable: false, 
            value: 'departments' 
          },
          { 
            text: 'Полное имя:',
            align: 'left',
            sortable: false, 
          },
          { 
            text: 'эл. почта:',
            align: 'left',
            sortable: false, 
          }
        ],
    }
    
  },
  computed: {
        
    employees () {
      return this.$store.getters.loadEmployees
    },
    formTitle () {
      if (this.edit == false) {
        return 'Добавление сотрудника' 
      } else {
        return 'Редактирование сотрудника'
      }
    }
    
  },
  created() {
      this.getEmployees();
  },
  methods: {
      editItem (item) {
        this.edit = true
        this.item = Object.assign({}, item); 
        this.dialog = true
      },
      deleteItem (index, id) {
         confirm('Are you sure you want to delete this employee?') && this.$store.dispatch('deleteEmployee', {id:id, index:index})
      },
      close () { 
        this.dialog = false;
        this.item = Object.assign({}, this.defaultItem);
        this.edit = false;
        this.$validator.reset();
      },
      getEmployees () {
        this.$store.dispatch('getEmployees')
      },
      save () {
        let self = this;
             this.$validator.validateAll()
              .then(result=>{
                if (!result) {
                  console.log(result);
                  return
                 // alert('Error!!!');
              } else {
                if (this.edit) {
                    this.$store.dispatch('changeEmployee', this.item)
                    this.edit = false
                    this.item = Object.assign({}, this.defaultItem);
                } else {
                    this.edit = false
                    this.$store.dispatch('addEmployee', this.item)
                    this.item = Object.assign({}, this.defaultItem);
                }
                this.dialog = false
                this.$nextTick(() => this.$validator.reset())
              }
            }).catch((err)=>{
                console.log(err);
            })
          }, 
  }
}
</script>
<style>
  

  

    

</style>