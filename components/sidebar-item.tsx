'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { Button } from './ui/button';
import Image from 'next/image';

type SidebarItemProps = {
	label: string;
	iconSrc: string;
	href: string;
};

export const SidebarItem = ({ label, iconSrc, href }: SidebarItemProps) => {
	const pathname = usePathname();
	const active = pathname === href;

	return (
		<Button
			variant={active ? 'sidebarOutline' : 'sidebar'}
			asChild
			className='justify-start h-[52px]'
		>
			<Link href={href}>
				<Image
					src={iconSrc}
					alt={label}
					className='mr-5'
					height={32}
					width={32}
				/>
				{label}
			</Link>
		</Button>
	);
};
