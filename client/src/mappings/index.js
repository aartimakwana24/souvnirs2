import { ShopIcon } from "../icons";
import TimerComponent from '../components/shop/components/TimerComponent.js';
import Ratings from "../components/shop/components/Ratings.js";
import GiftOnePng from "../assets/images/giftOne.png";
import TexturePurple from "../assets/images/texturePurple.jpg.png";
import GradiantCardImgOne from "../assets/images/gradiantCardImgOne.png";
import TexturePink from "../assets/images/texturePink.jpg";
import GradiantCardImgTwo from "../assets/images/gradiantCardImgTwo.png";
import TexturePaleYellow from "../assets/images/texturePaleYellow.png";
import { PATHS } from "../Routes/paths";
import { nanoid } from "nanoid";

export const carouselMappingDailyDeals = [
  <div className="d-flex flex-column gap-4 p-4 bg-light" key={nanoid()}>
    <div className="d-flex align-items-center justify-content-center w-100">
      <div className="p-3">
        <TimerComponent date={"2023-10-01"} />
        <h3 className="fs-5">Headphones Supersonic New Adi</h3>
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="fw-semibold fs-3 text-primary">$256</h4>
          <div className="cursor-pointer border p-2 rounded-circle w-4 d-flex justify-content-center align-items-center">
            <ShopIcon />
          </div>
        </div>
        <Ratings rating={3.5} />
      </div>
    </div>
    <img className="img-fluid rounded" src={GiftOnePng} alt="" />
  </div>,
  <div className="d-flex flex-column gap-4 p-4 bg-light" key={nanoid()}>
    <div className="d-flex align-items-center justify-content-center w-50">
      <div className="p-3">
        <TimerComponent date={"2023-10-01"} />
        <h3>Headphones Supersonic New Adi</h3>
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="fw-semibold fs-3 text-primary">$256</h4>
          <div className="cursor-pointer border p-2 rounded-circle w-4 d-flex justify-content-center align-items-center">
            <ShopIcon />
          </div>
        </div>
        <Ratings rating={3.5} />
      </div>
    </div>
    <img className="img-fluid rounded" src={GiftOnePng} alt="" />
  </div>,
  <div className="d-flex flex-column gap-4 p-4 bg-light" key={nanoid()}>
    <div className="d-flex align-items-center justify-content-center w-100">
      <div className="p-3">
        <TimerComponent date={"2023-10-01"} />
        <h3>Headphones Supersonic New Adi</h3>
        <div className="d-flex justify-content-between align-items-center">
          <h4 className="fw-semibold fs-3 text-primary">$256</h4>
          <div className="cursor-pointer border p-2 rounded-circle w-4 d-flex justify-content-center align-items-center">
            <ShopIcon />
          </div>
        </div>
        <Ratings rating={3.5} />
      </div>
    </div>
    <img className="img-fluid rounded" src={GiftOnePng} alt="" />
  </div>,
];

export const gradiantCardListCardData = [
  {
    id: nanoid(),
    title: "Spring Sale Coming",
    heading: "Smart Phone",
    subheading: "With Pen",
    background: TexturePurple,
    image: GradiantCardImgOne,
    link: PATHS.landingPage,
    btnColorCode: "653A4F",
  },
  {
    id: nanoid(),
    title: "Spring Sale Coming",
    heading: "New Smart Phone",
    subheading: "With Touch",
    background: TexturePink,
    image: GradiantCardImgTwo,
    link: PATHS.landingPage,
    btnColorCode: "8d473f",
  },
  {
    id: nanoid(),
    title: "Spring Sale Coming",
    heading: "Smart Phone",
    subheading: "With Pen",
    background: TexturePaleYellow,
    image: GradiantCardImgOne,
    link: PATHS.landingPage,
    btnColorCode: "83541e",
  },
];