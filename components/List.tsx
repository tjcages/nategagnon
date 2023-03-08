import Image from "next/image";
import styles from "../styles/list.module.scss";

import { ItemProps } from "../data/list";

interface Props {
  data?: ItemProps[] | null;
  visible?: boolean;
  onHover?: (index: number) => void;
}

function _({ data, visible, onHover }: Props) {
  const renderItem = (item: ItemProps, index: number) => {
    switch (item.type) {
      case "title":
        return (
          <div
            key={index}
            className={styles.header}
            onMouseEnter={() => {
              if (visible && onHover) onHover(index);
            }}
          >
            <h5>{item.name}</h5>
            {item.icon && (
              <Image src={item.icon} alt="logo" width={20} height={20} />
            )}
            {item.key && <p>{item.key}</p>}
          </div>
        );
      case "header":
        return (
          <div
            key={index}
            className={styles.header}
            onMouseEnter={() => {
              if (visible && onHover) onHover(index);
            }}
          >
            <h5 className={styles.dim}>{item.name}</h5>
            {item.icon && (
              <Image src={item.icon} alt="logo" width={20} height={20} />
            )}
            {item.key && <p>{item.key}</p>}
          </div>
        );
      case "item":
        return (
          <div
            key={index}
            className={styles.item}
            onMouseEnter={() => {
              if (visible && onHover) onHover(index);
            }}
          >
            <h5>{item.name}</h5>
            {item.icon && (
              <Image src={item.icon} alt="icon" width={12} height={12} />
            )}
            {item.key && <p>{item.key}</p>}
          </div>
        );
      case "upcoming":
        return (
          <div
            key={index}
            className={styles.item}
            onMouseEnter={() => {
              if (visible && onHover) onHover(index);
            }}
          >
            <h5 className={styles.dim}>{item.name}</h5>
            {item.icon && (
              <Image src={item.icon} alt="icon" width={12} height={12} />
            )}
            {item.key && <p>{item.key}</p>}
          </div>
        );
      default:
        return <hr />;
    }
  };

  return (
    <div className={styles.main}>
      {data && data.map((item, index) => renderItem(item, index))}
    </div>
  );
}

export default _;
