import { Middleware } from '@nuxt/types';
import { authStore } from '@/store';

const auth: Middleware = ({ redirect }) => {
	if (!authStore.token) redirect('/');
};

export default auth;
