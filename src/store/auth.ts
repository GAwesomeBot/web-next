import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import { TokenClaims, AuthUser } from '@/lib/types/TokenClaims';

@Module({
	name: 'auth',
	stateFactory: true,
	namespaced: true
})
export default class Auth extends VuexModule {

	public token: string | null = localStorage.getItem('token');
	public authUser: AuthUser | null = this.tokenClaims && this.tokenClaims.user;
	public at: string | null = this.tokenClaims && this.tokenClaims.at;

	public get tokenClaims(): TokenClaims | null {
		if (!this.token) return null;
		const encodedClaimsPayload = this.token.split('.')[1];
		const decodedClaimsPayload = atob(encodedClaimsPayload);
		try {
			return JSON.parse(decodedClaimsPayload) as TokenClaims;
		} catch (_) {
			return null;
		}
	}

	@Mutation
	public setToken(token: string) {
		this.token = token;
		localStorage.setItem('token', token);

		const claims = this.tokenClaims;
		this.authUser = claims && claims.user;
		this.at = claims && claims.at;
	}

	@Mutation
	public unsetToken() {
		this.token = null;
		localStorage.removeItem('token');
	}

}
