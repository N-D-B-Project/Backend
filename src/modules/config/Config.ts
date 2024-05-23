import { Config, ENVIRONMENT } from "./types";

export const config = (): Config => ({
	ENVIRONMENT: process.env.ENVIRONMENT as ENVIRONMENT,
	Database: {
		Version: "Music",
		URL: process.env.DATABASE_URL,
		Name: process.env.DatabaseName,
		Password: process.env.DatabasePassword,
		Redis: {
			Port: process.env.RedisPort,
			Host: process.env.RedisHost,
		},
	},
	API: {
		JwtSecret: process.env.JWT_SECRET,
		JwtExpire: "1d",
		CookieSecret: process.env.COOKIE_SECRET,
		MaxAge: 86400, // 1 day in seconds
	},
	Discord: {
		Token: process.env.Token,
		DevToken: process.env.DevToken,
		Client: {
			Owners: ["330047048009252864"],
			Secret: process.env.ClientSecret,
			ID: "708822043420000366",
			CallbackURL: process.env.CallbackURL,
		},
		Servers: {
			NDCommunity: "679066351456878633",
			TestGuild: "717094267243462688",
		},
	},
});
