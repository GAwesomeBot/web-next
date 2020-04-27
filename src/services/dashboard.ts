import { API_BASE } from '@/lib/constants/api';
import axios from 'axios';

import { authStore } from '@/store';
import { Guild } from '@/lib/types/Guild';

export async function getGuilds() {
	const res = await axios.get(`${API_BASE}/guilds?token=${authStore.token}`);
	return res.data.data as Guild[];
}
