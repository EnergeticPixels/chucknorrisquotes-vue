import Vue from 'vue';
import App from './components/App.vue';
import Home from './components/Home.vue';
import SecretQuote from './components/SecretQuote.vue';
import Signup from './components/Signup.vue';
import Login from './components/Login.vue';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import auth from './auth';
// check the users auth status when the app starts
auth.checkAuth();

Vue.use(VueResource);
Vue.use(VueRouter);

export var router = new VueRouter();

// set up routing and match routes to components
router.map({
	'/home': {
		component: Home
	},
	'secretquote': {
		component: SecretQuote
	},
	'/login': {
		component: Login
	},
	'/signup': {
		component: Signup
	}
});

// redirect to home route if any routes are unmatched
router.redirect({
	'*': '/home'
});

router.start(App, '#app');