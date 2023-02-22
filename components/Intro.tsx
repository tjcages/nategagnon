import Image from "next/image";
import { motion } from "framer-motion";

import styles from "@/styles/intro.module.scss";

function _() {
  return (
    <div className={styles.main}>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.25,
          ease: "easeOut",
        }}
      >
        <Image
          src="/img/cursor.png"
          alt="cursor"
          width={64}
          height={64}
          style={{ width: "auto", height: "auto" }}
        />
        <div className={styles.header}>
          <motion.h5
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 0.5,
              delay: 0.5,
              ease: "easeOut",
            }}
          >
            Click anywhere
          </motion.h5>
        </div>
      </motion.div>
    </div>
  );
}

export default _;
