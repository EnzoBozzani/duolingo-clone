'use client';

import { useState } from 'react';

import { challengeOptions, challenges } from '@/db/schema';

import { Header } from './header';

type QuizProps = {
	initialPercentage: number;
	initialHearts: number;
	initialLessonChallenges: (typeof challenges.$inferSelect & {
		completed: boolean;
		challengeOptions: (typeof challengeOptions.$inferSelect)[];
	})[];
	initialLessonId: number;
	userSubscription: any;
};

export const Quiz = ({
	initialHearts,
	initialLessonChallenges,
	initialLessonId,
	initialPercentage,
	userSubscription,
}: QuizProps) => {
	const [hearts, setHearts] = useState(initialHearts);
	const [percentage, setPercentage] = useState(initialPercentage);

	return (
		<>
			<Header
				hearts={hearts}
				percentage={percentage}
				hasActiveSubscription={!!userSubscription?.isActive}
			/>
		</>
	);
};
