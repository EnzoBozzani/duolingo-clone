import { auth } from '@clerk/nextjs/server';

const allowedIds = ['user_2gShS3kK7k9psquMoESspYKHHkS'];

export const isAdmin = () => {
	const { userId } = auth();

	if (!userId) return false;

	return allowedIds.includes(userId);
};
