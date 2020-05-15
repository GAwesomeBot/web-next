<template>
	<v-expansion-panels>
		<v-expansion-panel disabled>
			<v-tooltip bottom>
				<template v-slot:activator="{ on }">
					<v-expansion-panel-header v-on="on">
						Discord Server Administrators
					</v-expansion-panel-header>
				</template>
				<span>Users with the Administrator permission can manage all aspects of GAwesomeBot and override all other levels.</span>
			</v-tooltip>
		</v-expansion-panel>
		<level
			name="Bot Admins"
		/>
		<level
			name="Moderators"
		/>
		<level
			name="Helpers"
		/>
		<v-expansion-panel disabled>
			<v-expansion-panel-header>@everyone</v-expansion-panel-header>
		</v-expansion-panel>
	</v-expansion-panels>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import Level from '@/components/dashboard/admin/Level.vue';

@Component({
	components: { Level },
	layout: 'dashboard',
})
export default class LevelsPage extends Vue {}
</script>

<style scoped>
	.v-expansion-panel--disabled .v-expansion-panel-header {
		pointer-events: all !important;
		cursor: inherit;
	}
</style>
