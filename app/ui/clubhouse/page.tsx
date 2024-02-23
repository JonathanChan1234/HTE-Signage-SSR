import Clubhouse from './Clubhouse';
import { cookies } from 'next/headers';

export default function Page() {
    const host = process.env['SERVER_HOST'] || 'http://127.0.0.1:3000';
    const cookieStore = cookies();
    return (
        <div>
            <Clubhouse host={host} />
        </div>
    );
}
