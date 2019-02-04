<template>
  <v-container fluid>
    <v-layout justify-center >
      <v-flex xs12 sm12 md12 lg12>
             <!-- Add item dialog -->
      

<v-layout>
  <v-flex xs4 lg4 md4 sm4>
    <span>Дата последней проверки</span>
  <el-date-picker
      v-model="filter.lastInspectionDate"
      type="daterange"
      format="dd/MM/yyyy"
      start-placeholder="От"
      end-placeholder="До">
    </el-date-picker>
  </v-flex>  
  <v-flex xs4 lg4 md4 sm4 >
     <span>Дата следующей проверки</span>
  <el-date-picker
      v-model="filter.nextInspectionDate"
      type="daterange"
      format="dd/MM/yyyy"
      start-placeholder="От"
      end-placeholder="До">
    </el-date-picker>

  </v-flex>
  <v-flex xs4 lg4 md4 sm4 >
       

  </v-flex>
  

</v-layout>

<!-- Filter selects  -->  
  
         
<v-layout row wrap class="mb-2">
      <v-flex  lg1 md1 sm1 class="mx-1 mt-1" d-flex>
        <v-autocomplete
          :items="numbers"
          label="Номер УБ"
          solo
          multiple
          autocomplete
          :search-input.sync="numberSearch"
          v-model = "filter.psd_TAG"
        >  
          <template
            slot="selection"
            slot-scope="{ item, index }"
          >
            <span v-if="index === 0">
              {{ item }}
            </span>
            <span
              v-if="index === 1"
              class="grey--text caption"
            >(+{{ filter.psd_TAG.length - 1 }} others)</span>
          </template>
        </v-autocomplete>
      </v-flex>

      <v-flex lg1 md1 sm1 class="mx-1 mt-1" d-flex>
        <v-autocomplete
          :items="fieldTAGs"
          label="Полевой номер"
          solo
          small-chips
          multiple
          autocomplete
          :search-input.sync="fieldTAGSearch"
          v-model = "filter.fieldTAG"
        >  
          <template
            slot="selection"
            slot-scope="{ item, index }"
          >
            <span v-if="index === 0">
              {{ item }}
            </span>
            <span
              v-if="index === 1"
              class="grey--text caption"
            >(+{{ filter.fieldTAG.length - 1 }} others)</span>
          </template>
        </v-autocomplete>
      </v-flex>

      <v-flex lg2 md2 sm2 class="mx-1 mt-1" d-flex>
         <v-autocomplete
          :items="flowSheets"
          label="Ссылочный чертеж"
          solo
          small-chips
          multiple
          autocomplete
          :search-input.sync="flowSheetSearch"
          v-model = "filter.flowSheet"
        >  
          <template
            slot="selection"
            slot-scope="{ item, index }"
          >
            <span v-if="index === 0">
              {{ item }}
            </span>
            <span
              v-if="index === 1"
              class="grey--text caption"
            >(+{{ filter.flowSheet.length - 1 }} others)</span>
          </template>
        </v-autocomplete>
      </v-flex>

     
       <v-flex lg2 md2 sm2 class="mx-1 mt-1" d-flex>
        <v-autocomplete
          :items="psdDescriptions"
          item-value="id"
          item-text="title"
          label="Тип УБ"
          solo
          small-chips
          multiple
          autocomplete
          v-model = "filter.PSD_Description"
          :search-input.sync="psdDescriptionSearch"
        >  
          <template
            slot="selection"
            slot-scope="{ item, index }"
          >  
            <span v-if="index === 0">{{ item.title }}</span>
            <span
              v-if="index === 1"
              class="grey--text caption"
            >(+{{ filter.PSD_Description.length - 1 }} others)</span>
          </template>
        </v-autocomplete>
      </v-flex>

      <v-flex lg1 md1 sm1 class="mr-1 mt-1" d-flex>
        <v-autocomplete
          :items="filterDepartments"
          
          label="Отдел"
          solo
          multiple
          autocomplete
          v-model = "filter.department"
          :search-input.sync="departmentSearch"
        >  
          <template
            slot="selection"
            slot-scope="{ item, index }"
          >    
            <span v-if="index === 0">{{ item }}</span>    
            <span
              v-if="index === 1"
              class="grey--text caption"
            >(+{{ filter.department.length - 1 }} others)</span>
          </template>
        </v-autocomplete>
      </v-flex>
      <v-flex lg1 md1 sm1 class="mx-1 mt-1" d-flex>
        <v-autocomplete
          :items="installationPlaces"
          label="Место установки"
          solo
          multiple
          autocomplete
          :search-input.sync="installationPlaceSearch"
          v-model = "filter.installationPlace"
        >  
          <template
            slot="selection"
            slot-scope="{ item, index }"
          >
            <span v-if="index === 0">
             {{ item }}
            </span>
            
            <span
              v-if="index === 1"
              class="grey--text caption"
            >(+{{ filter.installationPlace.length - 1 }} others)</span>
          </template>
        </v-autocomplete>
      </v-flex>
      <v-flex lg1 md1 sm1 class="mx-1 mt-1" d-flex>
        <v-autocomplete
          :items="responsible"
          label="Отвественный"
          solo
          small-chips
          multiple
          autocomplete
          :search-input.sync="responsibleSearch"
          v-model = "filter.responsiblePerson"
        >  
          <template
            slot="selection"
            slot-scope="{ item, index }"
          >
            <span v-if="index === 0">
              {{ item }}
            </span>
            
            <span
              v-if="index === 1"
              class="grey--text caption"
            >(+{{ filter.responsiblePerson.length - 1 }} others)</span>
          </template>
        </v-autocomplete>
      </v-flex> 
      <v-flex lg1 md1 sm1 class="mx-1 mt-1" d-flex>
        <v-autocomplete
          :items="statusesFilter"
          label="Статусы"
          solo
          multiple
          autocomplete
          :search-input.sync="statusSearch"
          v-model = "filter.PSI_Status"
        >  
          <template
            slot="selection"
            slot-scope="{ item, index }"
          >
            <span v-if="index === 0">
              {{ item }}
            </span>
         
            <span
              v-if="index === 1"
              class="grey--text caption"
            >(+{{ filter.PSI_Status.length - 1 }} others)</span>
          </template>
        </v-autocomplete>
      </v-flex>
      <v-flex lg1 md1 sm1 class="mx-1 mt-1" >
        <v-btn class="my-1" small color="info"
          @click='getDevices'
        >
          OK
        </v-btn> 
        <v-btn 
        class="my-0"
        small color="info"
          @click='resetFilter'
        >
          RESET
        </v-btn> 
      </v-flex>

     
