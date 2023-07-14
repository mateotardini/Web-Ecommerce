import React from 'react';
/*CSS*/
import styles from '../css/LoadingDots.module.css';

const LoadingDots = () => {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.loadingDot} />
            <div className={styles.loadingDot} />
            <div className={styles.loadingDot} />
        </div>
    );
};

export default LoadingDots;