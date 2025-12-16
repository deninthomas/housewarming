import { useState, useEffect } from 'react';
import styles from '../styles/invite.module.css';

export default function Countdown({ targetDate }) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = +new Date(targetDate) - +new Date();
            let timeLeft = {};

            if (difference > 0) {
                timeLeft = {
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                };
            } else {
                timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
            }

            return timeLeft;
        };

        setTimeLeft(calculateTimeLeft());

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    return (
        <div className={styles.timerContainer}>
            <div className={styles.timerItem}>
                <span className={styles.timerValue}>{timeLeft.days}</span>
                <span className={styles.timerLabel}>Days</span>
            </div>
            <div className={styles.timerItem}>
                <span className={styles.timerValue}>{timeLeft.hours}</span>
                <span className={styles.timerLabel}>Hours</span>
            </div>
            <div className={styles.timerItem}>
                <span className={styles.timerValue}>{timeLeft.minutes}</span>
                <span className={styles.timerLabel}>Mins</span>
            </div>
            <div className={styles.timerItem}>
                <span className={styles.timerValue}>{timeLeft.seconds}</span>
                <span className={styles.timerLabel}>Secs</span>
            </div>
        </div>
    );
}
