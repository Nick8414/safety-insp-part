export default function generatePDF (obj) {
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
        console.log('--------------------------*******************------------------------');
     console.log(obj);
    //  console.log(this.safetyForms[index]);    

     // let safetyForm = this.safetyForms[index];
      let precautions = Object.assign([], obj.Precautions);
      let tools = Object.assign([], obj.ToolsMaterials);
      let safetyForm = Object.assign( {}, obj);

      let questions = [];
      let questionsItems = [];
      let objectQuestion = {}
      var columns = {columns : []}
          
      //   console.log(questions);
      var i = 0;
      var j = 0;

      for (let i = 0; length = i < safetyForm.Questions.length; i++ ) {
            questions.push([]);
            console.log(questions[0]);
            questions[i].push({columns:[{width: 470,text:safetyForm.Questions[i].questionName, fontSize:8, bold:true},
            {
               canvas: [
               {
                    type: 'rect',
                    x: 0,
                    y: 0,
                    w: 30,
                    h: 10,
                    r: 1,
                    lineWidth: 1
               }
              ],     
            },
      ], margin: [0, 2]
      })
            questions[i].push({type: 'upper-alpha', separator: ')', ol:[]})

          for ( let z=0; z<safetyForm.Questions[i].items.length; z++  ) {
              questions[i][1].ol.push([{ width: 'auto',text:safetyForm.Questions[i].items[z].subItemName, fontSize:7}, {type:'none', ol:[]}])
              for ( let n=0; n<safetyForm.Questions[i].items[z].additionalSubItem.length; n++ ) {  
                  questions[i][1].ol[z][1].ol.push({columns: [{ width:'auto',text:safetyForm.Questions[i].items[z].additionalSubItem[n].additionalSubItemName, fontSize:7,bold:true}, 
                  safetyForm.Questions[i].items[z].additionalSubItem[n].type == 'value' ?
                  { 
                        canvas: [
                       {
                             type: 'rect',
                             x: 0,
                             y: 0,
                             w: 25,
                             h: 9,
                             r: 1,
                             lineWidth: 1
                       }
                 ]     
                      }:{}
                  ]})
              }
          }
             console.log(questions[i]); 
      }
    // console.log('questions');  
    // console.log(questions); 
    questions.push([]);
    questions[questions.length-1].push({columns:[{width: 110,text: 'ИНСПЕКЦИЯ НЕ УСПЕШНА', fontSize:8, bold: true}, 
    {
       canvas: [
      {
            type: 'rect',
            x: 0,
            y: 0,
            w: 30,
            h: 10,
            r: 1,
            lineWidth: 1
      }
]     
    },
      

      {width: 110,text: ' ИНСПЕКЦИЯ УСПЕШНА', fontSize:8, bold: true},{
      canvas: [
            {
                  type: 'rect',
                  x: 0,
                  y: 0,
                  w: 30,
                  h: 10,
                  r: 1,
                  lineWidth: 1
                 
            }
      ]
}  ]})
    


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
  { width: 'auto', text: 'УСТРОЙСТВО БЕЗОПАСНОСТИ (УБ): ' + safetyForm.PSD_Description, fontSize:8, bold:true,  alignment: 'left',margin: [20,0,20,0]},
  {
    columns:[
       { width: 'auto', text: 'ИНДИФИКАЦИОННЫЙ НОМЕР: ' + safetyForm.PSD_TAG, fontSize:8, bold:true,  alignment: 'left', width:'auto', margin: [20,0,20,0]},
       { width: 'auto', text: 'ПОЛЕВОЙ НОМЕР УСТРОЙСТВА: ' + safetyForm.FieldTAG, fontSize:8, bold:true,  alignment: 'left', width:'auto', margin: [20,0,20,0]},
    ]
  }
 ];
} 
},
footer: function() { 
return {
  columns:[
      {text: 'ИНСПЕКЦИЮ ПРОВЕЛ: ' + safetyForm.Inspector, width:'auto', style:'footer'},
      {text: 'ДАТА: ' + convertDate(safetyForm.Date), width:'auto', style: 'footer'}
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
    text: 'ПОДГОТОВЛЕНО: ' + safetyForm.Prepared ,
    fontSize: 6,
    alignment: 'left'
                  },
                  {
                        text: 'ДАТА РЕВИЗИИ: ' + convertRevisionDate(safetyForm.RevisionDate),
    fontSize: 6,
    alignment: 'right'
                  }
 ],
 margin: [0, 1]
},
'\n',

{
    text: [
           {text: 'УСТРОЙСТВО БЕЗОПАСНОСТИ (УБ): ', fontSize: 7 },
           {text: safetyForm.PSD_Description, fontSize: 7, bold: true }
    ]	,
    margin: [0, 2]
},
{
 
    text: [
           {text: 'НАЗНАЧЕНИЕ УБ: ', fontSize: 7, bold: true },
           {text: safetyForm.Purpose, fontSize: 7 }
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
   text: safetyForm.Hazard,
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
                          text: safetyForm.HazardRaiting ,
     fontSize: 7,
     alignment: 'left'        

   },

],
 margin: [0, 2]
},

{
text: [
          {text: 'ЗАЩИТНАЯ ФУНКЦИЯ: ', fontSize: 7, bold: true },
          {text: safetyForm.ProtectiveAction, fontSize: 7 }
    ],
      margin: [0, 2]
},

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
              text: safetyForm.FieldTAG ,
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
          {text: safetyForm.Nameplate, fontSize: 7 }
    ],
      margin: [0, 2]
},

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
             text: safetyForm.FlowSheet  ,
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
              text: safetyForm.InstallationPlace ,
              fontSize: 7,
              bold: true,
              alignment: 'left'
            }
          ],
          margin: [0,2]
},

   {
text: [
          {text: 'ЗАДАННОЕ ЗНАЧЕНИЕ: ', fontSize: 7, bold: true },
          {text: safetyForm.SettingSizePSData, fontSize: 7 }
    ],
      margin: [0, 2]
},

 {
text: [
          {text: 'КОММЕНТАРИЙ: ', fontSize: 7 },
          {text: safetyForm.Comments, fontSize: 7 }
    ],
      margin: [0, 2]
},

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
              text: safetyForm.SkillLevel ,
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
              text: safetyForm.FrequencyOfInspection + ' мес.' ,
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
         text: safetyForm.InOperationShutdown ,
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
         text: safetyForm.Duration + ' мин.' ,
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
                   text: safetyForm.TypeInspection + ' / ' + safetyForm.MethodInspection ,
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
         text: safetyForm.NumberPeople + ' чел.',
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
                        ol: tools ,
    fontSize: 7,
    alignment: 'left',
    margin:[0, 5]
  },

   '\n',
{ width: 'auto', text: 'ОСОБЫЕ МЕРЫ ПРЕДОСТАРОЖНОСТИ:', sfontSize:8, bold:true, alignment: 'left' }, 	
            {
  width: 'auto',
                  ol: precautions ,
  fontSize: 7,
  alignment: 'left',
  margin:[0, 5]
            }, 
'\n',

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
         text: '___________________________________________',
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
         text: '______________________________________',
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
                        text: safetyForm.ImportantText,
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
  fontSize: 8,
  bold: true,
  italics: true,
  alignment: 'left',
  margin: [0,2]
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

 pdfMake.createPdf(docDefinition).open();
//pdfMake.createPdf(docDefinition).download(safetyForm.department + '--' + safetyForm.PSD_TAG + '--' + safetyForm.fieldTAG + '--' + safetyForm.psd_Description + '--' + (safetyForm.result == true ? 'OK':'NOK') + '.pdf');

} 

 