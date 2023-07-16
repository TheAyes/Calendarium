import mongoose, { Schema } from 'mongoose';

interface IUser extends mongoose.Document {
	userId: string;
	displayName: string;
	password: string;
	email: string;
}

const UserSchema = new Schema({
	displayName: {
		type: String,
		require: true,
	},
	userId: {
		type: String,
		require: true,
	},
	email: {
		type: String,
		require: true,
	},
	emailIsVerified: {
		type: Boolean,
		require: false,
	},
	password: {
		type: String,
		require: true,
	},
});

export const User = mongoose.model<IUser>('User', UserSchema);
