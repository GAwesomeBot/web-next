import { API_BASE } from '@/lib/constants/api';
import axios from 'axios';

import { authStore } from '@/store';

export async function login(code: string) {
	const res = await axios.get(`${API_BASE}/login/callback?code=${code}`);
	const token = res.data.data as string;
	authStore.setToken(token);
}
