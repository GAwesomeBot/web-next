<template>
	<v-col
		cols="2"
		class="guild-card-col"
	>
		<v-tooltip bottom>
			<template v-slot:activator="{ on }">
				<v-hover v-slot:default="{ hover }">
					<v-card
						:elevation="hover ? 12 : 2"
						:class="{ 'lighten-4': !$vuetify.theme.dark, 'grey': !$vuetify.theme.dark, 'mt-n2': hover }"
						v-on="on"
					>
						<v-img
							height="200px"
							:src="`https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.webp?size=2048`"
							:gradient="$vuetify.theme.dark ?
								`to bottom, rgba(30, 30, 30, 0), rgba(30, 30, 30, 0.2), rgba(30, 30, 30, 0.6), rgba(30, 30, 30, 1)` :
								`to bottom, rgba(245, 245, 245, 0), rgba(245, 245, 245, 0.2), rgba(245, 245, 245, 0.6), rgba(245, 245, 245, 1)`"
						>
							<v-row align="end" class="fill-height">
								<v-col>
									<v-card-title class="guild-card-title headline">
										{{ guild.name }}
									</v-card-title>
								</v-col>
							</v-row>
						</v-img>
						<v-card-actions class="guild-card-actions">
							<v-btn
								v-if="guild.name.includes('G')"
								color="success"
								small
								text
								@click="selectGuild"
							>
								Configure
							</v-btn>
							<v-btn
								v-else
								color="primary"
								small
								text
							>
								Add GAwesomeBot
							</v-btn>
						</v-card-actions>
					</v-card>
				</v-hover>
			</template>
			<span>{{ guild.name }}</span>
		</v-tooltip>
	</v-col>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { appStore } from '@/store';
import { Guild } from '@/lib/types/Guild';

@Component({})
export default class GuildSelector extends Vue {

	@Prop()
	public guild!: Guild;

	public selectGuild() {
		appStore.setSelectedGuild(this.guild.id);
	}

}
</script>

<style scoped>
	.guild-card-col {
		min-width: 200px;
	}

	.guild-card-title {
		display: block;
		white-space: nowrap;
		overflow-x: hidden;
		text-overflow: ellipsis;
		text-align: center;
		font-size: 1.2rem !important;
	}

	.guild-card-actions {
		justify-content: center;
	}
</style>
