import {store} from '../store'
//import router from '../router'

export default function (to, from, next) {
	if (store.getters.user || localStorage.token ) {
	next ()
	} else {
		next('/?loginError=true')
	}

}