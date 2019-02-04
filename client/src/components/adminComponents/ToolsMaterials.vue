<template>
  <v-container fluid>
    <v-layout >
      <v-flex xs12 sm10 md10 lg10>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-btn color="primary" dark slot="activator" class="mb-2">новый инструмент</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12 md12>
                <v-text-field
                  label="Введите название устройства" 
                  v-model="item.toolName"
                  :error-messages="errors.collect('tool')"
                  v-validate="'required'"
                  data-vv-name="tool"
                  required
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
      :data="toolsMaterials"
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
        prop="toolName"
        label="ИНСТРУМЕНТЫ И МАТЕРИАЛЫ:"
        header-align="center"
        align="left"
        width="500"
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
      edit: false,
      item: {
        toolName: ''
      },
      defaultItem: {
        toolName: ''
      },
      headers: [
          {
            text: '№',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { 
            text: 'ИНСТРУМЕНТЫ И МАТЕРИАЛЫ:',
            align: 'left',
            sortable: false, 
            value: 'toolsMaterials' 
            },
            { 
            text: 'Действия:',
            align: 'left',
            sortable: false, 
            }
        ]//,
       // departments: []
    }
  },
  created: function () {
    this.getTools();
  },
  computed: {
    toolsMaterials () {
      return this.$store.getters.loadTools
    },
     formTitle () {
      if (this.edit == false) {
        return 'Добавление инструмента' 
      } else {
        return 'Редактирование инструмента'
      }
    }
  },
  methods: {
      editItem (item) {
        this.edit = true
        this.item = Object.assign({}, item); 
        this.dialog = true
      },

      deleteItem (index, id) {
        confirm('Are you sure you want to delete this material?') && this.$store.dispatch('deleteTool', {id:id, index:index})
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
                this.$store.dispatch('changeTool', {toolName:this.item.toolName, id:this.item._id})
                this.edit = false
                this.item = Object.assign({}, this.defaultItem);
            } else {
                this.edit = false
                this.$store.dispatch('addTool', this.item.toolName)
                this.item = Object.assign({}, this.defaultItem);
            }
            this.dialog = false
            this.$nextTick(() => this.$validator.reset())
          }
           
        }).catch((err)=>{
          console.log(err);
        })
       
      },

    clear () {
      this.toolName = '',
      this.$validator.reset()
    },
    getTools () {
      this.$store.dispatch('getTools')
    },
    saveTool () {
     this.$validator.validateAll()
        .then ((result) => {
          console.log('OK')
          if (result) {
          // eslint-disable-next-line
          alert('From Submitted!');
        this.$store.dispatch('addTool',this.toolName)
        this.toolName = '';
        this.dialog = false;
        this.$validator.reset();
          return;
        }

  
       })
        .catch(e=>{
          console.log(e);
          alert("Поля заполнены не корректно");
        })



     
    },
    deleteTool (id, index) {
      console.log(index)
      this.$store.dispatch('deleteTool', {id:id, index:index})

      /*
      let self = this;
     // self.departments.splice(index,1)
      console.log(id);
     // console.log(index);
      return Api().delete('deleteDepartment/'+id)
      .then(response => {
        console.log(index);
         this.departments.splice(index,1)
      })
      .catch(e=>{
        console.log(e);
      })
     */
    }
  }
}
</script>
<style scoped>
  
  
  .el-table tr:hover>td{
    background-color:inherit !important;
  }

    


    

</style>