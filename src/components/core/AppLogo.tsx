/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
// import Burger from "../utils/Burger";

type ComponentProps = SimpleComponentProps & {
  showImage?: boolean;
  //   burger?: React.ReactNode;
  burgerSide?: "left" | "right";
};

// define the actual image component
const image = <img className="icon" src="/icon.png" alt="Solfate" />;

export default function AppLogo({
  className,
  showImage,
  //   burger,
  burgerSide,
}: ComponentProps) {
  return (
    <div
      className={`flex flex-1 justify-between items-center space-x-3 w-full1 ${
        className || ""
      } ${burgerSide == "left" ? "flex-row-reverse" : ""}`}
    >
      {/* @click="$store.commit('closeSidebars')" */}
      {/* :className="burger && burgerSide != 'left' ? 'flex-row-reverse' : ''" */}
      {/* <Burger v-if="burger" :action="'setLeftSidebar'" /> */}

      {/* <Burger /> */}
      {/* {burger && <Burger />} */}

      <Link href="/">
        {/* @click="$store.commit('closeSidebars')" */}
        {/* click="alert('derp');" */}
        <a
          title="Home"
          className="flex items-center justify-between space-x-2 whitespace-nowrap"
        >
          {showImage ? image : null}
          <span
            v-if="text"
            className="inline-block py-4 text-2xl font-bold tracking-wide"
          >
            Solfate Podcast
          </span>
        </a>
      </Link>
    </div>
  );
}
