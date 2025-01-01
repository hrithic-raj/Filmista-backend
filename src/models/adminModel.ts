import mongoose, { Document, Schema } from 'mongoose';

export interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  isSuperAdmin: boolean;
}

const adminSchema: Schema<IAdmin> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isSuperAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Admin = mongoose.model<IAdmin>('Admin', adminSchema);

export default Admin;
