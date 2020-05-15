<template>
	<v-expansion-panel>
		<v-expansion-panel-header>{{ name }}</v-expansion-panel-header>
		<v-expansion-panel-content class="admin-level">
			<v-tabs vertical>
				<v-tab>
					<v-icon left>
						mdi-lock
					</v-icon>
					Permissions
				</v-tab>
				<v-tab>
					<v-icon left>
						mdi-account
					</v-icon>
					Bindings
				</v-tab>
				<v-tab-item>
					<v-container>
						<dashboard-access-card
							title="Dashboard Access"
							icon="view-dashboard"
							:admin-option="true"
						/>
						<v-row>
							<v-col>
								<dashboard-access-card
									title="Commands Settings Access"
									icon="cog"
								/>
							</v-col>
							<v-col>
								<dashboard-access-card
									title="Statistics Access"
									icon="gauge"
								/>
							</v-col>
						</v-row>
						<v-row>
							<v-col>
								<dashboard-access-card
									title="Currency Settings Access"
									icon="star"
								/>
							</v-col>
							<v-col>
								<dashboard-access-card
									title="Other Settings Access"
									icon="text"
								/>
							</v-col>
						</v-row>
						<v-divider />
						<v-row>
							<v-col>
								<v-card class="permissions-card">
									<v-switch
										label="Allow users with this level to run all commands."
									/>
								</v-card>
							</v-col>
							<v-col>
								<v-card class="permissions-card">
									<v-switch
										label="Send admin alerts to users with this level."
									/>
								</v-card>
							</v-col>
							<v-col>
								<v-card class="permissions-card">

									<v-switch
										label="Users with this level will bypass the AutoMod."
									/>
								</v-card>
							</v-col>
						</v-row>
					</v-container>
				</v-tab-item>
				<v-tab-item>
					<v-container>
						Some user and role bindings.
					</v-container>
				</v-tab-item>
			</v-tabs>
		</v-expansion-panel-content>
	</v-expansion-panel>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import DashboardAccessCard from '@/components/dashboard/admin/DashboardAccessCard.vue';

@Component({
	components: { DashboardAccessCard },
})
export default class Level extends Vue {

	@Prop()
	public name!: string;

}
</script>

<style scoped>
	.permissions-card {
		background-color: var(--v-secondary-darken1) !important;
		padding: 8px 12px 0 12px;
	}
</style>

<style>
	.admin-level .v-expansion-panel-content__wrap {
		padding-right: 0;
		padding-left: 0;
	}
</style>
