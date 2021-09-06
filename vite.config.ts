import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import svgrPlugin from "vite-plugin-react-svg";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh(), svgrPlugin({ defaultExport: "component" })],
});
