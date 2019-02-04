<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <el-dialog
          fullscreen
          :title="formTitle"
          :visible.sync="dialog"
          width="100%"
        >

          <el-row :gutter="20">
            <el-col :span="5" :offset="2">
              <span class="label-field" >Наименование типа устройства:</span>
              <div class="grid-content bg-purple">
                <el-input placeholder="Наименование типа устройства" v-model="item.title"></el-input>
                <!-- <v-textarea
                        label="Наименование типа устройства" 
                        v-model="item.title"
                        rows=2
                        :error-messages="errors.collect('typeTitle')"
                        v-validate="'required'"
                        data-vv-name="typeTitle"
                    >
                    </v-textarea> -->
              </div>
            </el-col>
            <el-col :span="5">
              <span class="label-field">Кем подготовлено:</span>
              <div class="grid-content bg-purple">
                 <el-input placeholder="Кем подготовлено" v-model="item.prepared"></el-input>
                  <!-- <v-textarea
                      label="Кем подготовлено" 
                      v-model="item.prepared"
                      rows=2
                      :error-messages="errors.collect('prepared')"
                      v-validate="'required'"
                      data-vv-name="prepared"
                    >
                    </v-textarea> -->
              </div>
            </el-col>
            <el-col :span="5">
              <span class="label-field">Дата ревизии:</span>
              <el-date-picker
                v-model="item.revisionDate"
                type="month"
                format="MM/yyyy"
                placeholder="Дата ревизии">
              </el-date-picker>
               <!-- <v-menu
                    ref="menu"
                    lazy
                    :close-on-content-click="false"
                    v-model="menu"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-right="40"
                    min-width="290px"
                    :return-value.sync="item.revisionDate"
                  >
                    <v-text-field
                      slot="activator"
                      label="Дата ревизии"
                      v-model="item.revisionDate"
                      prepend-icon="event"
                      readonly
                      :error-messages="errors.collect('revisionDate')"
                      v-validate="'required'"
                      data-vv-name="revisionDate"
                    ></v-text-field>
                    <v-date-picker v-model="item.revisionDate" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.menu.save(item.revisionDate)">OK</v-btn>
                    </v-date-picker>
                  </v-menu> -->
                
            </el-col>
            <el-col :span="5">
              <span class="label-field">Частота инспекций ( мес. ):</span>
               <el-select v-model="item.frequencyOfInspection" placeholder="Частота инспекций ( мес. )">
                <el-option
                  v-for="( item, index ) in frequencyArr"
                  :key="index"
                  :label="item"
                  :value="item">
                </el-option>
              </el-select>
              <!-- <v-select
                    v-model="item.frequencyOfInspection"  
                    label="Частота инспекций ( мес. )"
                    required
                    multi-line
                    :items=frequencyArr
                    :error-messages="errors.collect('frequencyOfInspection')"
                    v-validate="'required'"
                    data-vv-name="frequencyOfInspection"
                  ></v-select> -->
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col  :offset="2" :span="20">
              <span class="label-field">Назначение:</span>
              <el-input
                type="textarea"
                :rows="2"
                placeholder="Назначение"
                v-model="item.purpose">
              </el-input>
               <!-- <v-textarea
                    label="Назначение" 
                    v-model="item.purpose"
                    rows=4
                    :error-messages="errors.collect('purpose')"
                    v-validate="'required'"
                    data-vv-name="purpose"
                  >
                  </v-textarea> -->
            </el-col>  
          </el-row>
          <el-row :gutter="20">  
            <el-col :offset="2" :span="10">
              <span class="label-field">Инструменты и материалы:</span>
              <el-select v-model="item.toolsMaterials" multiple placeholder="Инструменты и материалы">
                <el-option
                  v-for="item in tools"
                  :key="item.toolName"
                  :label="item.toolName"
                  :value="item.toolName">
                </el-option>
              </el-select>
            </el-col>  
            <el-col :span="10">
              <span class="label-field">Особые меры предостарожности:</span>
              <el-select v-model="item.precautions" multiple placeholder="Особые меры предостарожности">
                <el-option
                  v-for="item in precautions"
                  :key="item.toolName"
                  :label="item.precautionName"
                  :value="item.precautionName">
                </el-option>
              </el-select>
                <!-- <v-select
                   v-model="item.precautions"  
                   label="Особые меры предостарожности"
                   required
                   multiple
                   item-text = precautionName
                   item-value = precautionName
                   :items=precautions
                   :error-messages="errors.collect('precautions')"
                   v-validate="'required'"
                   data-vv-name="precautions"
                 ></v-select> -->
            </el-col>  
          </el-row>
          <el-row>  
            <el-col :offset="2" :span="20">
               <span class="label-field" > Текст 'Важно:' ставится в конце инспекционной формы:</span>
              <el-input
                type="textarea"
                :rows="2"
                placeholder="Текст 'Важно:' ставится в конце инспекционной формы"
                v-model="item.importantText">
              </el-input>
               <!-- <v-textarea
                    label="Текст 'Важно:' ставится в конце инспекционной формы" 
                    v-model="item.importantText"
                    rows=4
                    :error-messages="errors.collect('importantText')"
                    v-validate="'required'"
                    data-vv-name="importantText"
                  >
                  </v-textarea> -->
            </el-col>  
          </el-row>
          <el-row :gutter="20">
            <el-col>
              <questions :questions="item.questions" @delete-question="deleteQuestion($event)"  @edit-question="editQuestion($event)" @add-question="item.questions.push($event) "></questions>
            </el-col>    
          </el-row>
          
  <span slot="footer" class="dialog-footer">


    

   <!-- <v-autocomplete
                    v-model="item.toolsMaterials"  
                    label="Инструменты и материалы"
                    required
                    multiple
                    flat
                    menu-props="{maxHeight='200'}"
                    deletable-chips
                    item-text = toolName
                    item-value = toolName 
                    :items = tools
                    :error-messages="errors.collect('toolsMaterials')"
                    v-validate="'required'"
                    data-vv-name="toolsMaterials"
                  ></v-autocomplete> -->



    <el-button @click="dialog = false">Close</el-button>
    <el-button type="primary" @click="saveType">Save</el-button>

    <!-- <v-btn color="blue darken-1" flat @click.native="close">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="saveType">Save</v-btn> -->
  </span>
