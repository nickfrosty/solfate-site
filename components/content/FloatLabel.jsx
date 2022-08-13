import Link from "next/link";

export function FloatLabel({
  label = "draft",
  href = null,
  display = true,
  className = "",
  overlay = false,
}) {
  // define the actual content span to display
  const spaner = (
    <span
      className={`inline-code text-white ${
        overlay ? "relative left-3 top-4" : ""} ${className}`}
    >
      {label}
    </span>
  );

  // display the correctly formatted item
  if (display) {
    if (href) {
      <Link href={href}>{spaner}</Link>;
    } else return spaner;
  } else return <></>;
}
