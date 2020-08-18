<template>
	<v-card class="permissions-card">
		<span class="overline">
			<v-icon x-small>mdi-{{ icon }}</v-icon>
			{{ title }}
		</span>
		<div class="permissions-tab">
			<v-checkbox
				v-model="read"
				append-icon="mdi-magnify"
				label="Read Access"
				:disabled="section && globalRead"
				:value="read || write || (section && globalRead)"
			/>
			<v-divider
				:class="{ 'active-permission-line': write }"
			/>
			<v-checkbox
				v-model="write"
				append-icon="mdi-pencil"
				label="Write Access"
				:disabled="section && globalWrite"
				:value="write || (section && globalWrite)"
			/>
			<v-divider
				v-if="adminOption"
				:class="{ 'active-permission-line': admin }"
			/>
			<v-checkbox
				v-if="adminOption"
				v-model="admin"
				append-icon="mdi-wrench"
				label="Admin Access"
			/>
		</div>
	</v-card>
</template>

<script lang="ts">
import { Component, Prop } from 'nuxt-property-decorator';
import AdminComponent from '@/lib/structures/AdminComponent';
import { DashboardPermissionPiece, DashboardSectionPermissions, Level } from '@/lib/types/admin/Level';
import { adminStore, appStore } from '@/utils/store-accessor';

@Component({})
export default class DashboardAccessCard extends AdminComponent {

	@Prop()
	public levelId!: number;

	@Prop()
	public section!: keyof DashboardSectionPermissions | undefined;

	@Prop()
	public title!: string;

	@Prop()
	public icon!: string;

	@Prop()
	public adminOption!: boolean | null;

	public get globalRead(): boolean {
		return this.level?.permissions.dashboard.read || false;
	}

	public get globalWrite(): boolean {
		return this.level?.permissions.dashboard.write || false;
	}

	public get read(): boolean | undefined {
		return this.piece?.read;
	}

	public set read(val: boolean | undefined) {
		adminStore.updateLevelDashboardAccess({ levelId: this.levelId, section: this.section, perm: 'read', val: val || false });
	}

	public get write(): boolean | undefined {
		return this.piece?.write;
	}

	public set write(val: boolean | undefined) {
		adminStore.updateLevelDashboardAccess({ levelId: this.levelId, section: this.section, perm: 'write', val: val || false });
	}

	public get admin(): boolean | undefined {
		return this.piece?.admin;
	}

	public set admin(val: boolean | undefined) {
		adminStore.updateLevelDashboardAccess({ levelId: this.levelId, section: this.section, perm: 'admin', val: val || false });
	}

	public get level(): Level | undefined {
		if (!appStore.selectedGuild) return undefined;
		return adminStore.guilds[appStore.selectedGuild]?.config.levels.find(level => level.id === this.levelId);
	}

	public get piece(): DashboardPermissionPiece | undefined {
		const { level } = this;
		if (!level) return undefined;
		if (!this.section) return level.permissions.dashboard;
		return level.permissions.dashboard.sections[this.section];
	}

}
</script>

<style scoped>
	.permissions-tab .v-divider {
		margin-top: calc(20px + 12px);
	}

	.permissions-tab .v-divider.active-permission-line {
		border-color: var(--v-primary-base);
	}

	.permissions-tab {
		display: flex;
		justify-content: space-between !important;
	}

	.permissions-card {
		background-color: var(--v-secondary-darken1) !important;
		padding: 12px 12px 0 12px;
	}
</style>

<style>
	.admin-level .v-expansion-panel-content__wrap {
		padding-right: 0;
		padding-left: 0;
	}
</style>
