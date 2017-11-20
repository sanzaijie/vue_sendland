import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Cust_List from './views/nav1/Cust_List.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
import Personal from './views/nav1/Personal.vue'
import Enterprise from './views/nav1/Enterprise'
import MonitorDoQuery from './views/nav2/MonitorDoQuery.vue'
import PubCustChange from './views/nav2/PubCustChange.vue'
import MsgDoQueryPage from './views/nav2/MsgDoQueryPage.vue'
import UserDoQuery from './views/nav3/UserDoQuery.vue'
import RoleDoQuery from './views/nav3/RoleDoQuery.vue'
import NgDoQuery from './views/nav3/NgDoQuery.vue'
import echarts from './views/charts/echarts.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '首页',
        hidden: false,
        iconCls: 'el-icon-location-outline',
        leaf: true,//只有一个节点
        children: [
            { path: '/main', component: Main, name: '首页' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '客户管理',
        iconCls: 'el-icon-search',//图标样式class
        hidden: false,
        children: [
            { path: '/custList', component: Cust_List, name: '客户列表', hidden: false },
            { path: '/enterprise', component: Enterprise, name: '新增企业客户', hidden: true },
            { path: '/personal', component: Personal, name: '新增个人客户', hidden: true },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '监控管理',
        hidden: false,
        iconCls: 'el-icon-document',
        children: [
            { path: '/monitorDoQuery', component: MonitorDoQuery, name: '系统监控', hidden: false },
            { path: '/pubCustChange', component: PubCustChange, name: '客户日志', hidden: false },
            { path: '/msgDoQueryPage', component: MsgDoQueryPage, name: '接口日志', hidden: false }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '系统管理',
        hidden: false,
        iconCls: 'el-icon-setting',
        children: [
            { path: '/roleDoQuery', component: RoleDoQuery, name: '角色管理', hidden: false },
            { path: '/userDoQuery', component: UserDoQuery, name: '用户管理', hidden: false },
            { path: '/ngDoQuerypage6', component: NgDoQuery, name: '字典管理', hidden: false }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;