import {userApi} from "@/api/user.api.ts";

import type {ProtectedRouteCheck} from "@lib/router/types.ts";

export const isAuth: ProtectedRouteCheck = () => new Promise((resolve, reject) => {
	if(window.user){
		resolve(true);
	}

	userApi.request()
		.then(user => {
			window.user = user;
			if (user) resolve(true);
			else reject("/login");
		})
		.catch(() => reject("/login"));
});

export const isNotAuth: ProtectedRouteCheck = () => new Promise((resolve, reject) => {
	isAuth().then(() => reject('/')).catch(() => resolve(true));
});
