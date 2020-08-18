import { API_BASE } from '@/lib/constants/api';
import axios from 'axios';

import { authStore } from '@/store';
import { Guild } from '@/lib/types/admin/Guild';
import { GuildDocument } from '@/lib/types/admin/GuildDocument';
import { sleep } from '@/utils/sleep';

export async function getGuildDocument(guildId: string): Promise<GuildDocument> {
	await sleep(1000);
	return {
		id: guildId,
		config: {
			levels: [{
				name: 'Bot Admins',
				id: 0,
				bindings: { users: [], roles: [] },
				permissions: {
					commandsOverride: true,
					modBypass: false,
					adminAlerts: false,
					dashboard: {
						sections: {
							commands: {
								read: false,
								write: false,
								admin: false,
							},
							statistics: {
								read: false,
								write: false,
								admin: false,
							},
							currency: {
								read: false,
								write: false,
								admin: false,
							},
							other: {
								read: false,
								write: false,
								admin: false,
							},
						},
						read: false,
						write: false,
						admin: false,
					},
				},
			}, {
				name: 'Moderators',
				id: 1,
				bindings: { users: [], roles: [] },
				permissions: {
					commandsOverride: true,
					modBypass: false,
					adminAlerts: false,
					dashboard: {
						sections: {
							commands: {
								read: false,
								write: false,
								admin: false,
							},
							statistics: {
								read: false,
								write: false,
								admin: false,
							},
							currency: {
								read: false,
								write: false,
								admin: false,
							},
							other: {
								read: false,
								write: false,
								admin: false,
							},
						},
						read: false,
						write: false,
						admin: false,
					},
				},
			}, {
				name: 'Helpers',
				id: 2,
				bindings: { users: [], roles: [] },
				permissions: {
					commandsOverride: true,
					modBypass: false,
					adminAlerts: false,
					dashboard: {
						sections: {
							commands: {
								read: false,
								write: false,
								admin: false,
							},
							statistics: {
								read: false,
								write: false,
								admin: false,
							},
							currency: {
								read: false,
								write: false,
								admin: false,
							},
							other: {
								read: false,
								write: false,
								admin: false,
							},
						},
						read: false,
						write: false,
						admin: false,
					},
				},
			}],
		},
		extensions: [],
	};
}

export async function getGuilds() {
	const res = await axios.get(`${API_BASE}/guilds?token=${authStore.token}`);
	return res.data.data as Guild[];
}
