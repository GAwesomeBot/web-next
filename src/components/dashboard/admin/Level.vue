<template>
	<v-expansion-panel>
		<v-expansion-panel-header>{{ level.name }}</v-expansion-panel-header>
		<v-divider />
		<v-expansion-panel-content class="admin-level">
			<v-tabs vertical>
				<v-tab class="level-tab">
					<v-icon left>
						mdi-lock
					</v-icon>
					Permissions
				</v-tab>
				<v-tab class="level-tab">
					<v-icon left>
						mdi-account
					</v-icon>
					Bindings
				</v-tab>
				<v-btn
					outlined
					color="primary"
					class="level-action"
				>
					Save
				</v-btn>
				<v-btn
					outlined
					color="red"
					class="level-action"
				>
					Delete
				</v-btn>
				<v-tab-item>
					<v-container>
						<dashboard-access-card
							:level-id="levelId"
							title="Global Dashboard Access"
							icon="view-dashboard"
							:admin-option="true"
						/>
						<v-row>
							<v-col>
								<dashboard-access-card
									:level-id="levelId"
									title="Commands Settings Access"
									icon="cog"
									section="commands"
								/>
							</v-col>
							<v-col>
								<dashboard-access-card
									:level-id="levelId"
									title="Statistics Access"
									icon="gauge"
									section="statistics"
								/>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<dashboard-access-card
									:level-id="levelId"
									title="Currency Settings Access"
									icon="star"
									section="currency"
								/>
							</v-col>
							<v-col>
								<dashboard-access-card
									:level-id="levelId"
									title="Other Settings Access"
									icon="text"
									section="other"
								/>
							</v-col>
						</v-row>
						<v-divider />
						<v-row>
							<v-col>
								<level-permission-card
									:level-id="levelId"
									perm-key="commandsOverride"
									label="Allow users with this level to run all commands."
								/>
							</v-col>
							<v-col>
								<level-permission-card
									:level-id="levelId"
									perm-key="adminAlerts"
									label="Send admin alerts to users with this level."
								/>
							</v-col>
							<v-col>
								<level-permission-card
									:level-id="levelId"
									perm-key="modBypass"
									label="Users with this level will bypass the AutoMod."
								/>
							</v-col>
						</v-row>
					</v-container>
				</v-tab-item>
				<v-tab-item>
					<v-container>
						<p>Select which roles and members should inherit this level.</p>
						<v-autocomplete
							v-model="selectedRoles"
							:items="roles"
							:loading="rolesLoading"
							:search-input.sync="rolesSearch"
							cache-items
							hide-no-data
							hide-details
							filled
							chips
							label="Roles"
							item-text="name"
							item-value="name"
							multiple
						>
							<template v-slot:selection="role">
								<v-chip
									v-bind="role.attrs"
									:color="role.item.color"
									:input-value="role.selected"
									close
									@click="role.select"
									@click:close="removeRole(role.item)"
								>
									{{ role.item.name }}
								</v-chip>
							</template>
							<template v-slot:item="role">
								<v-list-item-content>
									<v-list-item-title>{{ role.item.name }}</v-list-item-title>
								</v-list-item-content>
							</template>
						</v-autocomplete>
						<br />
						<v-autocomplete
							v-model="selectedMembers"
							:items="members"
							:loading="membersLoading"
							:search-input.sync="membersSearch"
							cache-items
							hide-no-data
							hide-details
							filled
							chips
							label="Members"
							item-text="tag"
							item-value="id"
							multiple
						>
							<template v-slot:selection="member">
								<v-chip
									v-bind="member.attrs"
									:input-value="member.selected"
									close
									@click="member.select"
									@click:close="removeMember(member.item)"
								>
									<v-avatar left>
										<v-img :src="member.item.avatar" />
									</v-avatar>
									<b>{{ member.item.name }}</b>#{{ member.item.discriminator }}
								</v-chip>
							</template>
							<template v-slot:item="member">
								<v-list-item-content>
									<v-list-item-title>{{ member.item.tag }}</v-list-item-title>
								</v-list-item-content>
							</template>
						</v-autocomplete>
					</v-container>
				</v-tab-item>
			</v-tabs>
		</v-expansion-panel-content>
	</v-expansion-panel>
</template>

<script lang="ts">
import { Component, Prop, Watch } from 'nuxt-property-decorator';
import AdminComponent from '@/lib/structures/AdminComponent';
import DashboardAccessCard from '@/components/dashboard/admin/DashboardAccessCard.vue';
import LevelPermissionCard from '@/components/dashboard/admin/LevelPermissionCard.vue';
import { Level as LevelType } from '@/lib/types/admin/Level';
import { Role } from '@/lib/types/admin/Role';
import { User } from '@/lib/types/admin/User';
import { getRoles, getMembers } from '@/services/guild';

@Component({
	components: { DashboardAccessCard, LevelPermissionCard },
})
export default class Level extends AdminComponent {

	public roles: Role[] = [];
	public rolesSearch = '';
	public selectedRoles: string[] = [];
	public rolesLoading = false;

	public members: User[] = [];
	public membersSearch = '';
	public selectedMembers: string[] = [];
	public membersLoading = false;

	@Prop()
	public levelId!: number;

	public get level(): LevelType | undefined {
		return this.guild?.config.levels.find(level => level.id === this.levelId);
	}

	@Watch('rolesSearch')
	public async getRoles() {
		if (this.roles.length) return;
		this.rolesLoading = true;
		this.roles = await getRoles();
		this.rolesLoading = false;
	}

	@Watch('selectedRoles')
	public resetRolesSearch() {
		this.rolesSearch = '';
	}

	@Watch('membersSearch')
	public async getMembers(query: string) {
		if (!query) return;
		this.membersLoading = true;
		this.members = await getMembers(query);
		this.membersLoading = false;
	}

	@Watch('selectedMembers')
	public resetMembersSearch() {
		this.membersSearch = '';
	}

	public removeRole(role: Role) {
		const i = this.selectedRoles.indexOf(role.name);
		if (i !== -1) this.selectedRoles.splice(i, 1);
	}

	public removeMember(member: User) {
		const i = this.selectedMembers.indexOf(member.id);
		if (i !== -1) this.selectedMembers.splice(i, 1);
	}

}
</script>

<style scoped>
	.permissions-card {
		background-color: var(--v-secondary-darken1) !important;
		padding: 8px 12px 0 12px;
	}

	.level-action {
		margin: 12px 0 0 12px;
	}

	.level-tab {
		justify-content: flex-start;
	}

	.v-expansion-panel.sorting .v-expansion-panel-header::before {
		opacity: 0.12;
	}
</style>

<style>
	.admin-level .v-expansion-panel-content__wrap {
		padding-right: 0;
		padding-left: 0;
	}
</style>
