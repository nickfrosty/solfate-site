// @ts-ignore
import { displayDate } from "zumo";

type ComponentProps = SimpleComponentProps & {
  date?: string;
  updatedAt?: string;
  createdAt?: string;
};

// define a common formatter for displaying the different date forms
export default function DisplayDate({
  className,
  date,
  updatedAt,
  createdAt,
}: ComponentProps) {
  if (date) return <span className={className}>{displayDate(date)}</span>;
  else if (updatedAt && updatedAt !== createdAt)
    return <span className={className}>Updated {displayDate(updatedAt)}</span>;
  else if (!date && createdAt)
    return (
      <span className={className}>Published {displayDate(createdAt)}</span>
    );
  else return <></>;
}
