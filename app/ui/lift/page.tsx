import { Metadata } from 'next';
import Lift from './Lift';

export default function Page() {
    return (
        <div>
            <Lift />
        </div>
    );
}

export const metadata: Metadata = {
    title: 'Lift',
};
