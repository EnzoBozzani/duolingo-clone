import { redirect } from 'next/navigation';

import { getCourseProgress, getLessonPorcentage, getUnits, getUserProgress, getUserSubscription } from '@/db/queries';
import { FeedWrapper } from '@/components/feed-wrapper';
import { StickyWrapper } from '@/components/sticky-wrapper';
import { UserProgress } from '@/components/user-progress';
import { Promo } from '@/components/promo';
import { Quests } from '@/components/quests';

import { Header } from './header';
import { Unit } from './unit';

const LearnPage = async () => {
	const userProgressPromise = getUserProgress();
	const unitsPromise = getUnits();
	const courseProgressPromise = getCourseProgress();
	const lessonPercentagePromise = getLessonPorcentage();
	const userSubscriptionPromise = getUserSubscription();

	const [userProgress, units, courseProgress, lessonPercentage, userSubscription] = await Promise.all([
		userProgressPromise,
		unitsPromise,
		courseProgressPromise,
		lessonPercentagePromise,
		userSubscriptionPromise,
	]);

	if (!userProgress || !userProgress.activeCourse || !courseProgress) {
		redirect('/courses');
	}

	const isPro = !!userSubscription?.isActive;

	return (
		<div className='flex flex-row-reverse gap-[48px] px-6'>
			<StickyWrapper>
				<UserProgress
					activeCourse={userProgress.activeCourse}
					hearts={userProgress.hearts}
					points={userProgress.points}
					hasActiveSubscription={isPro}
				/>
				{!isPro && <Promo />}
				<Quests points={userProgress.points} />
			</StickyWrapper>
			<FeedWrapper>
				<Header title={userProgress.activeCourse.title} />
				{units.map((unit) => (
					<div
						key={unit.id}
						className='mb-10'
					>
						<Unit
							id={unit.id}
							order={unit.order}
							description={unit.description}
							title={unit.title}
							lessons={unit.lessons}
							activeLesson={courseProgress.activeLesson}
							activeLessonPorcentage={lessonPercentage}
						/>
					</div>
				))}
			</FeedWrapper>
		</div>
	);
};

export default LearnPage;
