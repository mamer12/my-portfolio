"use client";

import React from 'react';
import styles from './Earth.module.scss';

interface EarthProps {
    className?: string;
    style?: React.CSSProperties;
}

const Earth: React.FC<EarthProps> = ({ className, style }) => {
    return (
        <div className={`${styles.earthContainer} ${className || ''}`} style={style}>
            <div className={styles.earth}>
                <div className={styles.sphere}></div>
            </div>
            <div className={styles.glow}></div>
        </div>
    );
};

export { Earth };