</el-dialog>
<v-btn color="primary" @click="newItem" dark class="mb-2">Новый тип</v-btn>

          <!-- <v-dialog 
            v-model="dialog" 
            fullscreen 
            persistent 
            transition="dialog-bottom-transition"
            :overlay="false"
          >
          <v-btn color="primary" dark slot="activator" class="mb-2">Новый тип</v-btn>
        <v-card>
          <v-container>
            <v-card-title>
              <span class="headline"> {{ formTitle }} </span>
            </v-card-title>
            <v-card-text>
              <v-container  grid-list-md>
                <v-layout wrap>
                  <v-flex xs8 sm6 md4>
                    <v-textarea
                        label="Наименование типа устройства" 
                        v-model="item.title"
                        rows=2
                        :error-messages="errors.collect('typeTitle')"
                        v-validate="'required'"
                        data-vv-name="typeTitle"
                    >
                    </v-textarea>
                  </v-flex>
                  <v-flex xs12 sm6 md3>
                    <v-textarea
                      label="Кем подготовлено" 
                      v-model="item.prepared"
                      rows=2
                      :error-messages="errors.collect('prepared')"
                      v-validate="'required'"
                      data-vv-name="prepared"
                    >
                    </v-textarea>
                  </v-flex>
              <v-flex xs12 sm6 md3>
                  <v-menu
                    ref="menu"
                    lazy
                    :close-on-content-click="false"
                    v-model="menu"
                    transition="scale-transition"
                    offset-y
                    full-width
                    :nudge-right="40"
                    min-width="290px"
                    :return-value.sync="item.revisionDate"
                  >
                    <v-text-field
                      slot="activator"
                      label="Дата ревизии"
                      v-model="item.revisionDate"
                      prepend-icon="event"
                      readonly
                      :error-messages="errors.collect('revisionDate')"
                      v-validate="'required'"
                      data-vv-name="revisionDate"
                    ></v-text-field>
                    <v-date-picker v-model="item.revisionDate" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
                      <v-btn flat color="primary" @click="$refs.menu.save(item.revisionDate)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                <!- <v-text-field label="Дата ревизии" v-model="revisionDate"></v-text-field> -->
                <!--/v-flex>
                <v-flex xs12 sm4 md2>
                  <v-select
                    v-model="item.frequencyOfInspection"  
                    label="Частота инспекций ( мес. )"
                    required
                    multi-line
                    :items=frequencyArr
                    :error-messages="errors.collect('frequencyOfInspection')"
                    v-validate="'required'"
                    data-vv-name="frequencyOfInspection"
                  ></v-select>
                </v-flex>

                <v-flex xs12 sm12 md12>
                  <v-textarea
                    label="Назначение" 
                    v-model="item.purpose"
                    rows=4
                    :error-messages="errors.collect('purpose')"
                    v-validate="'required'"
                    data-vv-name="purpose"
                  >
                  </v-textarea>
                </v-flex>
            
                <v-flex xs8 sm8 md6> -->
                
              

                  <!-- <v-autocomplete
                    v-model="item.toolsMaterials"  
                    label="Инструменты и материалы"
                    required
                    multiple
                    flat
                    menu-props="{maxHeight='200'}"
                    deletable-chips
                    item-text = toolName
                    item-value = toolName 
                    :items = tools
                    :error-messages="errors.collect('toolsMaterials')"
                    v-validate="'required'"
                    data-vv-name="toolsMaterials"
                  ></v-autocomplete> -->

