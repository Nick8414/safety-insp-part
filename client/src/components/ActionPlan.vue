<template>
 <v-container fluid>  
    <v-dialog v-model="dialog" persistent max-width="600px">
      <!-- <v-btn color="primary" dark slot="activator" class="mb-2">новое действие</v-btn> -->
      <v-card>
        <v-card-title>
          <span class="headline">{{ formTitle }}</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm12 md12>
                <v-text-field
                  v-model="item.createdDate"
                  :label="$t('actionPlan.inspectionDate')"
                  readonly
                >
                </v-text-field>
                <v-text-field 
                  :label="$t('actionPlan.psd_TAG')"
                  readonly
                  v-model="item.psd_TAG"
                >
                </v-text-field>
                <v-text-field 
                  :label="$t('actionPlan.fieldTAG')" 
                  readonly
                  v-model="item.fieldTAG"
                >
                </v-text-field>
                <v-text-field 
                  :label="$t('actionPlan.installationPlace')" 
                  :readonly = "editAccessAdminOnly"
                  v-model="item.installationPlace"
                >
                </v-text-field>
                <v-text-field 
                  :label="$t('actionPlan.department')"  
                  :readonly = "editAccessAdminOnly"
                  v-model="item.department"
                >
                </v-text-field>
                <v-select
                  :label="$t('actionPlan.prodArea')"   
                  v-model="item.productionArea"
                  :items="productionAreas"
                  item-value="areaName"
                  item-text="areaName"
                  :readonly = "editAccessAdminInspector"
                >
                </v-select>
                <v-text-field 
                  :label="$t('actionPlan.psdType')"  
                  v-model="item.PSD_Type"
                  readonly
                >
                </v-text-field>
                <v-textarea 
                  :label="$t('actionPlan.description')"
                  :error-messages="errors.collect('description')"
                  v-validate="'required'"
                  data-vv-name="description"
                  required
                  rows=3
                  v-model="item.description"
                  :readonly="editAccessAdminInspector"
                >
                </v-textarea>
                <v-text-field 
                  :label="$t('actionPlan.responsiblePerson')" 
                  :error-messages="errors.collect('responsiblePerson')"
                  v-validate="'required'"
                  data-vv-name="responsiblePerson"
                  required
                  v-model="item.responsiblePerson"
                  :readonly="editAccessAdminOnly"
                >
                </v-text-field>
                <v-autocomplete 
                  :label="$t('actionPlan.assigned')" 
                  :error-messages="errors.collect('assignedTo')"
                  v-validate="'required'"
                  data-vv-name="assignedTo"
                  required
                  v-model="item.assignedTo"
                  :items="employees"
                  item-value="fullName"
                  item-text="fullName"
                   :readonly="editAccessAdminInspector"
                >
                </v-autocomplete>
                <v-select 
                  :label="$t('actionPlan.priority')"
                  :error-messages="errors.collect('priority')"
                  v-validate="'required'"
                  data-vv-name="priority"
                  required
                  v-model="item.priority"
                  :items="[{title:'НИЗКИЙ (LOW)', value:'НИЗКИЙ (LOW)'}, {title:'СРЕДНИЙ (MEDIUM)', value:'СРЕДНИЙ (MEDIUM)'}, {title:'ВЫСОКИЙ (HIGH)', value:'ВЫСОКИЙ (HIGH)'}]"
                  item-value="title"
                  item-text="title"
                  :readonly="editAccessAdminInspector"
                >
                </v-select>
                <v-text-field 
                  :label="$t('actionPlan.completion')" 
                  :error-messages="errors.collect('complete')"
                  v-validate="'required'"
                  data-vv-name="complete"
                  required
                  v-model="item.complete"
                  :readonly="editAccessAdminInspector"
                >
                </v-text-field>
                <v-menu
                  ref="startDateDialog"
                  :close-on-content-click="false"
                  v-model="startDateDialog"
                  :nudge-right="40"
                  :return-value.sync="item.startDate"
                  lazy
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                <v-text-field
                  slot="activator"
                  v-model="item.startDate"
                  :label="$t('actionPlan.startDate')"
                  prepend-icon="event"
                  readonly
                ></v-text-field>
                  <v-date-picker
                   :readonly="editAccessAdminInspector"
                   v-model="item.startDate" 
                   @input="$refs.startDateDialog.save(item.startDate)"
                  ></v-date-picker>
                </v-menu>
                <v-menu
                    ref="planingEndDateDialog"
                    :close-on-content-click="false"
                    v-model="planingEndDateDialog"
                    :nudge-right="40"
                    :return-value.sync="item.planingEndDate"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                  <v-text-field
                    slot="activator"
                    v-model="item.planingEndDate"
                    :label="$t('actionPlan.plannedDate')"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                    <v-date-picker 
                      :readonly="editAccessAdminInspector" 
                      v-model="item.planingEndDate" 
                      @input="$refs.planingEndDateDialog.save(item.planingEndDate)"
                    ></v-date-picker>
                </v-menu>
                <v-menu
                    ref="endDateDialog"
                    :close-on-content-click="false"
                    v-model="endDateDialog"
                    :nudge-right="40"
                    :return-value.sync="item.endDate"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                  <v-text-field
                    slot="activator"
                    v-model="item.endDate"
                    :label="$t('actionPlan.completedDate')"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker 
                    :readonly="editAccessAdminInspector" 
                    v-model="item.endDate" 
                    @input="$refs.endDateDialog.save(item.endDate)"
                  ></v-date-picker>
                </v-menu>
                <v-select 
                  :label="$t('actionPlan.status')"
                  :error-messages="errors.collect('status')"
                  v-validate="'required'"
                  data-vv-name="status"
                  required
                  v-model="item.status"
                  :items="[
                           {title:'УСТРАНЕНО', value:'УСТРАНЕНО'},
                           {title:'В ПРОЦЕССЕ УСТРАНЕНИЯ', value:'В ПРОЦЕССЕ УСТРАНЕНИЯ'}, 
                           {title:'ЗАКАЗ ОБОРУДОВАНИЯ', value:'ЗАКАЗ ОБОРУДОВАНИЯ'}, 
                           {title:'ДЕЙСТВИЕ НАЗНАЧЕНО', value:'ДЕЙСТВИЕ НАЗНАЧЕНО'}
                          ]"
                  item-value="title"
                  item-text="title"
                  :readonly="editAccessAdminInspector"
                >
                </v-select>
                <v-textarea
                  :label="$t('actionPlan.notes')"
                  v-model="item.notes"
                  rows=2
                  :readonly="editAccessAdminInspector"
                >
                </v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <!-- <v-btn color="blue darken-1" @click.native="sendToDDS">Send to DDS</v-btn> -->
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click.native="close">Close</v-btn>
          <v-btn color="blue darken-1" flat @click.native="save">Save</v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
  <v-layout>
    <v-flex>
      <el-table
        :data="actions"
        :row-class-name = "tableRowClassName"
        height="750"
        cell-class-name="standart-cell"
        border
        style="width: 100%">
     <el-table-column
      :label="$t('actionPlan.operations')"
      header-align="center"
      align="center"
      width="65"
    >
      <template slot-scope="props">
        <v-btn icon small class="mx-0" @click="editItem(props.row)">
            <v-icon color="teal">edit</v-icon>
        </v-btn>
        <v-btn v-if = "user.isAdmin" icon small class="mx-0" @click="deleteItem(props.row._id, props.$index)">
            <v-icon color="pink">delete</v-icon>
        </v-btn>
      </template>
    </el-table-column>    
    <el-table-column
      prop="createdDate"
      :label="$t('actionPlan.inspectionDate')"
      header-align="center"
      align="center"
      width="230"
      :render-header="filterByDate"
    >
     <template slot-scope="props">
       {{ props.row.createdDate | dateFilter }}
      </template>

    </el-table-column>
    <el-table-column
      prop="psd_TAG"
      :label="$t('actionPlan.psd_TAG')"
      header-align="center"
      align="center"
      width="250"
      :render-header="filterByNum"
    >
    </el-table-column>
    <el-table-column
      prop="fieldTAG"
      :label="$t('actionPlan.fieldTAG')"
      header-align="center"
      align="center"
      width="110"
    >
    </el-table-column>
    <el-table-column
      prop="PSD_Type"
      :label="$t('actionPlan.psdType')"
      header-align="center"
      align="center"
      width="220"
      :render-header="filterByType"
    >
    </el-table-column>
    <el-table-column
      prop="department"
      :label="$t('actionPlan.department')"
      header-align="center"
      align="center"
      width="110"
      :render-header="filterByDepartment"
    >
    </el-table-column>
    <el-table-column
      prop="productionArea"
      :label="$t('actionPlan.prodArea')"
      header-align="center"
      align="center"
      width="110"
    >
    </el-table-column>
    <el-table-column
      prop="installationPlace"
      :label="$t('actionPlan.installationPlace')"
      header-align="center"
      align="center"
      width="110"
    >
    </el-table-column>
    <el-table-column
      prop="description"
      :label="$t('actionPlan.description')"
      header-align="center"
      align="left"
      width="250"
    >
    </el-table-column>
    <el-table-column
      prop="responsiblePerson"
      :label="$t('actionPlan.responsiblePerson')"
      header-align="center"
      align="center"
      width="110"
    >
    </el-table-column>
    <el-table-column
      prop="assignedTo"
      :label="$t('actionPlan.assigned')"
      header-align="center"
      align="center"
      width="110"
    >
    </el-table-column>
    <el-table-column
      prop="priority"
      :label="$t('actionPlan.priority')"
      header-align="center"
      align="center"
      width="120"
     
    >
    </el-table-column>
    <el-table-column
      prop="complete"
      :label="$t('actionPlan.completion')"
      header-align="center"
      align="center"
      width="110"
    >
    </el-table-column>
    <el-table-column
      prop="startDate"
      :label="$t('actionPlan.startDate')"
      header-align="center"
      align="center"
      width="110"
    >
    </el-table-column>
    <el-table-column
      prop="endDate"
      :label="$t('actionPlan.completedDate')"
      header-align="center"
      align="center"
      width="110"
    >
    </el-table-column>
    <el-table-column
      prop="planingEndDate"
      :label="$t('actionPlan.plannedDate')"
      header-align="center"
      align="center"
      width="110"
    >
    </el-table-column>
    <el-table-column
      prop="status"
      :label="$t('actionPlan.status')"
      header-align="center"
      align="center"
      width="110"
    
    >
    </el-table-column>
    <el-table-column
      prop="notes"
      :label="$t('actionPlan.notes')"
      header-align="center"
      align="center"
      width="250"
    >
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
 </v-container>   
