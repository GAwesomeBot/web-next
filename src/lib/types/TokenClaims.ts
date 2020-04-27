export interface AuthUser {
	id: string;
	username: string;
	discriminator: string;
	avatar: string;
}

export interface TokenClaims {
	user: AuthUser;
	at: string;
}
