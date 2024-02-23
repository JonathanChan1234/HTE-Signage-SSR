'use client';
import styles from './lift.module.css';

import { useEffect, useState } from 'react';
import { weatherWarningParser } from '../../utils/weather';
import { getDateFormattedText, getTimeFormattedText } from '../../utils/date';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

interface WeatherData {
    temperature: string;
    humidity: string;
}

export default function Lift() {
    const searchParams = useSearchParams();
    const showDemoIcon = searchParams.get('demo');
    const showPropertyIcon = searchParams.get('icon');

    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [weather, setWeather] = useState<WeatherData>({
        temperature: '--',
        humidity: '--',
    });
    const [warnings, setWarnings] = useState<string[]>([]);

    const fetchCurrentWeather = async () => {
        const response = await fetch(
            'https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en',
            { method: 'GET' }
        );
        if (response.status !== 200) return;
        const data = await response.json();
        setWeather({
            temperature: data.temperature.data[0].value,
            humidity: data.humidity.data[0].value,
        });
    };

    const fetchWeatherWarning = async () => {
        const response = await fetch(
            'https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=warnsum&lang=en',
            { method: 'GET' }
        );
        if (response.status !== 200) return;
        const data = await response.json();
        setWarnings(weatherWarningParser(data));
    };

    const updateDateTime = () => {
        const d = new Date();
        setDate(getDateFormattedText(d));
        setTime(getTimeFormattedText(d));
    };

    useEffect(() => {
        updateDateTime();
        const intervalId = setInterval(updateDateTime, 1000);
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    useEffect(() => {
        fetchCurrentWeather();
        const intervalId = setInterval(fetchCurrentWeather, 300000);
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    useEffect(() => {
        // if the query parameter "demo" is a valid number
        if (showDemoIcon && !Number.isNaN(showDemoIcon)) {
            switch (showDemoIcon) {
                case '1':
                    setWarnings(['cold.gif']);
                    return;
                case '2':
                    setWarnings(['cold.gif', 'frost.gif']);
                    return;
                case '3':
                    setWarnings(['cold.gif', 'frost.gif', 'raina.gif']);
                    return;
                default:
                    setWarnings(['cold.gif', 'frost.gif', 'raina.gif', 'tc8c.gif']);
                    return;
            }
        }
        fetchWeatherWarning();
        const intervalId = setInterval(fetchWeatherWarning, 300000);
        return () => {
            clearInterval(intervalId);
        };
    }, [showDemoIcon]);

    return (
        <div
            className={styles.liftContainer}
            style={{ backgroundImage: `url(/static/background/lift_background.png)` }}>
            <div className={styles.propertyIcon}>
                <Image
                    width={190}
                    height={72}
                    src={
                        showPropertyIcon
                            ? `/static/property_logo/property_logo_lift.png`
                            : `/static/property_logo/property_logo_lift_sample.png`
                    }
                    alt='property-icon'
                />
            </div>
            <div className={styles.weatherDataContainer}>
                <div className={styles.weatherDataWrapper}>
                    <Image
                        className={styles.weatherIcon}
                        src='/static/icons/icon_temperature.png'
                        alt='temperature_icon'
                        width={20}
                        height={30}
                    />
                    <div className={styles.dataText}>
                        {weather.temperature}
                        {` `}
                        <span className={styles.unitText}>°C</span>
                    </div>
                </div>
                <div className={styles.weatherDataWrapper}>
                    <Image
                        className={styles.weatherIcon}
                        src='/static/icons/icon_humidity.png'
                        alt='humidity_icon'
                        width={20}
                        height={30}
                    />
                    <div className={styles.dataText}>
                        {weather.humidity}
                        {` `}
                        <span className={styles.unitText}>%</span>
                    </div>
                </div>
            </div>
            {warnings.length === 0 ? null : (
                <div className={styles.warningsContainer}>
                    {warnings.map(warning => (
                        <Image
                            key={warning}
                            src={`/static/weather/${warning}`}
                            alt='warning-icon'
                            className={styles.warningIcon}
                            height={50}
                            width={50}
                        />
                    ))}
                </div>
            )}
            <div className={styles.liftDateTimeContainer}>
                <div className={styles.liftDateText}>{date}</div>
                <div className={styles.liftTimeText}>{time}</div>
            </div>
        </div>
    );
}
