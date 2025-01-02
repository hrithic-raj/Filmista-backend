import mongoose, { Document, Schema } from 'mongoose';
import IAdmin from '../interfaces/adminInterface';

const adminSchema: Schema<IAdmin> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    refreshToken: { type: String },
    role:{ type: String, default: 'admin'},
    isSuperAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Admin = mongoose.model<IAdmin>('Admin', adminSchema);

export default Admin;
