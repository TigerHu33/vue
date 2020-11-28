import Vue from "vue";
import Router from "vue-router";
import FirstPage from './components/FirstPage';
import SecondPage from './components/SecondPage';

Vue.use(Router);

export const constantRouterMap = [
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
]
export default new Router({
  mode: "history",
  routes: constantRouterMap
});