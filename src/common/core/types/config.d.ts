export type TConfigOption = {
  title: string;
  name: string;
  menus?: {
    theme?: "light" | "dark";
  };
  iconUrl: string;
};
