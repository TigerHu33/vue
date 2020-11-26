import Vue from "vue";
import Router from "vue-router";
import FirstPage from './components/FirstPage';
Vue.use(Router);

export const constantRouterMap = [
    {
        path: '/',
        name: 'home_page',
        component: FirstPage,
        hidden: true,
        children: []
    },
]
export default new Router({
  mode: "history",
  routes: constantRouterMap
});