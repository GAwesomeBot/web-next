<template>
	<v-app
		:class="$vuetify.theme.dark ? 'dark-bg' : 'light-bg'"
	>
		<v-content>
			<v-container fill-height fluid>
				<v-col v-if="!error">
					<v-row justify="center" align="center">
						<v-progress-circular
							indeterminate
							size="100"
							width="10"
						/>
					</v-row>
					<v-row justify="center" align="center" class="login-loading-message">
						<h3>We're logging you in...</h3>
					</v-row>
				</v-col>
				<v-col v-else>
					<v-row justify="center" align="center">
						<v-icon size="100" color="red">
							fas fa-exclamation-triangle
						</v-icon>
					</v-row>
					<v-row justify="center" align="center" class="login-loading-message">
						<h3 class="center">
							Something went wrong!
							<br>
							You can close this window and try again.
						</h3>
					</v-row>
				</v-col>
			</v-container>
		</v-content>
	</v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import { login } from '@/services/auth';

@Component({})
export default class LoginPage extends Vue {

	public error = false;

	public async fetch() {
		const { code } = this.$route.query;
		if (!code || !code[0]) return window.close();
		try {
			await login(Array.isArray(code) ? code[0] : code);
			window.close();
		} catch (err) {
			this.error = true;
		}
	}

}
</script>

<style>
	html {
		overflow-y: hidden;
	}

	.v-application.light-bg {
		background-image: url('~assets/header-bg.jpg') !important;
	}

	.v-application.dark-bg {
		background-image: url('~assets/header-bg-darker.jpg') !important;
	}

	.login-loading-message {
		margin-top: 5em;
	}
	.login-loading-message h3 {
		text-align: center;
	}
</style>
