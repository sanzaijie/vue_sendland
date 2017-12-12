import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import Cust_List from './views/nav1/Cust_List.vue'
import EnCust_List from './views/nav1/EnCust_List.vue'
import Personal from './views/nav1/Personal.vue'
import Enterprise from './views/nav1/Enterprise'
import PersonalDetail from './views/nav1/PersonalDetail.vue'
import EnterpriseDetail from './views/nav1/EnterpriseDetail.vue'
import PersonalEdit from './views/nav1/PersonalEdit.vue'
import EnterpriseEdit from './views/nav1/EnterpriseEdit.vue'
import MonitorDoQuery from './views/nav2/MonitorDoQuery.vue'
import PubCustChange from './views/nav2/PubCustChange.vue'
import MsgDoQueryPage from './views/nav2/MsgDoQueryPage.vue'
import UserDoQuery from './views/nav3/UserDoQuery.vue'
import RoleDoQuery from './views/nav3/RoleDoQuery.vue'
import NgDoQuery from './views/nav3/NgDoQuery.vue'
import echarts from './views/charts/echarts.vue'

let routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: Login,
        name: 'login',
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
        name: '',
        meta: {
            // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true,
        },
        hidden: false,
        iconCls: 'el-icon-menu',
        leaf: true,//只有一个节点
        children: [
            { 
                path: '/main',
                component: Main,
                name: '首页'
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '客户管理',
        meta: {
            // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true,
        },
        iconCls: 'el-icon-message',//图标样式class
        hidden: false,
        children: [
            {
                path: '/custList',
                component: Cust_List,
                name: '个人客户列表',
                meta: {
                    // 添加该字段，表示进入这个路由是需要登录的
                    requireAuth: true,
                },
                hidden: false
            },
            {
                path: '/encustlist',
                component: EnCust_List,
                name: '企业客户列表',
                meta: {
                    // 添加该字段，表示进入这个路由是需要登录的
                    requireAuth: true,
                },
                hidden: false
            },
            {
                path: '/encustlist/enterprise',
                component: Enterprise,
                name: '新增企业客户',
                meta: {
                    // 添加该字段，表示进入这个路由是需要登录的
                    requireAuth: true,
                },
                hidden: true
            },
            {
                path: '/custList/personal',
                component: Personal,
                name: '新增个人客户',
                meta: {
                    // 添加该字段，表示进入这个路由是需要登录的
                    requireAuth: true,
                },
                hidden: true
            },
        ]
    },
    {
        path: '/home/custList/personaldetail',
        component: PersonalDetail,
        name: '个人客户详情',
        meta: {
            // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true,
        },
        hidden: true
    },
    {
        path: '/home/custList/personaledit',
        component: PersonalEdit,
        name: '个人客户编辑',
        meta: {
            // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true,
        },
        hidden: true
    },
    {
        path: '/home/encustlist/enterprisedetail',
        component: EnterpriseDetail,
        name: '企业客户详情',
        meta: {
            // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true,
        },
        hidden: true
    },
    {
        path: '/home/encustlist/enterpriseedit',
        component: EnterpriseEdit,
        name: '企业客户编辑',
        meta: {
            // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true,
        },
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '监控管理',
        meta: {
            // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true,
        },
        hidden: false,
        iconCls: 'el-icon-document',
        children: [
            {
                path: '/monitorDoQuery',
                component: MonitorDoQuery,
                name: '系统监控', meta: {
                    // 添加该字段，表示进入这个路由是需要登录的
                    requireAuth: true,
                },
                hidden: false
            },
            {
                path: '/pubCustChange',
                component: PubCustChange,
                name: '客户日志', meta: {
                    // 添加该字段，表示进入这个路由是需要登录的
                    requireAuth: true,
                },
                hidden: false
            },
            {
                path: '/msgDoQueryPage',
                component: MsgDoQueryPage,
                name: '接口日志', meta: {
                    // 添加该字段，表示进入这个路由是需要登录的
                    requireAuth: true,
                },
                hidden: false
            }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '系统管理',
        meta: {
            // 添加该字段，表示进入这个路由是需要登录的
            requireAuth: true,
        },
        hidden: false,
        iconCls: 'el-icon-setting',
        children: [
            {
                path: '/roleDoQuery',
                component: RoleDoQuery,
                name: '角色管理',
                meta: {
                    // 添加该字段，表示进入这个路由是需要登录的
                    requireAuth: true,
                },
                hidden: false
            },
            {
                path: '/userDoQuery',
                component: UserDoQuery,
                name: '用户管理',
                meta: {
                    // 添加该字段，表示进入这个路由是需要登录的
                    requireAuth: true,
                },
                hidden: false
            },
            {
                path: '/ngDoQuerypage6',
                component: NgDoQuery,
                name: '字典管理',
                meta: {
                    // 添加该字段，表示进入这个路由是需要登录的
                    requireAuth: true,
                },
                hidden: false
            }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;