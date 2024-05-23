import { Metadata } from 'next';
import EntranceOverview from './EntranceOverview';

export const dynamic = 'force-dynamic';

export default function Entrance() {
    return (
        <div>
            <EntranceOverview />
        </div>
    );
}

export const metadata: Metadata = {
    title: 'Entrance',
};
