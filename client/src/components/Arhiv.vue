<template>
        <v-container fluid>
            <v-layout row wrap class="mb-3">
                <!-- <v-flex md3 lg3 class="px-1">
                     <div class="block">
                        <el-date-picker
                          v-model="value"
                          type="daterange"
                          range-separator="To"
                          start-placeholder="Start date"
                          end-placeholder="End date">
                        </el-date-picker>
                     </div> 
                    
                </v-flex> -->
                <v-flex md2 lg2 class="mx-2 mt-2">
                    <v-menu
                      ref="dataPickerMenuFrom"
                      :close-on-content-click="false"
                      v-model="dataPickerMenuFrom"
                      :nudge-right="40"
                      :return-value.sync="filter.selectedDateFrom"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                    >
                      <v-text-field
                        slot="activator"
                        v-model="filter.selectedDateFrom"
                        :label="$t('archive.dateFrom')"
                        prepend-icon="event"
                        solo
                        readonly
                      ></v-text-field>
                      <v-date-picker v-model="filter.selectedDateFrom" @input="$refs.dataPickerMenuFrom.save(filter.selectedDateFrom)"></v-date-picker>
                    </v-menu>
                </v-flex>
                <v-flex md2 lg2 class="mx-2 mt-2">
                    <v-menu
                      ref="dataPickerMenuTo"
                      :close-on-content-click="false"
                      v-model="dataPickerMenuTo"
                      :nudge-right="40"
                      :return-value.sync="filter.selectedDateTo"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                    >
                      <v-text-field
                        slot="activator"
                        v-model="filter.selectedDateTo"
                        :label="$t('archive.dateTo')"
                        prepend-icon="event"
                        solo
                        readonly
                      ></v-text-field>
                      <v-date-picker v-model="filter.selectedDateTo" @input="$refs.dataPickerMenuTo.save(filter.selectedDateTo)"></v-date-picker>
                    </v-menu>
                </v-flex>
                <v-flex md2 lg2 class="mx-2 mt-2" >
                  <div class="block">
                    <!-- <el-select v-model="value" placeholder="Отдел">
                      <el-option
                         v-for="item in departments"
                         :key="item.departmentName"
                         :label="item.departmentName"
                         :value="item.departmentName"
                      >
                      </el-option>
                    </el-select> -->
                    <v-select
                      v-model = "filter.department"
                      :items="departments"
                      :label="$t('archive.department')"
                      solo
                      item-text = departmentName
                      item-value = departmentName
                    ></v-select>
                  </div>
                     
                </v-flex>   
                  <v-flex md2 lg2 class="mx-2 mt-2">
                    <!-- <el-select v-model="value" placeholder="Тип">
                      <el-option
                         v-for="item in types"
                         :key="item.title"
                         :label="item.title"
                         :value="item.title"
                      >
                      </el-option>
                    </el-select> -->
                    <v-autocomplete
                      v-model = "filter.psd_Description"
                      :items="types"
                      :label="$t('archive.psdType')"
                      solo
                      item-text = title
                      item-value = title
                      
                      :search-input.sync="psdDescriptionSearch"
                    ></v-autocomplete>
                </v-flex>
                <v-flex md2 lg2 class="mx-2 mt-2">
                     <!-- <el-select v-model="value" placeholder="Результат">
                      <el-option
                         v-for="item in results"
                         :key="item"
                         :label="item"
                         :value="item"
                      >
                      </el-option>
                    </el-select>  -->
                    <v-select
                      v-model = "filter.result"
                      :items="results"
                      item-text = text
                      item-value = value
                      label="Результат"
                      solo
                    ></v-select>
                </v-flex>
                <v-flex md1 lg1 >
                  <v-btn 
                    small color="info" 
                    class="my-1"
                    @click="getFilteredForms" 
                  >OK</v-btn>  
                  <v-btn 
                    small color="info" 
                    class="my-0"
                    @click="resetFilter" 
                  >{{ $t('archive.reset') }}</v-btn>  
                </v-flex>
            </v-layout> 

            <v-layout>
              <v-flex>
                <el-table
                 :data="safetyForms"
                 border
                 height="650"
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
                   :label="$t('archive.date')"
                   header-align="center"
                   align="left"
                   width="150"
                 >
                   <template slot-scope="props">
                     {{ props.row.date|dateFilter }}
                   </template>
                 </el-table-column>
                 <el-table-column
                   prop="department"
                   :label="$t('archive.department')"
                   header-align="center"
                   align="left"
                   width="150"
                 >
                 </el-table-column>
                 <el-table-column
                   prop="PSD_TAG"
                   :label="$t('archive.psd_TAG')"
                   header-align="center"
                   align="left"
                   width="150"
                 >
                 </el-table-column>
                 <el-table-column
                   prop="psd_Description"
                   :label="$t('archive.psdType')"
                   header-align="center"
                   align="left"
                   width="150"
                 >
                 </el-table-column>
                 <el-table-column
                   prop="inspector"
                   :label="$t('archive.inspector')"
                   header-align="center"
                   align="left"
                   width="150"
                 >
                 </el-table-column>
                 <el-table-column
                   :label="$t('archive.result')"
                   header-align="center"
                   align="left"
                   width="150"
                 >
                 <template slot-scope="props">
                   {{ props.row.result  === true ? 'Успешно' : 'Не успешно' }}
                 </template>
                 </el-table-column>
                   <el-table-column
                   :label="$t('archive.pdfPrint')"
                   header-align="center"
                   align="left"
                   width="150"
                 >
                   <template slot-scope="props">
                     <v-btn icon class="mx-0" @click="generatePDF(props.$index)">
                       <v-icon color="teal">print</v-icon>
                      </v-btn>
                   </template>
                 </el-table-column>
                </el-table> 
                <el-pagination
                  background
                  @current-change = "changePage"
                  layout = "prev, pager, next"
                  :current-page.sync="currentPage1"
                  :total = "quantity"
                >
                </el-pagination>
        
              </v-flex>  
            </v-layout>        

            
    <!-- <v-data-table
      v-bind:headers="headers"
      :items="safetyForms"
      hide-actions
      class="elevation-1"
    >
    <template slot="items" slot-scope="props">
        <td>{{ props.index + 1 }}</td>
      <td>{{ props.item.date }}</td>
      <td class="text-xs-left">{{ props.item.department }}</td>
      <td class="text-xs-left">{{ props.item.PSD_TAG }}</td>
      <td class="text-xs-left">{{ props.item.psd_Description }}</td>
      <td class="text-xs-left">{{ props.item.inspector }}</td>
      <td class="text-xs-left">{{ props.item.result === true ? 'Успешно' : 'Не успешно' }}</td>
      <td class="text-xs-left">
        {{ props.index }}
           <v-btn icon class="mx-0" @click="generatePDF(props.index)">
            <v-icon color="teal">print</v-icon>
          </v-btn>
      </td>
    </template>
  </v-data-table> -->
   </v-container>
