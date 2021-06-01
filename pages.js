/**
 * Lazy load of pxp pages
 * @copyright Kplian Ltda 2020
 * @uthor Hilarion Bellido
 */
 import { lazy } from 'react';

 const pages = {};
 
 pages.AC_ACCOUNT= {
   path: '/accounting/Acount',
   component: lazy(() => import('./pages/Account')),
 };
 pages.AC_TREE_MENU = {
    path: '/accounting/MenuTree',
    component: lazy(() => import('./pages/TreeMaterial')),
  };
// pages.TR_CARS = {
//     path: '/trading/cars',
//     component: lazy(() => import('./pages/Cars')),
//   };
 
 export default pages;