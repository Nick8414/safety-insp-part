<template>
  <v-container fluid>
    <el-table
      :data="logs"
      border
      height="750"
      style="width: 100%"
      cell-class-name="standart-cell"
    >
      <el-table-column
        header-align="center"
        align="center"
        type="index"
        width="30"
      >
      </el-table-column>
      <el-table-column
        prop="timestamp"
        label="Дата"
        align="center"
        width="210"
        :render-header="filterByDate"
      >
        <template slot-scope="scope">

          {{ scope.row.timestamp | dateTimeFilter }}
        </template>  

      </el-table-column>
      <el-table-column
        prop="level"
        label="Уровень"
        header-align="center"
        align="center"
        width="120"
        :render-header="filterByLevel"
      >
        <template slot-scope="scope">
         <span> {{ scope.row.level }} </span>
         <el-tag
          v-if = "scope.row.meta.isView === false ? true : false"
          size="mini">new</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="message"
        label="Cообщение"
        header-align="center"
        align="center"
        width="600"
      >
      </el-table-column>
     
    </el-table>
    
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-sizes="[50, 100, 150, 200]"
      :page-size="sizePage"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </v-container>
</template>

<script>
import Api from '@/services/Api'

export default {
  

  data () {
    return {
        currentPage: 1,
        sizePage: 50,
        filter: {
          level:'',
          timestamp:[]
        }

    }
  },
  mounted: function () {
    this.getLogs();
  },
  beforeDestroy: function () {
    this.viewCheck();
  },
  computed: {
    logs () {
      return this.$store.getters.loadLogs
    },
    total () {
      return this.$store.getters.loadTotal
    }
  },
  methods: {
      handleSizeChange(val) {
        console.log(`${val} items per page`);
        this.sizePage = val;
        this.getLogs();
      },
      handleCurrentChange(val) {
        console.log(`current page: ${val}`);
        this.currentPage = val;
        this.getLogs();
      },
    viewCheck() {
      let self = this;
      function chngView() {
        self.logs.forEach( (value) => {
          if ( value.meta.isView === false ) {
             self.$store.dispatch('changeViewState', value._id);
          }
        })
      }
    setTimeout( () => {
      chngView();
        
      }, 0)
    },
      

    getLogs () {
      this.$store.dispatch('getLogs', {currentPage: this.currentPage, sizePage: this.sizePage, level: this.filter.level, dateFrom: this.filter.timestamp !== null ? this.filter.timestamp[0] : '' , dateTo: this.filter.timestamp !== null ? this.filter.timestamp[1] : ''})
    },

      filterByLevel (createElement, {column, store}) { 
         console.log('function');
        console.log(column);
        console.log(store);
        var self = this; 
        let element = createElement('span', { class: 'el-table-header-resource' }, [
                    createElement('div', {class: 'header-label'}, column.label),
                    createElement('el-select', {
                        props: { placeholder: column.label, value: this.filter[column.property], size: 'mini', collapseTags:true, clearable: true, style: 'font-weight: debouncedebnormal; text-align: left; padding: 0; margin-left: 20px;'},
                        on: {
                            input: (value) => {
                              console.log(value);
                                this.filter[column.property] = value;
                                console.log(this.filter)
                                this.$store.dispatch('getLogs', {currentPage: this.currentPage, sizePage: this.sizePage, level: this.filter.level, dateFrom: this.filter.timestamp !== null ? this.filter.timestamp[0] : '' , dateTo: this.filter.timestamp !== null ? this.filter.timestamp[1] : ''});
                            }
                        }
                    }, ['info', 'warn', 'error'].map((item) => {
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
                        props: { placeholder: column.label, multiple:true, value: this.filter[column.property], size: 'mini', type:"daterange", format:'dd-MM-yyyy'},
                        on: {
                            input: (value) => {
                              console.log(value);
                                this.filter[column.property] = value;
                                this.$store.dispatch('getLogs', {currentPage: this.currentPage, sizePage: this.sizePage, level: this.filter.level, dateFrom: this.filter.timestamp !== null ? this.filter.timestamp[0] : '' , dateTo: this.filter.timestamp !== null ? this.filter.timestamp[1] : ''});
                            }
                        }
                    })
                ]);

                element.fnScopeId = this.$options._scopeId;
                element.fnContext = this;

                return element;
      }
  }
}
</script>
<style scoped>
  .isViewed {
    font-weight: bold;
  }
  /deep/ div .el-date-editor {
    width: 205px !important;
  }
  /deep/ input { 
    font-size: 12px;
  }

</style>

