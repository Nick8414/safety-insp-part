<template>
  <v-container>
    <v-layout>
      <v-flex xs10 sm8 md8 lg8>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-btn color="primary" dark slot="activator" class="mb-2">новый статус</v-btn>
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12 md12>
                <v-text-field 
                  label="Введите название статуса" 
                  :error-messages="errors.collect('status')"
                  v-validate="'required'"
                  data-vv-name="status"
                  required
                  v-model="item.statusName"
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
      :data="statuses"
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
        prop="statusName"
        label="Статусы:"
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
        statusName: '',
      },
       defaultItem: {
        statusName: '',
      },
      headers: [
          {
            text: '№',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { 
            text: 'Рейтинги:',
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
    this.getStatuses();
  },
  computed: {
    statuses () {
      return this.$store.getters.loadStatuses
    },
    formTitle () {
      if (this.edit == false) {
        return 'Добавление статуса' 
      } else {
        return 'Редактирование статуса'
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
         confirm('Are you sure you want to delete this status?') && this.$store.dispatch('deleteStatus', {id:id, index:index})
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
                    this.$store.dispatch('changeStatus', {statusName:this.item.statusName, id:this.item._id})
                    this.edit = false
                    this.item = Object.assign({}, this.defaultItem);
                } else {
                    this.edit = false
                    this.$store.dispatch('addStatus', this.item.statusName)
                    this.item = Object.assign({}, this.defaultItem);
                }
                this.dialog = false
                this.$nextTick(() => this.$validator.reset())
              }
            }).catch((err)=>{
                console.log(err);
            })
          }, 

    getStatuses () {
      this.$store.dispatch('getStatuses')
    },
  
    deleteStatuses (id, index) {
      this.$store.dispatch('deleteStatus', {id:id, index:index})
    }
  }
}
</script>