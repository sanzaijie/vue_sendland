<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="dateForm">
                <el-form-item>
                    <!-- <el-date-picker v-model="begin_date" range-separator="至" placeholder="选择日期">
                    </el-date-picker> -->
                    <el-date-picker v-model="dateForm.begin_date" type="date" placeholder="开始日期" @change="logTimeChange">
                    </el-date-picker>    
                    <el-date-picker v-model="dateForm.end_date" type="date" placeholder="结束日期" @change="logTimeChange">
                    </el-date-picker>
                </el-form-item>
				<el-form-item>
					<el-button type="primary" @click="">查询</el-button>
				</el-form-item>
			</el-form>
		</el-col>
        <!--列表-->
        <el-table :data="system" highlight-current-row stripe style="width: 100%;">
			<!-- <el-table-column type="selection" width="0">
			</el-table-column> -->
            <el-table-column type="index" label="序号" align="center" width="70">
			</el-table-column>
			<el-table-column prop="name" label="接口名称" min-width="100" align="center">
			</el-table-column>
			<el-table-column prop="phone" label="消息数量" width="100" align="center">
			</el-table-column>
			<el-table-column prop="cust" label="调用系统" width="100" align="center">
			</el-table-column>
			<el-table-column prop="certificates" label="消息结果" min-width="100" align="center">
			</el-table-column>
            <!-- <el-table-column prop="cer_id" label="证件号码" min-width="100" align="center">
			</el-table-column>
			<el-table-column label="操作" width="200" align="center">
				<template slot-scope="scope">
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">详情</el-button>                    
					<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column> -->
		</el-table>
	</section>
</template>

<script>
import util from "../../common/js/util";
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
      dateForm: {
        begin_date: "",
        end_date: ""
      },
      system: []
    };
  },
  methods: {
    logTimeChange(val) {
      console.log(val);
    }
  },
  mounted() {
    // this.getUsers();
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
</style>