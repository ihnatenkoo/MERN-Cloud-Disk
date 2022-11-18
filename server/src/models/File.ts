import { Schema, model, Types } from 'mongoose';

const fileSchema = new Schema({
	name: { type: String, required: true },
	type: { type: String, required: true },
	accessLink: { type: String },
	size: { type: Number, default: 0 },
	date: { type: Date, default: Date.now() },
	path: { type: String, default: '' },
	user: { type: Types.ObjectId, ref: 'User' },
	parent: { type: Types.ObjectId, ref: 'File' },
	children: [{ type: Types.ObjectId, ref: 'File' }],
});

const File = model('File', fileSchema);

export default File;
