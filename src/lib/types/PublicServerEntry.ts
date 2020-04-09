export type PublicServerEntryCategory = 'Other' | 'Gaming' | 'Tech' | 'Programming' | 'Community' | 'Bots';

export interface PublicServerEntry {
	id: string;
	name: string;
	icon: string;
	owner: {
		username: string;
		id: string;
		avatar: string;
		name: string;
	};
	members: number;
	messages: number;
	rawCreated: string;
	relativeCreated: number;
	command_prefix: string;
	category: PublicServerEntryCategory;
	description: string;
	invite_link: string;
}
