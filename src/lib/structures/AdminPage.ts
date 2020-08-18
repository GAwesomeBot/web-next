import AdminComponent from '@/lib/structures/AdminComponent';
import { adminStore, appStore } from '@/store';
import { getGuildDocument } from '@/services/dashboard';

export default class AdminPage extends AdminComponent {

	public async fetch(): Promise<any> {
		if (this.guild) return;
		if (!appStore.selectedGuild) return this.$router.push('/admin');
		const guildDocument = await getGuildDocument(appStore.selectedGuild);
		adminStore.setGuildDocument(guildDocument);
	}

}
