import work from "./work";
import side from "./side";

interface ItemProps {
  type?: string;
  name?: string;
  key?: string;
  icon?: string;
  items?: ItemProps[];
}

const data = [
  {
    type: "title",
    name: "Nate Gagnon",
    icon: "/img/logo.png",
  },
  {},
  {
    type: "item",
    name: "About",
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
    name: "Client Work",
    icon: "/img/chevron.png",
    items: work,
  },
  {
    type: "item",
    name: "Side Projects",
    icon: "/img/chevron.png",
    items: side,
  },
  {
    type: "item",
    name: "OFF––Brand",
    key: "⌘B",
  },
  {
    type: "item",
    name: "Leisureboi",
    key: "⌘L",
  },
] as (ItemProps | {})[];

export type { ItemProps };
export default data as ItemProps[];
