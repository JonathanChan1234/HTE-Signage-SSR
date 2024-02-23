'use client';

import { getDateFormattedText, getTimeFormattedText } from '@/app/utils/date';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './clubhouse.module.css';
import { useSearchParams } from 'next/navigation';

interface ClubhouseProps {
    host: string;
}

interface BmsData {
    ozone: string;
    pm25: string;
    pm10: string;
    temperature: string;
}

export default function Clubhouse({ host }: ClubhouseProps) {
    const searchParams = useSearchParams();
    const showPropertyIcon = searchParams.get('icon');

    const date = new Date();
    const [dateText, setDateText] = useState(getDateFormattedText(date));
    const [timeText, setTimeText] = useState(getTimeFormattedText(date));

    const [bmsParams, setBmsParams] = useState<BmsData>({
        ozone: '--',
        pm25: '--',
        pm10: '--',
        temperature: '--',
    });

    const fetchBMSData = useCallback(async () => {
        const response = await fetch(`${host}/api/bms`, { method: 'GET' });
        if (response.status !== 200) return;
        const data = await response.json();
        setBmsParams(data);
    }, [host]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const date = new Date();
            setDateText(getDateFormattedText(date));
            setTimeText(getTimeFormattedText(date));
        }, 1000);
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    useEffect(() => {
        fetchBMSData();
        const intervalId = setInterval(() => {
            fetchBMSData();
        }, 60000);
        return () => {
            clearInterval(intervalId);
        };
    }, [fetchBMSData]);

    return (
        <div
            className={styles.clubhouseContainer}
            style={{ backgroundImage: `url(/static/background/clubhouse_background.png)` }}>
            <div>
                <Image
                    width={286}
                    height={109}
                    src={
                        showPropertyIcon === 'true'
                            ? `/static/property_logo/property_logo.png`
                            : `/static/property_logo/property_logo_sample.png`
                    }
                    alt='property-icon'
                />
            </div>
            <div className={styles.clubhouseDataContainer}>
                <div className={styles.clubhouseDataSection}>
                    <div className={styles.clubhouseDataWrapper}>
                        <div className={styles.clubhouseDataIconWrapper}>
                            <Image
                                width={54}
                                height={49}
                                src='/static/icons/icon_pm10.png'
                                alt='pm10'
                            />
                        </div>
                        <div>
                            {bmsParams?.pm10}{' '}
                            <span className={styles.clubhouseUnitText}>
                                g/m<sup>3</sup>
                            </span>
                        </div>
                    </div>
                    <div className={styles.clubhouseDataWrapper}>
                        <div className={styles.clubhouseDataIconWrapper}>
                            <Image
                                width={55}
                                height={49}
                                src='/static/icons/icon_pm25.png'
                                alt='pm25'
                            />
                        </div>
                        <div>
                            {bmsParams?.pm25}{' '}
                            <span className={styles.clubhouseUnitText}>
                                µg/m<sup>3</sup>
                            </span>
                        </div>
                    </div>
                </div>
                <div className={styles.clubhouseDataSection}>
                    <div className={styles.clubhouseDataWrapper}>
                        <div className={styles.clubhouseDataIconWrapper}>
                            <Image
                                width={35}
                                height={51}
                                src='/static/icons/icon_temperature.png'
                                alt='temperature'
                            />
                        </div>
                        <div>
                            {bmsParams?.temperature}{' '}
                            <span className={styles.clubhouseUnitText}>°C</span>
                        </div>
                    </div>
                    <div className={styles.clubhouseDataWrapper}>
                        <div className={styles.clubhouseDataIconWrapper}>
                            <Image
                                width={67}
                                height={43}
                                src='/static/icons/icon_ozone.png'
                                alt='ozone'
                            />
                        </div>
                        <div>
                            {bmsParams?.ozone}{' '}
                            <span className={styles.clubhouseUnitText}>
                                g/m<sup>3</sup>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.clubhouseDatetimeContainer}>
                <div className={styles.clubhouseDateText}>{dateText}</div>
                <div className={styles.clubhouseTimeText}>{timeText}</div>
            </div>
        </div>
    );
}
