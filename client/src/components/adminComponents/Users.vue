<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm10 md10 lg10>

    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-btn color="primary" dark slot="activator" class="mb-2">новый пользователь</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12 md12>
                <v-text-field 
                  label="Введите имя пользователя" 
                  :error-messages="errors.collect('user')"
                  v-validate="'required'"
                  data-vv-name="user"
                  required
                  v-model="item.userName"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-select 
                  v-bind:items="departments"
                  label="Выберите отдел" 
                  :error-messages="errors.collect('department')"
                  v-validate="'required'"
                  data-vv-name="department"
                  required
                  v-model="item.department"
                  item-text = departmentName
                  item-value = departmentName
                >
                </v-select>
              </v-flex>
              <v-flex xs12 sm12 md12 >
                <v-text-field  
                  label="Введите номер для связи с eDDS"
                  v-model="item.ddsID"
                >
                </v-text-field>
              </v-flex>


              <v-flex>
                   <b>Выберите роль:</b> <br>
                        <el-checkbox v-model="item.isInspector">Инспектор</el-checkbox> <br>
                        <el-checkbox v-model="item.isAdmin">Администратор</el-checkbox> <br>
                        <el-checkbox v-model="item.isUser">Пользователь</el-checkbox>
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
      :data="users"
      border
      height="750"
      cell-class-name="standart-cell"
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
        prop="userName"
        label="Пользователи"
        header-align="center"
        align="left"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="ddsID"
        label="Номер для eDDS:"
        header-align="center"
        align="left"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="department"
        label="Отделы:"
        header-align="center"
        align="left"
        width="180"
      >
      </el-table-column>
      <el-table-column
        label="Роль:"
        header-align="center"
        align="left"
        width="180"
      >
        <template slot-scope="props" >
          <p> {{ props.row.isInspector ? "Инспектор" : "" }} </p>
          <p> {{ props.row.isAdmin ? "Администратор" : "" }} </p>
          <p> {{ props.row.isUser  ? "Пользователь" : ""}} </p>
        </template>
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
      dialog: false,
      edit : false,
      isInspector: false,
      isAdmin: false,
      item: {
        userName: '',
        department: '',
        isInspector:false,
        isAdmin:false,
        isUser:false,
        ddsID:null

      },
       defaultItem: {
        userName: '',
        department: '',
        isInspector:false,
        isAdmin:false,
        isUser:false,
        ddsID:null
      },
      headers: [
          {
            text: '№',
            align: 'left',
            sortable: false,
            value: 'name',
            width:'10%'
          },
          { 
            text: 'Пользователи:',
            align: 'left',
            sortable: false, 
            value: 'users',
            width:'20%' 
            },
            { 
            text: 'Номер для eDDS:',
            align: 'left',
            sortable: false, 
            value: 'users',
            width:'20%' 
            },
            { 
            text: 'Отделы:',
            align: 'left',
            sortable: false, 
            value: 'users',
            width:'20%' 
            },
            { 
            text: 'Роли:',
            align: 'left',
            sortable: false, 
            value: 'roles',
            width:'60%' 
            },
            { 
            text: 'Действия:',
            align: 'left',
            sortable: false, 
            width:'10%'
            }
        ],
         custom: {
          name: {
            required: () => 'Name can not be empty'
            // custom messages
          }
      }
    }
  },
  computed: {
    users () {
      return this.$store.getters.loadUsers
    },
    departments () {
        return this.$store.getters.loadDepartments
    },
    formTitle () {
      if (this.edit == false) {
        return 'Добавление пользователя' 
      } else {
        return 'Редактирование пользователя'
      }
    }
  },
  mounted () {
    this.getUsers();
    this.getDepartments();
  },
  methods: {
      editItem (item) {
        this.edit = true
        this.item = Object.assign({}, item); 
        this.dialog = true
      },
      deleteItem (index, id) {
        confirm('Are you sure you want to delete this user?') && this.$store.dispatch('deleteUser', {id:id, index:index})
      },
      close () { 
        this.dialog = false;
        this.item = Object.assign({}, this.defaultItem);
        this.edit = false;
        this.$validator.reset();
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
                    this.$store.dispatch('changeUser', {user:this.item})
                    this.edit = false
                    this.item = Object.assign({}, this.defaultItem);
                } else {
                    this.edit = false
                    this.$store.dispatch('addUser', this.item)
                    this.item = Object.assign({}, this.defaultItem);
                }
                this.dialog = false
                this.$nextTick(() => this.$validator.reset())
              }
            }).catch((err)=>{
                console.log(err);
            })
          }, 

    getUsers () {
      this.$store.dispatch('getUsers')
    },
     getDepartments () {
      this.$store.dispatch('getDepartments')
    },
  
    // deleteUser (id, index) {
    //   this.$store.dispatch('deleteUser', {id:id, index:index})
    // }
  }
}
</script>
<style>
  
  .el-table tr:hover>td{
    background-color:inherit !important;
  }

   

    

</style>
