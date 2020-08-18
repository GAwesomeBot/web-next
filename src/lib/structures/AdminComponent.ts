import { Vue } from 'nuxt-property-decorator';
import { GuildDocument } from '@/lib/types/admin/GuildDocument';
import { adminStore, appStore } from '@/store';

export default class AdminComponent extends Vue {

	public get guild(): GuildDocument | null {
		if (!appStore.selectedGuild) return null;
		return adminStore.guilds[appStore.selectedGuild];
	}

}
