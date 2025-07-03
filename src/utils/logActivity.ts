import Activity from '../models/activityModel';

export const logActivity = async (userId: string, action: string) => {
    try {
        await Activity.create({ userId, action });
    } catch (error) {
        console.error("Activity log failed", error);
    }
};
