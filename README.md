# OTT 管理平台

> - Jenkins: 
>   - [测试环境](http://jenkins.crofys.cn/view/%E6%B5%8B%E8%AF%95%E7%8E%AF%E5%A2%83/job/test-ors-admin-web/)
>   - [正式环境](http://jenkins.crofys.cn/view/%E6%AD%A3%E5%BC%8F%E7%8E%AF%E5%A2%83/job/master-ors-admin-web/)

> - 域名
>   - [测试环境](http://ors-admin.join-test.gz-data.com/market-data)
>   - [正式环境](http://ors-admin.join-test.gz-data.com/market-data)


---

## 环境
- node: v14.4.0
- vue: 3.0.0
- ant-design-vue: 2.0.0
- typescript: 3.9.3

---

## 本地开发
1. 添加本地环境变量文件 .env.local
```env
VUE_APP_ENV=development
VUE_APP_API_HOST="https://task.zhixingtianqi.com"
```

2. 安装
```shell
npm i
```

3. 运行
```shell
npm run dev
```

---

