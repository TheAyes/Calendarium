import { Translation } from '../types/Translation.ts';

export const translations: Translation = {
	en: {
		login: {
			label: 'Login',
			content: {
				userId: {
					placeholder: 'User ID',
					description: 'Enter your user-id.',
				},
				password: {
					placeholder: 'Password',
					description: 'Enter your Password.',
				},
				submit: {
					placeholder: 'Submit',
					description: '',
				},
			},
		},
		register: {
			label: 'Register',
			content: {
				displayName: {
					placeholder: 'Display Name',
					description: 'Enter your desired display name:',
					rules: [
						{
							description: 'Must start with a letter.',
						},
					],
				},
				userId: {
					placeholder: 'User ID',
					description: 'Enter your user-id:',
					rules: [
						{ description: 'Must begin with a lowercase letter.' },
						{ description: 'Can contain lowercase letters, numbers, underscores and hyphens.' },
						{ description: 'Must be at least 3 character and not exceed 30 characters in length.' },
					],
				},
				email: {
					placeholder: 'Email',
					description: 'Enter your email:',
					rules: [{ description: 'Must be a valid email.' }],
				},
				password: {
					placeholder: 'Password',
					description: 'Enter your Password',
					rules: [
						{ description: 'Must contain at least one lowercase letter.' },
						{ description: 'Must contain at least one uppercase letter.' },
						{ description: 'Must contain at least one digit.' },
						{ description: 'Must contain at least one special character.' },
						{ description: 'Must be at least 8 characters in length.' },
					],
				},
				confirmPassword: {
					placeholder: 'Confirm Password',
					description: 'Please confirm your password:',
					rules: [
						{ description: 'Must not be empty.' },
						{ description: 'Must match with previous password.' },
					],
				},
				submit: {
					placeholder: 'Submit',
					description: '',
				},
			},
		},
	},
	de: {
		login: {
			label: 'Anmelden',
			content: {
				userId: {
					placeholder: 'Benutzer-ID',
					description: 'Geben Sie Ihre Benutzer-ID ein',
				},
				password: {
					placeholder: 'Passwort',
					description: 'Geben Sie Ihr Passwort ein',
				},
				submit: {
					placeholder: 'Absenden',
					description: '',
				},
			},
		},
		register: {
			label: 'Registrieren',
			content: {
				displayName: {
					placeholder: 'Anzeigename',
					description: 'Geben Sie Ihren gewünschten Anzeigenamen ein:',
					rules: [
						{
							description: 'Muss mit einem Buchstaben beginnen.',
						},
					],
				},
				userId: {
					placeholder: 'Benutzer-ID',
					description: 'Geben Sie Ihre Benutzer-ID ein:',
					rules: [
						{ description: 'Muss mit einem Kleinbuchstaben beginnen.' },
						{ description: 'Kann Kleinbuchstaben, Zahlen, Unterstriche und Bindestriche enthalten.' },
						{ description: 'Muss mindestens 3 Zeichen lang sein und darf 30 Zeichen nicht überschreiten.' },
					],
				},
				email: {
					placeholder: 'E-Mail',
					description: 'Geben Sie Ihre E-Mail ein:',
					rules: [{ description: 'Muss eine gültige E-Mail-Adresse sein.' }],
				},
				password: {
					placeholder: 'Passwort',
					description: 'Geben Sie Ihr Passwort ein',
					rules: [
						{ description: 'Muss mindestens einen Kleinbuchstaben enthalten.' },
						{ description: 'Muss mindestens einen Großbuchstaben enthalten.' },
						{ description: 'Muss mindestens eine Ziffer enthalten.' },
						{ description: 'Muss mindestens ein Sonderzeichen enthalten.' },
						{ description: 'Muss mindestens 8 Zeichen lang sein.' },
					],
				},
				confirmPassword: {
					placeholder: 'Passwort bestätigen',
					description: 'Bitte bestätigen Sie Ihr Passwort:',
					rules: [
						{ description: 'Darf nicht leer sein.' },
						{ description: 'Muss mit dem vorherigen Passwort übereinstimmen.' },
					],
				},
				submit: {
					placeholder: 'Absenden',
					description: '',
				},
			},
		},
	},
	fr: {
		login: {
			label: 'Connexion',
			content: {
				userId: {
					placeholder: 'ID Utilisateur',
					description: 'Entrez votre identifiant',
				},
				password: {
					placeholder: 'Mot de passe',
					description: 'Entrez votre mot de passe',
				},
				submit: {
					placeholder: 'Soumettre',
					description: '',
				},
			},
		},
		register: {
			label: "S'inscrire",
			content: {
				displayName: {
					placeholder: "Nom d'affichage",
					description: 'Entrez le nom d’affichage souhaité:',
					rules: [
						{
							description: 'Doit commencer par une lettre.',
						},
					],
				},
				userId: {
					placeholder: 'ID Utilisateur',
					description: 'Entrez votre identifiant:',
					rules: [
						{ description: 'Doit commencer par une lettre minuscule.' },
						{
							description:
								"Peut contenir des lettres minuscules, des nombres, des traits de soulignement et des traits d'union.",
						},
						{
							description:
								'Doit comporter au moins 3 caractères et ne pas dépasser 30 caractères de longueur.',
						},
					],
				},
				email: {
					placeholder: 'Email',
					description: 'Entrez votre e-mail:',
					rules: [{ description: 'Doit être un courrier électronique valide.' }],
				},
				password: {
					placeholder: 'Mot de passe',
					description: 'Entrez votre mot de passe',
					rules: [
						{ description: 'Doit contenir au moins une lettre minuscule.' },
						{ description: 'Doit contenir au moins une lettre majuscule.' },
						{ description: 'Doit contenir au moins un chiffre.' },
						{ description: 'Doit contenir au moins un caractère spécial.' },
						{ description: 'Doit comporter au moins 8 caractères de longueur.' },
					],
				},
				confirmPassword: {
					placeholder: 'Confirmer le mot de passe',
					description: 'Veuillez confirmer votre mot de passe:',
					rules: [
						{ description: 'Ne doit pas être vide.' },
						{ description: 'Doit correspondre au mot de passe précédent.' },
					],
				},
				submit: {
					placeholder: 'Soumettre',
					description: '',
				},
			},
		},
	},
	ja: {
		login: {
			label: 'ログイン',
			content: {
				userId: {
					placeholder: 'ユーザーID',
					description: 'あなたのユーザーIDを入力してください',
				},
				password: {
					placeholder: 'パスワード',
					description: 'あなたのパスワードを入力してください',
				},
				submit: {
					placeholder: '送信',
					description: '',
				},
			},
		},
		register: {
			label: '登録',
			content: {
				displayName: {
					placeholder: '表示名',
					description: '希望する表示名を入力してください:',
					rules: [
						{
							description: '文字で始める必要があります。',
						},
					],
				},
				userId: {
					placeholder: 'ユーザーID',
					description: 'あなたのユーザーIDを入力してください:',
					rules: [
						{ description: '小文字で始める必要があります。' },
						{ description: '小文字、数字、アンダースコア、ハイフンを含めることができます。' },
						{ description: '長さは3文字以上30文字以下でなければなりません。' },
					],
				},
				email: {
					placeholder: 'Eメール',
					description: 'あなたのEメールを入力してください:',
					rules: [{ description: '有効なEメールである必要があります。' }],
				},
				password: {
					placeholder: 'パスワード',
					description: 'あなたのパスワードを入力してください',
					rules: [
						{ description: '少なくとも1つの小文字を含める必要があります。' },
						{ description: '少なくとも1つの大文字を含める必要があります。' },
						{ description: '少なくとも1つの数字を含める必要があります。' },
						{ description: '少なくとも1つの特殊文字を含める必要があります。' },
						{ description: '長さは少なくとも8文字である必要があります。' },
					],
				},
				confirmPassword: {
					placeholder: 'パスワードの確認',
					description: 'あなたのパスワードを確認してください:',
					rules: [
						{ description: '空であってはなりません。' },
						{ description: '前回のパスワードと一致する必要があります。' },
					],
				},
				submit: {
					placeholder: '送信',
					description: '',
				},
			},
		},
	},
};
