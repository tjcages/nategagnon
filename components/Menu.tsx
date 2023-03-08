import { useRef, useEffect, useState } from "react";
import styles from "../styles/menu.module.scss";

import List from "./List";

import data from "../data/list";

const standardMargin = 24;
const scale = 0.6; // starting scale

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
      const clickPosition = handleMenuPosition(
        ref.current,
        x,
        y,
        standardMargin
      );
      if (clickPosition) setPosition(clickPosition);

      if (clickPosition && subRef.current) {
        var subLeft = clickPosition.left;
        var subTop = clickPosition.top;
        const subSize = subRef.current.getBoundingClientRect();
        const right =
          clickPosition.left +
          (clickPosition.adjustedWidth + subSize.width) / scale;
        const top = clickPosition.top + clickPosition.adjustedHeight / scale;
        if (right >= window.innerWidth - standardMargin) {
          subLeft -= clickPosition.adjustedWidth + subSize.width * scale;
        } else {
          subLeft += clickPosition.adjustedWidth + subSize.width * scale;
        }
        if (top >= window.innerHeight - standardMargin) {
          subTop -= (clickPosition.adjustedHeight - subSize.height);
        }

        setSubPosition({
          left: subLeft,
          top: subTop,
        });
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
    var adjustedWidth = width;
    var adjustedHeight = height;

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
    if (x + adjustedWidth / scale > window.innerWidth - margin) {
      newLeft = window.innerWidth - adjustedWidth / scale - margin;
    }
    // determine if bottom is outside of window & set to window height if so
    if (y + adjustedHeight / scale > window.innerHeight - margin) {
      newTop = window.innerHeight - adjustedHeight / scale - margin;
    }
    return {
      left: newLeft,
      top: newTop,
      adjustedWidth,
      adjustedHeight,
    };
  };

  useEffect(() => {}, [hovered]);

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
        <List
          data={data}
          visible={visible}
          onHover={(index: number) => hover(index)}
        />
      </div>
      {/* Sub menu */}

      <div
        ref={subRef}
        className={`${styles.menu} ${hoveredData ? styles.visible : ""}`}
        style={{ top: subPosition.top, left: subPosition.left }}
      >
        <List visible={visible} data={hoveredData} />
      </div>
    </div>
  );
}

export default _;