</template>
<script>
    function convertDate (value) {
    const date = new Date(value)
    if (value === null ) {
        return ''
    } else {
        return date.toLocaleString(['ru-RU'], {year: 'numeric', month: 'numeric', day: 'numeric' })
    }
   
}
function convertRevisionDate (value) {
  const date = new Date(value)
    if (value === null ) {
        return ''
    } else {
        return date.toLocaleString(['ru-RU'], {year: 'numeric', month: 'numeric' })
    }
}
   export default {
    data () {
      return {
        psdDescriptionSearch: {},
        headers: [
          { 
            text: '№',
            align: 'left',
            sortable: false
          },
          {
            text: 'Дата',
            align: 'left',
            sortable: false        
          },
          { text: 'Отдел',sortable: false, align: 'left' },
          { text: 'Номер', sortable: false, align: 'left' },
          { text: 'Тип устройства', sortable: false, align: 'left' },
          { text: 'Инспектор', sortable: false, align: 'left' }, 
          { text: 'Результат', sortable: false, align: 'left' },
          { text: 'Печать PDF', sortable: false, align: 'left' }
        ],
        e1:'',
        value:[],
        results:[{text:'Все', value:''}, {text:'Успешно', value:true}, {text:'Не успешно', value:false} ],
        items:[],
        filter: {
          selectedDateFrom: null,
          selectedDateTo  : null,
          department      : '',
          psd_Description : '',
          result          : '',
          pageNumber      : 1   
        },
        currentPage1 : 1,
        dataPickerMenuFrom: false,
        dataPickerMenuTo  : false
      }
    },
    computed: {
      safetyForms () {
        return this.$store.getters.loadSafetyForms
      },
      departments () {
        return this.$store.getters.loadDepartments
      },
      types () {
        return this.$store.getters.loadTypes
      },
      quantity () {
        return this.$store.getters.loadQuantitySafetyForms
      }
    },
    mounted : function () {
        this.getFilteredForms();
        this.getTypes();
    },
    methods :{
      changePage (num) {
        console.log(num);
        this.filter.pageNumber = num;
        this.$store.dispatch('getFilteredSafetyForms', this.filter)  
      },
       getTypes () {
      this.$store.dispatch('getTypes')
    },
      getSafetyForms () {
        this.$store.dispatch('getSafetyForms')
      },
      getFilteredForms () {
        //this.filter.pageNumber = 1;
        
        this.$store.dispatch('getFilteredSafetyForms', this.filter)
        this.currentPage1 = 1;
      },
      resetFilter () {
       
          this.filter.selectedDateFrom = null;
          this.filter.selectedDateTo   = null;
          this.filter.department       = '';
          this.filter.psd_Description  = '';
          this.filter.result           = '';
          this.filter.pageNumber       = 1   
   

        // for (let property in this.filter) {
        //     this.filter[property] = '';  
        // } 
      },

    generatePDF (index) {
            //console.log(index);
            console.log(this.safetyForms[index]);    

            let safetyForm = this.safetyForms[index];

            let questions = [];
            let questionsItems = [];
            let objectQuestion = {}
            var columns = {columns : []}
                
            //   console.log(questions);
            var i = 0;
            var j = 0;

            for (let i = 0; length = i < safetyForm.questions.length; i++ ) {
                  questions.push([]);
                  // questions.push([]) 
                  questions[i].push({columns:[{width: 'auto',text:safetyForm.questions[i].questionName, fontSize:8, bold:true}, {width: '*',text:safetyForm.questions[i].Status == true ? 'OK' : safetyForm.questions[i].Status == false ? 'NOK' : safetyForm.questions[i].Status == 'null' ? 'N/A':'', color:safetyForm.questions[i].Status == true ? 'green' : safetyForm.questions[i].Status == false ? 'red' : safetyForm.questions[i].Status == 'null' ? 'grey':'', style: 'questResult'}],  margin: [0, 2]})
                  questions[i].push({type: 'upper-alpha', separator: ')', ol:[]})

                for ( let z=0; z<safetyForm.questions[i].items.length; z++  ) {
                    questions[i][1].ol.push([{ width: 'auto',text:safetyForm.questions[i].items[z].subItemName, fontSize:7}, {type:'none', ol:[]}])
                    //  questions[i][1].ol.push({ol:[]});
                    for ( let n=0; n<safetyForm.questions[i].items[z].additionalSubItem.length; n++ ) {  
                        questions[i][1].ol[z][1].ol.push({columns: [{ width:'auto',text:safetyForm.questions[i].items[z].additionalSubItem[n].additionalSubItemName + ':', fontSize:7,bold:true}, { width: '*',text:safetyForm.questions[i].items[z].additionalSubItem[n].value, style: 'subItemValue'}]})
                    }
                }
            }
          // console.log('questions');  
          // console.log(questions); 
          questions.push([]);
          questions[questions.length-1].push({columns:[{width: 'auto',text: safetyForm.result == true ? 'РЕЗУЛЬТАТ: ИНСПЕКЦИЯ УСПЕШНА':'РЕЗУЛЬТАТ: ИНСПЕКЦИЯ НЕ УСПЕШНА', fontSize:8, bold: true}]})


          //separator: ')',
          objectQuestion['separator']  = ['Q', ':'];
          objectQuestion['ol'] = questions;

 console.log(objectQuestion);
// console.log(questions);

  var docDefinition = { 
    header: function(currentPage, pageCount) { 
      currentPage.toString() + ' of ' + pageCount; 
    //  return { text: currentPage.toString() + ' of ' + pageCount, alignment: 'right' };
      if (currentPage <= 1) {
        return { text: currentPage.toString() + ' of ' + pageCount, alignment: 'right', style: 'mainHeader' }
      } else {
        return  [ { text: currentPage.toString() + ' of ' + pageCount, alignment: 'right', style: 'mainHeader' },
        { width: 'auto', text: 'УСТРОЙСТВО БЕЗОПАСНОСТИ (УБ): ' + safetyForm.psd_Description, fontSize:8, bold:true,  alignment: 'left',  margin: [20,0,20,0]},
        {
          columns:[
             { width: 'auto', text: 'ИНДИФИКАЦИОННЫЙ НОМЕР: ' + safetyForm.PSD_TAG, fontSize:8, bold:true,  alignment: 'left', width:'auto',  margin: [20,0,20,0]},
             { width: 'auto', text: 'ПОЛЕВОЙ НОМЕР УСТРОЙСТВА: ' + safetyForm.fieldTAG, fontSize:8, bold:true,  alignment: 'left', width:'auto',  margin: [20,0,20,0]},
          ]
        }
       ];
      } 
    },
    footer: function() { 
      return {
        columns:[
            {text: 'ИНСПЕКЦИЮ ПРОВЕЛ: ' + safetyForm.inspector, width:'auto', style:'footer'},
            {text: 'ДАТА: ' + convertDate(safetyForm.date), width:'auto', style: 'footer'}
        ],
        margin:[0,20,0,0,]
      }
    },

   content: [
     {
        text: 'PROCTER & GAMBLE UKRAINE | ORDZHONIKIDZE PLANT ',
        alignment: 'center',
        fontSize : 8,
        bold     : true,
        color :'darkblue'
     },
     {
       columns: [
         	{
          text: 'ПОДГОТОВЛЕНО: ' + safetyForm.prepared ,
          fontSize: 6,
          alignment: 'left'
				},
				{
					text: 'ДАТА РЕВИЗИИ: ' + convertRevisionDate(safetyForm.revisionDate),
          fontSize: 6,
          alignment: 'right'
				}
       ],
       margin: [0, 1]
     },
     '\n',
    //  {
    //   alignment: 'left',
    //   columns: [
    //    	{
    //      width:80,
    //      text: 'МЕТОД ИНСПЕКЦИИ:',
    //      style: 'header',
    //      alignment: 'left'

		//    	},
		// 		{
    //       width:'*',
		// 			text: safetyForm.methodInspection ,
    //       style: 'valueText',
    //       alignment: 'left'        

    //     }
        
    //    ],
    //    margin: [0, 1]
    //  },

  
   
     {
          text: [
                 {text: 'УСТРОЙСТВО БЕЗОПАСНОСТИ (УБ): ', fontSize: 7 },
                 {text: safetyForm.psd_Description, fontSize: 7, bold: true }
          ]	,
          margin: [0, 2]
     },
     {
       
          text: [
                 {text: 'НАЗНАЧЕНИЕ УБ: ', fontSize: 7, bold: true },
                 {text: safetyForm.purpose, fontSize: 7 }
          ],
            margin: [0, 2]
     },
     {
    alignment: 'left',
      columns: [
        {
         width:45,
         text: 'ОПАСНОСТЬ:',
         fontSize: 7,
         bold: true,
         alignment: 'left'

        },
        {
         width:150,
         text: safetyForm.hazard,
         fontSize: 7,
         alignment: 'left'

		    },
		 		{
           width:80,
		 			 text: 'РЕЙТИНГ ОПАСНОСТИ: ',
           fontSize: 7,
           alignment: 'left', 
           bold: true       

         },
         {
           width:'*',
		 			 text: safetyForm.hazardRaiting ,
           fontSize: 7,
           alignment: 'left'        

         },

      ],
       margin: [0, 2]
  },
    //  {
       
    //       text: [
    //              {text: 'ОПАСНОСТЬ: ', fontSize: 7, bold: true },
    //             {text: safetyForm.hazard, fontSize: 7},
    //             {text: 'РЕЙТИНГ ОПАСНОСТИ: ', fontSize: 7, bold: true },
    //             {text: safetyForm.hazardRaiting, fontSize: 7 }
    //       ],
    //       margin: [0, 2]
    //  },

    {
      text: [
                {text: 'ЗАЩИТНАЯ ФУНКЦИЯ: ', fontSize: 7, bold: true },
                {text: safetyForm.protectiveAction, fontSize: 7 }
          ],
            margin: [0, 2]
    },

    
    // '\n',
    //  {
    //    alignment: 'left',
    //    columns: [
    //     {
    //       width: 120,
    //       text: 'УСТРОЙСТВО БЕЗОПАСНОСТИ (УБ):',
    //       style: 'header',
    //       alignment: 'left'
		// 		},
		// 		{
    //       width: '*',
		// 			text: safetyForm.psd_Description ,
    //       style: 'valueText',
    //       alignment: 'left'
		// 		}
    //    ]
    //  },
    // '\n',
    //  {
    //    alignment: 'left',
    //    columns: [
    //     {
    //       width: 60,   
    //       text: 'НАЗНАЧЕНИЕ УБ:',
    //       style: 'header',
    //       alignment: 'left'
		// 		},
		// 		{
    //       width: '*',
		// 			text: safetyForm.purpose ,
    //       style: 'subheader',
    //       alignment: 'left'
		// 		}
    //    ]
    //  },
    //   '\n',
    //  {
    //   alignment: 'left',
    //   columns: [
    //    	{
    //      width: 60,   
    //      text: 'ОПАСНОСТЬ:',
    //      style: 'header',
    //      alignment: 'left'
		// 		},
		// 		{
    //      width: '*',
		// 	   text: safetyForm.hazard,
    //      style: 'subheader',
    //      alignment: 'left'
		// 		}
    //    ]
    //  },
    //   '\n',
    //  {
    //   alignment: 'left',
    //   columns: [
    //    	{
    //       width: 80,   
    //       text: 'ЗАЩИТНАЯ ФУНКЦИЯ:',
    //       style: 'header',
    //       alignment: 'left'
		// 		},
		// 		{
    //       width: '*',
		// 			text: safetyForm.protectiveAction ,
    //       style: 'subheader',
    //       alignment: 'left'
		// 		}
    //    ]
    //  },
    //  '\n',



     {
        alignment: 'left',
        columns: [
                  {
                   width: 120,   
                   text: 'ИНДИФИКАЦИОННЫЙ НОМЕР:',
                   alignment: 'left',
                   fontSize: 8
                 
                  },
                  {
                   width: 150,
                   text: safetyForm.PSD_TAG ,
                   alignment: 'left',
                   fontSize: 8,
                   bold: true
                  },
                  {
                   width: 130,   
                   text: 'ПОЛЕВОЙ НОМЕР УСТРОЙСТВА:',
                   fontSize: 8,
                   alignment: 'left'
                  },
                  {
                    width: '*',
                    text: safetyForm.fieldTAG ,
                    fontSize: 8,
                    bold: true,
                    alignment: 'left'
                  }
                ],
                margin: [0,2]
      },

       {
      text: [
                {text: 'ИМЕННАЯ ТАБЛИЧКА: ', fontSize: 7, bold: true },
                {text: safetyForm.nameplate, fontSize: 7 }
          ],
            margin: [0, 2]
    },
   
      // {
      //  alignment: 'left',
      //  columns: [
      //    	{
      //     width: 90,   
      //     text: 'ИМЕННАЯ ТАБЛИЧКА:',
      //     style: 'header',
      //     alignment: 'left'
			// 	},
			// 	{
      //     width: '*',
			// 		text: safetyForm.nameplate ,
      //     style: 'subheader',
      //     alignment: 'left'
			// 	}
      //  ]
      // },

       {
        alignment: 'left',
        columns: [
                  {
                   width: 80,   
                   text: 'ССЫЛОЧНЫЙ ЧЕРТЕЖ:',
                   alignment: 'left',
                   fontSize: 7
                 
                  },
                  {
                   width: 150,
                   text: safetyForm.flowSheet  ,
                   alignment: 'left',
                   fontSize: 7,
                   bold: true
                  },
                  {
                   width: 80,   
                   text: 'МЕСТО УСТАНОВКИ:',
                   fontSize: 7,
                   alignment: 'left'
                  },
                  {
                    width: '*',
                    text: safetyForm.installationPlace ,
                    fontSize: 7,
                    bold: true,
                    alignment: 'left'
                  }
                ],
                margin: [0,2]
      },
     
      // {
      //   alignment: 'left',
      //   columns: [
      //             {
      //              width: 90,   
      //              text: 'ССЫЛОЧНЫЙ ЧЕРТЕЖ:',
      //              style: 'header',
      //              alignment: 'left'
      //             },
      //             {
      //              width: '*',
      //              text: safetyForm.flowSheet ,
      //              style: 'subheader',
      //              alignment: 'left'
      //             },
      //             {
      //              width: '*',   
      //              text: 'МЕСТО УСТАНОВКИ:',
      //              style: 'header',
      //              alignment: 'left'
      //             },
      //             {
      //              width:130,
      //              text: safetyForm.installationPlace ,
      //              style: 'subheader',
      //              alignment: 'left'
      //             }
      //           ]
      // },
      // '\n',

         {
      text: [
                {text: 'ЗАДАННОЕ ЗНАЧЕНИЕ: ', fontSize: 7, bold: true },
                {text: safetyForm.settingSizePSData, fontSize: 7 }
          ],
            margin: [0, 2]
    },
    //   {
    //    alignment: 'justify',
    //    columns: [
    //      	{
    //       width: 'auto',   
    //       text: 'ЗАДАННОЕ ЗНАЧЕНИЕ:',
    //       style: 'header',
    //       alignment: 'left'
		// 		},
		// 		{
    //       width: 'auto',
		// 			text: safetyForm.settingSizePSData ,
    //       style: 'subheader',
    //       alignment: 'left'
		// 		}
    //    ]
    //  },

       {
      text: [
                {text: 'КОММЕНТАРИЙ: ', fontSize: 7 },
                {text: safetyForm.comments, fontSize: 7 }
          ],
            margin: [0, 2]
    },
    
    //   {
    //    alignment: 'left',
    //    columns: [
    //      	{
    //       width: 90,   
    //       text: 'КОММЕНТАРИЙ:',
    //       style: 'header',
    //       alignment: 'left'
		// 		},
		// 		{
    //       width: '*',
		// 			text: safetyForm.comments ,
    //       style: 'subheader',
    //       alignment: 'left'
		// 		}
    //    ]
    //  },
    // '\n',
     {
            alignment: 'left',
            columns: [
                  {
                    width: 110,   
                    text: 'УРОВЕНЬ НАВЫКОВ:',
                    fontSize:7,
                    alignment: 'left'
                  },
                  {
                    width: 150,
                    text: safetyForm.skillLevel ,
                    fontSize:7,
                    bold: true,
                    alignment: 'left'
                  },
                  {
                    width: 110,   
                    text: 'ЧАСТОТА ИНСПЕКЦИЙ:',
                    fontSize:7, 
                    alignment: 'left'
                  },
                  {
                    width: '*',
                    text: safetyForm.frequencyOfInspection ,
                    fontSize:7,
                    bold: true,
                    alignment: 'left'
                  }
            ],
             margin: [0, 2]
        },     
     {
            alignment: 'left',
            columns: [
                  {
               width: 110,   
               text: 'СОСТОЯНИЕ ОБОРУДОВАНИЯ:',
               fontSize:7,
               alignment: 'left'
                     },
                     {
               width: 150,
               text: safetyForm.inOperationShutdown ,
                 fontSize:7,
                    bold: true,
               alignment: 'left'
                     },
                      {
               width: 110,   
               text: 'ПРОДОЛЖИТЕЛЬНОСТЬ:',
                 fontSize:7,
                    
               alignment: 'left'
                     },
                     {
               width: '*',
               text: safetyForm.duration ,
                 fontSize:7,
                    bold: true,
               alignment: 'left'
                     }
            ],
             margin: [0, 2]
          },

           
     {
            alignment: 'left',
            columns: [
                  {
               width: 110,   
               text: 'ТИП ИНСПЕКЦИИ:',
            fontSize:7,
                   
               alignment: 'left'
                     },
                     {
               width: 150,
                         text: safetyForm.typeInspection + ' / ' + safetyForm.methodInspection ,
                fontSize:7,
                    bold: true,
               alignment: 'left'
                     },
                      {
               width: 110,   
               text: 'КОЛИЧЕСТВО ЧЕЛОВЕК:',
          fontSize:7,
                
               alignment: 'left'
                     },
                     {
               width: '*',
               text: safetyForm.numberPeople ,
            fontSize:7,
                    bold: true,
               alignment: 'left'
                     }
            ],
             margin: [0, 2]
          },

      	{ width: 'auto', text: 'ИНСТРУМЕНТЫ И МАТЕРИАЛЫ:', fontSize:8, bold:true, alignment: 'left' },    
				{
          width: 'auto',
					ol: safetyForm.toolsMaterials ,
          fontSize: 7,
          alignment: 'left',
          margin:[0, 5]
        },

         '\n',
      { width: 'auto', text: 'ОСОБЫЕ МЕРЫ ПРЕДОСТАРОЖНОСТИ:', sfontSize:8, bold:true, alignment: 'left' }, 	
			{
        width: 'auto',
				ol: safetyForm.precautions ,
        fontSize: 7,
        alignment: 'left',
        margin:[0, 5]
			}, 
'\n',
// {
//         text: '- - - - - - - - - - - - - - - - - - - - - - - - - - АНКЕТА - ПРОЦЕДУРА - - - - - - - - - - - - - - - - - - - - - - - - - -',
// 		  	style: 'header'
//      },

         {
        text: 'АНКЕТА - ПРОЦЕДУРА',
        alignment: 'center',
        fontSize : 8,
        bold     : true,
        color :'darkblue'

     },

 '\n',      
          objectQuestion,
          '\n',


      
      {
       alignment: 'justify',
       columns: [
        {
          width: 'auto',
          text: 'НОМЕР ПРТОКОЛА:',
          style: 'header',
          alignment: 'left',
          bold: true,
				},
				{
          width: 'auto',
					text: safetyForm.protocolNumber,
          style: 'subheader',
          alignment: 'left'
        },
         {
          width: 'auto',
          text: 'ДАТА ПОСЛЕДНЕГО ПРТОКОЛА:',
          style: 'header',
          alignment: 'left',
          bold: true
				},
				{
          width: 'auto',
					text: safetyForm.protocolDate,
          style: 'subheader',
          alignment: 'left'
				}
       ]
     },
'\n',
      {
       alignment: 'justify',
       columns: [
        {
          color: 'red',
          width: 'auto',
          text: 'ВАЖНО:',
          style: 'header',
          alignment: 'left'
				},
				{
          color: 'red',
          width: 'auto',
					text: safetyForm.importantText,
          style: 'subheader',
          alignment: 'left'
				}
       ]
     },
'\n',
     {
       alignment: 'justify',
       columns: [
        {
          width: 'auto',
          text: 'КОММЕНТАРИЙ:',
          fontSize: 7,
          bold: true,
          alignment: 'left'
				},
				{
          width: 'auto',
					text: safetyForm.notes,
           fontSize: 7,
          alignment: 'left'
				}
       ]
     }
// '\n', 
// '\n',

        //  { 
        //   columns: [ 
        //       {text: 'Испекцию провел: ' + safetyForm.inspector},
        //       {text: 'Дата: ' + safetyForm.date}
        //   ]
        //  } 
   ],
   pageMargins: [40, 60, 40, 60],
   	styles: {
	  	// header: {
  		// 	fontSize: 7,
      //   bold: true,
      //   alignment: 'left'
      // },
      subheader: {
  			fontSize: 7,
        alignment: 'left'
      },
      mainHeader: {
        margin: [20,10,20,0]
      },
      footer: {
        fontSize:8,
        bold:true,
        margin: [35,0]
      },
      secondHeader: {
        margin: [25,0],
        fontSize: 6,
        bold: true,

      },
      headerQuestion: {
        fontSize: 8,
        bold: true,
        alignment: 'left',
        margin: [0,5]
      },
      subItemHeader: {
        fontSize: 8,
        bold: false,
        alignment: 'left',
        margin: [0,2]
      },
      subItemValue: {
        fontSize: 7,
        bold: true,
        italics: true,
        alignment: 'left',
       
      },
      questResult: {
        fontSize: 10,
        bold: true,
        alignment: 'right'
      },
		  valueText: {
        fontSize: 8,
        
		  },
		  quote: {
		  	italics: true
		  },
		  small: {
		  	fontSize: 5
          }
       
    },
     defaultStyle: {
       fontSize: 7,
        columnGap:8
       
	}
};

// pdfMake.createPdf(docDefinition).open();
pdfMake.createPdf(docDefinition).download(safetyForm.department + '--' + safetyForm.PSD_TAG + '--' + safetyForm.fieldTAG + '--' + safetyForm.psd_Description + '--' + (safetyForm.result == true ? 'OK':'NOK') + '.pdf');

        } 
    }

  } 
</script>
<style scoped>
  
</style>

