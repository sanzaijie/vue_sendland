<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="dateForm">
                <el-form-item>
                    <el-date-picker v-model="dateForm.begin_date" type="date" placeholder="开始日期" @change="logTimeChange">
                    </el-date-picker>    
                    <el-date-picker v-model="dateForm.end_date" type="date" placeholder="结束日期" @change="logTimeChange">
                    </el-date-picker>
                </el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSearchData">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
        <!-- <div v-for="(o, index) in codeSystem" :key="index" :class="clicked ? 'box-card-active' : 'box-card'"> -->
            <div @click="onClickSystem(o.name, index)"
            v-for="(o, index) in codeSystem"
            :key="index" 
            :class="ind === index?'box-card-active':'box-card'">
                <div  class="text item">
                    {{o.name}}
                </div>
                <div class="text item">
                    新增客户: {{o.addNum}}
                </div>
                <div class="text item">
                    修改客户: {{o.modifyNum}}
                </div>
            </div>
        <!-- </div> -->

        <!--列表-->
        <el-table :data="listData" highlight-current-row stripe v-loading="listLoading" style="width: 100%;">
            <el-table-column type="index" label="序号" align="center" width="70">
			</el-table-column>
			<el-table-column prop="name" label="接口名称" min-width="100" align="center">
			</el-table-column>
			<el-table-column prop="totalCount" label="消息数量" width="100" align="center">
			</el-table-column>
			<el-table-column prop="requestSystem" label="调用系统" width="150" align="center">
			</el-table-column>
			<el-table-column prop="count_result" sortable label="消息结果" min-width="100" align="center" >
            </el-table-column>
		</el-table>
	</section>
</template>

<script>
import util from "../../common/js/util";
import { formatDate } from "../../api/dateutil";

//import NProgress from 'nprogress'
import {
  getUserListPage,
  removeUser,
  batchRemoveUser,
  editUser,
  addUser
} from "../../api/api";

