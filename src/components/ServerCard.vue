<template>
	<div class="server-card">
		<v-lazy>
			<v-sheet class="px-3 pt-3 pb-3 flex-grow-1" :color="`grey ${$vuetify.theme.dark ? 'darken-2' : 'lighten-4'}`">
				<v-card>
					<v-img :src="server.icon" height="300px" width="300px" />
					<v-card-title>
						{{ server.name }}
					</v-card-title>
					<v-card-subtitle>
						{{ server.owner.username }}
					</v-card-subtitle>
					<v-card-actions>
						<a :href="server.invite_link">
							<v-btn v-if="server.invite_link" color="blue" text>
								Join Server
							</v-btn>
						</a>
						<v-btn color="red" text @click="banServer">
							Ban
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-sheet>
		</v-lazy>
	</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { serversStore } from '@/store';
import { PublicServerEntry } from '@/lib/types/PublicServerEntry';

@Component({})
export default class ServerCard extends Vue {

	@Prop()
	public server!: PublicServerEntry;

	public banServer() {
		serversStore.banServer(this.server.id);
	}

}
</script>

<style scoped>
	a {
		text-decoration: none;
	}
	.server-card {
		padding: 2px 2px 10px;
	}
</style>
