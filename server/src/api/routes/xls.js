const express = require('express');
const router = express.Router();
const SafetyDevice = require('../models/safetyDevice');
const xl = require('excel4node')
const DeviceType = require('../models/deviceType');
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
  console.log('excel');
  SafetyDevice.find({})
  .populate('PSD_Description')
  .exec()
  .then(docs => {
    const wb = new xl.Workbook();
    const ws = wb.addWorksheet('PSI LIST');

     // Create a reusable style
    const styleHeader = wb.createStyle({
      alignment: { // §18.8.1
          horizontal: ['justify'],
          shrinkToFit: true,
          wrapText: true
      },
      font: {
          color: 'black',
          size: 12
      },
      border: { // §18.8.4 border (Border)
         left: {
             style: 'thick', //§18.18.3 ST_BorderStyle (Border Line Styles) ['none', 'thin', 'medium', 'dashed', 'dotted', 'thick', 'double', 'hair', 'mediumDashed', 'dashDot', 'mediumDashDot', 'dashDotDot', 'mediumDashDotDot', 'slantDashDot']
             color: 'black' // HTML style hex value
         },
         right: {
             style: 'thick',
             color: 'black'
         },
         top: {
             style: 'thick',
             color: 'black'
         },
         bottom: {
             style: 'thick',
             color: 'black'
         },
         diagonal: {
             style: 'thick',
             color: 'black'
         }
      },
      numberFormat: '$#,##0.00; ($#,##0.00); -'
    });

    ws.cell(1,1).string('#').style(styleHeader);
    ws.cell(1,2).string('НОМЕР УБ | PSD TAG #').style(styleHeader);
    ws.cell(1,3).string('ПОЛЕВОЙ НОМЕР УСТ-ВА | FIELD TAG #').style(styleHeader);
    ws.cell(1,4).string('ССЫЛОЧНЫЙ ЧЕРТЕЖ | FLOW SHEET (P&ID #)').style(styleHeader);
    ws.cell(1,5).string('ТИП УБ | PSD DESCRIPTION').style(styleHeader);
    ws.cell(1,6).string('ИМЕННАЯ ТАБЛИЧКА | NAMEPLATE').style(styleHeader);
    ws.cell(1,7).string('OTHER PROPERTIES AND DATA').style(styleHeader);
    ws.cell(1,8).string('ОТДЕЛ | DEPARTMENT').style(styleHeader);
    ws.cell(1,9).string('МЕСТО УСТАНОВКИ | INSTALLATION PLACE').style(styleHeader);
    ws.cell(1,10).string('ОТВЕТСТВЕННЫЙ | RESPONSIBLE PERSON').style(styleHeader);
    ws.cell(1,11).string('ПОСЛЕДНЯЯ ДАТА ИНСПЕКЦИИ | LAST INSPECTION DATE').style(styleHeader);
    ws.cell(1,12).string('СЛЕДУЮЩАЯ ДАТА ИНСПЕКЦИИ | NEXT INSPECTION DATE').style(styleHeader);
    ws.cell(1,13).string('ОПАСНОСТЬ | HAZARD').style(styleHeader);
    ws.cell(1,14).string('РЕЙТИНГ ОПАСНОСТИ | HAZARD RATING').style(styleHeader);
    ws.cell(1,15).string('ЗАЩИТНАЯ ФУНКЦИЯ | PROTECTIVE ACTION').style(styleHeader);
    ws.cell(1,16).string('КОММЕНТАРИЙ | COMMENTS').style(styleHeader);
    ws.cell(1,17).string('Safety Integrety Level').style(styleHeader);
    ws.cell(1,18).string('ЧАСТОТА ИНСПЕКЦИЙ | INSPECTION FREQUENCY').style(styleHeader);
    ws.cell(1,19).string('IN OPERATION | SHUTDOWN').style(styleHeader);
    ws.cell(1,20).string('ТИП ИНСПЕКЦИИ').style(styleHeader);
    ws.cell(1,21).string('МЕТОД ИНСПЕКЦИИ').style(styleHeader);
    ws.cell(1,22).string('УРОВЕНЬ НАВЫКОВ | SKILL LEVEL').style(styleHeader);
    ws.cell(1,23).string('ПРОДОЛЖИТЕЛЬНОСТЬ | DURATION').style(styleHeader);
    ws.cell(1,24).string('КОЛ-ВО ЧЕЛ-К').style(styleHeader);
    ws.cell(1,25).string('СТАТУС | PSI STATUS').style(styleHeader);
    ws.cell(1,26).string('ПРИМЕЧАНИЯ | NOTES').style(styleHeader);
    ws.cell(1,27).string('ЗАДАННОЕ ЗНАЧЕНИЕ | SETTING / SIZE / PS DATA').style(styleHeader);


  for (i=1; i<28; i++) {
    ws.column(i).setWidth(15);
  }    
   
    // console.log(docs);
    
        
        docs.forEach( (value, index) => {

        //   console.log(`----------------------------------------`)
        //   console.log(value.comments)
        //   console.log(value.safetyIntegretyLevel)
        //   console.log(value.notes)
        //   console.log(`----------------------------------------`)
          
        
          ws.cell(index+2, 1).number(index+1);
          ws.cell(index+2, 2).string(value.psd_TAG);
          ws.cell(index+2, 3).string(value.fieldTAG);
          ws.cell(index+2, 4).string(value.flowSheet);
          ws.cell(index+2, 5).string(value.PSD_Description == undefined ? "not paring type":value.PSD_Description.title);
          ws.cell(index+2, 6).string(value.nameplate);
          ws.cell(index+2, 7).string(value.otherPropertiesAndData == null ? "" : value.otherPropertiesAndData);
          ws.cell(index+2, 8).string(value.department);
          ws.cell(index+2, 9).string(value.installationPlace);
          ws.cell(index+2, 10).string(value.responsiblePerson);
          ws.cell(index+2, 11).date(value.lastInspectionDate);
          ws.cell(index+2, 12).date(value.nextInspectionDate);
          ws.cell(index+2, 13).string(value.hazard);
          ws.cell(index+2, 14).string(value.hazardRaiting);
          ws.cell(index+2, 15).string(value.protectiveAction);
          ws.cell(index+2, 16).string(value.comments == null ? "" : value.comments);
          ws.cell(index+2, 17).string(value.safetyIntegretyLevel == null ? "" : value.safetyIntegretyLevel);
          ws.cell(index+2, 18).string(value.PSD_Description == undefined ? "not paring type":value.PSD_Description.frequencyOfInspection);
          ws.cell(index+2, 19).string(value.inOperationShutdown);
          ws.cell(index+2, 20).string(value.typeInspection);
          ws.cell(index+2, 21).string(value.methodInspection);
          ws.cell(index+2, 22).string(value.skillLevel);
          ws.cell(index+2, 23).number(value.duration);
          ws.cell(index+2, 24).number(value.numberPeople);
          ws.cell(index+2, 25).string(value.PSI_Status);
          ws.cell(index+2, 26).string(value.notes == null ? "" : value.notes);
          ws.cell(index+2, 27).string(value.settingSizePSData);
          
        })

        wb.write('psi_report.xlsx', res);
         // res.status(200).json(docs);
     
  })
  .catch(err => {
     // console.log(err);
      next(err);
  }); 
});


module.exports = router;