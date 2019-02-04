<template>
  <v-container fluid>
    <v-layout >
      <v-flex xs12 sm10 md10 lg10>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-btn color="primary" dark slot="activator" class="mb-2">новый отдел</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12 md12>
                <v-text-field 
                  label="Введите название отдела" 
                  :error-messages="errors.collect('department')"
                  v-validate="'required'"
                  data-vv-name="department"
                  required
                  v-model="item.departmentName"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <v-text-field 
                  label="Введите название отдела в eDDS" 
                  :error-messages="errors.collect('eSystemDepartmentName')"
                  v-validate="'required'"
                  data-vv-name="eSystemDepartmentName"
                  required
                  v-model="item.eSystemDepartmentName"
                >
                </v-text-field>
              </v-flex>

              <v-btn fab dark small color="primary" @click="item.productionAreas.push({areaName:''})">
                <v-icon dark>add</v-icon>
              </v-btn>
              <v-btn fab dark small color="primary" @click="item.productionAreas.pop({areaName:''})">
                <v-icon dark>remove</v-icon>
              </v-btn>
              <v-flex xs12 sm12 md12  >
                <v-text-field 
                v-for="(prodArea, index) in item.productionAreas" :key="index"
                  label="Введите прод. зону для отдела" 
                  :error-messages="errors.collect('department')"
                  v-validate="'required'"
                  data-vv-name="department"
                  required
                  v-model="prodArea.areaName"
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
    </v-flex>
    </v-layout>
 
    <el-table
      :data="departments"
      border
      height="750"
      style="width: 100%"
      cell-class-name="standart-cell"
    >
      <el-table-column
        header-align="center"
        align="center"
        type="index"
        width="30"
      >
      </el-table-column>
      <el-table-column
        prop="departmentName"
        label="Отделы:"
        header-align="center"
        align="left"
        width="250"
      >
      </el-table-column>
      <el-table-column
        prop="eSystemDepartmentName"
        label="Название в eDDS:"
        header-align="center"
        align="center"
        width="100"
      >
      </el-table-column>
      <el-table-column
        prop="productionAreas"
        label="Производственные зоны"
        header-align="center"
        align="left"
        width="100"
      >
        <template slot-scope="props">
          <ol>
            <li v-for="(item, index) in props.row.productionAreas" :key="index">
                {{ item.areaName }}
            </li>
          </ol>
        </template>
      </el-table-column>
      <el-table-column
        label="Действия"
        header-align="center"
        align="center"
        width="150"
      >
        <template slot-scope="props">
          <v-btn v-if="props.row.departmentName != 'All | ВСЕ'" icon class="mx-0" @click="editItem(props.row)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn v-if="props.row.departmentName != 'All | ВСЕ'" icon class="mx-0" @click="deleteItem(props.$index, props.row._id )">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </template>
      </el-table-column>
    </el-table>
    
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
      item: {
        departmentName       : '',
        eSystemDepartmentName: '',
        productionAreas      : []
      },
       defaultItem: {
        departmentName       : '',
        eSystemDepartmentName: '',
        productionAreas      : []
      },
      headers: [
          {
            text: '№',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { 
            text: 'Отделы:',
            align: 'left',
            sortable: false, 
            value: 'departments' 
          },
          { 
            text: 'Название в eDDS:',
            align: 'left',
            sortable: false, 
            value: 'departments' 
          },
          { 
            text: 'Производственные зоны',
            align: 'left',
            sortable: false, 
            value: 'departments' 
          },  
          { 
            text: 'Действия:',
            align: 'left',
            sortable: false, 
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
  created: function () {
    this.getDepartments();
  },
  computed: {
    departments () {
      return this.$store.getters.loadDepartments
    },
    formTitle () {
      if (this.edit == false) {
        return 'Добавление отдела' 
      } else {
        return 'Редактирование отдела'
      }
    }
  },
  methods: {
      editItem (item) {
        console.log(item)
        this.edit = true
        this.item = Object.assign({}, item); 
        this.dialog = true
      },
      deleteItem (index, id) {
        confirm('Are you sure you want to delete this department?') && this.$store.dispatch('deleteDepartment', {id:id, index:index})
      },
      close () { 
        this.dialog = false;
        this.item = Object.assign({}, this.defaultItem);
        this.item.productionAreas = [];
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
                    this.$store.dispatch('changeDepartment', this.item)
                    this.edit = false
                    this.item = Object.assign({}, this.defaultItem);
                    this.item.productionAreas = [];
                } else {
                    this.edit = false
                    this.$store.dispatch('addDepartment', this.item)
                    this.item = Object.assign({}, this.defaultItem);
                    this.item.productionAreas = [];
                }
                this.dialog = false
                this.$nextTick(() => this.$validator.reset())
              }
            }).catch((err)=>{
                console.log(err);
            })
          }, 

    getDepartments () {
      this.$store.dispatch('getDepartments')
    },
  
    deleteDepartment (id, index) {
      confirm('Are you sure you want to delete this device?') && this.$store.dispatch('deleteDepartment', {id:id, index:index})
    }
  }
}
</script>
