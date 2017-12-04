/*
* 性别 gender
* 客户类型 cst_type
* 客户状态 cst_status
* 职业身份 work_type
* 子女人数 children_cnt
* 家庭结构 family
* 教育程度 edu_level
* 客户类别 cst_sort
* 证件类型 card_type
* 是否为vip客户 viptag
* 居住业态 resided_state
* 来自区域 comefrom
* 有无保姆同住 have_bm
* 是否为主要决策者 ismain_jcz
* 是否养犬 pet_stag
*/

// 性别 gender
export const Gender = function (gender) {
    for (let i = 0; i < gender.length; i++) {
        if (usersG[i].gender == 1) {
            usersG[i].gender = "女";
        } else if (usersG[i].gender == 2) {
            usersG[i].gender = "未知";
        } else {
            usersG[i].gender = "男";
        }
    }
}

//  客户类型 cst_type
export const _cstType = function (cst_type) {
    for (let i = 0; i < cst_type.length; i++) {
        if (userG[i].cst_type == 1) {
            userG[i].cst_type = "公司客户"
        } else {
            userG[i].cst_type = "个人客户"
        }
    }
}

//  客户状态 cst_status
export const _cstStatus = function (cst_status) {
    for (let i = 0; i < cst_status.length; i++) {
        if (userG[i].cst_status == 1) {
            userG[i].cst_status = "推荐"
        } else if (userG[i].cst_status == 2) {
            userG[i].cst_status = "拓客"
        } else if (userG[i].cst_status == 3) {
            userG[i].cst_status = "来电(问询)"
        } else if (userG[i].cst_status == 4) {
            userG[i].cst_status = "来访(看房，预约)"
        } else if (userG[i].cst_status == 5) {
            userG[i].cst_status = "认筹"
        } else if (userG[i].cst_status == 6) {
            userG[i].cst_status = "认购"
        } else if (userG[i].cst_status == 7) {
            userG[i].cst_status = "签约"
        } else if (userG[i].cst_status == 8) {
            userG[i].cst_status = "入住(交楼)"
        } else {
            userG[i].cst_status = "迁出(丢失)"
        }
    }
}

// 职业身份 work_type
export const _workType = function (work_type) {
    for (let i = 0; i < work_type.length; i++) {
        if (userG[i].work_type == 108) {
            userG[i].work_type = "公务员"
        } else if (userG[i].work_type == 109) {
            userG[i].work_type = "教师"
        } else if (userG[i].work_type == 110) {
            userG[i].work_type = "医生"
        } else if (userG[i].work_type == 111) {
            userG[i].work_type = "普通员工"
        } else if (userG[i].work_type == 112) {
            userG[i].work_type = "高级白领"
        } else if (userG[i].work_type == 113) {
            userG[i].work_type = "事业单位"
        } else if (userG[i].work_type == 1) {
            userG[i].work_type = "党政军干部"
        } else if (userG[i].work_type == 102) {
            userG[i].work_type = "企事业中高层管理人员"
        } else if (userG[i].work_type == 103) {
            userG[i].work_type = "企事业基层管理 / 职员 / 公务员"
        } else if (userG[i].work_type == 104) {
            userG[i].work_type = "私企员工"
        } else if (userG[i].work_type == 105) {
            userG[i].work_type = "私企老板"
        } else if (userG[i].work_type == 106) {
            userG[i].work_type = "自雇"
        } else {
            userG[i].work_type = "个体户"
        }
    }
}

// 子女人数 children_cnt
export const _childrenCnt = function (children_cnt) {
    for (let i = 0; i < children_cnt.length; i++) {
        if (userG[i].children_cnt == 1) {
            userG[i].children_cnt = "一个"
        } else if (userG[i].children_cnt == 2) {
            userG[i].children_cnt = "两个"
        } else if (userG[i].children_cnt == 3) {
            userG[i].children_cnt = "三个或三个以上"
        } else {
            userG[i].children_cnt = "没有"
        }
    }
}

// 家庭结构 family
export const _family = function (family) {
    for (let i = 0; i < family.length; i++) {
        if (userG[i].family == 1) {
            userG[i].family = "单身贵族"
        } else if (userG[i].family == 2) {
            userG[i].family = "二人世界"
        } else if (userG[i].family == 3) {
            userG[i].family = "单亲家庭"
        } else if (userG[i].family == 4) {
            userG[i].family = "二代之家"
        } else if (userG[i].family == 5) {
            userG[i].family = "三代同堂"
        } else {
            userG[i].family = "未知"
        }
    }
}

