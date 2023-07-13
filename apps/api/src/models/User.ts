import mongoose, { Schema } from 'mongoose';

interface IUser extends mongoose.Document {
	userId: string;
	displayName: string;
	password: string;
	todos: [
		{
			title: string;
			completed: boolean;
		}
	];
}

const UserSchema = new Schema({
	userId: {
		type: String,
		require: true,
	},
	email: {
		type: String,
		require: true,
	},
	password: {
		type: String,
		require: true,
	},
});

export const User = mongoose.model<IUser>('User', UserSchema);
