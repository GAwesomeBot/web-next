<template>
	<v-parallax :src="require(`@/assets/header-bg${$vuetify.theme.dark ? '-darker' : ''}.jpg`)" style="text-align: center;">
		<div class="flex flex-column fold-header">
			<div v-cloak>
				<slot />
			</div>
			<v-text-field
				v-if="searchBar"
				v-model="searchQuery"
				label="Search"
				outlined
				rounded
				clearable
				prepend-inner-icon="fa-search"
				class="dashboard-search"
			/>
		</div>
	</v-parallax>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import { appStore } from '@/store';

@Component({})
export default class AppHeader extends Vue {

	@Prop()
	public searchBar = false;

	public get searchQuery(): string {
		return appStore.searchQuery || '';
	}

	public set searchQuery(query: string) {
		appStore.search(query);
	}

}
</script>

<style scoped>
	.fold-header {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.fold-header > *:not(:only-child) {
		flex-grow: 0;
		margin-top: auto !important;
	}

	.dashboard-search {
		width: 50%;
	}
</style>

<style>
	[v-cloak] {
		display: none;
	}
</style>