</template>

<script>
import axios from 'axios'
import qs from 'qs';
function planingDate(date) {
  let planDate = new Date(date);
  let N = 1;
  planDate.setMonth(planDate.getMonth() + N);
  planDate = planDate.toLocaleString(['ru-RU'], {year: 'numeric', month: 'numeric', day: 'numeric' })
  const [day, month, year] = planDate.split('.')
  return `${year}-${month}-${day}`
}
function formatDate(date) {
  let planDate = new Date(date);
  planDate = planDate.toLocaleString(['ru-RU'], {year: 'numeric', month: 'numeric', day: 'numeric' })
  const [day, month, year] = planDate.split('.')
  return `${year}-${month}-${day}`
}
function dueDate(date) {
  let dueDate = new Date(date);
  let N = 14;
  dueDate.setDate(dueDate.getDate() + N);
  dueDate = dueDate.toLocaleString(['ru-RU'], {year: 'numeric', month: 'numeric', day: 'numeric' })
  const [day, month, year] = dueDate.split('.')
  return `${year}-${month}-${day}`
}


  export default {
     $_veeValidate: {
      validator: 'new'
    }, 
    props:['dataForAction'], 
    data() {
      return {

        item: {
              createdDate      : '',
              psd_TAG          : '',
              fieldTAG         : '',
              PSD_Type         : '',
              department       : '',
              productionArea   : '',
              installationPlace: '',
              description      : '',
              responsiblePerson: '',
              assignedTo       : '',
              priority         : '',
              complete         : '',
              startDate        : '',
              endDate          : '',
              planingEndDate   : '',
              status           : '',
              notes            : ''

        },
        defaultItem: {
              createdDate      : '',
              psd_TAG          : '',
              fieldTAG         : '',
              PSD_Type         : '',
              department       : '',
              productionArea   : '',
              installationPlace: '',
              description      : '',
              responsiblePerson: '',
              assignedTo       : '',
              priority         : '',
              complete         : '',
              startDate        : '',
              endDate          : '',
              planingEndDate   : '',
              status           : '',
              notes            : ''
        },
        filter: {
          psd_TAG:[],
          PSD_Type:[],
          department:[],
          createdDate:'',
          pageNumber:1
        },
        currentPage1 : 1,
        dialog              : false,
        edit                : false,
        startDateDialog     : false,
        planingEndDateDialog: false,
        endDateDialog       : false,
        createdDateDialog   : false,
        productionAreas    :[]
      }
    },
    computed: {
      psdDescriptions () {
        return this.$store.getters.loadPSDDescriptionsFilter
      },
      numbers () {
        return this.$store.getters.loadNumbers
      },            
      actions() {
        return this.$store.getters.loadActions
      },
      quantity () {
        return this.$store.getters.loadQuantityActions
      },
      departmentsFilter() {
        return this.$store.getters.loadDepartmentsFilter
      },
      departments() {
        return this.$store.getters.loadDepartments
      },
      editAccessAdminOnly() {
         if ( this.$store.getters.user.isAdmin == true ) {
          return false
        } else {
          return true
        }
      },
       editAccessAdminInspector() {
         if ( this.$store.getters.user.isInspector == true || this.$store.getters.user.isAdmin == true ) {
          return false
        } else {
          return true
        }
      },
      user () {
        return this.$store.getters.user
      },
      

      employees() {
        return this.$store.getters.loadEmployees
      },
        formTitle () {
          if (this.edit == false) {
            return 'Добавление действия' 
          } else {
            return 'Редактирование действия'
          }
        }
    },
    mounted() {
       this.getSafDevNumber();
       this.getSafDevPSDDescriptions();



      this.getDepartments();
      this.getActions()
      if (this.dataForAction) {
        this.newAction();
        this.productionAreas = this.dataForAction.prodAreas;
      }
     // this.getProductionAreas(); not getting prod areas!!!
      this.getEmployees();
   //   console.log('USER', this.$store.getters.user);
   //   console.log(this.dataForAction);
      
    },
    methods: {
      
       filterByDepartment (createElement, {column, store}) { 
        console.log('function');
        console.log(column);
        console.log(store);
        var self = this; 
        let element = createElement('span', { class: 'el-table-header-resource' }, [
                    createElement('div', {class: 'header-label'}, column.label),
                    createElement('el-select', {
                        props: { placeholder: column.label, multiple:true, value: this.filter[column.property], collapseTags:true,  style: 'font-weight: debouncedebnormal; text-align: left; padding: 0; margin-left: 20px;'},
                        on: {
                            input: (value) => {
                              console.log(value);
                                this.filter[column.property] = value;
                                this.$store.dispatch('getActions', this.filter);
                            }
                        }
                    }, this.departmentsFilter.map((item) => {
                        return createElement('el-option', {props: { key: item, value: item, label: item}});
                    }))
                ]);

                element.fnScopeId = this.$options._scopeId;
                element.fnContext = this;

                return element;
      },
    
      filterByType (createElement, {column, store}) { 
        console.log('function');
        console.log(column);
        console.log(store);
        var self = this; 
        let element = createElement('span', { class: 'el-table-header-resource' }, [
                    createElement('div', {class: 'header-label'}, column.label),
                    createElement('el-select', {
                        props: { placeholder: column.label, multiple:true, value: this.filter[column.property], collapseTags:true,  style: 'font-weight: debouncedebnormal; text-align: left; padding: 0; margin-left: 20px;'},
                        on: {
                            input: (value) => {
                              console.log(value);
                                this.filter[column.property] = value;
                                this.$store.dispatch('getActions', this.filter);
                            }
                        }
                    }, this.psdDescriptions.map((item) => {
                        return createElement('el-option', {props: { key: item, value: item, label: item}});
                    }))
                ]);

                element.fnScopeId = this.$options._scopeId;
                element.fnContext = this;

                return element;
      },
       filterByDate (createElement, {column, store}) { 
        console.log('function');
        console.log(column);
        console.log(store);
        var self = this; 
        let element = createElement('span', { class: 'el-table-header-resource' }, [
                    createElement('div', {class: 'header-label'}, column.label),
                    createElement('el-date-picker', {
                        props: { placeholder: column.label, multiple:true, value: this.filter[column.property], type:"daterange", format:'dd-MM-yyyy'},
                        on: {
                            input: (value) => {
                              console.log(value);
                                this.filter[column.property] = value;
                                this.$store.dispatch('getActions', this.filter);
                            }
                        }
                    })
                ]);

                element.fnScopeId = this.$options._scopeId;
                element.fnContext = this;

                return element;
      },
      filterByNum (createElement, {column, store}) { 
        console.log('function');
        console.log(column);
        console.log(store);
        var self = this; 
        let element = createElement('span', { class: 'el-table-header-resource' }, [
                    createElement('div', {class: 'header-label'}, column.label),
                    createElement('el-select', {
                        props: { placeholder: column.label, multiple:true, value: this.filter[column.property], size: 'mini', collapseTags:true, filterable:true,  style: 'font-weight: debouncedebnormal; text-align: left; padding: 0; margin-left: 20px;'},
                        on: {
                            input: (value) => {
                              console.log(value);
                                this.filter[column.property] = value;
                                this.$store.dispatch('getActions', this.filter);
                            }
                        }
                    }, this.numbers.map((item) => {
                        return createElement('el-option', {props: { key: item, value: item, label: item}});
                    }))
                ]);

                element.fnScopeId = this.$options._scopeId;
                element.fnContext = this;

                return element;
      },

    getSafDevNumber () {
      this.$store.dispatch('getSafDevNumber');
    },
    getSafDevPSDDescriptions() {
      this.$store.dispatch('getSafDevPSDDescriptions');
    },

       filterHandler(value, row, column) {
         let name = column['property'];
         const property = column['property'];
        if ( row[property] === value) {
          this.filter.psd_TAG.push({name:value});
        }
        this.filter.psd_TAG =  _.uniqBy(this.filter.psd_TAG, 'name')
      },
      changePage (num) {
       console.log(num);
       this.filter.pageNumber = num;
       this.$store.dispatch('getActions', this.filter)  
      },
      getProductionAreas (department) {
          const prodAreas = this.departments.filter( value => {
          return department == value.departmentName 
         }) 

         return prodAreas[0].productionAreas.forEach( value => { this.productionAreas.push( value ) } );
      },
      getDepartments () {
          this.$store.dispatch('getDepartments')
      },
      getEmployees () {
        this.$store.dispatch('getEmployees')
      },

      respPersonDDS(name) {
        console.log('name from function', name)
        let found = this.employees.find( ( employee ) => {
          return name == employee.login
        })
        console.log('found=> ', found);
        return found.fullName;
      },


      getDDSDepartment (depart) {
        let eSystemDepartmentName = ''
        this.departments.forEach( value => {
          if ( depart === value.departmentName ) {
            eSystemDepartmentName = value.eSystemDepartmentName
          } 
        })
        return eSystemDepartmentName
      },
      getActions () {
        this.$store.dispatch('getActions', this.filter)
      },
      newAction() {
        if (this.dataForAction == undefined) {
            this.dialog = false;
        } else {
              this.item.createdDate       = formatDate(this.dataForAction.createdDate);
              this.item.psd_TAG           = this.dataForAction.psd_TAG;
              this.item.fieldTAG          = this.dataForAction.fieldTAG;
              this.item.PSD_Type          = this.dataForAction.PSD_Type;
              this.item.department        = this.dataForAction.department;
              this.item.installationPlace = this.dataForAction.installationPlace;
              this.item.description       = this.dataForAction.description;
              this.item.responsiblePerson = this.dataForAction.responsiblePerson;

              this.item.assignedTo        = this.respPersonDDS(this.dataForAction.responsiblePerson);

              this.item.planingEndDate    = planingDate(this.dataForAction.createdDate) ;
          
              this.dialog = true;   
        }
      },
      save () {
        let self = this;
             this.$validator.validateAll()
              .then(result=>{
                if (!result) {
             
                  return
                 // alert('Error!!!');
              } else {
                if (this.edit) {
                    this.$store.dispatch('changeAction', this.item)
                    this.edit = false
                    this.item = Object.assign({}, this.defaultItem);
                } else {
                    this.edit = false
                    this.item.createdBy = this.$store.getters.user.userName;
                    this.$store.dispatch('addAction', this.item)
                   
                    this.sendToDDS()
                    this.item = Object.assign({}, this.defaultItem);
                }
                this.dialog = false
                this.$nextTick(() => this.$validator.reset())
              }
            })
            .catch((err)=>{
                console.log(err);
            })
      },
      editItem(item) {
        console.log(item);
        this.getProductionAreas(item.department);

        this.edit = true
        this.item = Object.assign({}, item); 
        this.dialog = true
      },
      close () { 
        this.dialog = false;
        this.item = Object.assign({}, this.defaultItem);
        this.edit = false;
        this.$validator.reset();
      },
      deleteItem(id, index) {
        confirm('Are you sure you want to delete this action?') && this.$store.dispatch('deleteAction', {id:id, index:index})
      },
      tableRowClassName({row, rowIndex}) {
   
        let today = new Date();
        let planingDate = new Date(row.planingEndDate);

        if ( ( today > planingDate && row.status !== 'УСТРАНЕНО' && row.priority == 'ВЫСОКИЙ (HIGH)' )  ) {
          return "overdueHigh"
        } 
        if ( ( today > planingDate && row.status !== 'УСТРАНЕНО' && row.priority == 'СРЕДНИЙ (MEDIUM)' )  ) {
          return "overdueMedium"
        }
        if ( ( today > planingDate && row.status !== 'УСТРАНЕНО' && row.priority == 'НИЗКИЙ (LOW)' )  ) {
          return "overdueLow"
        }

        if ( ( today < planingDate && row.status !== 'УСТРАНЕНО' && row.priority == 'ВЫСОКИЙ (HIGH)' )  ) {
          return "notCompleteHigh"
        } 
        if ( ( today < planingDate && row.status !== 'УСТРАНЕНО' && row.priority == 'СРЕДНИЙ (MEDIUM)' )  ) {
          return "notCompleteMedium"
        }
        if ( ( today < planingDate && row.status !== 'УСТРАНЕНО' && row.priority == 'НИЗКИЙ (LOW)' )  ) {
          return "notCompleteLow"
        }
        
        if ( row.status === 'УСТРАНЕНО' ) {
          return "completed"
        }
      },
      sendToDDS () {
        const data = qs.stringify({ 
          'form[dept]'        : this.getDDSDepartment(this.item.department), // взять соотношения по отделам
          'form[autor]'       : this.$store.getters.user.ddsID, //id берется из таблицы с Эмплоями
          'form[category]'    : 'Process Safety',
          'form[system]'      : 'HS&E',
          'form[pillar]'      : 'HS&E',
          'form[type_action]' : 'C',
          'form[planned_date]': this.item.planingEndDate,
          'form[due_date]'    : dueDate(this.item.planingEndDate),
          'form[item]'        : this.item.psd_TAG,
          'form[parea]'       : this.item.productionArea,
          'form[description]' : '',
          'form[action]'      : this.item.priority + ' \n Устранить дефект(ы) перечисленные в описании и связанные с уст-вом без-ти или его защитными функциями!',
          'form[responsible]' : this.item.assignedTo
        });

        axios({
          method: 'post',
          url: 'http://localhost/dds/adds',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          data
        })
        .then (response => {
       
        })
        .catch(error=>{
          console.log('error')
          console.log(error)
           this.$store.dispatch('setError', 'Произошла ошибка при отправки данных в eDDS.')
        })

      }
  }
  
  }
</script>
<style scoped>

/deep/ label {
  font-size:10px;
}
/deep/ input { 
  font-size: 12px;
}
/deep/ textarea {
  font-size: 12px;
  line-break: auto;
}

/deep/ span {
   text-align: left;
  
    text-overflow: ellipsis;
}

/deep/ div .el-date-editor {
  width: 200px !important;
}

/deep/ .el-table tr:hover > td {
  background-color: inherit !important;
}
 
/deep/ .el-table .completed {
      background-color: rgb(107, 223, 92);
    }   
/deep/    .el-table .overdueHigh {
      background-color:rgb(224, 32, 32)
    }
/deep/    .el-table .overdueMedium {
      background-color:rgb(236, 89, 78)
    }
/deep/    .el-table .overdueLow {
      background-color:rgb(241, 138, 138)
    }
/deep/    .el-table .notCompleteHigh {
      background-color: rgb(255, 136, 0)
    }
/deep/    .el-table .notCompleteMedium {
      background-color: rgb(255, 196, 0)
    }
/deep/    .el-table .notCompleteLow {
      background-color: rgb(246, 246, 111)
    }
   
</style>
