'use client';

import { use, useState } from 'react';

import { challengeOptions, challenges } from '@/db/schema';

import { Header } from './header';
import { QuestionBubble } from './question-bubble';
import { Challenge } from './challenge';
import { Footer } from './footer';

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
	const [challenges, setChallenges] = useState(initialLessonChallenges);
	const [activeIndex, setActiveIndex] = useState(() => {
		const uncompletedIndex = challenges.findIndex((challenge) => !challenge.completed);

		return uncompletedIndex === -1 ? 0 : uncompletedIndex;
	});

	const [selectedOption, setSelectedOption] = useState<number>();
	const [status, setStatus] = useState<'correct' | 'wrong' | 'none'>('none');

	const challenge = challenges[activeIndex];
	const options = challenge?.challengeOptions ?? [];

	const onNext = () => {
		setActiveIndex((current) => current + 1);
	};

	const onSelect = (id: number) => {
		if (status !== 'none') return;

		setSelectedOption(id);
	};

	const onContinue = () => {
		if (!selectedOption) return;

		if (status === 'wrong') {
			setStatus('none');
			setSelectedOption(undefined);
			return;
		}

		if (status === 'correct') {
			onNext();
			setStatus('none');
			setSelectedOption(undefined);
			return;
		}

		const correctOption = options.find((option) => option.correct);

		if (!correctOption) return;

		if (selectedOption === correctOption.id) {
			// setStatus('correct');
			// setPercentage((current) => current + 10);
			// return;
			alert('Correct');
		} else {
			alert('Wrong');
		}
	};

	const title = challenge.type === 'ASSIST' ? 'Select the correct meaning' : challenge.question;

	return (
		<>
			<Header
				hearts={hearts}
				percentage={percentage}
				hasActiveSubscription={!!userSubscription?.isActive}
			/>
			<div className='flex-1'>
				<div className='h-full flex items-center justify-center'>
					<div className='lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12'>
						<h1 className='text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700'>
							{title}
						</h1>
						<div>
							{challenge.type === 'ASSIST' && <QuestionBubble question={challenge.question} />}
							<Challenge
								options={options}
								onSelect={onSelect}
								status={status}
								selectedOption={selectedOption}
								disabled={false}
								type={challenge.type}
							/>
						</div>
					</div>
				</div>
			</div>
			<Footer
				disabled={!selectedOption}
				status={status}
				onCheck={onContinue}
			/>
		</>
	);
};
