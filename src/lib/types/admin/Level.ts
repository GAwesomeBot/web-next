export interface DashboardPermissionPiece {
	read: boolean;
	write: boolean;
	admin?: boolean;
}

export interface DashboardSectionPermissions {
	commands: DashboardPermissionPiece;
	statistics: DashboardPermissionPiece;
	currency: DashboardPermissionPiece;
	other: DashboardPermissionPiece;
}

export interface DashboardPermissions extends DashboardPermissionPiece {
	sections: DashboardSectionPermissions;
}

export interface LevelPermissions {
	commandsOverride: boolean;
	adminAlerts: boolean;
	modBypass: boolean;
	dashboard: DashboardPermissions;
}

export interface Level {
	id: number;
	name: string;
	permissions: LevelPermissions;
	bindings: {
		roles: bigint[];
		users: bigint[];
	};
}
