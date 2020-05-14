<template>
	<v-menu
		v-if="token"
		offset-y
		:close-on-content-click="false"
	>
		<template
			v-slot:activator="{ on }"
		>
			<nav-bar-link
				icon="user"
				:name="name"
				link=""
				:on="on"
				:active="$route.path.includes('/dashboard')"
			/>
		</template>
		<v-list>
			<v-list-item
				v-for="link of links"
				:key="link.to"
				:to="link.to"
			>
				<v-list-item-title>
					<v-icon small>
						fas fa-{{ link.icon }}
					</v-icon>
					&nbsp;
					{{ link.name }}
				</v-list-item-title>
			</v-list-item>
			<v-list-item @click="signout">
				<v-list-item-title>
					<v-icon small>
						fas fa-sign-out-alt
					</v-icon>
					&nbsp;
					Logout
				</v-list-item-title>
			</v-list-item>
			<v-list-item>
				<v-switch
					v-model="darkMode"
					label="Dark Mode"
				/>
			</v-list-item>
		</v-list>
	</v-menu>
	<nav-bar-link
		v-else
		name="Login"
		link=""
		icon="sign-in-alt"
		@click.native="signin"
	/>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { authStore, appStore } from '@/store';
import NavBarLink from '@/components/navbar/NavBarLink.vue';
import CenteredWindow from '@/lib/structures/CenteredWindow';

@Component({
	components: { NavBarLink },
})
export default class NavBarUserProfile extends Vue {

	public name = authStore.tokenClaims?.user.username;

	public get darkMode(): boolean {
		return Boolean(appStore.darkMode);
	}

	public set darkMode(val: boolean) {
		this.$vuetify.theme.dark = val;
		if (val) appStore.setDarkMode('true');
		else appStore.setDarkMode(null);
	}

	public get token(): string | null {
		return authStore.token;
	}

	public get active(): boolean {
		return this.$route.path.includes('/dashboard');
	}

	@Prop()
	public links!: any[];

	public signin() {
		const loginWindow = new CenteredWindow('GAwesomeBot Login', 800, 600);
		loginWindow.onClose(this.confirmSignin.bind(this));
		loginWindow.open('https://discordapp.com/oauth2/authorize?client_id=344473886337007617&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Flogin&response_type=code&scope=identify');
	}

	public signout() {
		authStore.unsetToken();
		// eslint-disable-next-line @typescript-eslint/no-floating-promises
		this.$router.push('/');
	}

	private confirmSignin() {
		if (!localStorage.token) return;
		authStore.setToken(localStorage.token);
	}

}
</script>

<style scoped>
	v-list {
		overflow-y: hidden;
	}
</style>
