import Lottie from 'lottie-react';
import styles from '../styles/invite.module.css';
import animationData from '../public/lottie/home.json';

export default function LottieHero() {
    return (
        <div className={styles.hero}>
            <div style={{ width: '200px', height: '200px' }}>
                <Lottie animationData={animationData} loop={true} />
            </div>
        </div>
    );
}
