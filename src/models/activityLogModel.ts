import mongoose, { Schema, Document } from 'mongoose';

interface IActivityLog extends Document {
    user: mongoose.Types.ObjectId;
    action: string;
    timestamp: Date;
}

const activityLogSchema = new Schema<IActivityLog>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

export default mongoose.model<IActivityLog>('ActivityLog', activityLogSchema);
