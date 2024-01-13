import classNames from "classnames";

export default function BaseButton(props) {
  const { children, className, ...rest } = props;

  const basicClasses =
    "font-bold text-sm py-1 px-4 rounded flex flex-row items-center gap-2";

  return (
    <button className={classNames(basicClasses, className)} {...rest}>
      {children}
    </button>
  );
}
