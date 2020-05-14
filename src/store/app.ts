import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import LocalStorageSyncProp from '@/lib/decorators/LocalStorageSyncProp';

@Module({
	name: 'app',
	stateFactory: true,
	namespaced: true,
})
@LocalStorageSyncProp('selectedGuild')
@LocalStorageSyncProp('darkMode')
export default class App extends VuexModule {

	public darkMode!: string | null;
	public setDarkMode!: (val: 'true' | null) => void;

	public selectedGuild!: string | null;
	public setSelectedGuild!: (id: string) => void;

	public searchQuery: string | null = null;

	// eslint-disable-next-line @typescript-eslint/require-await
	@Mutation
	public search(query: string) {
		this.searchQuery = query;
	}

	@Mutation
	public resetSearch() {
		this.searchQuery = null;
	}

}
