import { sleep } from '@/utils/sleep';
import { Role } from '@/lib/types/admin/Role';
import { User } from '@/lib/types/admin/User';

export async function getRoles(): Promise<Role[]> {
	await sleep(1000);
	return [
		{ name: 'Members', color: '' },
		{ name: 'VIP', color: '#c27c0e' },
		{ name: 'Helpers', color: '#2ecc71' },
		{ name: 'Bots', color: '#ad1457' },
		{ name: 'Moderators', color: '#546e7a' },
		{ name: 'Admins', color: '#206694' },
	];
}

export async function getMembers(query: string): Promise<User[]> {
	await sleep(2000);

	const users = [
		{ id: '1420', name: 'GG142', avatar: 'https://cdn.discordapp.com/avatars/108892284119977984/a_e8ef78e4307b6e571ccf257d7a18fc69.webp' },
		{ id: '1421', name: 'Vladdy', avatar: 'https://cdn.discordapp.com/avatars/139836912335716352/a_8c43bbc71fa8b84c7a41de0a7a39488b.webp' },
		{ id: '0000', name: 'BitQuote', avatar: 'https://cdn.discordapp.com/avatars/115165640670576644/65b69be83c3ec6d918421da7cc1d2813.png' },
	];
	const members = [] as User[];
	users.forEach(({ id, name, avatar }) => {
		let discriminator = 0;
		while (discriminator < 10000) {
			const member: User = {
				id: `${id}-${discriminator}`,
				name,
				avatar,
				discriminator: String(discriminator).padStart(4, '0'),
				tag: '',
			};
			member.tag = `${name}#${member.discriminator}`;
			members.push(member);
			discriminator++;
		}
	});

	return members.filter(member => member.tag.includes(query));
}
