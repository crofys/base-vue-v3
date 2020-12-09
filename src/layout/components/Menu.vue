<script lang="tsx">
import { reactive, toRefs, inject, defineComponent } from "vue";
import { Routes } from "@dark/config";
/**
 * @description 渲染 MenuItem
 */
const renderMenuItem = (props: any) => {
  const { path, meta } = props || {};
  const { title, icon } = meta || {};
  if (!path || !title) {
    return "";
  }

  return (
    <a-menu-item key={path}>
      {path ? (
        <router-link to={path}>
          {icon && <icon-font type={icon} />} {title}
        </router-link>
      ) : (
        title
      )}
    </a-menu-item>
  );
};
/**
 * @description 渲染 SubMenu
 */
const renderSubMenu = (props: any) => {
  const { path, meta, children } = props || {};
  const { title, icon } = meta || {};

  const Slots = {
    title: () => (
      <span>
        <icon-font type={icon} />
        <span>{title}</span>
      </span>
    ),
    default() {
      return children.map((_childMenus: any) => renderMenuItem(_childMenus));
    },
  };
  return <a-sub-menu key={path} vSlots={Slots}></a-sub-menu>;
};

/**
 * @description 递归菜单数据
 */
function recursiveMenu(menus: any[]) {
  if (!Array.isArray(menus)) return [];
  const _menus: any[] = [];
  menus.filter(_menu => {
    const _children = _menu.children;
    if (Array.isArray(_children) && _children.length) {
      // 递归菜单方法 根据children循环遍历数据
      const _menuResult = recursiveMenu(_children);
      if (_menuResult && _menuResult.length) {
        _menu.children = _menuResult;
      }
    }

    if (!_menu.hidden) {
      return _menus.push(_menu);
    }
  });
  return _menus;
}

/**
 * @description 循环遍历路由 生成菜单数据列表
 */
const useFilterMenus = () => {
  const menus = reactive<any[]>([]);
  const [_routes] = Routes?.filter((item: any) => item.name === "index") || [];

  for (const item of Routes) {
    if (item.name === "index" && Array.isArray(_routes?.children)) {
      menus.push(...recursiveMenu(_routes?.children));
    }
  }
  return menus;
};

export default defineComponent({
  setup() {
    const state = reactive({
      selectedKeys: [] as string[],
      openKeys: [] as string[],
    });
    const collapsed = inject("collapsed", false);
    const config: any = inject("Config", {});

    const handleOpenChange = (openKeys: string[]) => {
      state.openKeys = openKeys;
    };
    const menus = useFilterMenus();

    return {
      ...toRefs(state),
      menus,
      collapsed,
      config,
      handleOpenChange,
    };
  },
  watch: {
    $route: {
      handler(route) {
        const { matched, path } = route;
        this.openKeys = matched.map((_route: any) => _route.path);
        this.selectedKeys = [path];
      },
      immediate: true,
    },
  },
  render() {
    const {
      config,
      collapsed,
      menus,
      openKeys,
      selectedKeys,
      handleOpenChange,
    } = this;
    // const { config, openKeys, selectedKeys, collapsed } = this;

    return (
      <a-menu
        class="layouy__menu"
        multiple={true}
        theme={config?.menus?.theme}
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        onOpenChange={handleOpenChange}
        mode="inline"
        inlineCollapsed={collapsed}
      >
        {menus.map(_menu => {
          if (_menu.children && _menu.children.length) {
            return renderSubMenu(_menu);
          } else {
            return renderMenuItem(_menu);
          }
        })}
      </a-menu>
    );
  },
});
</script>
<style lang="less">
#layout {
  .layouy_menu {
    height: 100vh;
  }
}
</style>
