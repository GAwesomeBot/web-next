import { GuildConfiguration } from './GuildConfiguration';

export interface GuildDocument {
	id: string;
	config: GuildConfiguration;
	extensions: any[];
}
