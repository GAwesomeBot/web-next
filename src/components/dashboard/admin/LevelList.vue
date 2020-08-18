<template>
	<div>
		<v-expansion-panels class="level-list">
			<v-expansion-panel disabled class="locked-level">
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
				v-for="level of levels"
				:key="level.id"
				:level-id="level.id"
				:level="level"
			/>
			<v-expansion-panel disabled class="locked-level">
				<v-expansion-panel-header>@everyone</v-expansion-panel-header>
			</v-expansion-panel>
		</v-expansion-panels>
		<v-text-field
			label="Create New User Level"
			hint="Hit enter to submit"
			outlined
			clearable
			prepend-inner-icon="fa-plus"
			class="level-create-input"
		/>
	</div>
</template>

<script lang="ts">
import { Component } from 'nuxt-property-decorator';
import Sortable, { MoveEvent } from 'sortablejs';
import AdminComponent from '@/lib/structures/AdminComponent';
import Level from '@/components/dashboard/admin/Level.vue';

@Component({
	components: { Level },
})
export default class LevelList extends AdminComponent {

	public levels = this.guild?.config.levels;

	public onLevelMove(event: MoveEvent): boolean {
		if (event.related) return !event.related.classList.contains('locked-level');
		return true;
	}

	public mounted() {
		const levels = document.querySelector('.level-list');
		if (!levels || !(levels instanceof HTMLElement)) return;
		Sortable.create(levels, {
			filter: '.locked-level',
			handle: '.v-expansion-panel-header',
			ghostClass: 'sorting',
			onMove: this.onLevelMove.bind(this),
		});
	}

}
</script>

<style scoped>
	.level-create-input {
		margin-top: 1em;
	}
</style>
