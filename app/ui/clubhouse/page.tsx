import { Metadata } from 'next';
import Clubhouse from './Clubhouse';

export const dynamic = 'force-dynamic';

export default function Page() {
    return (
        <div>
            <Clubhouse />
        </div>
    );
}

export const metadata: Metadata = {
    title: 'Clubhouse',
};
