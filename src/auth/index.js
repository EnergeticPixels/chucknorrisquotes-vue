// My auth service exposes methods for loggin users in and out, signing them up,
// and checkign their authentication status.  Note that 'logging in' is just a matter
// of savign the JWT that is returned by the server. These methods and propoerties will
// all be useful throughout the app. For example, we can use the user.authenticated prop
// to conditionally show elements in the app.

import {router} from '../index';

// url and endpoint constants
const API_URL = 'http://localhost:3001';
const LOGIN_URL = API_URL + 'sessions/create';
const SIGNUP_URL = API_URL + 'users/';

export default {
	// user objet will let us check authentication status
	user: {
		authenticated: false
	},

	// send request to login URL and save the returned JWT
	login(context, creds, redirect) {
		context.$http.post(LOGIN_URL, creds, (data) => {
			localStorage.setItem('id_token', data.id_token);
			localStorage.setItem('access_token', data.access_token);

			this.user.authenticated = true;

			//redirect to a specified route
			if(redirect) {
				router.go(redirect);
			}
		}).error((err) => {
			context.error = err
		});
	},

	signup(context, creds, redirect) {
		context.$http.post(SIGNUP_URL, creds, (data) => {
			localStorage.setItem('id_token', data.id_token);
			localStorage.setItem('access_token', data.access_token);

			this.user.authenticated = true;

			if(redirect) {
				router.go(redirect)
			}
		}).error((err) => {
			context.error = err
		});
	},

	// to log out, we just need to remove the token
	logout() {
		localStorage.removeItem('id_token');
		localStorage.removeItem('access_token');
		this.user.authenticated = false;
	},

	checkAuth() {
		var jwt = localStorage.getItem('id_token');
		if(jwt) {
			this.user.authenticated = true
		} else {
			this.user.authenticated = false
		}
	},

	// the object to be passed as a header for authicated requests
	getAuthHeader() {
		return {
			'Authorization': 'Bearer ' + localStorage.getItem('access_token')
		}
	}
};