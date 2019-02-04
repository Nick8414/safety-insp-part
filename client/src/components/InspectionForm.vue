<template>
  <v-container   fluid  grid-list-md grid-list-sm text-xs-center text-md-center text-sm-center class="mr-5" >
    <v-layout row wrap>
      <v-btn @click = "blankForm" >Распечатать пустую форму</v-btn>
      <v-flex xs12 md12 sm12>
         <p class="text-md-center text-sm-center"> {{ msg }} </p>
      </v-flex>
      <v-flex xs6 md6 sm6>
        <p>Подготовлено: {{ safetyDevice.PSD_Description.prepared }} </p>
      </v-flex>
      <v-flex xs6 md6 sm6>
        <p> Дата ревизии: {{ safetyDevice.PSD_Description.revisionDate | dateFilterWithoutDay }}</p>
      </v-flex>                      
    </v-layout>

<!--  Инспекционная форма      -->

    <v-layout row wrap class="mb-3">
        <v-flex class="text-xs-left textTitle divBorder"  xs3 md2 sm3 lg2 xl1>
          <b>УСТРОЙСТВО БЕЗОПАСНОСТИ (УБ):</b>
        </v-flex>
        <v-flex class="text-xs-left textDescr divBorder" xs9 md10 sm9 lg10 xl11>
          {{ safetyDevice.PSD_Description.title }}
        </v-flex>

        <v-flex class="text-xs-left textTitle divBorder"  xs3 md2 sm3 lg2 xl1>
          <b>НАЗНАЧЕНИЕ УБ:</b>
        </v-flex>
        <v-flex class="text-xs-left textDescr divBorder" xs9 md10 sm9 lg10 xl11>
          {{ safetyDevice.PSD_Description.purpose }}
        </v-flex>
 
        <v-flex class="text-xs-left textTitle divBorder"  xs3 md2 sm3 lg2 xl1>
          <b>ОПАСНОСТЬ:</b>
        </v-flex>
        <v-flex class="text-xs-left textDescr divBorder" xs9 md10 sm9 lg10 xl11>
          {{ safetyDevice.hazard }}
        </v-flex>
 
        <v-flex class="text-xs-left textTitle divBorder"  xs3 md2 sm3 lg2 xl1>
          <b>РЕЙТИНГ ОПАСНОСТИ:</b>
        </v-flex>
        <v-flex class="text-xs-left textDescr divBorder" xs9 md10 sm9 lg10 xl11>
          {{ safetyDevice.hazardRaiting }}
        </v-flex>
 
        <v-flex class="text-xs-left textTitle divBorder"  xs3 md2 sm3 lg2 xl1>
          <b>ЗАЩИТНАЯ ФУНКЦИЯ:</b>
        </v-flex>
        <v-flex class="text-xs-left textDescr divBorder" xs9 md10 sm9 lg10 xl11>
          {{ safetyDevice.protectiveAction }}
        </v-flex>
 
        <v-flex class="text-xs-left textTitle divBorder"  xs3 md2 sm3 lg2 xl1>
          <b>ИНДИФИКАЦИОННЫЙ НОМЕР:</b>
        </v-flex>
        <v-flex class="text-xs-left textDescr divBorder" xs3 md4 sm3 lg4 xl5>
          {{ safetyDevice.psd_TAG }}
        </v-flex>
        <v-flex class="text-xs-left textTitle divBorder"  xs3 md2 sm3 lg2 xl1>
          <b>ПОЛЕВОЙ НОМЕР УСТРОЙСТВА:</b>
        </v-flex>
        <v-flex class="text-xs-left textDescr divBorder" xs3 md4 sm3 lg4 xl5>
          {{ safetyDevice.fieldTAG }}
        </v-flex>
  
        <v-flex class="text-xs-left textTitle divBorder"  xs3 md2 sm3 lg2 xl1>
          <b>ИМЕННАЯ ТАБЛИЧКА:</b>
        </v-flex>
        <v-flex class="text-xs-left textDescr divBorder" xs9 md10 sm9 lg10 xl11>
          <v-edit-dialog
            @open="tmp = safetyDevice.nameplate"
            @save="safetyDevice.nameplate = safetyDevice.nameplate, editItem({id:safetyDevice._id, name:'nameplate', value:safetyDevice.nameplate})"
            @cancel = "safetyDevice.nameplate = tmp"
            lazy
          >  
            {{ safetyDevice.nameplate  }}
          <v-textarea
            slot="input"
            label="Edit"
            v-model="safetyDevice.nameplate"
            @change="editItem({_id:safetyDevice._id, nameplate:safetyDevice.nameplate})"
           
          ></v-textarea>
          </v-edit-dialog>
        </v-flex>
  
        <v-flex class="text-xs-left textTitle divBorder"  xs3 md2 sm3 lg2 xl1>
          <b>ССЫЛОЧНЫЙ ЧЕРТЕЖ:</b>
        </v-flex>
        <v-flex class="text-xs-left textDescr divBorder" xs3 md4 sm3 lg4 xl5>
          <div class="text-xs-left">
            <a href="#" @click.prevent="getProcedure(safetyDevice.flowSheetLink)">{{ safetyDevice.flowSheet }}</a>
          </div>
        </v-flex>       
        <v-flex class="text-xs-left textTitle divBorder"  xs3 md2 sm3 lg2 xl1>
          <b>МЕСТО УСТАНОВКИ:</b>
        </v-flex>
        <v-flex class="text-xs-left textDescr divBorder" xs3 md4 sm3 lg4 xl5>
          {{ safetyDevice.installationPlace }}
        </v-flex>

        <v-flex class="text-xs-left textTitle divBorder"  xs3 md2 sm3 lg2 xl1>
          <b>ЗАДАННОЕ ЗНАЧЕНИЕ:</b>
        </v-flex>
        <v-flex class="text-xs-left textDescr divBorder" xs9 md10 sm9 lg10 xl11>
          {{ safetyDevice.settingSizePSData  }}
        </v-flex>
 
        <v-flex class="text-xs-left textTitle divBorder"  xs3 md2 sm3 lg2 xl1>
          <b>КОММЕНТАРИЙ:</b>
        </v-flex>
        <v-flex class="text-xs-left textDescr divBorder" xs9 md10 sm9 lg10 xl11>
          {{ safetyDevice.comments  }}
        </v-flex>

        <v-flex class="text-xs-left textTitle divBorder"  xs3 md2 sm3 lg2 xl1>
          <b>УРОВЕНЬ НАВЫКОВ:</b>
        </v-flex>
        <v-flex class="text-xs-left textDescr divBorder" xs3 md4 sm3 lg4 xl5>
          {{ safetyDevice.skillLevel }}
        </v-flex>
        <v-flex class="text-xs-left textTitle divBorder"  xs3 md2 sm3 lg2 xl1>
          <b>ЧАСТОТА ИНСПЕКЦИЙ:</b>
        </v-flex>
        <v-flex class="text-xs-left textDescr divBorder" xs3 md4 sm3 lg4 xl5>
          КАЖДЫЕ {{ safetyDevice.PSD_Description.frequencyOfInspection }} МЕСЯЦЕВ
        </v-flex>
 
        <v-flex class="text-xs-left textTitle divBorder"  xs3 md2 sm3 lg2 xl1>
          <b>СОСТОЯНИЕ ОБОРУДОВАНИЯ:</b>
        </v-flex>
        <v-flex class="text-xs-left textDescr divBorder" xs3 md4 sm3 lg4 xl5>
          {{ safetyDevice.inOperationShutdown }}
        </v-flex>
        <v-flex class="text-xs-left textTitle divBorder"  xs3 md2 sm3 lg2 xl1>
          <b>ПРОДОЛЖИТЕЛЬНОСТЬ:</b>
        </v-flex>
        <v-flex class="text-xs-left textDescr divBorder" xs3 md4 sm3 lg4 xl5>
          {{ safetyDevice.duration  }} МИНУТ
        </v-flex>

        <v-flex class="text-xs-left textTitle divBorder"  xs3 md2 sm3 lg2 xl1>
          <b>ТИП ИНСПЕКЦИИ:</b>
        </v-flex>
        <v-flex class="text-xs-left textDescr divBorder" xs3 md4 sm3 lg4 xl5>
          {{ safetyDevice.typeInspection }} /  {{ safetyDevice.methodInspection }}
        </v-flex>
        <v-flex class="text-xs-left textTitle divBorder"  xs3 md2 sm3 lg2 xl1>
          <b>КОЛИЧЕСТВО ЧЕЛОВЕК:</b>
        </v-flex>
        <v-flex class="text-xs-left textDescr divBorder" xs3 md4 sm3 lg4 xl5>
          {{ safetyDevice.numberPeople }} ЧЕЛ.
        </v-flex>
    </v-layout>
    
