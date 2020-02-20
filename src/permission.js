import axios from 'axios';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import router from './router';
import store from './store';
import getPageTitle from '@/utils/get-page-title';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

const whiteList = ['/login']; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();
  // set page title
  document.title = getPageTitle(to.meta.title);
  // determine whether the user has logged in
  if (store.state.user.id === -1) {
    const { data: { user } } = await axios.get('/api/user');
    // const { data: { code, user } } = await axios.get('http://localhost:8080/green_travel/api/LoginUser.action', {
    // withCredentials: true,
    // });
    if (user) store.dispatch('user/save', user);
  }
  if (store.state.user.id !== -1) {
    if (to.path === '/login') next({ path: '/' });
    else next();
  } else if (whiteList.indexOf(to.path) !== -1) next();
  else next(`/login?redirect=${to.path}`);
  NProgress.done();
});

// router.afterEach(() => {
//   // finish progress bar
//   NProgress.done();
// });
