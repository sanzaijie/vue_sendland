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
export function Gender(gender) {
    if (gender == 1) {
        gender = "女";
    } else if (gender == 2) {
        gender = "未知";
    } else {
        gender = "男";
    }
    return gender
}

//  客户类型 cst_type
export function _cstType(cst_type) {
    if (cst_type == 1) {
        cst_type = "公司客户"
    } else {
        cst_type = "个人客户"
    }
    return cst_type
}

//  客户状态 cst_status
export function _cstStatus(cst_status) {
    if (cst_status == 1) {
        cst_status = "推荐"
    } else if (cst_status == 2) {
        cst_status = "拓客"
    } else if (cst_status == 3) {
        cst_status = "来电(问询)"
    } else if (cst_status == 4) {
        cst_status = "来访(看房，预约)"
    } else if (cst_status == 5) {
        cst_status = "认筹"
    } else if (cst_status == 6) {
        cst_status = "认购"
    } else if (cst_status == 7) {
        cst_status = "签约"
    } else if (cst_status == 8) {
        cst_status = "入住(交楼)"
    } else {
        cst_status = "迁出(丢失)"
    }
    return cst_status
}

// 职业身份 work_type
export function _workType(work_type) {
    if (work_type == 108) {
        work_type = "公务员"
    } else if (work_type == 109) {
        work_type = "教师"
    } else if (work_type == 110) {
        work_type = "医生"
    } else if (work_type == 111) {
        work_type = "普通员工"
    } else if (work_type == 112) {
        work_type = "高级白领"
    } else if (work_type == 113) {
        work_type = "事业单位"
    } else if (work_type == 1) {
        work_type = "党政军干部"
    } else if (work_type == 102) {
        work_type = "企事业中高层管理人员"
    } else if (work_type == 103) {
        work_type = "企事业基层管理 / 职员 / 公务员"
    } else if (work_type == 104) {
        work_type = "私企员工"
    } else if (work_type == 105) {
        work_type = "私企老板"
    } else if (work_type == 106) {
        work_type = "自雇"
    } else if (work_type == -1) {
        work_type = "未知"
    } else {
        work_type = "个体户"
    }
    return work_type
}

// 子女人数 children_cnt
export function _childrenCnt(children_cnt) {
    if (children_cnt == 1) {
        children_cnt = "一个"
    } else if (children_cnt == 2) {
        children_cnt = "两个"
    } else if (children_cnt == 3) {
        children_cnt = "三个或三个以上"
    } else {
        children_cnt = "没有"
    }
    return children_cnt
}

// 家庭结构 family
export function _family(family) {
    if (family == 1) {
        family = "单身贵族"
    } else if (family == 2) {
        family = "二人世界"
    } else if (family == 3) {
        family = "单亲家庭"
    } else if (family == 4) {
        family = "二代之家"
    } else if (family == 5) {
        family = "三代同堂"
    } else {
        family = "未知"
    }
    return family
}

// 教育程度 edu_level
export function _eduLevel(edu_level) {
    if (edu_level == 1) {
        edu_level = "高中/职校"
    } else if (edu_level == 2) {
        edu_level = "大专"
    } else if (edu_level == 3) {
        edu_level = "大学"
    } else if (edu_level == 4) {
        edu_level = "研究生及以上"
    } else if (edu_level == 5) {
        edu_level = "其他"
    } else if (edu_level == 6) {
        edu_level = "未知"
    } else {
        edu_level = "未选择"
    }
    return edu_level
}

// 客户类别 cst_sort
export function _cstSort(cst_sort) {
    if (cst_sort == 2) {
        cst_sort = "其他";
    } else if (cst_sort == 1) {
        cst_sort = "租户";
    } else {
        cst_sort = "业主";
    }
    return cst_sort
}

// 证件类型 card_type
export function _cardTcard_typeype(card_type) {
    if (card_type == 1) {
        card_type = "护照"
    } else if (card_type == 2) {
        card_type = "军官证"
    } else if (card_type == 3) {
        card_type = "港澳身份证"
    } else if (card_type == 4) {
        card_type = "台胞证"
    } else if (card_type == 0) {
        card_type = "身份证"        
    } else {
        card_type = "未知"
    }
    return card_type
}

// 是否为vip客户 viptag
export function _viptag(viptag) {
    if (viptag == 1) {
        viptag = "是";
    } else {
        viptag = "否";
    }
    return viptag
}

// 居住业态 resided_state
export function _residedState(resided_state) {
    if (resided_state == 1) {
        resided_state = "高层住宅";
    } else if (resided_state == 2) {
        resided_state = "商业";
    } else if (resided_state == 3) {
        resided_state = "别墅";
    } else {
        resided_state = "未知";
    }
    return resided_state
}

// 来自区域 comefrom
export function _comefrom(comefrom) {
    if (comefrom == 1) {
        comefrom = "中国大陆";
    } else if (comefrom == 2) {
        comefrom = "港/澳";
    } else if (comefrom == 3) {
        comefrom = "台湾";
    } else {
        comefrom = "海外";
    }
    return comefrom
}

// 有无保姆同住 have_bm
export function _haveBm(have_bm) {
    if (have_bm == 1) {
        have_bm = "有";
    } else if (have_bm == 2) {
        have_bm = "未知";
    } else {
        have_bm = "无";
    }
    return have_bm
}

// 是否为主要决策者 ismain_jcz
export function _ismainJcz(ismain_jcz) {
    if (ismain_jcz == 1) {
        ismain_jcz = "是";
    } else if (ismain_jcz == 2) {
        ismain_jcz = "不确定";
    } else {
        ismain_jcz = "否";
    }
    return ismain_jcz
}

// 是否养犬 pet_stag
export function _petStag(pet_stag) {
    if (pet_stag == 1) {
        pet_stag = "是";
    } else if (pet_stag == 0) {
        pet_stag = "否";
    } else {
        pet_stag = "未知";
    }
    return pet_stag
}

export function fromTo(fromTo1) {
    let fromTo = fromTo1;
    if (fromTo1 == "from") {
        fromTo = "请求";
    } else if (fromTo1 == "to") {
        fromTo ="应答";
    } else if (fromTo1 == "sync") {
        fromTo = "反向同步";
    } 
    return fromTo;
}

export function _fromTo(fromTo1) {
    let fromTo = null;
    if (fromTo1 == "全部") {
        fromTo = null;
    } else if (fromTo1 == "请求") {
        fromTo = "from";
    } else if (fromTo1 == "应答") {
        fromTo ="to";
    } else if (fromTo1 == "反向同步") {
        fromTo = "sync";
    } 
    return fromTo;
}

export function PubMsgLogStatus(status1) {
    let status = status1;
    if (status1 == 1) {
        status = "接收成功";
    } else if (status1 == 2) {
        status = "已发送";
    } else if (status1 == 3) {
        status = "对方已接收";
    } else if (status1 == -1) {
        status = "失败";
    } 
    return status;
}

export function _PubMsgLogStatus(status1) {
    let status = null;
    if (status1 == "全部") {
        status = null;
    } else if (status1 == "接收成功") {
        status = 1;
    } else if (status1 == "已发送") {
        status = 2;
    } else if (status1 == "对方已接收") {
        status = 3;
    } else if (status1 == "失败") {
        status = -1;
    } 
    return status;
}