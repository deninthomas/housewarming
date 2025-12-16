import Head from 'next/head';
import styles from '../styles/invite.module.css';

export default function AccessDenied() {
    return (
        <div className={styles.accessDenied}>
            <Head>
                <title>Access Denied</title>
            </Head>
            <h1>403 - Access Denied</h1>
            <p>This invitation is invalid, expired, or has already been used.</p>
        </div>
    );
}
