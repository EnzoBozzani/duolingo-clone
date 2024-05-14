import { Button } from '@/components/ui/button';

const Home = () => {
	return (
		<div className='space-x-4'>
			<Button>CLick me!</Button>
			<Button variant={'primary'}>CLick me!</Button>
			<Button variant={'primaryOutline'}>CLick me!</Button>
			<Button variant={'secondary'}>CLick me!</Button>
			<Button variant={'secondaryOutline'}>CLick me!</Button>
			<Button variant={'danger'}>CLick me!</Button>
			<Button variant={'dangerOutline'}>CLick me!</Button>
			<Button variant={'super'}>CLick me!</Button>
			<Button variant={'superOutline'}>CLick me!</Button>
			<Button variant={'ghost'}>CLick me!</Button>
			<Button variant={'sidebar'}>CLick me!</Button>
			<Button variant={'sidebarOutline'}>CLick me!</Button>
		</div>
	);
};

export default Home;
