import { useRef, useEffect, useState } from "react";
import styles from "../styles/menu.module.scss";

import List from "./List";

import data from "../data/list";

const standardMargin = 24;
const standardHeight = 48;
const scale = 1 / 0.6; // starting scale

function _() {
  const ref = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  const [hovered, hover] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [subPosition, setSubPosition] = useState({ left: 0, top: 0 });

  const hoveredData = (hovered && data[hovered].items) || null;

  const handleMouseDown = (x: number, y: number) => {
    if (ref.current) {
      const position = handleMenuPosition(ref.current, x, y, standardMargin);
      if (position) setPosition(position);

      if (position && subRef.current) {
        const subPosition = handleMenuPosition(subRef.current, x, y, 0);
        const guessHeight = hoveredData
          ? standardHeight * hoveredData.length - 1
          : 0;

        // horizontal stack
        if (
          subPosition &&
          position.left + position.adjustedWidth + subPosition.adjustedWidth >
            window.innerWidth - standardMargin
        ) {
          subPosition.left = position.left - subPosition.adjustedWidth;
        } else if (subPosition) {
          subPosition.left = position.left + subPosition.adjustedWidth;
        }

        // vertical stack
        // console.log(guessHeight);
        // if (
        //   subPosition &&
        //   position.top + position.adjustedHeight + subPosition.adjustedHeight >=
        //     window.innerHeight - standardMargin * 2
        // ) {
        //   subPosition.top = window.innerHeight - standardMargin - guessHeight;
        // } else if (subPosition) {
        //   // subPosition.top = position.top + subPosition.adjustedHeight;
        // }

        if (subPosition) setSubPosition(subPosition);
      }
    }
  };

  const handleMenuPosition = (
    element: HTMLDivElement,
    x: number,
    y: number,
    margin: number = standardMargin
  ) => {
    const { left, top, width, height } = element.getBoundingClientRect();
    var adjustedWidth = width * scale;
    var adjustedHeight = height * scale;

    const isWithin =
      (x > left && x < left + width && y > top && y < top + height) ||
      (x > left && x < left + width && y > top && y < top + height);

    if (isWithin && visible) {
      return null;
    }
    if (!isWithin && visible) {
      setVisible(false);
      hover(null);
      return null;
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
    return {
      left: newLeft,
      top: newTop,
      adjustedWidth,
      adjustedHeight,
    };
  };

  return (
    <div
      className={styles.main}
      onClick={(e) => {
        handleMouseDown(e.clientX, e.clientY);
      }}
    >
      {/* Main menu */}
      <div
        ref={ref}
        className={`${styles.menu} ${visible ? styles.visible : ""}`}
        style={{ top: position.top, left: position.left }}
      >
        <List data={data} onHover={(index: number) => hover(index)} />
      </div>
      {/* Sub menu */}

      <div
        ref={subRef}
        className={`${styles.menu} ${hoveredData ? styles.visible : ""}`}
        style={{ top: subPosition.top, left: subPosition.left }}
      >
        <List data={hoveredData} />
      </div>
    </div>
  );
}

export default _;
