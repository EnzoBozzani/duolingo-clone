import { lessons, units } from '@/db/schema';

import { UnitBanner } from './unit-banner';
import { LessonButton } from './lesson-button';

type UnitProps = {
	id: number;
	order: number;
	title: string;
	description: string;
	lessons: (typeof lessons.$inferSelect & {
		completed: boolean;
	})[];
	activeLesson:
		| (typeof lessons.$inferSelect & {
				unit: typeof units.$inferSelect;
		  })
		| undefined;
	activeLessonPorcentage: number;
};

export const Unit = ({ activeLesson, activeLessonPorcentage, description, id, lessons, order, title }: UnitProps) => {
	return (
		<>
			<UnitBanner
				title={title}
				description={description}
			/>
			<div className='flex items-center flex-col relative'>
				{lessons.map((lesson, i) => {
					const isCurrent = lesson.id === activeLesson?.id;
					const isLocked = !lesson.completed && !isCurrent;

					return (
						<LessonButton
							id={lesson.id}
							key={lesson.id}
							index={i}
							totalCount={lessons.length - 1}
							current={isCurrent}
							locked={isLocked}
							percentage={activeLessonPorcentage}
						/>
					);
				})}
			</div>
		</>
	);
};
