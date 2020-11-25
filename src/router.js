import Vue from "vue";
import Router from "vue-router";
import HelloWorld from './components/HelloWorld';
import ChanceHistory from './components/ChanceHistory';
import MyFirst from './components/MyFirst';
Vue.use(Router);

export const constantRouterMap = [
    {
        path: '/',
        name: 'home_page',
        component: HelloWorld,
        hidden: true,
        children: []
    },
    {
        path: '/chance_history',
        name: 'chance_history',
        component: ChanceHistory,
        hidden: true,
        children: []
    },
    {
        path: '/my_first',
        name: 'my_first',
        component: MyFirst,
        hidden: true,
        children: []
    }
]
export default new Router({
  mode: "history",
  routes: constantRouterMap
});