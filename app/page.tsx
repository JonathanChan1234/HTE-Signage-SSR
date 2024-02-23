import Image from 'next/image';

export default function Home() {
    return (
        <div className='m-3'>
            <h1>Index Page</h1>
            <ul>
                <li>
                    <a href={`/weather`}>Weather</a>
                </li>
                <li>
                    <a href={`/weatherSm`}>Weather (Small Size)</a>
                </li>
                <li>
                    <a href={`/notice?index=1`}>Notice</a>
                </li>
                <li>
                    <a href={`/clubhouse`}>Clubhouse</a>
                </li>
            </ul>
        </div>
    );
}