<v-layout row wrap >
 <v-flex  md12 sm12>
  <v-expansion-panel expand>
    <v-expansion-panel-content>
      <div slot="header" class="text-xs-left"><b>ИНСТРУМЕНТЫ И МАТЕРИАЛЫ:</b></div>
      <v-card>
        <v-card-text class="grey lighten-3">
            <ul class="expandLists" >
          <li class="text-xs-left" v-for="(item,i) in safetyDevice.PSD_Description.toolsMaterials" :key="i">
            {{ item }}
          </li>
        </ul>
          </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
 </v-flex>
</v-layout> 

<v-layout row wrap class="mb-3">
 <v-flex  md12 sm12>
  <v-expansion-panel expand>
    <v-expansion-panel-content>
      <div slot="header" class="text-xs-left"><b>ОСОБЫЕ МЕРЫ ПРЕДОСТАРОЖНОСТИ:</b></div>
      <v-card>
        <v-card-text class="grey lighten-3">
          <ul class="expandLists">
          <li v-for="(item,i) in safetyDevice.PSD_Description.precautions" :key="i"  class="text-xs-left">
           {{ item }}
          </li>
        </ul>
          </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
 </v-flex>
</v-layout> 

<h3 class="text-xs-center"> АНКЕТА &mdash; ПРОЦЕДУРА </h3>

   
<v-layout row wrap>
  <v-flex  md10 sm10>
    <div slot="header" class="text-xs-left">
      <b>Нажмите на ссылку для получения инструкции:</b>
      <a href="#" @click.prevent="getProcedure(safetyDevice.procedureLink)"><b> ИНСТРУКЦИЯ </b></a>
    </div>
  </v-flex>
