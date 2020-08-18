<template>
	<div>
		<dashboard-page-header
			title="User Levels"
		>
			<b>User Levels</b> are GAwesomeBot's extensive permission system. Users and roles in your Discord server can be <b>bound</b> to levels in order to inherit its permissions.
			<br>
			In this section, you can create or delete Levels, edit a Level's associated permissions or its <b>bindings</b>, and reorder the hierarchy.
			<br>
			Users will be able to access GAwesomeBot's dashboard when their Level has been given at least one <b>dashboard (section) permission</b>. Only users with the global <b>Admin Access</b> permission can manage <b>User Levels</b>.
		</dashboard-page-header>
		<level-list v-if="!$fetchState.pending" />
		<v-row
			v-else
			justify="center"
			align="center"
		>
			<v-progress-circular
				indeterminate
				size="100"
				width="10"
			/>
		</v-row>
	</div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator';
import AdminPage from '@/lib/structures/AdminPage';
import LevelList from '@/components/dashboard/admin/LevelList.vue';
import DashboardPageHeader from '@/components/dashboard/admin/DashboardPageHeader.vue';

@Component({
	components: { LevelList, DashboardPageHeader },
	layout: 'dashboard',
})
export default class LevelsPage extends AdminPage {

	public async fetch() {
		await super.fetch();
	}

}
</script>

<style scoped>
	.v-expansion-panel--disabled .v-expansion-panel-header {
		pointer-events: all !important;
		cursor: inherit;
	}
</style>
