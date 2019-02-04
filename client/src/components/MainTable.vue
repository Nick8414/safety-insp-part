<template>
    <v-container fluid>
    
     <v-layout>
      <v-flex>
        <span class = "total"> TOTAL: {{ devices.filter( value =>  value.PSI_Status != 'EQUIPMENT IS NOT USED'  ).length }} </span>
      </v-flex>
      <v-flex>
        <span class = "ok">  OK: {{ devices.filter( value =>  value.PSI_Status == 'OK'  ).length}} </span>
      </v-flex>
      <v-flex>
         <span class = "nok"> NOK: {{ devices.filter( value =>  value.PSI_Status == 'NOK' ).length}} </span>
      </v-flex>
      <v-flex>
          <span class = "not-in-time"> NOT IN TIME: {{  devices.filter( (value) => { 
            if ( value.PSI_Status != 'EQUIPMENT IS NOT USED' && value.nextInspectionDate != null ) {
                let d1 = new Date(value.nextInspectionDate);
                let d2 = new Date();
                return d1 < d2
              }
          }).length }}
         </span>
      </v-flex>
      <v-flex>
        <span class = "thisMonthInspect"> IN THIS MONTH: {{ devices.filter( value =>  {
          let today = new Date();
          let nextDate = new Date(value.nextInspectionDate);
            if (  today.getMonth() == nextDate.getMonth() &&  today.getFullYear() == nextDate.getFullYear() ) {
              return true;
            } else {
              return false;
            }
          }).length }} </span>
      </v-flex>
      
     </v-layout>
              <el-table
                :data="devices"
                @cell-click="openBlank"
                :cell-class-name = "tableCellClassName"
                :row-class-name = "tableRowClassName"
                height="800"
                border
                style="width: 100%">
                <el-table-column
                  type="index"
                  header-align="center"
                  align="center"
                  width="35">
                </el-table-column>
                <el-table-column 
                  :label="$t(headersTable[0].label)"
                  :prop="headersTable[0].value"
                  v-if="headersTable[0].status"
                  :filters="filterByTag"
                  :filter-method="filterHandler"
                  header-align="center"
                  align="center"
                  width="110">
                    <!-- <template slot-scope="props">
                      {{ props.row.psd_TAG }}
                    </template>       -->
                </el-table-column>
                <el-table-column 
                  :label="$t(headersTable[1].label)"
                  :prop="headersTable[1].value"
                  v-if="headersTable[1].status"
                  width="80"
                  header-align="center"
                  align="center"
                  :filters="filterByFieldTag"
                  :filter-method="filterHandler"
                  >
                    <!-- <template slot-scope="props">
                      {{ props.row.fieldTAG }}
                    </template>       -->
                </el-table-column>
                <el-table-column 
                  header-align="center"
                  align="center"
                  :label="$t(headersTable[2].label)"
                  width="150"
                  :prop="headersTable[2].value"
                  v-if="headersTable[2].status"
                >
                    <!-- <template slot-scope="props">
                      {{ props.row.flowSheet }}
                    </template>       -->
                </el-table-column>
                <el-table-column 
                  :label="$t(headersTable[3].label)"
                  width="150"
                  header-align="center"
                  align="center"
                  :prop="headersTable[3].value"
                  v-if="headersTable[3].status"
                  :filters="filterByPsdType"
                  :filter-method="filterHandler2"
                >
                    <!-- <template slot-scope="props">
                      {{ props.row.PSD_Description.title }}
                    </template>       -->
                </el-table-column>
                <el-table-column 
                  :label="$t(headersTable[4].label)"
                  width="80"
                  header-align="center"
                  align="center"
                  :prop="headersTable[4].value"
                  v-if="headersTable[4].status"
                  :filters="filterByDepartment"
                  :filter-method="filterHandler"
                  >
                </el-table-column>
                <el-table-column 
                  :label="$t(headersTable[5].label)"
                  width="150"
                  header-align="center"
                  align="center"
                  :prop="headersTable[5].value"
                  v-if="headersTable[5].status"
                  :filters="filterByInstallationPlace"
                  :filter-method="filterHandler"
                  >
                    <!-- <template slot-scope="props">
                      {{ props.row.installationPlace }}
                    </template>       -->
                </el-table-column>
                <el-table-column 
                  :label="$t(headersTable[6].label)"
                  width="80"
                  header-align="center"
                  align="center"
                  :prop="headersTable[6].value"
                  v-if="headersTable[6].status"
                  :filters="filterByResponsiblePerson"
                  :filter-method="filterHandler"
                >
                    <!-- <template slot-scope="props">
                      {{ props.row.responsiblePerson }}
                    </template>       -->
                </el-table-column>

                <el-table-column 
                  :label="$t(headersTable[7].label)"
                  width="205"
                  header-align="center"
                  align="center"
                  
                  v-if="headersTable[7].status"
                  :render-header="filterByLastDate"
               
                  >
                    <template slot-scope="props">
                      {{ props.row[headersTable[7].value] | dateFilter }}
                    </template>      
                </el-table-column>

                <el-table-column 
                  :label="$t(headersTable[8].label)"
                  width="205"
                  header-align="center"
                  align="center"
                  
                  v-if="headersTable[8].status"
                 :render-header="filterByNextDate"
                >
                    <template slot-scope="props">
                      {{ props.row[headersTable[8].value] | dateFilter }}
                    </template>      
                </el-table-column>

                <el-table-column 
                  :label="$t(headersTable[9].label)"
                  header-align="center"
                  :prop="headersTable[9].value"
                  v-if="headersTable[9].status"
                  align="center"
                  width="205"
                >
                    <!-- <template slot-scope="props">
                      {{ props.row.hazard }}
                    </template>       -->
                </el-table-column>

                <el-table-column 
                  :label="$t(headersTable[10].label)"
                  header-align="center"
                  align="center"
                  width="80"
                  :prop="headersTable[10].value"
                  v-if="headersTable[10].status"
                >
                    
                </el-table-column>

                <el-table-column 
                  :label="$t(headersTable[11].label)"
                  header-align="center"
                  align="center"
                  width="300"
                  :prop="headersTable[11].value"
                  v-if="headersTable[11].status"
                >
                         
                </el-table-column>

                <el-table-column 
                  :label="$t(headersTable[12].label)"
                  header-align="center"
                  align="center"
                  width="200"
                  :prop="headersTable[12].value"
                  v-if="headersTable[12].status"
                >
                       
                </el-table-column>

                <el-table-column 
                  :label="$t(headersTable[13].label)"
                  header-align="center"
                  align="center"
                  width="100"
                  :prop="headersTable[13].value"
                  v-if="headersTable[13].status"
                >      
                </el-table-column>

                <el-table-column 
                  :label="$t(headersTable[14].label)"
                  header-align="center"
                  align="center"
                  width="100"
                  :prop="headersTable[14].value"
                  v-if="headersTable[14].status"
                >      
                </el-table-column>


                <el-table-column 
                  :label="$t(headersTable[15].label)"
                  header-align="center"
                  align="center"
                  width="300"
                  :prop="headersTable[15].value"
                  v-if="headersTable[15].status"
                >     
                </el-table-column>

                <el-table-column 
                  :label="$t(headersTable[16].label)"
                  header-align="center"
                  align="center"
                  width="100"
                  :prop="headersTable[16].value"
                  v-if="headersTable[16].status"
                >    
                </el-table-column>


                <el-table-column 
                  :label="$t(headersTable[17].label)"
                  header-align="center"
                  align="center"
                  width="150"
                  :prop="headersTable[17].value"
                  v-if="headersTable[17].status"
                >    
                </el-table-column>

                <el-table-column 
                  :label="$t(headersTable[18].label)"
                  header-align="center"
                  align="center"
                  width="100"
                  :prop="headersTable[18].value"
                  v-if="headersTable[18].status"
                >     
                </el-table-column>

                <el-table-column 
                  :label="$t(headersTable[19].label)"
                  header-align="center"
                  align="center"
                  width="100"
                  :prop="headersTable[19].value"
                  v-if="headersTable[19].status"
                >
                    <!-- <template slot-scope="props">
                      {{ props.row.methodInspection }}
                    </template>       -->
                </el-table-column>

                <el-table-column 
                  :label="$t(headersTable[20].label)"
                  header-align="center"
                  align="center"
                  width="70"
                  :prop="headersTable[20].value"
                  v-if="headersTable[20].status"
                  :filters="filterByStatus"
                  :filter-method="filterHandler"
                >
                    <!-- <template slot-scope="props">
                      {{ props.row.PSI_Status }}
                    </template>       -->
                </el-table-column>

                <el-table-column 
                  :label="$t(headersTable[21].label)"
                  header-align="center"
                  align="center"
                  width="100"
                  :prop="headersTable[21].value"
                  v-if="headersTable[21].status"
                >
                    <!-- <template slot-scope="props">
                      {{ props.row.notes }}
                    </template>       -->
                </el-table-column>
              </el-table>

            </v-flex>
          </v-layout>
    </v-container>
