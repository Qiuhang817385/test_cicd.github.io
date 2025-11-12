import { registerMicroApps, start } from 'qiankun';

export function initQiankun () {
  const apps = [
    {
      name: 'sub-app', // 子应用名称
      entry: '//localhost:3001', // 子应用的访问地址
      container: '#subapp-viewport', // 主应用中用于挂载子应用的容器ID
      activeRule: '/sub-app', // 当浏览器路径为此前缀时，激活该子应用
    },
  ];

  registerMicroApps(apps);

  start();
}