<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm10 md10 lg10>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-btn color="primary" dark slot="activator" class="mb-2">новый протокол</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12 md12>
                <v-text-field 
                  label="Введите номер" 
                  :error-messages="errors.collect('number')"
                  v-validate="'required'"
                  data-vv-name="number"
                  required
                  v-model="item.number"
                >
                </v-text-field>
                <v-menu
                  ref="menu2"
                  :close-on-content-click="false"
                  v-model="menu2"
                  :nudge-right="40"
                  :return-value.sync="item.date"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    v-model="computedDateFormatted"
                    label="Picker without buttons"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker v-model="item.date" @input="$refs.menu2.save(item.date)"></v-date-picker>
                </v-menu>
   
                <v-text-field 
                  label="Введите название материала" 
                  :error-messages="errors.collect('material')"
                  v-validate="'required'"
                  data-vv-name="material"
                  required
                  v-model="item.material"
                >
                </v-text-field>
                <v-select 
                  label="Введите тип устройства" 
                  :error-messages="errors.collect('deviceType')"
                  v-validate="'required'"
                  data-vv-name="deviceType"
                  required
                  v-model="item.deviceType"
                  :items="types"
                  item-value="title"
                  item-text="title"
                >
                </v-select>
                <v-select 
                  label="Выберите отдел" 
                  :error-messages="errors.collect('department')"
                  v-validate="'required'"
                  data-vv-name="department"
                  required
                  v-model="item.department"
                  :items="departments"
                  item-value="departmentName"
                  item-text="departmentName"
                >
                </v-select>
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
      :data="protocols"
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
        prop="number"
        label="Номер:"
        header-align="center"
        align="left"
        width="100"
      >
      </el-table-column>
       <el-table-column
        prop="date"
        label="Дата:"
        header-align="center"
        align="left"
        width="100"
      >
      </el-table-column>
       <el-table-column
        prop="material"
        label="Материал:"
        header-align="center"
        align="left"
        width="100"
      >
      </el-table-column>
       <el-table-column
        prop="deviceType"
        label="Тип:"
        header-align="center"
        align="left"
        width="100"
      >
      </el-table-column>
       <el-table-column
        prop="department"
        label="Отдел:"
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
      dialog: false,
      edit : false,
      menu2: false,
      item: {
        number    : '',
        date      : '',
        material  : '',
        deviceType: '',
        department: '' 
      },
       defaultItem: {
        number    : '',
        date      : '',
        material  : '',
        deviceType: '',
        department: ''
      },
      headers: [
          {
            text: '№',
            align: 'left',
            sortable: false
          },
          {
            text: 'Номер:',
            align: 'left',
            sortable: false
          },
          { 
            text: 'Дата:',
            align: 'left',
            sortable: false 
          },
          { 
            text: 'Материал:',
            align: 'left',
            sortable: false
          },
          { 
            text: 'Тип:',
            align: 'left',
            sortable: false 
          },
          { 
            text: 'Отдел:',
            align: 'left',
            sortable: false
          },
          { 
            text: 'Действия:',
            align: 'left',
            sortable: false
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
  mounted: function () {
   // this.getProtocols();
    // this.getDepartments();
    // this.getDeviceTypes();
  },
  watch: {
       date (val) {
        this.dateFormatted = this.formatDate(this.item.date)
      }
  },
  computed: {
        computedDateFormatted () {
        return this.formatDate(this.item.date)
      },
    protocols () {
      return this.$store.getters.loadProtocols
    },
     departments () {
      return this.$store.getters.loadDepartments
    },
     types () {
      return this.$store.getters.loadTypes
    },
    formTitle () {
      if (this.edit == false) {
        return 'Добавление протокола' 
      } else {
        return 'Редактирование протокола'
      }
    }
  },
  created() {
    this.$store.dispatch('getProtocols')
      
  },
  methods: {
       formatDate (date) {
        if (!date) return null

        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      },
      parseDate (date) {
        if (!date) return null

        const [month, day, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
      editItem (item) {
        this.edit = true
        this.item = Object.assign({}, item); 
        this.dialog = true
      },
      deleteItem (index, id) {
         confirm('Are you sure you want to delete this protocol?') && this.$store.dispatch('deleteProtocol', {id:id, index:index})
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
                    this.$store.dispatch('changeProtocol', this.item)
                    this.edit = false
                    this.item = Object.assign({}, this.defaultItem);
                } else {
                    this.edit = false
                    this.$store.dispatch('addProtocol', this.item)
                    this.item = Object.assign({}, this.defaultItem);
                }
                this.dialog = false
                this.$nextTick(() => this.$validator.reset())
              }
            }).catch((err)=>{
                console.log(err);
            })
          }, 

    // getProtocols () {
    //   this.$store.dispatch('getProtocols')
    // },
  
    deleteProtocol (id, index) {
      this.$store.dispatch('deleteProtocol', {id:id, index:index})
    },
    getDepartments() {

    },
    getDeviceTypes() {

    }
  }
}
</script>
<style>

  
  .el-table tr:hover>td{
    background-color:inherit !important;
  }

 

    

</style>