export default {
  data() {
    return {
      codeSystem: [],
      listLoading: false,
      dateForm: {
        begin_date: new Date().toLocaleDateString(),
        end_date: new Date().toLocaleDateString(),
        from_sys: null
      },
      listData: [],
      ind: ""
    };
  },
  methods: {
    checkDateForm() {
      //''处理
      if (this.dateForm.begin_date == "" || this.dateForm.begin_date == null) {
        this.dateForm.begin_date = null;
      } else {
        this.dateForm.begin_date = formatDate(
          this.dateForm.begin_date,
          "YYYY/MM/DD"
        );
      }
      if (this.dateForm.end_date == "" || this.dateForm.end_date == null) {
        this.dateForm.end_date = null;
      } else {
        this.dateForm.end_date = formatDate(
          this.dateForm.end_date,
          "YYYY/MM/DD"
        );
      }
      if (this.dateForm.from_sys == "") {
        this.dateForm.from_sys = null;
      }
    },
    onClickSystem(system, index) {
      this.ind = index;
      if (system) {
        this.dateForm.from_sys = system;
        this.doLoadDataBody(); //加载数据
      }
    },
    doLoadDataBody() {
      //加载列表body数据
      this.listLoading = true;
      this.listData = []; //列表清空
      this.checkDateForm();
      this.$http({
        method: "post", //方法
        url: "monitor/sys/list", //URL地址
        data: this.dateForm,
        headers: {
          sign: localStorage.getItem("sign")
        }
      })
        .then(response => {
          let data = response.data.data;
          this.handleListData(data.bottom_body); //显示每个接口请求成功数，失败数
          this.listLoading = false;
        })
        .catch(error => {
          //function (error) {
          this.listLoading = false;
        });
    },
    //显示每个系统新增，修改数量
    handleTopBody(systemArray, topBody) {
      if (systemArray) {
        for (let i = 0; i < systemArray.length; i++) {
          let systemTmp = {};
          systemTmp.name = systemArray[i].name;
          systemTmp.addNum = 0;
          systemTmp.modifyNum = 0;
          this.$set(this.codeSystem, i, systemTmp);
        }
      }
      if (topBody) {
        for (let i = 0; i < topBody.length; i++) {
          for (let j = 0; j < this.codeSystem.length; j++) {
            if (topBody[i].from_sys == this.codeSystem[j].name) {
              if (topBody[i].change_type == "新增") {
                this.codeSystem[j].addNum += topBody[i].c;
              } else if (topBody[i].change_type == "修改") {
                this.codeSystem[j].modifyNum += topBody[i].c;
              }
            }
          }
        }
      }
    },
    //显示每个接口请求成功数，失败数
    handleListData(bottomBody) {
      //debugger
      if (bottomBody) {
        let index1 = 0;
        for (let i = 0; i < bottomBody.length; i++) {
          let dataArray = this.listData;
          let isFind = false;
          for (let j = 0; j < dataArray.length; j++) {
            if (dataArray[j]) {
              if (
                dataArray[j].requestSystem == bottomBody[i].requestSystem &&
                dataArray[j].name == bottomBody[i].name
              ) {
                isFind = true;
                if (bottomBody[i].status == 1) {
                  //成功数
                  dataArray[j].successCount += bottomBody[i].c;
                  dataArray[j].totalCount += bottomBody[i].c;
                  dataArray[j].count_result =
                    "成功数:" +
                    dataArray[j].successCount +
                    ",失败数:" +
                    dataArray[j].failCount;
                } else if (bottomBody[i].status == -1) {
                  //失败数
                  dataArray[j].failCount += bottomBody[i].c;
                  dataArray[j].totalCount += bottomBody[i].c;
                  dataArray[j].count_result =
                    "成功数:" +
                    dataArray[j].successCount +
                    ",失败数:" +
                    dataArray[j].failCount;
                }
              }
            }
          }
          if (!isFind) {
            let _dataTmp = {
              requestSystem: "",
              name: null,
              successCount: 0,
              failCount: 0,
              totalCount: 0,
              count_result: null
            };
            _dataTmp.requestSystem = bottomBody[i].requestSystem;
            _dataTmp.name = bottomBody[i].name;
            if (bottomBody[i].status == 1) {
              //成功数
              _dataTmp.successCount = bottomBody[i].c;
              _dataTmp.totalCount += bottomBody[i].c;
              _dataTmp.count_result =
                "成功数:" + _dataTmp.totalCount + ",失败数:" + _dataTmp.failCount;
            } else if (bottomBody[i].status == -1) {
              //失败数
              _dataTmp.failCount = bottomBody[i].c;
              _dataTmp.totalCount += bottomBody[i].c;
              _dataTmp.count_result =
                "成功数:" + _dataTmp.totalCount + ",失败数:" + _dataTmp.failCount;
            }
            this.$set(this.listData, index1, _dataTmp);
            index1 += 1;
          }
        }
      }
    },
    //加载分页数据
    loadData() {
      this.listLoading = true;
      this.listData = []; //列表清空
      this.checkDateForm();
      this.$http({
        method: "post", //方法
        url: "monitor/sys/list", //URL地址
        data: this.dateForm,
        headers: {
          sign: localStorage.getItem("sign")
        }
      })
        .then(response => {
          let data = response.data.data;
          this.handleTopBody(data.code_system, data.top_body); //显示每个系统新增，修改数量
          this.handleListData(data.bottom_body); //显示每个接口请求成功数，失败数
          this.listLoading = false;
        })
        .catch(error => {
          //function (error) {
          //console.log(error);
          this.listLoading = false;
        });
    },
    onSearchData() {
      //查询数据
      this.loadData();
    },
    logTimeChange(val) {
      console.log(val);
    }
  },
  mounted() {
    //首次加载页面
    this.loadData();
  }
};
</script>

<style scoped>
.checkBoxs_name {
  width: 12%;
  display: inline-block;
  text-align: right;
}
.checkWidth {
  margin-right: 5px;
}

/* .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  } */
.box-card {
  padding-top: 10px;
  width: 20%;
  height: 105px;
  line-height: 30px;
  display: inline-block;
  margin: 15px 15px;
  text-align: center;
  border: 1px solid #dfdfdf;
  border-radius: 4px;
}
.box-card-active {
  padding-top: 10px;
  width: 20%;
  height: 105px;
  line-height: 30px;
  display: inline-block;
  margin: 15px 15px;
  text-align: center;
  border: 1px solid #20a0ff;
  color: #20a0ff;
  border-radius: 4px;
}
</style>