</template>

<script>
import Api from "@/services/Api";
export default {
  name: "mainTable",
  data() {
    return {
      max25chars: v => v.length <= 25 || "Input too long!",
      tmp: "",
      search: "",
      e1: null,
      checkbox: false,
      dialogm1: "",
      dialog: false,
      dateOfLastInspection:'',
      dateOfNextInspection:''
    };
  },
  mounted: function() {
    this.getSafetyDevices();
    //get seession
  },
  computed: {
    headersTable() {
      return this.$store.getters.user.headersTable;
    },
    devices() {
      return this.$store.getters.loadDevices;
    },
    user() {
      return this.$store.getters.user;
    },
    filterByTag() {
      let arr = [];
      let o = {};
      this.devices.forEach(item => {
        o = { text: item.psd_TAG, value: item.psd_TAG };
        arr.push(o);
        o = {};
      });
      return arr;
    },
    filterByFieldTag() {
      let arr = [];
      let o = {};
      this.devices.forEach(item => {
        o = { text: item.fieldTAG, value: item.fieldTAG };
        arr.push(o);
        o = {};
      });
      return arr;
    },
    filterByPsdType() {
      let arr = [];
      let o = {};
      this.devices.forEach(item => {
        o = {
          text: item.PSD_Description.title,
          value: item.PSD_Description.title
        };
        arr.push(o);
        o = {};
      });
      return _.uniqBy(arr, "text");
    },
    filterByInstallationPlace() {
      let arr = [];
      let o = {};
      this.devices.forEach(item => {
        o = { text: item.installationPlace, value: item.installationPlace };
        arr.push(o);
        o = {};
      });
      return _.uniqBy(arr, "text");
    },
    filterByDepartment() {
      let arr = [];
      let o = {};
      this.devices.forEach(item => {
        o = { text: item.department, value: item.department };
        arr.push(o);
        o = {};
      });
      return _.uniqBy(arr, "text");
    },

    filterByResponsiblePerson() {
      let arr = [];
      let o = {};
      this.devices.forEach(item => {
        o = { text: item.responsiblePerson, value: item.responsiblePerson };
        arr.push(o);
        o = {};
      });
      return _.uniqBy(arr, "text");
    },
    filterByLastInspectionDate() {
      let arr = [];
      let o = {};
      this.devices.forEach(item => {
        o = { text: item.lastInspectionDate, value: item.lastInspectionDate };
        arr.push(o);
        o = {};
      });
      return _.uniqBy(arr, "text");
    },
    filterByNextInspectionDate() {
      let arr = [];
      let o = {};
      this.devices.forEach(item => {
        o = { text: item.nextInspectionDate, value: item.nextInspectionDate };
        arr.push(o);
        o = {};
      });
      return _.uniqBy(arr, "text");
    },
    filterByStatus() {
      let arr = [];
      let o = {};
      this.devices.forEach(item => {
        o = { text: item.PSI_Status, value: item.PSI_Status };
        arr.push(o);
        o = {};
      });
      return _.uniqBy(arr, "text");
    }
  },
  methods: {
       filterByLastDate (createElement, {column, store}) { 
     
        var self = this; 
        let element = createElement('span', { class: 'el-table-header-resource' }, [
                    createElement('div', {class: 'header-label'}, column.label),
                    createElement('el-date-picker', {
                        props: { placeholder: column.label, value: this.dateOfLastInspection, size: 'mini', type:"daterange", format:'dd-MM-yyyy'},
                        on: {
                            input: (value) => {
                        
                                this.dateOfLastInspection = value;
                                 this.getSafetyDevices();
            
                            }
                        }
                    })
                ]);

                element.fnScopeId = this.$options._scopeId;
                element.fnContext = this;

                return element;
      },
       filterByNextDate (createElement, {column, store}) { 
   
        var self = this; 
        let element = createElement('span', { class: 'el-table-header-resource' }, [
                    createElement('div', {class: 'header-label'}, column.label),
                    createElement('el-date-picker', {
                        props: { placeholder: column.label, value: this.dateOfNextInspection, size: 'mini', type:"daterange", format:'dd-MM-yyyy'},
                        on: {
                            input: (value) => {
                                this.dateOfNextInspection = value;
                                this.getSafetyDevices();
                            }
                        }
                    })
                ]);

                element.fnScopeId = this.$options._scopeId;
                element.fnContext = this;

                return element;
      },
    saveColumnSettings() {
      this.dialog = false;
      this.user;
      this.$store.dispatch("saveUserColumns", this.user.headersTable);
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    filterHandler2(value, row, column) {
      let key = "PSD_Description.title";

      const property = column["property"];
      return row.PSD_Description.title === value;
    },
    resetFilters() {
      this.dateOfLastInspection = '';
      this.dateOfNextInspection = '';
      this.getSafetyDevices()

    },
    tableRowClassName({ row, rowIndex }) {
      let today = new Date();
      let nextDate = new Date(row.nextInspectionDate);
    
      if (today > nextDate && row.PSI_Status !=="EQUIPMENT IS NOT USED" && row.PSI_Status !=="NOK"  ) {
        return "missInspect";
      }
 
      switch (row.PSI_Status) {
        case "EQUIPMENT IS NOT USED":
          return "notInspect";
          break;
        case "OK":
            if (  today.getMonth() == nextDate.getMonth() &&  today.getFullYear() == nextDate.getFullYear() ) {
                return "thisMonthInspect";
              break;
            } else {
                return "goodInspect";
              break;
            }
        case "NOK":
          return "badInspect";
          break;
      }
    },

    tableCellClassName(position) {
      if (position.column.property === 'psd_TAG') {
        return "dev-num";
      } else if (position.column.property === 'PSI_Status') {
        return "dev-status";
      } else if (position.column.property === 'nextInspectionDate') {
        return "dev-status";
      }
      else {
        return "standart-cell"
      }
    },
    openBlank(safetyDevice, column, cell, event, index) {

      if (safetyDevice.PSD_Description.title == "not parring to type") {
        this.$store.dispatch("setError", "This device not paring to type");  
      } else if (column.property === "psd_TAG") {
        if (
          (this.user.isInspector == true &&
            this.user.assignedDepartment === safetyDevice.department) ||
          this.user.isAdmin == true
        ) {
          localStorage.setItem('safetyForm', JSON.stringify(safetyDevice));
          this.$router.push({
            name: "InspectionForm",
            params: { safetyDevice }
          });
        } else if (
          safetyDevice.PSD_Description.title == "not parring to type"
        ) {
          this.$store.dispatch("setError", "This device not paring to type");
        } else {
          this.$store.dispatch(
            "setError",
            "Простите, только инспектор данного участка может проводить инспекцию"
          );
        }
      }
    },
    getSafetyDevices() {
      let filter = {
        department: this.user.department,
        dateOfLastInspection: this.dateOfLastInspection,
        dateOfNextInspection: this.dateOfNextInspection
      }
      this.$store.dispatch("getDevices", filter);
    },
    getExcelReport() {
      let self = this;
      Api().get('xls', {responseType: 'blob'})
      .then(response=>{
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'bos report.xls');
          document.body.appendChild(link);
          link.click();
      })
      .catch(err =>{
          console.log(err.response)
          if (err.response.status == 500) {
          self.$router.push( { name: 'Error500' } ) 
        }
      })
     }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/deep/ .el-table .dev-status {
  font-size: 10px;
  font-weight:bolder;
}

/deep/ .el-table .dev-num {
  cursor: pointer;
  font-size: 10px ;
  font-weight:bolder;
  letter-spacing: normal;
  line-height: normal ;

}
/deep/ .el-table .dev-num:hover {
  color: rgb(226, 238, 226);
  background-color: rgb(226, 13, 13) !important;
  font-weight:bolder;
  font-size: 10px;
}

/deep/ .el-table tr:hover > td {
  background-color: inherit !important;
}
/deep/ .el-table .defaultRow {
  background-color: #FFFFFF;
}
/deep/ .el-table .goodInspect {
  background-color: rgb(140, 255, 190);
}
/deep/ .el-table .badInspect {
  background-color: rgb(255, 155, 155);
}
/deep/ .el-table .missInspect {
  background-color: rgba(255, 185, 185);
}
/deep/ .el-table .thisMonthInspect {
  background-color: rgb(255, 255, 155);
}
/deep/ .el-table .notInspect {
  background-color: rgb(190, 190, 190);
}
/deep/ div .el-date-editor {
  width: 200px !important;
}
/deep/ input { 
  font-size: 12px;
}
.total {
  color:black;
  font-weight:800;
}
.ok {
  color:green;
  font-weight:800;
}
.nok {
  color:firebrick;
  font-weight:800;
}
.not-in-time {
  color: red;
  font-weight:800;
}
.thisMonthInspect {
  color: rgb(138, 138, 4);
  font-weight:800;
}
</style>
