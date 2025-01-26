"use client";

import React from "react";
import { Flex } from "@/once-ui/components";
import styles from "./Loader.module.scss";

const Loader = () => {
  return (
    <Flex
      fillWidth
      fillHeight
      justifyContent="center"
      alignItems="center"
      className={styles.loader}
    >
      <div className={styles.loaderContainer}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.shadow}></div>
        <div className={styles.shadow}></div>
        <div className={styles.shadow}></div>
        <span>Loading</span>
      </div>
    </Flex>
  );
};

export default Loader;
