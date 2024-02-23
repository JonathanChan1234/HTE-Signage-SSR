import EntranceOverview from './EntranceOverview';

export default function Entrance() {
    const host = process.env['SERVER_HOST'] || 'http://127.0.0.1:3000';
    return (
        <div>
            <EntranceOverview host={host} />
        </div>
    );
}
