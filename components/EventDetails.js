import styles from '../styles/invite.module.css';

export default function EventDetails() {
    return (
        <div className={styles.details}>
            <div className={styles.detailRow}>
                <span className={styles.icon}>📅</span>
                <span>December 31, 2025</span>
            </div>
            <div className="detailRow">
                <span className="icon">⏰</span>
                <span>05:00 PM Onwards</span>
            </div>
            <div className={styles.detailRow}>
                <span className={styles.icon}>📍</span>
                <span>Olive Ourania, Flat Number 10 D</span>
            </div>
        </div>
    );
}
