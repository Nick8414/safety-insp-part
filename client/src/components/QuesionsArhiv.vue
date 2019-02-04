<template>
  <v-container>
    <v-layout justify-center>
      <v-flex 
        xs12 
        sm10 
        md8 
        lg8>
        <v-data-table
          :headers="headers"
          :items="questions"
          hide-actions
          item-key="QuestionName"
          class="elevation-1">
          <template 
            slot="items"
            slot-scope="props">
            <tr @click="props.expanded = !props.expanded"> 
              <td>{{ props.index + 1 }}</td>
              <td >{{ props.item.QuestionName }}</td>
              <td>
                <v-btn @click="editQuestion(props.item._id, props.index), props.expanded = !props.expanded "  color="indigo" dark small>
                  <v-icon dark>edit</v-icon>
                </v-btn> 
              </td>
              <td>
                <v-btn @click="deleteQuestion(props.item._id, props.index), props.expanded = !props.expanded "  dark small color="error">
                  <v-icon dark>remove</v-icon>
                </v-btn> 
              </td>
            </tr>
          </template>

          <template slot="expand" slot-scope="props">
      <v-card flat>

          <ul v-for = "(item, i ) in props.item.Items" :key="i">
              <li>
                   {{ i + 1 }}.
           {{ item.subItemName }}
           
                <ul v-for = "(item, i ) in item.additionalSubItem" :key="i"> 
                    <li>
                            {{ item.additionalSubItemName }}
                    </li>
                </ul>
              </li>
          </ul>

          <!-- <ul v-for="(item,i) in typeOfDevice.ToolsMaterials" :key="i">
          <li class="text-xs-left">
            {{ i + 1 }}.
           {{ item }}
          </li>
        </ul> -->

         <!-- {{ props.item.Items }} -->
       
      </v-card>
    </template>
              
        </v-data-table>
        <v-btn
          fab
          dark
          small
          color="primary"
          bottom
          left
          @click.native.stop="dialog = !dialog"
        >
          <v-icon>add</v-icon>
        </v-btn>
<!-- ================================================================================================================================ -->
         <v-dialog v-model="editDialog" max-width="500px">
          <v-card>
               
                <!-- {{ question.QuestionName }} -->

                 <v-text-field 
              v-model="question.QuestionName" 
              label="Название вопроса:">
            </v-text-field>

                <ul>
                <li v-for="(item, index) in question.Items">
               
                  <!-- {{ item.subItemName }} -->

                   <v-text-field 
                     v-model="item.subItemName" 
                     label="Название подпункта вопроса:">
                   </v-text-field>

                   <ul>
                       <li v-for="(item, index) in item.additionalSubItem">
                                <!-- {{ item.additionalSubItemName }} -->
                                  <v-text-field 
                                   v-model="item.additionalSubItemName" 
                                   label="Название подпункта подпункта вопроса:">
                          </v-text-field>
                       </li>
                   </ul>
                    
                </li>
              </ul>

           
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="editDialog = false">Close</v-btn>
              <v-btn color="blue darken-1" flat @click.native="dialog = false, saveEditQuestion()">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
<!-- ========================================================================================================================================= -->
        <v-dialog v-model="dialog" max-width="500px">
          <v-card>
            <v-text-field 
              v-model="questionName" 
              label="Введите название вопроса:">
            </v-text-field>

            <v-card>
              <ul>
                <li v-for="(item, index) in items">
                    <!-- {{ item }} -->
                  <v-text-field
                    box 
                    name="input-1"
                    label="Введите подпункт"
                    v-model = "item.subItemName">
                  </v-text-field>
                    <ul>
                        <li v-for="(it, index1) in item.additionalSubItem">
                            <!-- {{ it.ssubItem }} -->
                   <v-text-field
                    box
                    name="input-1"
                    label="Введите значение/примечание"
                    v-model = "it.additionalSubItemName">
                  </v-text-field>
                        </li>
                    </ul>
                     <v-btn
              dark
              small
              color="primary"
              bottom
              left
              @click.native.stop="items[index].additionalSubItem.push({additionalSubItemName:'',
                                                                         value:'',
                                                                         type:'value'})"
            >
             добавить значение
            </v-btn>
             <v-btn
              dark
              small
              color="primary"
              bottom
              left
              @click.native.stop="items[index].additionalSubItem.push({additionalSubItemName:'Примечание',
                                                                         value:' ',
                                                                         type:'note'})"
            >
             добавить примечание
            </v-btn>
                </li>
              </ul>
            </v-card>
            <v-btn
              fab
              dark
              small
              color="primary"
              bottom
              left
              @click.native.stop="items.push({
                subItemName:'',
                additionalSubItem:[]
              })"
            >
              <v-icon>add</v-icon>
            </v-btn>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click.native="dialog = false, clear()">Close</v-btn>
              <v-btn color="blue darken-1" flat @click.native="dialog = false, saveQuestion()">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>  
  </v-container>
