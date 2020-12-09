<template>
  <div id="login">
    <div class="login__container">
      <h1>
        <img src="@/assets/images/login/logo.png" />
        <span>智行和医管理平台</span>
      </h1>
      <div class="login__warp">
        <a-form
          ref="formRef"
          :model="params"
          :rules="rules"
          v-bind="formLayout"
        >
          <a-form-item label="" name="username">
            <a-input
              class="login__input"
              size="large"
              v-model:value="params.username"
              placeholder="请输入账号"
            >
              <template #prefix>
                <UserOutlined class="icon" />
              </template>
            </a-input>
          </a-form-item>
          <a-form-item label="" name="password">
            <a-input-password
              class="login__input"
              size="large"
              v-model:value="params.password"
              placeholder="请输入密码"
            >
              <template #prefix>
                <LockOutlined class="icon" />
              </template>
            </a-input-password>
          </a-form-item>
          <a-checkbox v-model:checked="params.remember">
            记住密码
          </a-checkbox>

          <a-button
            :loading="loading"
            type="primary"
            html-type="submit"
            size="large"
            @click="handleSubmit"
          >
            确定
          </a-button>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script lang="tsx">
import { defineComponent, reactive, ref, watch } from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { LoginApi } from "./service";
import { message } from "ant-design-vue";
import { mapActions, useStore } from "vuex";
import { merge, pick } from "lodash";

export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
  },
  data() {
    return {
      loading: false,
      formLayout: {
        labelAlign: "left",
        // labelCol: { span: 4 },
        wrapperCol: { span: 24 },
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
          },
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
          },
        ],
      },
    };
  },
  setup() {
    const formRef = ref<any>(null);
    const store = useStore();
    const params = reactive({
      remember: false,
      username: "",
      password: "",
    });

    // 初始化输入框默认值
    watch(
      store.state.users,
      _state => {
        if (_state.remember) {
          merge(params, pick(_state, ["remember", "username", "password"]));
        }
      },
      {
        immediate: true,
        deep: true,
      },
    );
    return {
      params,
      formRef,
    };
  },
  methods: {
    ...mapActions(["login"]),
    /**
     * @description 登录提交按钮
     */
    async handleSubmit() {
      if (this.loading) return;
      this.loading = true;
      try {
        await this.formRef.validate();
        const { password, username, remember } = this.params;
        const res = await LoginApi({ password, username });
        this.login({
          ...res.data,
          remember,
          username,
          password,
        });
        this.$router.push("/");
      } catch (error) {
        const errMsg = typeof error === "string" ? error : "登录失败";
        message.error(errMsg);
        console.error("登录失败:", error);
      }
      this.loading = false;
    },
  },
});
</script>

<style lang="less" scoped>
// 登录 - 背景颜色
@login-bg-color: #f0f2f5;
// 登录 - 背景图片
@login-bg-img: "../../assets/images/login/background.svg";
// 登录 - 内容 - 背景颜色 #ffffff
@login-container-bg: transport;
// 登录 - 内容 - 宽
@login-container-w: 500px;
// 登录 - 内容 - 高
@login-container-h: 500px;
// 登录 - 内容 - 表单容器 -宽
@login-container-warp-w: 368px;

#login {
  position: relative;
  width: 100%;
  height: 100vh;
  background: @login-bg-color url(@login-bg-img) no-repeat 50%;
  > .login__container {
    width: @login-container-w;
    height: @login-container-h;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto auto;
    background: @login-container-bg;
    padding: 20px;

    // 登录 - 头部 - logo
    > h1 {
      height: 44px;
      line-height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 40px;
      > img {
        width: 44px;
        height: 44px;
        margin-right: 16px;
      }
      > span {
        font-size: 33px;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 600;
      }
    }

    > .login__warp {
      width: @login-container-warp-w;
      margin: 0 auto;
      .icon {
        color: rgba(0, 0, 0, 0.25);
      }
      .login__input {
        width: 100%;
        // margin-bottom: 10px;
      }
      .ant-btn {
        width: 100%;
        margin-top: 15px;
      }
    }
  }
}
</style>