</v-layout>



    <v-dialog v-model="dialog" fullscreen persistent max-width="500px">
      <v-btn color="primary" dark slot="activator" class="mb-2">{{ $t('adminTables.newDevice') }}</v-btn>
        

       <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12 md12>
                <span>НОМЕР УБ | PSD TAG #</span>
                <v-text-field
                   class="dialog-font-size" 
                   v-model="item.psd_TAG"
                   :error-messages="errors.collect('psd_TAG')"
                   outline
                   data-vv-name="psd_TAG"
                   v-validate="'required'"
                   height="13"
                >
                </v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <span>ПОЛЕВОЙ НОМЕР УСТ-ВА | FIELD TAG #</span>
              <v-text-field
              class="dialog-font-size"
                   v-model="item.fieldTAG"
                   outline
              >
              </v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <span>ТЕХНОЛОГИЧЕСКАЯ СХЕМА № | P&ID #</span>
              <v-text-field
              class="dialog-font-size"
                   v-model="item.flowSheet"
                   outline
                   
                  
                >
                </v-text-field>
              </v-flex>


            <v-flex xs12 sm12 md12>
              <span>ССЫЛКА НА ТЕХНОЛОГИЧЕСКУЮ СХЕМУ | P&ID LINK</span>
              <v-text-field
              class="dialog-font-size"
                   v-model="item.flowSheetLink"
                   outline
                   
                >
                </v-text-field>
              </v-flex>
 <!-- 
              <v-flex>
                <img :src="imageURL" height="150px">
              </v-flex > 

               <v-flex xs12 sm6 md4>
                <v-btn raised class="blue-grey lighten-5" @click="onPickFile">Select Link</v-btn>
                <input 
                  type="file" 
                  ref="fileInput" 
                  accept="*/*"
                  @change="onLinkCheck">
              </v-flex> 
 -->

              <v-flex  xs12 sm12 md12>
                <span>ТИП УБ | PSD DESCRIPTION</span>
                <v-select
                class="dialog-font-size"
                  v-model="item.PSD_Description"
                  outline
                  :items="types"
                  item-value="_id"
                  item-text="title"
                  :error-messages="errors.collect('PSD_Description')"
                  data-vv-name="PSD_Description"
                  v-validate="'required'" 
                ></v-select>
              </v-flex>
              <v-flex  xs12 sm12 md12>
                <span>ИМЕННАЯ ТАБЛИЧКА</span>
                <v-textarea 
                class="dialog-font-size"
                  outline
                  v-model="item.nameplate" 
                  type="text" 
                  rows=3
                >
                </v-textarea>
              </v-flex>

              <v-flex  xs12 sm12 md12>
                <span>OTHER PROPERTIES AND DATA</span>
                <v-text-field 
                class="dialog-font-size"
                  outline
                  v-model="item.otherPropertiesAndData" 
                  type="text" 
                >
                </v-text-field>
              </v-flex>
              
              <v-flex xs12 sm12 md12>
                <span>ОТДЕЛ | DEPARTMENT</span>
                <v-select
                class="dialog-font-size"
                  v-model="item.department"
                  outline
                  :items="departments"
                  item-value="departmentName"
                  item-text="departmentName" 
                  :error-messages="errors.collect('department')"
                  data-vv-name="department"
                  v-validate="'required'"
                ></v-select>
              </v-flex>

              <v-flex  xs12 sm12 md12>
                <span>МЕСТО УСТАНОВКИ | INSTALLATION PLACE</span>
                <v-text-field 
                class="dialog-font-size"
                  v-model="item.installationPlace" 
                  outline 
                >
                </v-text-field>
              </v-flex>
               <v-flex  xs12 sm12 md12>
                <!-- <v-text-field 
                  v-model="item.responsiblePerson" 
                  label="ОТВЕТСТВЕННЫЙ | RESPONSIBLE PERSON" 
                  outline
                  :error-messages="errors.collect('responsiblePerson')"
                  data-vv-name="responsiblePerson"
                  v-validate="'required'" 
                >
                </v-text-field> -->
                <span>ОТВЕТСТВЕННЫЙ | RESPONSIBLE PERSON</span>
                <v-autocomplete
                  class="dialog-font-size"
                  :items="employees" 
                  outline
                  :error-messages="errors.collect('responsiblePerson')"
                  data-vv-name="responsiblePerson"
                  v-validate="'required'" 
                  item-value="fullName"
                  item-text="fullName" 
                  autocomplete
                  :search-input.sync="employeeSearch"
                  v-model = "item.responsiblePerson"
                >  
                </v-autocomplete>

              </v-flex>
                <v-flex xs12 sm12 md12>
                   
                <div class="block">
                 <span class="demonstration">Последняя дата проверки</span>
            <el-date-picker
              v-model="item.lastInspectionDate"
              type="date"
              format="dd/MM/yyyy"
              placeholder="Pick a day">
            </el-date-picker>
                </div>  
              </v-flex>


              <v-flex xs12 sm12 md12>
                <div class="block">
                  <span class="demonstration">Следующая дата проверки</span>
            <el-date-picker
              v-model="nextInspectionDate"
              type="date"
              format="dd/MM/yyyy"
              placeholder="Pick a day">
            </el-date-picker>
                </div>    
              </v-flex>
              <v-flex xs12 sm12 md12>
                <span>ОПАСНОСТЬ | HAZARD</span>
                <v-textarea
                class="dialog-font-size"
                  v-model="item.hazard"
                  outline
                  rows = 3
                  
                ></v-textarea>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <span>РЕЙТИНГ ОПАСНОСТИ | HAZARD RATING</span>
                <v-select
                class="dialog-font-size"
                  v-model="item.hazardRaiting"
                  :items="ratings"
                  item-value="ratingName"
                  item-text="ratingName" 
                 
                  outline
                ></v-select>
              </v-flex>


              <v-flex xs12 sm12 md12>
                <span>ЗАЩИТНАЯ ФУНКЦИЯ | PROTECTIVE ACTION</span>
                <v-textarea
                class="dialog-font-size"
                  v-model="item.protectiveAction"
                  outline
                  rows = 3
                 
                ></v-textarea>
              </v-flex>

              <v-flex  xs12 sm12 md12>
                <span>КОММЕНТАРИЙ | COMMENTS</span>
                <v-text-field  
                class="dialog-font-size"
                  outline
                  v-model="item.comments" 
                  type="text" 
                >
                </v-text-field>
              </v-flex>
                 <v-flex  xs12 sm12 md12>
                   <span>Safety Integrety Level</span>
                <v-text-field
                class="dialog-font-size"
                  outline
                  v-model="item.safetyIntegretyLevel" 
                  type="text" 
                >
                </v-text-field>
              </v-flex>
              

              <v-flex  xs12 sm12 md12>
                <span>SETTING / SIZE / PS DATA</span>
                <v-text-field
                class="dialog-font-size"
                  v-model="item.settingSizePSData"  
                  outline
                  type="text" 
                >
                </v-text-field>
              </v-flex>

               <v-flex xs12 sm12 md12>
                 <span>IN OPERATION / SHUTDOWN</span>
                <v-select
                class="dialog-font-size"
                  v-model="item.inOperationShutdown"
                  required
                  outline
                  item-value="conditionOfEquipmentName"
                  item-text="conditionOfEquipmentName"
                  :items="conditionOfEquipments"
                  
                ></v-select>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <span>ТИП ИНСПЕКЦИИ</span>
                <v-select
                class="dialog-font-size"
                  v-model="item.typeInspection"
                  required
                  outline
                  item-value="inspectionTypeName"
                  item-text="inspectionTypeName"
                  :items="inspectionTypes"
                  
                ></v-select>
              </v-flex>
               <v-flex  xs12 sm12 md12>
                 <span>МЕТОД ИНСПЕКЦИИ</span>
                <v-select
                class="dialog-font-size"
                  outline
                  v-model="item.methodInspection" 
                  :items="inspectionMethods"
                  item-value="inspectionMethodName"
                  item-text="inspectionMethodName" 
                  
                ></v-select>
              </v-flex>
               <v-flex xs12 sm12 md12>
                 <span>УРОВЕНЬ НАВЫКОВ</span>
                <v-select
                class="dialog-font-size"
                  v-model="item.skillLevel"
                  outline
                  :items="skills"
                  item-text="skillName"
                  item-value="skillName"
                 
                ></v-select>
              </v-flex>

              <v-flex xs12 sm12 md12>
                <span>ПРОДОЛЖИТЕЛЬНОСТЬ (МИН)</span>
                  <v-select
                  class="dialog-font-size"
                    v-model="item.duration"
                    outline
                    :items=durationArr
                  ></v-select>
              </v-flex>
               <v-flex xs12 sm12 md12>
                 <span>КОЛЛИЧЕСТВО ЧЕЛОВЕК</span>
                  <v-text-field 
                  class="dialog-font-size"
                    v-model="item.numberPeople" 
                    outline
                    type="text" 
                    :error-messages="errors.collect('numberPeople')"
                    data-vv-name="numberPeople"
                    v-validate="'numeric'"
                  >
                  </v-text-field>
              </v-flex>
              <v-flex xs12 sm12 md12>
                <span>СТАТУС | PSI STATUS</span>
                <v-select
                class="dialog-font-size"
                  v-model="item.PSI_Status"
                  required
                  outline
                  item-value="statusName"
                  item-text="statusName"
                  :items="statuses"
                  :error-messages="errors.collect('PSI_Status')"
                  data-vv-name="PSI_Status"
                  v-validate="'required'"
                ></v-select>
              </v-flex>

              
             
              

                <v-flex  xs12 sm12 md12>
                  <span>ПРИМЕЧАНИЯ | NOTES</span>
                <v-text-field  
                class="dialog-font-size"
                  outline
                  v-model="item.notes" 
                  type="text" 
                >
                </v-text-field>
              </v-flex>
              
               
          
              <v-flex  xs12 sm12 md12>
                <span>Procedure Link</span>
                <v-text-field 
                class="dialog-font-size"
                  outline
                  v-model="item.procedureLink" 
                  type="text" 
                >
                </v-text-field>
              </v-flex>
              <v-flex  xs12 sm12 md12>
                <span>Материал | Material</span>
                <v-text-field 
                class="dialog-font-size"
                  outline
                  v-model="item.material" 
                  type="text" 
                >
                </v-text-field>
              </v-flex>
              
              <v-flex  xs12 sm12 md12>
                <v-switch :label="`Необходим протокол: ${item.isProtocolUse == true ? 'Да' : 'Нет'}`" v-model="item.isProtocolUse"></v-switch>  
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

  


  



  <!-- Table -->  
  <el-table
    :data="devices"
    stripe
    border
    cell-class-name="standart-cell"
    height="575"
    style="width: 100%"
  >
    <el-table-column
      type="index"
      width="30"
      header-align="center"
      align="center"
    >
    </el-table-column>

    <el-table-column
      :label="$t('adminTables.actions')"
      header-align="center"
      align="center"
      width="95"
    >
      <template slot-scope="props">
        <v-tooltip bottom>
          <v-btn slot="activator" icon small class="mx-0" @click="editItem(props.row)">
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
          <v-btn slot="activator" icon small class="mx-0" @click="deleteItem(props.$index, props.row._id)">
            <v-icon color="pink">delete</v-icon>
          </v-btn>
          <span>delete</span>
        </v-tooltip>
      </template>
    </el-table-column>

    <el-table-column
      prop="psd_TAG"
      :label="$t('adminTables.psd_TAG')"
      width="80"
      header-align="center"
      align="center"
      
    >
    <template slot-scope="props">
        <v-edit-dialog
          :return-value.sync="props.row.psd_TAG"
          lazy
          persistent
        >
          <div>{{ props.row.psd_TAG }}</div>
          <div slot="input" class="mt-3 title">Update Field</div>
          <v-text-field
            slot="input"
            v-model="props.row.psd_TAG"
            label="Edit"
            single-line
            autofocus
            @keyup.enter="saveFromDialog({_id:props.row._id, psd_TAG:props.row.psd_TAG})"
          ></v-text-field>
        </v-edit-dialog> 
    </template> 

    </el-table-column>

     <el-table-column
      prop="fieldTAG"
      :label="$t('adminTables.fieldTAG')"
      width="90"
      header-align="center"
      align="center"
    >
    </el-table-column>
     <el-table-column
      prop="flowSheet"
      :label="$t('adminTables.flowSheet')"
      width="150"
      header-align="center"
      align="center"
    >
    </el-table-column>
     <el-table-column
      prop="PSD_Description.title"
      :label="$t('adminTables.psdType')"
      width="300"
      header-align="center"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="department"
      :label="$t('adminTables.department')"
      width="300"
      header-align="center"
      align="center"
      :filters="filterByDepartment"
      :filter-method="filterHandler" 
    >
    </el-table-column>
     <el-table-column
      prop="installationPlace"
      :label="$t('adminTables.installationPlace')"
      width="300"
      header-align="center"
      align="center"
    >
    </el-table-column>
     <el-table-column
      prop="responsiblePerson"
      :label="$t('adminTables.responsiblePerson')"
      width="120"
      header-align="center"
      align="center"
    >
    </el-table-column>
    <el-table-column
      
      :label="$t('adminTables.lastInspectionDate')"
      width="120"
      header-align="center"
      align="center"
    >
     <template slot-scope="props">
                      {{ props.row.lastInspectionDate | dateFilter }}
                    </template> 
    </el-table-column>
    <el-table-column
     
      :label="$t('adminTables.nextInspectionDate')"
      width="120"
      header-align="center"
      align="center"
    >
    <template slot-scope="props">
                      {{ props.row.nextInspectionDate | dateFilter }}
                    </template> 
    </el-table-column>
    <el-table-column
      prop="hazard"
      :label="$t('adminTables.hazard')"
      width="300"
      header-align="center"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="hazardRaiting"
      :label="$t('adminTables.hazardRaiting')"
      width="120"
      header-align="center"
      align="center"
      
    >
    </el-table-column>
    <el-table-column
      prop="protectiveAction"
      :label="$t('adminTables.protectiveAction')"
      width="300"
      header-align="center"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="comments"
      :label="$t('adminTables.comments')"
      width="300"
      header-align="center"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="otherPropertiesAndData"
      :label="$t('adminTables.otherPropertiesAndData')"
      width="300"
      header-align="center"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="safetyIntegretyLevel"
      :label="$t('adminTables.safetyIntegretyLevel')"
      width="300"
      header-align="center"
      align="center"
    >
    </el-table-column>

    <el-table-column
      prop="procedureLink"
      :label="$t('adminTables.linkProcedure')"
      width="300"
      header-align="center"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="material"
      :label="$t('adminTables.material')"
      width="300"
      header-align="center"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="settingSizePSData"
      :label="$t('adminTables.srttingSizePSData')"
      width="300"
      header-align="center"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="PSD_Description.frequencyOfInspection"
      :label="$t('adminTables.inspectionFrequency')"
      width="300"
      header-align="center"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="inOperationShutdown"
      :label="$t('adminTables.equipmentState')"
      width="300"
      header-align="center"
      align="center"
    >
    </el-table-column>
    <el-table-column
      prop="typeInspection"
      :label="$t('adminTables.typeInspection')"
      header-align="center"
      align="center"
      width="120"
    >
    </el-table-column>
    <el-table-column
      prop="methodInspection"
      :label="$t('adminTables.methodInspection')"
      header-align="center"
      align="center"
      width="120"
    >
    </el-table-column>

    <el-table-column
      prop="PSI_Status"
      :label="$t('adminTables.status')"
      header-align="center"
      align="center"
      width="120"
    >
    </el-table-column>
    <el-table-column
      prop="notes"
      :label="$t('adminTables.notes')"
      header-align="center"
      align="center"
      width="120"
    >
    </el-table-column>
    

  </el-table>
    <el-pagination
      background
      @current-change = "changePage"
      layout = "prev, pager, next"
      :page-size = 10
      :total = "quantity"
    >
    </el-pagination>
      </v-flex>
    </v-layout>  
  </v-container>