// 教育程度 edu_level
export const _eduLevel = function (edu_level) {
    for (let i = 0; i < edu_level.length; i++) {
        if (userG[i].edu_level == 1) {
            userG[i].edu_level = "高中/职校"
        } else if (userG[i].edu_level == 2) {
            userG[i].edu_level = "大专"
        } else if (userG[i].edu_level == 3) {
            userG[i].edu_level = "大学"
        } else if (userG[i].edu_level == 4) {
            userG[i].edu_level = "研究生及以上"
        } else if (userG[i].edu_level == 5) {
            userG[i].edu_level = "其他"
        } else if (userG[i].edu_level == 6) {
            userG[i].edu_level = "未知"
        } else {
            userG[i].edu_level = "未选择"
        }
    }
}

// 客户类别 cst_sort
export const _cstSort = function (cst_sort) {
    for (let i = 0; i < cst_sort.length; i++) {
        if (usersG[i].cst_sort == 2) {
            usersG[i].cst_sort = "其他";
        } else if (usersG[i].cst_sort == 1) {
            usersG[i].cst_sort = "租户";
        } else {
            usersG[i].cst_sort = "业主";
        }
    }
}

// 证件类型 card_type
export const _cardTcard_typeype = function (card_type) {
    for (let i = 0; i < card_type.length; i++) {
        if (userG[i].card_type == 1) {
            userG[i].card_type = "护照"
        } else if (userG[i].card_type == 2) {
            userG[i].card_type = "军官证"
        } else if (userG[i].card_type == 3) {
            userG[i].card_type = "港澳身份证"
        } else if (userG[i].card_type == 4) {
            userG[i].card_type = "台胞证"
        } else {
            userG[i].card_type = "未知"
        }
    }
}

// 是否为vip客户 viptag
export const _viptag = function (viptag) {
    for (let i = 0; i < viptag.length; i++) {
        if (usersG[i].viptag == 1) {
            usersG[i].viptag = "是";
        } else {
            usersG[i].viptag = "否";
        }
    }
}

// 居住业态 resided_state
export const _residedState = function (resided_state) {
    for (let i = 0; i < resided_state.length; i++) {
        if (usersG[i].resided_state == 1) {
            usersG[i].resided_state = "高层住宅";
        } else if (usersG[i].resided_state == 2) {
            usersG[i].resided_state = "商业";
        } else if (userG[i].resided_state == 3) {
            usersG[i].resided_state = "别墅";
        } else {
            usersG[i].resided_state = "未知";
        }
    }
}

// 来自区域 comefrom
export const _comefrom = function (comefrom) {
    for (let i = 0; i < comefrom.length; i++) {
        if (usersG[i].comefrom == 1) {
            usersG[i].comefrom = "中国大陆";
        } else if (usersG[i].comefrom == 2) {
            usersG[i].comefrom = "港/澳";
        } else if (userG[i].comefrom == 3) {
            usersG[i].comefrom = "台湾";
        } else {
            usersG[i].comefrom = "海外";
        }
    }
}

// 有无保姆同住 have_bm
export const _haveBm = function (have_bm) {
    for (let i = 0; i < have_bm.length; i++) {
        if (usersG[i].have_bm == 1) {
            usersG[i].have_bm = "有";
        } else if (usersG[i].have_bm == 2) {
            usersG[i].have_bm = "未知";
        } else {
            usersG[i].have_bm = "无";
        }
    }
}

// 是否为主要决策者 ismain_jcz
export const _ismainJcz = function (ismain_jcz) {
    for (let i = 0; i < ismain_jcz.length; i++) {
        if (usersG[i].ismain_jcz == 1) {
            usersG[i].ismain_jcz = "是";
        } else if (usersG[i].ismain_jcz == 2) {
            usersG[i].ismain_jcz = "不确定";
        } else {
            usersG[i].ismain_jcz = "否";
        }
    }
}

// 是否养犬 pet_stag
export const _petStag = function (pet_stag) {
    for (let i = 0; i < pet_stag.length; i++) {
        if (usersG[i].pet_stag == 1) {
            usersG[i].pet_stag = "是";
        } else if (usersG[i].pet_stag == 0) {
            usersG[i].pet_stag = "否";
        } else {
            usersG[i].pet_stag = "未知";
        }
    }
}


