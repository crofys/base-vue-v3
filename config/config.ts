module.exports = {
  name: "ZH_ADMIN",
  title: "基础项目",
  iconUrl: "//at.alicdn.com/t/font_2208356_yexho0qvyoh.js",
  menus: {
    theme: "dark",
  },
  routes: [
    {
      path: "/",
      name: "index",
      component: "AdminLayout",
      children: [
        {
          path: "/home",
          name: "home",
          meta: { title: "首页" },
          component: "Home/index.vue",
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
