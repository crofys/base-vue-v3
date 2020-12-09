module.exports = {
  name: "ZH_ADMIN",
  title: "智行和医管理平台",
  iconUrl: "//at.alicdn.com/t/font_2208356_yexho0qvyoh.js",
  routes: [
    {
      path: "/",
      name: "index",
      component: "DefaultLayout",
      hidden: false,
      children: [
        {
          path: "/home/",
          name: "home",
          meta: {
            title: "设置管理",
            icon: "i-yonghu",
          },
          component: "AdminLayout",
          children: [
            // 人员管理 - 列表
            {
              path: "/home",
              name: "home-list",
              meta: {
                title: "首页",
                icon: "i-yonghuliebiao",
              },
              component: "Home/index.vue",
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: "Login/index.vue",
    },
  ],
};
