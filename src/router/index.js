import Vue from 'vue';
import Router from 'vue-router';
import Register from '@/components/Register';
import Confirm from '@/components/Confirm';
import Login from '@/components/Login';
import MFA from '@/components/MFA';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Register',
            component: Register,
        },
        {
            path: '/confirm',
            name: 'Confirm',
            component: Confirm,
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
        },
        {
            path: '/mfa',
            name: 'MFA',
            component: MFA,
        },
    ],
});
