import { HeartIcon } from "@heroicons/react/solid";
import Link from "next/link";
import FooterLearnSection from "./footer/FooterLearnSection";
import FooterResourcesSection from "./footer/FooterResourcesSection";
import FooterUsefulSection from "./footer/FooterUsefulSection";

export default function AppFooter() {
  // define the sizes of the two section of the footer
  const trademarkSize = "md:w-1/2";
  const linkSectionSize = "md:w-1/2";

  // const trademarkSize = "md:w-2/5";
  // const linkSectionSize = "md:w-3/5";

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="lg:text-left flex flex-wrap text-left">
          <div className={`${trademarkSize} mb-4 w-full`}>
            <div className="flex justify-between items-center">
              <Link href="/">
                <a className="inline-block py-2 text-3xl font-bold text-white">
                  Solfate
                </a>
              </Link>
              <div className="md:hidden block">
                <a
                  href="https://twitter.com/SolfateLabs"
                  className="btn btn-sm btn-twitter px-4"
                  target="_blank"
                  rel="noreferrer"
                >
                  @SolfateLabs
                </a>
              </div>
            </div>
            <p className="block mt-0 mb-2 text-lg text-gray-600">
              Copyright &copy; {new Date().getFullYear()}
              {/* Solfate Labs */}
            </p>

            <p className="flexer block mt-0 mb-2 space-x-2 text-sm text-gray-600">
              <HeartIcon className="icon-xs text-red-500" />
              <span>
                by{" "}
                <a
                  href="https://frostbutter.com"
                  className="link-muted"
                  target="_blank"
                  rel="noreferrer"
                >
                  Nick Frostbutter
                </a>
              </span>
            </p>

            <div className="md:inline-block hidden">
              <a
                href="https://twitter.com/SolfateLabs"
                className="btn btn-sm btn-twitter px-4"
                target="_blank"
                rel="noreferrer"
              >
                @SolfateLabs
              </a>
            </div>
          </div>

          <div className={`${linkSectionSize} w-full`}>
            <div className="items-top flex flex-wrap mb-6">
              {/* <FooterLearnSection columns={3} /> */}

              <FooterUsefulSection columns={2} />

              {/* <FooterResourcesSection columns={3} /> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
