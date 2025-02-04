import { Fragment } from "react";
import CategorySection from "./_partials/CategorySection";
import LatestSection from "./_partials/LatestSection";

export default function Home() {
  return (
    <Fragment>
      <CategorySection />
      <LatestSection />
    </Fragment>
  );
}
