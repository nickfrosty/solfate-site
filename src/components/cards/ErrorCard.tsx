/* eslint-disable @next/next/no-img-element */
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import styles from "@/styles/card.module.css";

export default function ErrorCard({
  title = "An error occurred!",
  msg = "An unknown error occurred. Please try again.",
}) {
  return (
    <div className={`${styles.card} ${styles.error} text-left`}>
      <div className="icon-lg">
        <ExclamationTriangleIcon className="" />
      </div>

      <div className="space-y-2">
        <h4 className="heading">{title}</h4>
        {msg ? <p className="">{msg}</p> : <></>}
      </div>
    </div>
  );
}