</v-layout> 
         
<v-layout v-for = " ( item, index ) in safetyDevice.PSD_Description.questions" :key="index" row wrap> 
<v-flex xs8 md9 sm8 lg9 xl9 >
  <v-expansion-panel expand>
    <v-expansion-panel-content>
      <v-flex slot="header" class="text-xs-left"><b>Q{{ index + 1 }}: {{ item.questionName }}</b> </v-flex>
      <v-card>
        <v-card-text class="grey lighten-3">
         <ol type="A">
          <li class="text-xs-left" v-for="(item,i) in item.items" :key="i" >
           {{ item.subItemName }}
              <ul class="internQuestLists">
                <li v-for="(item,i) in item.additionalSubItem" :key="i">
                 <v-flex offset-lg1 v-if = "item.type == 'note'">
                  <b>{{ item.additionalSubItemName }}</b>
                 </v-flex>
                 <v-flex offset-lg1 v-else>
                    {{ item.additionalSubItemName }}
                 <v-text-field
                  class="mt-2"
                  label="Solo"
                  placeholder="Значение"
                  solo
                  v-model="item.value"
                 ></v-text-field>
                 </v-flex>
                </li>
              </ul>
          </li>
         </ol>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</v-flex>  
<v-flex xs1 md1 sm1 lg1 xl1 class="py-2">
  <v-text-field
             :label = "item.Status == true ? 'Да':item.Status == false ? 'Нет': item.Status == 'null' ? 'N/A':'' "
            solo
            disabled
  ></v-text-field>
</v-flex>            
<v-flex xs2 md1 sm2 lg1 xl1 class="py-2">            
  <v-btn-toggle v-model="item.Status" >
    <v-btn large  :value = true>
      <v-icon>Да</v-icon>
    </v-btn>
    <v-btn large  :value = false>
      <v-icon>Нет</v-icon>
    </v-btn>
    <v-btn large  value = null >
      <v-icon>N/A</v-icon>
    </v-btn>
  </v-btn-toggle>
</v-flex> 

</v-layout> 
<hr>
<v-layout v-if="safetyDevice.isProtocolUse">
  <v-flex xs6 md6 sm6 class="text-md-left">
   <b>НОМЕР ПРОТОКОЛА:</b>
   <i> {{ protocolNumber }} </i>
   
 </v-flex>    
 <v-flex xs6 md6 sm6 class="text-md-left">
   <b>ДАТА ПОСЛЕДНЕГО ПРОТОКОЛА:</b>
    <el-select v-model="selectedProtocolDate" placeholder="Выберите дату протокола">
      <el-option
        v-for  ="item in protocols"
        :key   ="item.date"
        :label ="item.date"
        :value ="item.date">
      </el-option>
    </el-select>
   
 </v-flex>