</template>

<script>
import Api from '@/services/Api'
import { mapGetters } from 'vuex';

export default {
    $_veeValidate: {
      validator: 'new'
    },

  data () {
    return {
      menuNextInspectionDate : false,
      menuLastInspectionDate : false,
      numberSearch           : {},
      fieldTAGSearch         : {},
      flowSheetSearch        : {},
      psdDescriptionSearch   : {},
      departmentSearch       : {},
      installationPlaceSearch: {},
      responsibleSearch      : {},
      statusSearch           : {},
      employeeSearch         : {},
      dialog                 : false,
      edit                   : false,
      durationArr            : [],
      fieldTAG               : [],
      
      filter: {
          psd_TAG          : null,
          PSD_Description  : null,
          flowSheet        : null,
          department       : null,
          installationPlace: null,
          responsiblePerson: null,
          PSI_Status       : null,
          pageNumber       : 1   
        },
      item: {
        departmentName: '',
      },
      defaultItem: {
        psd_TAG               : '',
        fieldTAG              : '',
        flowSheet             : '',
        flowSheetLink         : '',
        PSD_Description       : '',
        installationPlace     : '',
        responsiblePerson     : '',
        lastInspectionDate    : '',
      //  nextInspectionDate    : '',
        hazard                : '',
        hazardRaiting         : '',
        otherPropertiesAndData: '',
        safetyIntegretyLevel  : '',
        procedureLink         : '',
        material              : '',
        protectiveAction      : '',
        department            : '',
        comments              : '',
        settingSizePSData     : '',
        inOperationShutdown   : '',
        typeInspection        : '',
        methodInspection      : '',
        PSI_Status            : 'UNDEFINED',
        skillLevel            : '',
        duration              : '',
        numberPeople          : '',
        notes                 : '', 
        isProtocolUse         : false,
        nameplate             : ''
      },
      item: {
        psd_TAG               : '',
        fieldTAG              : '',
        flowSheet             : '',
        flowSheetLink         : '',
        PSD_Description       : '',
        installationPlace     : '',
        responsiblePerson     : '',
        lastInspectionDate    : '',
       // nextInspectionDate    : '',
        hazard                : '',
        hazardRaiting         : '',
        otherPropertiesAndData: '',
        safetyIntegretyLevel  : '',
        procedureLink         : '',
        material              : '',
        protectiveAction      : '',
        department            : '',
        comments              : '',
        settingSizePSData     : '',
        inOperationShutdown   : '',
        typeInspection        : '',
        methodInspection      : '',
        PSI_Status            : 'UNDEFINED',
        skillLevel            : '',
        duration              : '',
        numberPeople          : '',
        notes                 : '', 
        isProtocolUse         : false,
        nameplate             : ''
      },
         custom: {
          name: {
            required: () => 'Name can not be empty'
            // custom messages
          }
      },
      imageURL:'',
      image: null
    }
  },
  created: function () {
      this.getSafDevNumber();
      this.getSafDevPSDDescriptions();
      this.getFieldTAGs();
      this.getFlowSheets();
      this.getInstallationPlace();
      this.getResponsible();
      this.getFilterDepartments();
      this.getFilterStatuses();

      this.getDevices();
      this.getDepartments();
      this.getHazardRatings();
      this.getInspectionMethods();
      this.getInspectionTypes();
      this.getConditionOfEquipments();
      this.getStatuses();
      this.getDeviceType();
      this.getSkills();
      this.getEmployees();
      for (let i=0; i<305; i+=5) { this.durationArr.push(i); }
    
  },
  computed: {
    ...mapGetters({
      devices              : 'loadDevices',
      types                : 'loadTypes',
      departments          : 'loadDepartments',
      skills               : 'loadSkills',
      ratings              : 'loadRatings',
      inspectionMethods    : 'loadInspectionMethods',
      inspectionTypes      : 'loadInspectionTypes',
      conditionOfEquipments: 'loadConditionOfEquipments',
      employees            : 'loadEmployees',
     
      //данные для фильтров
      statuses             : 'loadStatuses',
      numbers              : 'loadNumbers',
      psdDescriptions      : 'loadPSDDescriptions',
      fieldTAGs            : 'loadFieldTAGs',
      flowSheets           : 'loadFlowSheets',
      installationPlaces   : 'loadInstallationPlaces',
      responsible          : 'loadResponsible',
      statusesFilter       : 'loadFilterStatuses',
      filterDepartments    : 'loadFilterDepartments',
     

      quantity             : 'loadQuantitySafetyDevices'

    }),
    // devices () {
    //   return this.$store.getters.loadDevices
    // },
    // types () {
    //   return this.$store.getters.loadTypes
    // },
    // departments () {
    //   return this.$store.getters.loadDepartments
    // },
    // skills () {
    //   return this.$store.getters.loadSkills
    // },
    // ratings () {
    //   return this.$store.getters.loadRatings
    // },
    //  inspectionMethods () {
    //   return this.$store.getters.loadInspectionMethods
    // },
    // inspectionTypes () {
    //   return this.$store.getters.loadInspectionTypes
    // },
    // conditionOfEquipments () {
    //   return this.$store.getters.loadConditionOfEquipments
    // },
    //  statuses () {
    //   return this.$store.getters.loadStatuses
    // },
    nextInspectionDate() {
      if (this.edit == false) {
        let frequencyOfInspection = 0;
           if (this.item.PSD_Description != '' || this.item.lastInspectionDate != '' ) {
            this.types.forEach( (value) => {
              if (value._id === this.item.PSD_Description ) {
               // console.log(value.title);
                frequencyOfInspection = value.frequencyOfInspection;
              }
            })
            let retDate = new Date (this.item.lastInspectionDate)
            let relDate =  retDate.setMonth(retDate.getMonth() + frequencyOfInspection)
            return relDate
           } else {
             return ''
           }
         } else if (this.edit == true) {
           let frequencyOfInspection = 0;
           this.types.forEach( (value) => {
              if (value._id === this.item.PSD_Description ) {
                frequencyOfInspection = value.frequencyOfInspection;
              }
           })
        if (this.item.PSD_Description != '' && this.item.lastInspectionDate ) {  
           if (this.item.PSD_Description.frequencyOfInspection) {
             let retDate = new Date (this.item.lastInspectionDate)
             let relDate =  retDate.setMonth(retDate.getMonth() + this.item.PSD_Description.frequencyOfInspection)
             return new Date(relDate);
           } else {
             let retDate = new Date (this.item.lastInspectionDate)
             let relDate =  retDate.setMonth(retDate.getMonth() + frequencyOfInspection)
             return relDate
           }
        } else {
          return ''
        }
      }    
    },
    formTitle () {
      if (this.edit == false) {
        return 'Добавление устройства' 
      } else {
        return 'Редактирование устройства'
      }
    },
    filterByDepartment() {
      let arr = [];
      let o = {};
       this.devices.forEach((item)=>{
         o = {text: item.department , value: item.department }
         arr.push(o);
         o = {}
       })
       return _.uniqBy(arr,'text') 
    }
  },
  methods: {
    // newItem () {
    //      this.edit = false
    //      this.item = Object.assign({}, this.defaultItem); 
    //      this.dialog = true
    //  },
    onLinkCheck(event) {
      const files = event.target.files;
      let filename = files[0].name;
      console.log(filename);

      const fileReader = new FileReader();
      fileReader.addEventListener('load', ()=>{
        this.imageURL = fileReader.result
        console.log(this.imageURL)
      })
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    },
    onPickFile() {
      this.$refs.fileInput.click();
    },
    resetFilter () {
      
          this.filter.psd_TAG           = null;
          this.filter.PSD_Description   = null;
          this.filter.flowSheet         = null;
          this.filter.department        = null;
          this.filter.installationPlace = null;
          this.filter.responsiblePerson = null;
          this.filter.PSI_Status        = null;
          this.filter.pageNumber        = 1   ;
          this.getDevices();
    },
    getSafDevPSDDescriptions () {
      this.$store.dispatch('getSafDevPSDDescriptions');
    },
    getSafDevNumber () {
      this.$store.dispatch('getSafDevNumber');
    },
    getFieldTAGs () {
      this.$store.dispatch('getFieldTAGs');
    },
    getFlowSheets () {
      this.$store.dispatch('getFlowSheets');
    },
    getFilterDepartments () {
      this.$store.dispatch('getFilterDepartments');
    },
    getInstallationPlace () {
      this.$store.dispatch('getInstallationPlaces');
    },
    getResponsible () {
      this.$store.dispatch('getResponsible');
    },
    getFilterStatuses () {
      this.$store.dispatch('getFilterStatuses');
    },
    getEmployees () {
      this.$store.dispatch('getEmployees')
    },




      changePage (num) {
        console.log(num);
       this.filter.pageNumber = num;
       this.$store.dispatch('getAdminDevices', this.filter)
      },
       filterHandler(value, row, column) {
      //  console.log(value) 
     //   console.log(row) 
    //    console.log(column['property']) 
        const property = column['property'];
        return row[property] === value;
      },
      saveFromDialog (item) {
      //  console.log('save from dialog');
       // console.log('edit');
      //  console.log(item);
        this.$store.dispatch('changeDevice', {item:item})
      },
      editItem (item) {
      //  console.log(item)
        this.edit = true
        this.item = Object.assign({}, item); 
        this.dialog = true
      },
      deleteItem (index, id) {
         confirm('Are you sure you want to delete this device?') && this.$store.dispatch('deleteDevice', {id:id, index:index})
      },
      close () { 
        this.dialog = false;
        this.item = Object.assign({}, this.defaultItem);
        this.edit = false;
        this.$validator.reset();
      },
      copyItem (item) {
        console.log(item);
        this.edit = false
        this.item = Object.assign({}, item); 
        this.dialog = true
      },
      save () {
        let self = this;
             this.$validator.validateAll()
              .then(result=>{
                if (!result) {
                //  console.log(result);
                  return
                 // alert('Error!!!');
              } else {
                if (this.edit) {
                    this.item.nextInspectionDate = this.nextInspectionDate;
                    this.$store.dispatch('changeDevice', {item:this.item})
                    this.edit = false
                    this.item = Object.assign({}, this.defaultItem);
                } else {
                    this.edit = false
                    let safetyDevice = {
                             psd_TAG               : this.item.psd_TAG,
                             fieldTAG              : this.item.fieldTAG,
                             flowSheet             : this.item.flowSheet,
                             flowSheetLink         : this.item.flowSheetLink,
                             PSD_Description       : this.item.PSD_Description,
                             installationPlace     : this.item.installationPlace,
                             responsiblePerson     : this.item.responsiblePerson,
                             lastInspectionDate    : this.item.lastInspectionDate,
                             nextInspectionDate    : this.nextInspectionDate,
                             hazard                : this.item.hazard,
                             hazardRaiting         : this.item.hazardRaiting,
                             otherPropertiesAndData: this.item.otherPropertiesAndData,
                             safetyIntegretyLevel  : this.item.safetyIntegretyLevel,
                             procedureLink         : this.item.procedureLink,
                             material              : this.item.material, 
                             protectiveAction      : this.item.protectiveAction,
                             department            : this.item.department,
                             comments              : this.item.comments,
                             settingSizePSData     : this.item.settingSizePSData,
                             inOperationShutdown   : this.item.inOperationShutdown,
                             typeInspection        : this.item.typeInspection,
                             methodInspection      : this.item.methodInspection,
                             PSI_Status            : this.item.PSI_Status,
                             skillLevel            : this.item.skillLevel ,
                             duration              : this.item.duration,
                             numberPeople          : this.item.numberPeople,
                             notes                 : this.item.notes,
                             isProtocolUse         : this.item.isProtocolUse,
                             nameplate             : this.item.nameplate  
                            }
                    this.$store.dispatch('addSafetyDevice', safetyDevice)
                    this.item = Object.assign({}, this.defaultItem);
                }
                this.dialog = false
                this.$nextTick(() => this.$validator.reset())
              }
            }).catch((err)=>{
              console.log(err);
            })
          }, 

    getDevices () {
      this.$store.dispatch('getAdminDevices', this.filter)
      this.$store.dispatch('getSafDevNumber', this.filter);
      this.$store.dispatch('getFieldTAGs', this.filter);
      this.$store.dispatch('getFlowSheets', this.filter);
      this.$store.dispatch('getInstallationPlaces', this.filter);
      this.$store.dispatch('getResponsible', this.filter);
      this.$store.dispatch('getFilterStatuses', this.filter);
      this.$store.dispatch('getFilterDepartments', this.filter);
      this.$store.dispatch('getSafDevPSDDescriptions', this.filter);
    },
    getDepartments () {
      this.$store.dispatch('getDepartments')
    },
    getHazardRatings () {
      this.$store.dispatch('getRatings')
    },
     getInspectionMethods () {
      this.$store.dispatch('getInspectionMethods')
    },
    getInspectionTypes () {
      this.$store.dispatch('getInspectionTypes')
    },
    getConditionOfEquipments () {
      this.$store.dispatch('getConditionOfEquipments')
    },
     getStatuses () {
      this.$store.dispatch('getStatuses')
    },
    getDeviceType () {
      this.$store.dispatch('getTypes')
    },
    getSkills () {
      this.$store.dispatch('getSkills')
    }
  
    // deleteDepartment (id, index) {
    //   this.$store.dispatch('deleteDepartment', {id:id, index:index})
    // }
  }
}
</script>
<style scoped>

  /* /deep/ input {
    margin: 0px;
  } */

 

  li {
    list-style: none;
  }
  .freqText {
    font-size:20px  !important;
  }
 /deep/ .v-label {
   font-size:10px !important;
  }

  /deep/ .el-date-editor {
    display: block;
  }

  /deep/ .v-select__selections {
    font-size:10px;
    font-weight: bold;
    text-overflow: clip !important;
    
  }
  /deep/ .v-label {
    font-size: 11px !important;
  }
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
   /* /deep/ input {
    font-size:10px;
    font-weight: bold;
  } */
   /* /deep/ textarea {
    font-size:10px;
    font-weight: bold;
  }  */
/* /deep/  span  {
       
    overflow: hidden;
    text-overflow: clip !important;
    height: 18px;
  } */

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
  /deep/ .el-input__inner {
    border-width: 2px;
    border-color: #929292;
  }

  .dialog-font-size {
    font-size:14px ;
    margin:0px;
  }
  
  /deep/ input  {
    margin:inherit;
  }

  /deep/ textarea  {
    margin:0px !important;
  }
  /* /deep/ .v-input__control {
    height: 75px;
  } */

</style>
