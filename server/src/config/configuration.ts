import { RoleAccessConfig } from '@hilma/auth-nest';

export default () => ({
	roleAccessConfig,
	auth: {
		loginTTL: 18000,
		verification_email: {
			welcome_to: "",
			verifyPath: "",
			html: null,
			text: null,
			logoDiv: null,
			logoPath: null
		}
	},
	app_name_he: "איך קוראים לפרויקט בעברית?"
});

const roleAccessConfig: Record<string, RoleAccessConfig> = {
	"CUSTOMER": {
		"components": [
			"CustomerHome"
		],
		"defaultHomePage": "CustomerHome"
	},
	"ADMIN": {
		"components": [
			"AdminHome"
		],
		"defaultHomePage": "AdminHome"
	}
};