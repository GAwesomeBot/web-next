<template>
	<v-card class="permissions-card">
		<v-switch
			v-model="permission"
			:label="label"
		/>
	</v-card>
</template>

<script lang="ts">
import { Component, Prop } from 'nuxt-property-decorator';
import AdminComponent from '@/lib/structures/AdminComponent';
import { LevelPermissions } from '@/lib/types/admin/Level';
import { adminStore } from '@/utils/store-accessor';

@Component({})
export default class DashboardAccessCard extends AdminComponent {

	@Prop()
	public levelId!: number;

	@Prop()
	public permKey!: keyof Omit<LevelPermissions, 'dashboard'>;

	@Prop()
	public label!: string;

	public get permission(): boolean {
		const level = this.guild?.config.levels.find(level => level.id === this.levelId);
		if (!level) return false;
		return level.permissions[this.permKey];
	}

	public set permission(val: boolean) {
		const { levelId, permKey: perm } = this;
		adminStore.updateLevelPermission({ levelId, perm, val });
	}

}
</script>

<style scoped>
	.permissions-card {
		background-color: var(--v-secondary-darken1) !important;
		padding: 12px 12px 0 12px;
	}
</style>
