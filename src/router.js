import Vue from "vue";
import Router from "vue-router";
import MyFirst from './components/MyFirst';
Vue.use(Router);

export const constantRouterMap = [
    {
        path: '/',
        name: 'first_test',
        component: MyFirst,
        hidden: true,
        children: []
    },
]
export default new Router({
  mode: "history",
  routes: constantRouterMap
});