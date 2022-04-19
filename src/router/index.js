import { createRouter, createWebHistory } from "vue-router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// 懒加载
let Login = () => import("../pages/Login");
let Layout = () => import("../pages/Layout");
let Template = () => import("../pages/Template/Index");
let Code = () => import("../pages/Code/Index");
let Page404 = () => import("../pages/Page404");

let routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      title: "登录页面",
    },
  },
  {
    path: "/",
    name: "Layout",
    component: Layout,
    meta: {
      title: "布局页面",
    },
    redirect: "/template",
    children: [
      {
        path: "/template",
        name: "Template",
        component: Template,
        meta: {
          p_title: "模板管理",
          title: "模板列表",
        },
      },
      {
        path: "/code",
        name: "Code",
        component: Code,
        meta: {
          p_title: "代码管理",
          title: "代码列表",
        },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)",
    name: "404",
    component: Page404,
    meta: {
      title: "404",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
  document.title = to.meta.title;
});

// 全局后置钩子
router.afterEach(() => {
  NProgress.done();
});

export default router;