</v-layout>
<hr>
<v-layout row wrap>
  <v-flex xs6 md6 sm6 class="text-md-left">
   <b> Q{{ lastQuestionIndex }}: ИНСПЕКЦИЯ НЕ УСПЕШНА ( FAIL ): </b>
 
     <el-button :disabled="failure" type="danger" icon="el-icon-close" ></el-button>
   
   
 </v-flex>    
  <v-flex xs6 md6 sm6 class="text-md-left">
  <b> Q{{ lastQuestionIndex }}:   ИНСПЕКЦИЯ УСПЕШНА ( PASS ): </b>
  

  <el-button :disabled="success" type="success" icon="el-icon-check" ></el-button>
   
 </v-flex>

 <v-flex xs12 md12 sm12 class="text-md-center">
  <span>
      ЗАДОКУМЕНТИРОВАТЬ РЕЗУЛЬТАТ ОБСЛУЖИВАНИЯ, ТЕСТИРОВАНИЯ УБ, СООБЩИТЬ ЛЮБЫЕ ОТКЛОНЕНИЯ КООРДИНАТОРУ ПО ПБ. 
      ЗАПИСАТЬ ДЕЙСТВИЯ КОТОРЫЕ БЫЛИ ВЫПОЛНЕНЫ ВО ВРЕМЯ ОБСЛУЖИВАНИЯ И ВЫЯВЛЕННЫЕ ДЕФЕКТЫ (ЕСЛИ ТАКОВЫЕ ИМЕЮТСЯ) В ПОЛЕ 
      "КОММЕНТАРИИ";																								 
  </span>
 </v-flex>

 


 <v-flex xs12 md12 sm12 class="text-md-center">
  <span class="red--text">
    <b> 
      ВАЖНО: {{ safetyDevice.PSD_Description.importantText }}
   </b>
  </span>
 </v-flex>

 
</v-layout>
 
  <v-layout row wrap>  
<v-flex  md12 sm12>
   <div class="text-xs-left">
     <v-textarea outline
       box
       v-model="notes"
       name="input-1"
       label="КОММЕНТАРИЙ:"
       
     ></v-textarea>
   </div> 
  </v-flex>

    </v-layout>

  <v-layout row wrap>
      <v-flex class="text-xs-left" md4 sd4>
          ИНСПЕКЦИЮ ПРОВЕЛ: {{ user.userName }}      
      </v-flex>  
      <v-flex md4 sd4  >
        <v-btn @click="saveForm()">Сохранить</v-btn>
      </v-flex>  
      <v-flex class="text-xs-right" md4 sd4 >
          {{ today | dateFilter }}
      </v-flex>  
  </v-layout>
</v-container>

  
</template>

