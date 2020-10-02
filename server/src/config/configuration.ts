import { AuthConfig } from '@hilma/auth-nest';

export default (): AuthConfig => ({
	auth: {
		ttl: {
			Admin: 3.154e+10,
			Customer: 3.154e+10
		},

		verification_email: {
			welcome_to: "",
			verifyPath: "",
			html: null,
			text: null,
			logoDiv: null,
			logoPath: null
		},

		secretOrKey: "asdfasdfasdfasdfasdfasdf",

		accessToken_cookie: "klokloklo"
	},

	app_name_he: "איך קוראים לפרויקט בעברית?",

	roleAccess: {
		CUSTOMER: {
			components: [
				"CustomerHome"
			],
			defaultHomePage: "CustomerHome"
		},
		ADMIN: {
			components: [
				"AdminHome"
			],
			defaultHomePage: "AdminHome"
		}
	}
});

