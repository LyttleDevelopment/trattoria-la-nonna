import type {Metadata} from 'next';
import MenuExperience from '@/components/MenuExperience';

export const metadata: Metadata = {
    title: 'Menukaart',
    description: 'De menukaart met gerechten en dranken van La Nonna Cucina.',
};

export default function MenuPage() {
    return <MenuExperience/>;
}
