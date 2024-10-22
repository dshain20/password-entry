import clx from "classnames";

interface IBanner {
  label: string;
  className?: string;
}

const Banner = ({ className, label }: IBanner) => (
  <div
    className={clx(
      "bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded relative",
      className
    )}
    role="alert"
  >
    <small>{label}</small>
  </div>
);

export default Banner;
