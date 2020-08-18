import { Vue } from 'nuxt-property-decorator';
import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import { GuildDocument } from '@/lib/types/admin/GuildDocument';
import { DashboardSectionPermissions, DashboardPermissionPiece, LevelPermissions, Level } from '@/lib/types/admin/Level';
import { appStore } from '@/store';

interface UpdateLevelPermissionPayload {
	levelId: number;
	val: boolean;
	perm: keyof Omit<LevelPermissions, 'dashboard'>;
}

interface UpdateLevelDashboardAccessPayload {
	levelId: number;
	val: boolean;
	section: (keyof DashboardSectionPermissions) | undefined;
	perm: keyof DashboardPermissionPiece;
}

const guild = (store: Admin): GuildDocument | null => {
	if (!appStore.selectedGuild) return null;
	return store.guilds[appStore.selectedGuild];
};

@Module({
	name: 'admin',
	stateFactory: true,
	namespaced: true,
})
export default class Admin extends VuexModule {

	public guilds: { [index: string]: GuildDocument } = {};

	public get guild(): GuildDocument | null {
		return guild(this);
	}

	@Mutation
	public setGuildDocument(guildDocument: GuildDocument) {
		Vue.set(this.guilds, guildDocument.id, guildDocument);
	}

	/* Levels */
	@Mutation
	public createLevel({ name }: { name: string }) {
		const newLevel: Level = {
			id: Date.now(),
			name,
			permissions: {
				adminAlerts: false, commandsOverride: false, modBypass: false,
				dashboard: {
					read: false, write: false, admin: false,
					sections: {
						commands: { read: false, write: false },
						currency: { read: false, write: false },
						statistics: { read: false, write: false },
						other: { read: false, write: false },
					},
				},
			},
			bindings: { roles: [], users: [] },
		};
		this.guild?.config.levels.push(newLevel);
	}

	@Mutation
	public updateLevelDashboardAccess({ levelId, section, perm, val }: UpdateLevelDashboardAccessPayload) {
		const level = guild(this)?.config.levels.find(l => l.id === levelId);
		if (!level) return;
		const permPiece = section ? level.permissions.dashboard.sections[section] : level.permissions.dashboard;
		permPiece[perm] = val;

		if (val) {
			permPiece.read = permPiece.read || permPiece.write || Boolean(permPiece.admin);
			permPiece.write = permPiece.write || Boolean(permPiece.admin);
		} else {
			permPiece.admin = permPiece.read && permPiece.write && Boolean(permPiece.admin);
			permPiece.write = permPiece.read && permPiece.write;
		}
	}

	@Mutation
	public updateLevelPermission({ levelId, perm, val }: UpdateLevelPermissionPayload) {
		const level = this.guild?.config.levels.find(l => l.id === levelId);
		if (!level) return;
		level.permissions[perm] = val;
	}

}