<script>
import pdfGenerate from './pdfGenerate'
export default {
 // props: ["safetyDevice"],
  name: 'InspectionForm',
  data () {
    return {
     tmp : '',
     dialog: false,
     today : new Date(),
     msg:"UKRAINE PLANT",
     notes:"",
     safetyForm:{},
     selectedProtocolDate:'',

     productionAreas: [],
     safetyDevice:{}

    }
  },
computed: {

  protocolNumber() {
    let self = this;
    let index = _.findIndex(this.protocols, function(o) {
       return o.date == self.selectedProtocolDate 
    } )
    if ( index >= 0 ) {
      return this.protocols[index].number;
    } else {
      return 'the protocol is absent or not applicable'
    }    
  },
  lastProtocolDate() {
    return this.selectedProtocolDate;
  },
  user() {
    return this.$store.getters.user;
  },
  lastQuestionIndex() {
    return this.safetyDevice.PSD_Description.questions.length + 1
  },
  protocols() {
    return this.$store.getters.loadProtocols
  },
  result() {
    let statusCheck = this.safetyDevice.PSD_Description.questions.every ( (question) => {
       return  question.Status === true || question.Status 
     })
    return statusCheck;

  },

  success() {
    return !this.result
  },
  failure() {
    return this.result
  },
  departments() {
    return this.$store.getters.loadDepartments;
  }
},

beforeMount: function() {
this.safetyDevice = JSON.parse(localStorage.getItem('safetyForm'));
},
  mounted: function() {
      this.getProtocols();
      this.getEmployees (); 
  },
  methods: {
    getEmployees () {
        this.$store.dispatch('getEmployees')
      },
  
    getProcedure (link) {

      this.$store.dispatch('getProcedure', link) 
    },
    getProtocols() {
      this.$store.dispatch('getProtocols', {
                                            department: this.safetyDevice.department,
                                            deviceType: this.safetyDevice.PSD_Description.title, 
                                            material  : this.safetyDevice.material
                                          });
    },

    saveForm () {
      let emptyFields = 0;
      this.safetyDevice.PSD_Description.questions.forEach( question => {
      //  console.log(question.Status);
        if (question.Status == null) emptyFields += 1;
        question.items.forEach ( item => {
            item.additionalSubItem.forEach(additionalSubItem => {
              if (additionalSubItem.type === 'value' && additionalSubItem.value == '' && question.Status !== 'null' ) {
                emptyFields += 1;
              }
            })
        })
      })

      if ( this.result == null || emptyFields > 0 ) {
        this.$store.dispatch('setError', 'Пожалуйста заполните все поля со значениями')
      } else {
          this.safetyForm.DeviceId              = this.safetyDevice._id
          this.safetyForm.Date                  = this.today;
          this.safetyForm.Prepared              = this.safetyDevice.PSD_Description.prepared;
          this.safetyForm.RevisionDate          = this.safetyDevice.PSD_Description.revisionDate;
          this.safetyForm.Department            = this.safetyDevice.department;
          this.safetyForm.PSD_Description       = this.safetyDevice.PSD_Description.title;
          this.safetyForm.Purpose               = this.safetyDevice.PSD_Description.purpose;
          this.safetyForm.Hazard                = this.safetyDevice.hazard; 
          this.safetyForm.HazardRaiting         = this.safetyDevice.hazardRaiting;
          this.safetyForm.ProtectiveAction      = this.safetyDevice.protectiveAction;
          this.safetyForm.PSD_TAG               = this.safetyDevice.psd_TAG; 
          this.safetyForm.FieldTAG              = this.safetyDevice.fieldTAG;
          this.safetyForm.Nameplate             = this.safetyDevice.nameplate;
          this.safetyForm.FlowSheet             = this.safetyDevice.flowSheet;
          this.safetyForm.InstallationPlace     = this.safetyDevice.installationPlace;
          this.safetyForm.SettingSizePSData     = this.safetyDevice.settingSizePSData;
          this.safetyForm.Comments              = this.safetyDevice.comments;
          this.safetyForm.SkillLevel            = this.safetyDevice.skillLevel;
          this.safetyForm.FrequencyOfInspection = this.safetyDevice.PSD_Description.frequencyOfInspection;
          this.safetyForm.InOperationShutdown   = this.safetyDevice.inOperationShutdown;
          this.safetyForm.Duration              = this.safetyDevice.duration;
          this.safetyForm.TypeInspection        = this.safetyDevice.typeInspection;
          this.safetyForm.NumberPeople          = this.safetyDevice.numberPeople;
          this.safetyForm.ToolsMaterials        = this.safetyDevice.PSD_Description.toolsMaterials;
          this.safetyForm.Precautions           = this.safetyDevice.PSD_Description.precautions;
          this.safetyForm.Questions             = this.safetyDevice.PSD_Description.questions;
          this.safetyForm.ProtocolNumber        = this.protocolNumber;
          this.safetyForm.ProtocolDate          = this.lastProtocolDate
          this.safetyForm.ImportantText         = this.safetyDevice.PSD_Description.importantText;
          this.safetyForm.notes                 = this.notes;
          this.safetyForm.Inspector             = this.user.userName;  
          this.safetyForm.Result                = this.result;
          this.safetyForm.MethodInspection      = this.safetyDevice.methodInspection;  

         let self = this;
          function getProductionAreas (department) {
            let productionAreas = [];
          const prodAreas = self.departments.filter( value => {
                return department == value.departmentName 
          }) 

         if ( prodAreas.length > 0 ) {
            prodAreas[0].productionAreas.forEach( value => { productionAreas.push( value ) } );
         } 

         
          return productionAreas;

      }
      this.safetyForm.prodAreas = getProductionAreas(this.safetyDevice.department);
      this.$store.dispatch('addSafetyForm', this.safetyForm)

           let dateNext = new Date();
                    let dateLast = new Date();
                    dateNext.setMonth(dateNext.getMonth() + this.safetyDevice.PSD_Description.frequencyOfInspection );

          let item = {
            _id:this.safetyDevice._id, 
            notes:this.notes, 
            lastInspectionDate: dateLast,
            nextInspectionDate: dateNext
          }
          let inspStatusCount = 0; 

          if ( this.result === false ) {
            item.PSI_Status = 'NOK'
          } else if ( this.result === true ) {
            item.PSI_Status = 'OK'
          }
        this.$store.dispatch('changeDevice', {item:item})
      }
    },
    /*редактирование именной таблички*/
    editItem (item) {
      this.$store.dispatch('changeDevice', {item:item})
    },
    blankForm() {
          this.safetyForm.DeviceId              = this.safetyDevice._id
          this.safetyForm.Date                  = this.today;
          this.safetyForm.Prepared              = this.safetyDevice.PSD_Description.prepared;
          this.safetyForm.RevisionDate          = this.safetyDevice.PSD_Description.revisionDate;
          this.safetyForm.Department            = this.safetyDevice.department;
          this.safetyForm.PSD_Description       = this.safetyDevice.PSD_Description.title;
          this.safetyForm.Purpose               = this.safetyDevice.PSD_Description.purpose;
          this.safetyForm.Hazard                = this.safetyDevice.hazard; 
          this.safetyForm.HazardRaiting         = this.safetyDevice.hazardRaiting;
          this.safetyForm.ProtectiveAction      = this.safetyDevice.protectiveAction;
          this.safetyForm.PSD_TAG               = this.safetyDevice.psd_TAG; 
          this.safetyForm.FieldTAG              = this.safetyDevice.fieldTAG;
          this.safetyForm.Nameplate             = this.safetyDevice.nameplate;
          this.safetyForm.FlowSheet             = this.safetyDevice.flowSheet;
          this.safetyForm.InstallationPlace     = this.safetyDevice.installationPlace;
          this.safetyForm.SettingSizePSData     = this.safetyDevice.settingSizePSData;
          this.safetyForm.Comments              = this.safetyDevice.comments;
          this.safetyForm.SkillLevel            = this.safetyDevice.skillLevel;
          this.safetyForm.FrequencyOfInspection = this.safetyDevice.PSD_Description.frequencyOfInspection;
          this.safetyForm.InOperationShutdown   = this.safetyDevice.inOperationShutdown;
          this.safetyForm.Duration              = this.safetyDevice.duration;
          this.safetyForm.TypeInspection        = this.safetyDevice.typeInspection;
          this.safetyForm.NumberPeople          = this.safetyDevice.numberPeople;
          this.safetyForm.ToolsMaterials        = this.safetyDevice.PSD_Description.toolsMaterials;
          this.safetyForm.Precautions           = this.safetyDevice.PSD_Description.precautions;
          this.safetyForm.Questions             = this.safetyDevice.PSD_Description.questions;
          this.safetyForm.ProtocolNumber        = this.protocolNumber;
          this.safetyForm.ProtocolDate          = this.lastProtocolDate
          this.safetyForm.ImportantText         = this.safetyDevice.PSD_Description.importantText;
          this.safetyForm.notes                 = this.notes;
          this.safetyForm.Inspector             = this.user.userName;  
          this.safetyForm.Result                = this.result;
          this.safetyForm.MethodInspection      = this.safetyDevice.methodInspection; 

          pdfGenerate(this.safetyForm);
    }
  }
}

