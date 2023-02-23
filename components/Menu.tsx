import { useRef, useEffect, useState } from "react";
import styles from "../styles/menu.module.scss";

import List from "./List";

const margin = 24;
const scale = 1 / 0.6; // starting scale

function _() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ left: 0, top: 0 });

  const handleMouseDown = (x: number, y: number) => {
    if (ref.current) {
      // determine if coordinates are within ref
      const { left, top, width, height } = ref.current.getBoundingClientRect();
      var adjustedWidth = width * scale;
      var adjustedHeight = height * scale;
      const isWithin =
        x > left && x < left + width && y > top && y < top + height;

      if (isWithin && visible) {
        return;
      }
      if (!isWithin && visible) {
        setVisible(false);
        return;
      }
      if (!visible) {
        setVisible(true);
      }

      var newLeft = x;
      var newTop = y;

      // determine if left is outside of window & set to 0 if so
      if (newLeft < margin) {
        newLeft = margin;
      }
      // determine if top is outside of window & set to 0 if so
      if (newTop < margin) {
        newTop = margin;
      }
      // determine if right is outside of window & set to window width if so
      if (x + adjustedWidth > window.innerWidth - margin) {
        newLeft = window.innerWidth - adjustedWidth - margin;
      }
      // determine if bottom is outside of window & set to window height if so
      if (y + adjustedHeight > window.innerHeight - margin) {
        newTop = window.innerHeight - adjustedHeight - margin * 2;
      }

      setPosition({
        left: newLeft,
        top: newTop,
      });
    }
  };

  return (
    <div
      className={styles.main}
      onClick={(e) => {
        handleMouseDown(e.clientX, e.clientY);
      }}
    >
      <div
        ref={ref}
        className={`${styles.container} ${visible ? styles.visible : ""}`}
        style={{ top: position.top, left: position.left }}
      >
        <List />
      </div>
    </div>
  );
}

export default _;