</template>

<script>
import Api from "@/services/Api";

export default {
  $validates: true,
  
  data() {
    return {
      questionName:'',  
      dialog: false,
      editDialog: false,
      question: {},
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
          text: "Редактировать:",
          align: "left",
           sortable: false
        },
        {
          text: "Удалить:",
          align: "left",
          sortable: false
        }
      ]
    };
  },
  mounted: function() {
    this.getQuestions();
  },
  computed: {
    questions() {
      return this.$store.getters.loadQuestions;
    }
  },
  methods: {
    clear() {
      (this.questionName = ""), this.$validator.reset();
      this.items = [
                {
                 subItemName:'',
                 additionalSubItem:[]
                }
        ]
    },
    getQuestions() {
      this.$store.dispatch("getQuestions");
    },
    saveQuestion() {
      this.$validator
        .validateAll()
        .then(result => {
         // console.log(this.items, this.questionName);

            let question = {
                questionName: this.questionName,
                items: this.items

            }
//console.log(question);

          if (result) {
            this.$store.dispatch("addQuestion", question);
            this.questionName = "";
            this.items = [];
            this.dialog = false;
            this.$validator.reset();
            return;
          }
        })
        .catch(e => {
          console.log(e);
          alert("Поля заполнены не корректно");
        });
    },
      deleteQuestion (id, index) {
      console.log(index)
      this.$store.dispatch('deleteQuestion', {id:id, index:index})
    },
     editQuestion (id, index) {
      console.log(index, id)
      this.editDialog = ! this.editDialog

      this.questions.forEach(element => {

          if (id == element._id) {

              this.question = element;
               console.log(element);
          }

         
      });
      //this.$store.dispatch('editQuestion', {id:id, index:index})
    },
    saveEditQuestion (id, index) {
      console.log(this.question)
     
      this.$store.dispatch('editQuestion', this.question)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* h1, h2 {
  font-weight: normal;
}

/* div {
  font-weight: 400;
    font-size: 10px;
    
} */

/* table.table tbody td, table.table tbody th {
    height: 20px;
}

table.table tbody td {
    font-weight: 400;
    font-size: 10px;
}
td.title-width {
  width:200px;
}
td.title-width2 {
  width:500px;
}

a {
  color: #42b983;
} */

ul {
padding: 0; /* Убираем поля */
margin-left: 0; /* Отступ слева */
}

ul>li {
     list-style-type: none; /* Убираем маркеры */
   }
 

/* input[type="text"] {
   border: 1px solid #cccccc; 
   border-radius: 3px; 
   -webkit-border-radius: 3px; 
   -moz-border-radius: 3px; 
   -khtml-border-radius: 3px; 
   background: #ffffff !important; 
   outline: none;
   height: 24px;
   width: 120px; 
   color: #3d3737; 
   font-size: 14px; 
   font-family: Tahoma; 
   font-weight: 500;
} */

/* input[type="text"]:focus {
  color: #000000;
  border: 1px solid #000000
}

.divsolid {
  border: solid;
}
.textTitle {
  font-weight: 400;
    font-size: 10px;
    padding-left: 25px !important;
}
.textDescr {
  font-weight: 400;
    font-size: 10px;
}
.divBorder {
  border: 1px solid rgba(0,0,0,0.12)
}  */

</style>