<!--                   
                  <v-autocomplete
                    v-model="item.toolsMaterials"  
                    label="Инструменты и материалы"
                    required
                    
                    deletable-chips
                    item-text = toolName
                    item-value = toolName 
                    :items = tools
                    :error-messages="errors.collect('toolsMaterials')"
                    v-validate="'required'"
                    data-vv-name="toolsMaterials"
                  >
                     <template
      slot="selection"
      slot-scope="{ item, index }"
    >
      <v-chip >
        <span>{{ item.toolName }}</span>
      </v-chip>
    
    </template>
                  </v-autocomplete>

                </v-flex>
                <v-flex xs8 sm6 md6>
                 <v-select
                   v-model="item.precautions"  
                   label="Особые меры предостарожности"
                   required
                   multiple
                   item-text = precautionName
                   item-value = precautionName
                   :items=precautions
                   :error-messages="errors.collect('precautions')"
                   v-validate="'required'"
                   data-vv-name="precautions"
                 ></v-select>
                </v-flex>
                 <v-flex xs12 sm12 md12>
                  <v-textarea
                    label="Текст 'Важно:' ставится в конце инспекционной формы" 
                    v-model="item.importantText"
                    rows=4
                    :error-messages="errors.collect('importantText')"
                    v-validate="'required'"
                    data-vv-name="importantText"
                  >
                  </v-textarea>
                </v-flex>
                <v-flex xs12 sm6 md12>
                  <questions :questions="item.questions" @delete-question="deleteQuestion($event)"  @edit-question="editQuestion($event)" @add-question="item.questions.push($event) "></questions> 
                </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="saveType">Save</v-btn>
        </v-card-actions>
       </v-container> 
      </v-card>
    </v-dialog> -->
    <el-table
      :data="types"
      border
      :default-sort = "{prop: 'title', order: 'ascending'}"
      height="800"
      cell-class-name="standart-cell"
      style="width: 100%">
    <el-table-column
      header-align="center"
      align="center"
      type="index"
      width="30">
    </el-table-column>
     <el-table-column
      label="Operations"
      header-align="center"
      align="center"
      width="100"
    >
      <template slot-scope="props">
        <v-tooltip bottom>
          <v-btn  slot="activator"  icon small class="mx-0" @click="editItem(props.row)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <span>edit</span>
        </v-tooltip>
        <v-tooltip bottom>
          <v-btn slot="activator" icon small class="mx-0" @click="copyItem(props.row)">
            <v-icon color="teal">file_copy</v-icon>
          </v-btn>
          <span>copy</span>
        </v-tooltip>
        <v-tooltip bottom>
          <v-btn slot="activator" icon small class="mx-0" @click="deleteType(props.$index, props.row._id)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
          <span>delete</span>
        </v-tooltip>    
      </template>
    </el-table-column>
      <el-table-column
        sortable
        prop="title"
        label="Название типа"
        header-align="center"
        align="center"
        width="170">
      </el-table-column>
      <el-table-column
        prop="purpose"
        label="Назначение"
        header-align="center"
        align="center"
        width="200"
      >
      </el-table-column>
      <el-table-column
        prop="frequencyOfInspection"
        label="Частота инспекций"
        header-align="center"
        align="center"
        width="50"
      >
      </el-table-column>
      <el-table-column
        label="Инструменты и материалы"
        header-align="center"
        align="left"
        width="220"
      >
        <template slot-scope="props">
          <ol>
            <li v-for="(item, index) in props.row.toolsMaterials" :key="index">
              {{ item }}
            </li>
          </ol>
          </template>
      </el-table-column>
      <el-table-column
        prop="precautions"
        label="Меры предостарожности"
        header-align="center"
        align="left"
        width="300"
      >
        <template slot-scope="props" >
          <ol>
            <li v-for="( item, index ) in props.row.precautions" :key="index" >
               {{ item }}
            </li>
          </ol>
        </template>  
      </el-table-column>
      <el-table-column
        label="Вопросы"
        header-align="center"
        align="left"
        width="300"
      >
        <template slot-scope="props" >
          <ol>
            <li v-for="( item, index ) in props.row.questions" :key="index" >
              {{ item.questionName }}
            </li>
          </ol>
        </template>  
      </el-table-column>

    </el-table>
    <!-- <v-data-table
      :headers="headers"
      :items="types"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td class="freqText">{{ props.index + 1 }}</td>
        <td class="text-xs-left">{{ props.item.title }}</td>
        <td class="text-xs-left">{{ props.item.purpose }}</td>
        <td class="text-xs-center freqText">{{ props.item.frequencyOfInspection }}</td>
        <td class="text-xs-left">
          <ol>
            <li v-for = "(item, index) in props.item.toolsMaterials" :key="index" >
              <b>{{ index + 1  }}.</b> {{ item }} 
            </li>
          </ol>
        </td>
        <td class="text-xs-left">
          <ol>
              <li v-for = "(item, index) in props.item.precautions" :key="index" >
                <b>{{ index + 1  }}.</b> {{ item }} 
              </li>
            </ol>
        </td>
        <td class="text-xs-left">
          <ol>
            <li v-for = "(item, index) in props.item.questions" :key="index" >
              <b>{{ index + 1  }}.</b> {{ item.questionName }} 
            </li>
          </ol>
        </td>
        <td>
          {{ props.item.importantText }}
        </td>
        <td class="justify-center layout px-0">
          <v-btn icon class="mx-0" @click="editItem(props.item)">
            <v-icon color="teal">edit</v-icon>
          </v-btn>
          <v-btn icon class="mx-0" @click="deleteType(props.index, props.item._id)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
        </td>
      </template>
    </v-data-table> -->
         </v-flex>     
    </v-layout>  
  </v-container>
