import * as yup from "yup";
// Custom error messages
const passwordErrors = {
	min: "Password must be at least 8 characters",
	uppercase: "Password must contain at least one uppercase letter",
	lowercase: "Password must contain at least one lowercase letter",
	number: "Password must contain at least one number",
	special: "Password must contain at least one special character",
	commonWords: "Password cannot contain common words",
	sequential: "Password cannot contain sequential characters",
	repeated: "Password cannot contain repeated characters more than 2 times",
	personal: "Password cannot contain personal information",
	required: "Password is required",
};

// List of common words to avoid in passwords
const commonWords = [
	"password",
	"admin",
	"user",
	"login",
	"welcome",
	"123456",
	"qwerty",
	"abc123",
	"letmein",
	"monkey",
	"dragon",
	"baseball",
	"football",
	"superman",
];

// Custom validation functions
const hasUppercase = (str: string) => /[A-Z]/.test(str);
const hasLowercase = (str: string) => /[a-z]/.test(str);
const hasNumber = (str: string) => /\d/.test(str);
const hasSpecialChar = (str: string) => /[!@#$%^&*(),.?":{}|<>]/.test(str);
const hasSequentialChars = (str: string) => {
	const sequences = ["abcdefghijklmnopqrstuvwxyz", "0123456789"];
	return sequences.some((seq) => {
		for (let i = 0; i < str.length - 2; i++) {
			const chunk = str.toLowerCase().slice(i, i + 3);
			if (seq.includes(chunk)) return true;
		}
		return false;
	});
};
const hasRepeatedChars = (str: string) => /(.)\1{2,}/.test(str);

export const signupSchema = yup.object().shape({
	email: yup
		.string()
		.required("Email is required")
		.email("Invalid email format")
		.matches(
			/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
			"Invalid email format"
		)
		.test(
			"domain",
			"Email domain cannot be temporary or disposable",
			(value) => {
				if (!value) return true;
				const disposableDomains = ["tempmail.com", "throwaway.com"];
				const domain = value.split("@")[1];
				return !disposableDomains.includes(domain);
			}
		),

	password: yup
		.string()
		.required(passwordErrors.required)
		.min(8, passwordErrors.min)
		.test("uppercase", passwordErrors.uppercase, hasUppercase)
		.test("lowercase", passwordErrors.lowercase, hasLowercase)
		.test("number", passwordErrors.number, hasNumber)
		.test("special", passwordErrors.special, hasSpecialChar)
		.test("commonWords", passwordErrors.commonWords, (value) => {
			if (!value) return true;
			return !commonWords.some((word) =>
				value.toLowerCase().includes(word.toLowerCase())
			);
		})
		.test("sequential", passwordErrors.sequential, (value) => {
			if (!value) return true;
			return !hasSequentialChars(value);
		})
		.test("repeated", passwordErrors.repeated, (value) => {
			if (!value) return true;
			return !hasRepeatedChars(value);
		})
		.test("personalInfo", passwordErrors.personal, function (value) {
			if (!value) return true;
			const email = this.parent.email;
			if (!email) return true;

			const emailParts = email.split("@")[0].toLowerCase();
			return !value.toLowerCase().includes(emailParts);
		}),

	confirmPassword: yup
		.string()
		.required("Please confirm your password")
		.test("passwords-match", "Passwords must match", function (value) {
			return value === this.parent.password;
		}),
});

export const loginSchema = yup.object().shape({
	email: yup
		.string()
		.required("Email is required")
		.email("Invalid email format"),
	password: yup
		.string()
		.required(passwordErrors.required)
		.min(8, passwordErrors.min),
});
