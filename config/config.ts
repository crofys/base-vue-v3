module.exports = {
  name: "ZH_ADMIN",
  title: "基础项目",
  iconUrl: "//at.alicdn.com/t/font_2208356_yexho0qvyoh.js",
  routes: [
    {
      path: "/",
      name: "index",
      component: "AdminLayout",
      hidden: false,
      children: [
        {
          path: "/home",
          name: "home",
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
