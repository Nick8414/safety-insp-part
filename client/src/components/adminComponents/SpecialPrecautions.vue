<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm10 md10 lg10>

    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-btn color="primary" dark slot="activator" class="mb-2">новая мера предостарожности</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12 md12>
                <v-text-field 
                  label="Введите название" 
                  :error-messages="errors.collect('precaution')"
                  v-validate="'required'"
                  data-vv-name="precaution"
                  required
                  v-model="item.precautionName"
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
      :data  = "precautions"
      border
      height = "750"
      cell-class-name="standart-cell"
      style  = "width: 100%"
    >
      <el-table-column
        header-align="center"
        align="center"
        type="index"
        width="30"
      >
      </el-table-column>
      <el-table-column
        prop="precautionName"
        label="Меры предостарожности:"
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
      edit : false,
      item: {
        precautionName: '',
      },
       defaultItem: {
        precautionName: '',
      },
      headers: [
          {
            text: '№',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { 
            text: 'Меры предостарожности:',
            align: 'left',
            sortable: false, 
            value: 'precautions' 
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
    this.getPrecautions();
  },
  computed: {
    precautions () {
      return this.$store.getters.loadPrecautions
    },
    formTitle () {
      if (this.edit == false) {
        return 'Добавление меры предостарожности' 
      } else {
        return 'Редактирование меры предостарожности'
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
         confirm('Are you sure you want to delete this precaution?') && this.$store.dispatch('deletePrecaution', {id:id, index:index})
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
                this.$store.dispatch('changePrecaution', {precautionName:this.item.precautionName, id:this.item._id})
                this.edit = false
                this.item = Object.assign({}, this.defaultItem);
            } else {
                this.edit = false
                this.$store.dispatch('addPrecaution', this.item.precautionName)
                this.item = Object.assign({}, this.defaultItem);
            }
            this.dialog = false
            this.$nextTick(() => this.$validator.reset())
          }
           
        }).catch((err)=>{
          console.log(err);
        })
       
      }, 
    getPrecautions () {
      this.$store.dispatch('getPrecautions')
    },
 
    deletePrecautions (id, index) {
      this.$store.dispatch('deletePrecaution', {id:id, index:index})
    }
  }
}
</script>