</script>

<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  table.table tbody td, table.table tbody th {
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
  }
  ul {
    padding: 0; /* Убираем поля */
    margin-left: 0; /* Отступ слева */
  }
  
  /* ul>li {
    list-style-type: none; /* Убираем маркеры 
  } */
  .expandLists {
    list-style: decimal;
    padding-left: 5px;  
  }
  .internQuestLists {
    list-style-type: none; /* Убираем маркеры */  
  }
   input[type="text"] {
      
  
    border: solid black;
    border-width: 2px;
    box-sizing: border-box;
    background: white;
  }
/*
input[type=submit] {
    width: 100%;
    background-color: #4CAF50;
    color: white;
    padding: 14px 20px;
    margin: 8px 0;
    border: none;
    border-radius: 4px;
    cursor: pointer;
} */

input[type=submit]:hover {
    background-color: #45a049;
}
  .inlineList {
    display: inline;
  }

  .inlineListTitle {
    float: right;
  }

  .divsolid {
    border: solid;
  }
  .textTitle {
    font-weight: 400;
      font-size: 10px;
      padding-left: 25px !important;
      padding-top:8px !important;
      padding-bottom:8px !important; 
  }
  .textDescr {
    font-weight: 400;
    font-size: 10px;
    padding-top:8px !important;
    padding-bottom:8px !important;   
  }
  .divBorder {
    border-bottom: 1px solid rgba(0,0,0,0.12);
    border-top: 1px solid rgba(0,0,0,0.12);
  }

</style>
