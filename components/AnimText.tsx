import { useEffect } from "react";
import { animateIn } from "@/modules/text";

interface CustomHeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  animate?: string;
  split?: string;
  key?: string;
  delay?: number;
}

function _(props: CustomHeadingProps) {
  const {
    split = "word",
    key = "header",
    delay = 0,
    children,
    ...rest
  } = props;

  useEffect(() => {
    console.log(delay);
    setTimeout(() => {
      animateIn(split, key);
    }, delay);
  }, []);

  return (
    <div animate={key} style={{ overflow: "hidden" }} {...rest}>
      {children}
    </div>
  );
}

export default _;
