'use client';

import { getDateFormattedText, getTimeFormattedText } from '@/app/utils/date';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './entrance.module.css';

interface BmsData {
    ozone: string;
    pm25: string;
    pm10: string;
    temperature: string;
}

export default function EntranceOverview() {
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
        const response = await fetch(`${window.location.origin}/api/bms`, { method: 'GET' });
        if (response.status !== 200) return;
        const data = await response.json();
        setBmsParams(data);
    }, []);

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
        <div className={styles.entranceContainer}>
            <div
                className={styles.entranceTopSection}
                style={{ backgroundImage: `url(/static/background/entrance_background.png)` }}>
                <div>
                    <Image
                        width={286}
                        height={109}
                        src={
                            showPropertyIcon
                                ? `/static/property_logo/property_logo.png`
                                : `/static/property_logo/property_logo_entrance_sample.png`
                        }
                        alt='property-icon'></Image>
                </div>
                <div className={styles.entranceDatetimeContainer}>
                    <div className={styles.entranceDateText}>{dateText}</div>
                    <div className={styles.entranceTimeText}>{timeText}</div>
                </div>
            </div>
            <div className={styles.entranceDataContainer}>
                <div className={styles.entraceDataSectionWrapper}>
                    <div className={styles.entranceDataSection}>
                        <div className={styles.entranceDataIconWrapper}>
                            <Image
                                width={35}
                                height={51}
                                src='/static/icons/icon_temperature.png'
                                alt='temperature-icon'
                            />
                        </div>
                        <div className={styles.entranceDataWrapper}>
                            <div>
                                {bmsParams?.temperature}{' '}
                                <span className={styles.entranceUnitText}>°C</span>
                            </div>
                            <div className={styles.entranceDescriptionText}>
                                Outdoor Temperature
                            </div>
                        </div>
                    </div>
                    <div className={styles.entranceDataSection}>
                        <div className={styles.entranceDataIconWrapper}>
                            <Image
                                width={67}
                                height={43}
                                src='/static/icons/icon_ozone.png'
                                alt='ozone-icon'
                            />
                        </div>
                        <div className={styles.entranceDataWrapper}>
                            <div>
                                {bmsParams?.ozone}{' '}
                                <span className={styles.entranceUnitText}>
                                    g/m<sup>3</sup>
                                </span>
                            </div>
                            <div className={styles.entranceDescriptionText}>Ozone</div>
                        </div>
                    </div>
                </div>
                <div className={styles.entranceDataSectionWrapper}>
                    <div className={styles.entranceDataSection}>
                        <div className={styles.entranceDataIconWrapper}>
                            <Image
                                width={54}
                                height={49}
                                src='/static/icons/icon_pm10.png'
                                alt='pm10-icon'
                            />
                        </div>
                        <div className={styles.entranceDataWrapper}>
                            <div>
                                {bmsParams?.pm10}{' '}
                                <span className={styles.entranceUnitText}>
                                    g/m<sup>3</sup>
                                </span>
                            </div>
                            <div className={styles.entranceDescriptionText}>
                                PM10, Respirable and Fine Suspended Particles
                            </div>
                        </div>
                    </div>
                    <div className={styles.entranceDataSection}>
                        <div className={styles.entranceDataIconWrapper}>
                            <Image
                                width={55}
                                height={49}
                                src='/static/icons/icon_pm25.png'
                                alt='pm25-icon'
                            />
                        </div>
                        <div className={styles.entranceDataWrapper}>
                            <div>
                                {bmsParams?.pm25}{' '}
                                <span className={styles.entranceUnitText}>
                                    µg/m<sup>3</sup>
                                </span>
                            </div>
                            <div className={styles.entranceDescriptionText}>
                                PM2.5, Respirable and Fine Suspended Particles
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
