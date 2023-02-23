import Image from "next/image";
import styles from "../styles/list.module.scss";

const items = [
  {
    type: "header",
    name: "Nate Gagnon",
    icon: "/img/logo.png",
  },
  {},
  {
    type: "item",
    name: "About me",
    icon: "/img/chevron.png",
  },
  {
    type: "item",
    name: "Contact/Email",
    key: "⌘E",
  },
  {},
  {
    type: "item",
    name: "OFF––Brand",
    key: "⌘O",
  },
  {
    type: "item",
    name: "Leisureboi",
    key: "⌘L",
  },
  {
    type: "item",
    name: "Projects",
    icon: "/img/chevron.png",
  },
  {
    type: "item",
    name: "Apps",
    icon: "/img/chevron.png",
  },
];

function _() {
  const renderItem = (item: any, index: number) => {
    switch (item.type) {
      case "header":
        return (
          <div key={index} className={styles.header}>
            <h5>{item.name}</h5>
            {item.icon && (
              <Image src={item.icon} alt="logo" width={28} height={28} />
            )}
            {item.key && <p>{item.key}</p>}
          </div>
        );
      case "item":
        return (
          <div key={index} className={styles.item}>
            <h5>{item.name}</h5>
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
      {items.map((item, index) => renderItem(item, index))}
    </div>
  );
}

export default _;
