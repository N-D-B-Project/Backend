export type ENVIRONMENT = "DEVELOPMENT" | "PRODUCTION";

export interface Config {
	ENVIRONMENT: ENVIRONMENT;
	Database: {
		Version: string;
		URL: string;
		Name: string;
		Password: string;
		Redis: {
			Port: string;
			Host: string;
		};
	};
	API: {
		JwtSecret: string;
		JwtExpire: string;
		CookieSecret: string;
		MaxAge: number;
	};
	Discord: {
		Token: string;
		DevToken: string;
		Client: {
			Owners: string[];
			Secret: string;
			ID: string;
			CallbackURL: string;
		};
		Servers: {
			NDCommunity: string;
			TestGuild: string;
		};
	};
}
