import VueRouter from "vue-router";
import store from '@/store'

const router = new VueRouter({
    routes: [
        {
            path: '*',
            redirect: "/home/homePanel",
            meta: {
                title: '秋风购物',
            }
        },
        {
            path: '/home',
            component: () => import('../pages/home'),
            children: [
                {
                    path: 'homePanel',
                    component: () => import('../pages/home/components/HomePanel.vue'),
                    meta: {
                        title: '首页',
                    }
                },
                {
                    name: "searchPanel",
                    path: 'searchPanel',
                    component: () => import('../pages/home/components/SearchPanel.vue'),
                    props: true,
                    meta: {
                        isAuth: true,
                        title: '搜索结果',
                    },
                    beforeEnter: (to, from, next) => {
                        if (from.path !== "/home/homePanel") {
                            router.push('/home/homePanel')
                        } else {
                            next()
                        }
                    }
                },
            ]
        },
        {
            path: '/cart',
            component: () => import('../pages/cart'),
            meta: {
                isAuth: true,
                title: '我的购物车',
            }
        },
        {
            path: '/login',
            component: () => import('../pages/Login.vue'),
            meta: {
                title: '欢迎登录',
            }
        },
        {
            path: '/register',
            component: () => import('../pages/Register.vue'),
            meta: {
                title: '欢迎注册',
            }
        },
        {
            path: '/collection',
            component: () => import('../pages/collection'),
            meta: {
                isAuth: true,
                title: '收藏的物品',
            }
        },

        {
            name: 'productPanel',
            path: '/productPanel',
            component: () => import('../pages/productPanel'),
            props: true,
            meta: {
                isAuth: true,
                title: '物品信息',
            }
        },
        {
            path: '/user',
            component: () => import('../pages/user'),
            children: [
                {
                    path: 'infoPanel',
                    component: () => import('../pages/user/components/InfoPanel.vue'),
                    meta: {
                        isAuth: true,
                        title: '我的信息',
                    }
                },
                {
                    path: 'orderPanel',
                    component: () => import('../pages/user/components/OrderPanel.vue'),
                    meta: {
                        isAuth: true,
                        title: '我的未付款订单',
                    }
                },
                {
                    path: 'orderPanel1',
                    component: () => import('../pages/user/components/OrderPanel1.vue'),
                    meta: {
                        isAuth: true,
                        title: '我的已付款订单',
                    }
                },
            ],

        },
    ]
})

router.beforeEach((to, from, next) => {
    if (to.meta.isAuth) {
        if (from.path === '/login') {
            console.log('')
        }
        else if (store.state.user) {
            document.title = to.meta.title;
            next();
        } else {
            router.push('/login')
        }
    } else {
        document.title = to.meta.title || "网上书城";
        next();
    }

})

export default router