</template>

<script>
import Api from '@/services/Api'
import questions from '@/components/adminComponents/Questions'

export default {
   $_veeValidate: {
      validator: 'new'
    },
    components : {
      questions
    },
  data () {
    return {
      dialog             : false,
      edit               : false,
      item: {
         title                : '',
         frequencyOfInspection: '',
         purpose              : '',
         prepared             : '',
         revisionDate         : null,
         toolsMaterials       : [],
         precautions          : [],
         importantText        : '',
         questions            : [],
      },
      defaultItem: {
         title                : '',
         frequencyOfInspection: '',
         purpose              : '',
         prepared             : '',
         revisionDate         : null,
         toolsMaterials       : [],
         precautions          : [],
         importantText        : '',
         questions            : [],
      },
      id                 : '',
      frequencyArr       : [],
      date               : null,
      menu               : false,
      modal              : false,
      headers: [
          {
            text: '№',
            align: 'center',
            sortable: false,
            width: '2%'
          },
          { 
            text: 'Название типа',
            align: 'center',
            sortable: false, 
            width: '15%'
            },
              { 
            text: 'Назначение ',
            align: 'center',
            sortable: false, 
            width: '20%'
            },
            { 
            text: 'Частота инспекций',
            align: 'center',
            sortable: false,
            width: '3%' 
            },
            { 
            text: 'Инструменты и материалы',
            align: 'center',
            sortable: false, 
            width: '20%'
            },
            {
            text: 'Меры предостарожности',
            align: 'center',
            sortable: false, 
            width: '25%'
            },
            {
            text: 'Вопросы',
            align: 'center',
            sortable: false, 
            width: '10%'
            },
            {
            text: 'Текст "Важно"',
            align: 'center',
            sortable: false, 
            width: '10%'
            },
            { 
            text: 'Действия',
            align: 'center',
            sortable: false, 
            width: '5%'
            }
        ]
       // departments: []
    }
  },
  created: function () {
    for (let i=1; i<121; i++) { this.frequencyArr.push(i); }  
     this.getTypes();
     this.getTools();
     this.getPrecautions();
     //  this.getQuestions();
  },
  computed: {
    formTitle () {
      return this.edit ? 'Редактирование нового типа' : 'Добавление нового типа'
      },
    types () {
      return this.$store.getters.loadTypes
    },
    tools () {
      return this.$store.getters.loadTools
    },
    precautions () {
      return this.$store.getters.loadPrecautions
    },
    // questions () {
    //   return this.$store.getters.loadQuestions
    // },
  },
  methods: {
    newItem () {
          this.edit = false
          this.item = Object.assign({}, this.defaultItem); 
          this.dialog = true
      },
       editItem (item) {
          console.log(item);
          this.edit = true
          this.item = Object.assign({}, item); 
          this.dialog = true
      },
    editQuestion (item) {
      console.log(item);
      this.item.questions.forEach( (value, index) => {
        if (value._id === item._id) {
          console.log(item._id);
          this.item.questions.splice(index,1,item);
        }
      })
      console.log(this.item.questions);
    },  
    deleteQuestion (item) {
      console.log(this.item.questions);
      console.log(item);
      confirm('Are you sure you want to delete this question?') && this.item.questions.splice(item.index,1);
    },
     close () {
        this.dialog = false;
        this.item = Object.assign({}, this.defaultItem);
        this.edit = false;
        this.$validator.reset();
      },

    getTools () {
      this.$store.dispatch('getTools')
    },

     getPrecautions () {
      this.$store.dispatch('getPrecautions')
    },

    getTypes () {
      this.$store.dispatch('getTypes')
    },
    // getQuestions () {
    //   this.$store.dispatch('getQuestions')
    // },

    // changeType (property, value, id) {
    //    console.log(property, value, id);

    //   const PSD = {
    //     property:property,
    //     value:value,
    //     id:id
    //   }

    //   this.$store.dispatch('changeType', PSD)
    // },

    copyItem (item) {
      console.log(item);
      
      this.edit = false
      this.item = Object.assign({}, item); 
      this.dialog = true

    },
    saveType () {
      let self = this;
        this.$validator.validateAll()
          .then ((result) => {
            if (!result) {
              return
            // alert('error empty ')
            } else {
              if (this.edit) {
                this.$store.dispatch('changeType', this.item)
                this.edit = false
                this.item = Object.assign({}, this.defaultItem);
             } else {
                this.edit = false
                this.$store.dispatch('addType',this.item)
                this.item = Object.assign({}, this.defaultItem);
              }  
               this.dialog = false
               this.$nextTick(() => this.$validator.reset())
              }  
        })
        .catch(err=>{
          console.log(err);
          alert("Поля заполнены не корректно");
        })
      
    },
    deleteType (index, id) {
      console.log(index, id)
      confirm('Are you sure you want to delete this device?') && this.$store.dispatch('deleteType', {id:id, index:index})
    }
  }
}
</script>

<style scoped>

  .el-select {
    display:block;
  }
  /deep/ .el-select__tags-text {
    max-width: 500px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
    vertical-align: middle;
  }
  .el-select-dropdown__item {
    max-width: 800px;
    height: 50px;
    /* overflow-x: scroll;
    overflow-y: hidden; */
  }

   .el-row {
    margin-bottom: 30px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  
  
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  /deep/ .el-date-editor {
    display: block;
  }

  .label-field {
    font-weight: bold;
  }
 

</style>
