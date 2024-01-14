import classNames from "classnames";
import Link from "next/link";

export default function BaseButton(props) {
  const { children, className, ...rest } = props;

  const basicClasses =
    "font-bold text-sm py-1 px-4 rounded flex flex-row items-center gap-2";

  const Component = rest.href ? Link : "button";

  return (
    <Component className={classNames(basicClasses, className)} {...rest}>
      {children}
    </Component>
  );
}
