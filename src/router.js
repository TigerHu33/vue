import Vue from "vue";
import Router from "vue-router";
import FirstPage from './components/FirstPage';
import SecondPage from './components/SecondPage';
import NantongPage from './components/NantongPage';

Vue.use(Router);

const constantRouterMap = [
    {
        path: '/',
        name: 'home_page',
        component: FirstPage,
        hidden: true,
        children: []
    },
    {
      path: '/second_page',
      name: 'second_page',
      component: SecondPage,
      hidden: true,
      children: []
    },
    {
      path: '/nantong_page',
      name: 'nantong_page',
      component: NantongPage,
      hidden: true,
      children: []
    },
]
export default new Router({
  mode: "history",
  routes: constantRouterMap
});