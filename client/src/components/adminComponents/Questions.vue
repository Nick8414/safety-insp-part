<template>
  <v-container>
    <v-layout justify-center>
  <div class="tableWidth" >
    <!-- ===================================New item dialog============================================== -->
    <v-dialog v-model="dialog" fullscreen>
      <v-btn color="primary" dark slot="activator" class="mb-2">Добавить вопрос</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
            <v-card-text>
              <span style="font-size:17px" >Введите название вопроса:</span>
              <v-text-field 
                v-model="questionName" 
                label="Введите название вопроса:"
                :error-messages="errors.collect('question')"
                v-validate="'required'"
                data-vv-name="question"
                required
                solo
              >
              </v-text-field> 
              <ol style="margin:15px">
                <li v-for="(item, index) in items" :key="index">
                    <div class="borderSubitem">
                    <!-- {{ item }} -->
                  <v-textarea
                    name="input-1"
                    label="Введите подпункт"
                    v-model = "item.subItemName"
                    append-outer-icon="clear"
                    @click:append-outer = "delItem(index)"
                    :error-messages="errors.collect('subQuestion')"
                    v-validate="'required'"
                    data-vv-name="subQuestion"
                    required
                    outline
                  >
                  </v-textarea>
              
                  <ol style="margin:25px" >
                    <li v-for="(it, index1) in item.additionalSubItem" :key="index1">
                              <!-- {{ it.ssubItem }} -->
                      <v-text-field
                        name="input-1"
                        :label=" it.type == 'value' ? 'Введите Значение': 'Введите Примечание'"
                        v-model = "it.additionalSubItemName"
                        append-outer-icon="clear"
                        @click:append-outer = "delSubItem(index, index1)"
                        :error-messages="errors.collect('subQuestion')"
                        v-validate="'required'"
                        data-vv-name="subQuestion"
                        required
                        box
                        > 
                      </v-text-field>
                    </li>
                  </ol>
                
                <v-btn
                  dark
                  flat
                  small
                  color="primary"
                  bottom
                  left
                  @click.native.stop="items[index].additionalSubItem.push({additionalSubItemName:'', value:'', type:'value'})">
                  добавить значение
                </v-btn>
             <v-btn
              dark
              small
              flat
              color="primary"
              bottom
              left
              @click.native.stop="items[index].additionalSubItem.push({additionalSubItemName:'', value:'', type:'note'})">
              добавить примечание
             </v-btn>
              </div> 
                </li>
               
              </ol>
            </v-card-text>
            <v-btn
              dark
              small
              color="primary"
              bottom
              left
              @click.native.stop="items.push({
                subItemName:'',
                additionalSubItem:[]
              })"
            >добавить подпункт вопроса</v-btn>
          
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="dialogNew = false, close()">Close</v-btn>
              <v-btn color="blue darken-1" flat @click.native="dialogNew = false, saveQuestion()">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
    <!-- ================================================================================================================= -->
    <v-data-table
      :headers="headers"
      :items="questions"
      hide-actions
      item-key="questionName"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <tr @click="props.expanded = !props.expanded"> 
          <td>{{ props.index + 1 }}</td>
          <td >{{ props.item.questionName }}</td>
          <td class="justify-center layout px-0">
            <v-btn icon class="mx-0" @click="editItem(props.item), props.expanded = !props.expanded, edit = true">
              <v-icon color="teal">edit</v-icon>
            </v-btn>
            <v-btn icon class="mx-0" @click="deleteQuestion(props.item._id, props.index), props.expanded = !props.expanded">
              <v-icon color="pink">delete</v-icon>
           </v-btn>
          </td>
        </tr>  
      </template>
      <template slot="expand" slot-scope="props">
        <v-card flat>
          <ul v-for = "(item, i ) in props.item.items" :key="i">
            <li>
              <div style="padding-left:25px; padding-top:10px;" >
                {{i+1}}. {{ item.subItemName }}
              </div>
                <ul v-for = "(item, i ) in item.additionalSubItem" :key="i"> 
                  <li>
                    <div style="padding-left:40px; padding-top:5px">
                      {{i+1}}. {{ item.additionalSubItemName }}
                    </div> 
                  </li>
                </ul>
            </li>
          </ul>
        </v-card>
    </template>
    </v-data-table>
  </div>
    </v-layout>  
  </v-container>
</template>

<script>
import Api from "@/services/Api";

export default {
   $_veeValidate: {
      validator: 'new'
    },
    props:['questions'],
  
  data() {
    return {
      questionName:'',  
      dialog: false,
      question: {},
      edit: false,
      clear:'clear',
      id:'',
      items: [
                {
                 subItemName:'',
                 additionalSubItem:[]
                }
        ],
      headers: [
        {
          text: "№",
          align: "left",
          sortable: false,
          value: "name"
        },
        {
          text: "Наименование вопроса:",
          align: "left",
          sortable: false,
          value: "questions"
        },
        {
          text: "Действия:",
          align: "left",
           sortable: false
        }
      ]
    };
  },
  computed: {
    formTitle () {
      return this.edit ? 'Редактировать вопрос' : 'Добавить вопрос'
    }
  },
  methods: {
    close () {
        this.edit = false;
        this.dialog = false;
        this.questionName = "";
        this.$validator.reset();
        this.items = [{
                 subItemName:'',
                 additionalSubItem:[]
                }];
      },
    saveQuestion() {
      console.log(this.edit)
      if (!this.edit) {
        this.$validator
        .validateAll()
        .then(result => {
         // console.log(this.items, this.questionName);
            let question = {
                questionName: this.questionName,
                items: this.items
            }
          if (result) {
          //  this.$store.dispatch("addQuestion", question);
            this.$emit('add-question', question);
            this.questionName = "";
            this.items = [{
                 subItemName:'',
                 additionalSubItem:[]
                }];
            this.dialog = false;
            this.$nextTick(() => this.$validator.reset())
            return;
          }
        })
        .catch(e => {
          console.log(e);
          alert("Поля заполнены не корректно");
        });
      } else if(this.edit) {
        console.log(this.question);
        let question = {
          _id           : this.id,
          questionName  : this.questionName, 
          items         : this.items 
        }
          //this.$store.dispatch('editQuestion', question);
          this.$emit('edit-question', question);
          this.dialog = false;
      }
    },
      deleteQuestion (id, index) {
      console.log(index)
       confirm('Are you sure you want to delete this question?') && this.$emit('delete-question',  {id:id, index:index});
     // this.$store.dispatch('deleteQuestion', {id:id, index:index})
    },
    editItem (item) {
      console.log(item);
      this.dialog = ! this.dialog
      this.edit = true
      this.id = item._id
      this.questionName = item.questionName
      this.items = item.items
    },

    delItem(index) {
       this.items.splice(index,1)
    },

    delSubItem(index, indexIn){
      this.items[index].additionalSubItem.splice(indexIn,1)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .tableWidth {
    width: 100%;
  }
/*  ul {
    padding: 0; /* Убираем поля */
  /*  margin-left: 0; /* Отступ слева */
   /* margin-top:0;
  } */
  ul>li {
    list-style-type: none; /* Убираем маркеры */
 }
  /* .borderSubitem {
    border: 3px solid ;
    border-color:#3486D7;
    border-radius: 15px;
  } */

</style>