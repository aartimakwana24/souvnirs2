import { ShopIcon } from "../icons";
import TimerComponent from '../components/shop/components/TimerComponent.js';
import Ratings from "../components/shop/components/Ratings.js";
import GiftOnePng from "../assets/images/giftOne.png";
import TexturePurple from "../assets/images/texturePurple.jpg.png";
import GradiantCardImgOne from "../assets/images/gradiantCardImgOne.png";
import TexturePink from "../assets/images/texturePink.jpg";
import GradiantCardImgTwo from "../assets/images/gradiantCardImgTwo.png";
import TexturePaleYellow from "../assets/images/texturePaleYellow.png";
import LenovoImage from "../assets/images/lenovo.png";
import PrestigeLogo from "../assets/images/prestigeLogo.png";
import VeromodaLogo from "../assets/images/veromodaLogo.png";
import BorosilLogo from "../assets/images/borosilLogo.png";
import XechLogo from "../assets/images/xechLogo.png";
import BoatLogo from "../assets/images/boatLogo.png";
import ParkAvenueLogo from "../assets/images/parkavenue.png";
import PumaLogo from "../assets/images/pumaLogo.png";
import BajajLogo from "../assets/images/bajajLogo.png";
import HavellsLogo from "../assets/images/havellsLogo.png";
import PoliceLogo from "../assets/images/policeLogo.png";
import BeardLogo from "../assets/images/beardLogo.png";
import WildcraftLogo from "../assets/images/wildcraftLogo.png";
import PigeonLogo from "../assets/images/pigeonLogo.png";
import WonderChefLogo from "../assets/images/wonderchefLogo.png";
import TitanLogo from "../assets/images/titanLogo.png";
import One from "../assets/images/1.jpg";
import Two from "../assets/images/2.jpg";
import Three from "../assets/images/3.jpg";
import Four from "../assets/images/4.jpg";
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

export const productListFiltersAndProducts = {
  filters: [
    {
      id: nanoid(),
      name: "Seasonal",
    },
    {
      id: nanoid(),
      name: "Electronics",
    },
    {
      id: nanoid(),
      name: "Budget",
    },
  ],
  products: [
    {
      id: nanoid(),
      title: "Game Trigger Finger New",
      price: "260",
      discountPrice: "160",
      rating: 4.5,
      badgeColor: "badge-primary",
      badgeText: "-10% ",
      image: GiftOnePng,
    },
    {
      id: nanoid(),
      title: "Game Trigger Finger New",
      price: "260",
      discountPrice: "344",
      rating: 3,
      badgeColor: "badge-secondary",
      badgeText: "IN STOCK",
      image: GiftOnePng,
    },
    {
      id: nanoid(),
      title: "Game Trigger Finger New",
      price: "260",
      discountPrice: "100",
      rating: 4,
      badgeColor: "badge-warning",
      badgeText: "OUT OF STOCK",
      image: GiftOnePng,
    },
    {
      id: nanoid(),
      title: "Game Trigger Finger New",
      price: "260",
      discountPrice: "99",
      rating: 4.5,
      badgeColor: "badge-info",
      badgeText: "-20%",
      image: GiftOnePng,
    },
    {
      id: nanoid(),
      title: "Game Trigger Finger New",
      price: "260",
      discountPrice: "99",
      rating: 4.5,
      badgeColor: "badge-info",
      badgeText: "-20%",
      image: GiftOnePng,
    },
    {
      id: nanoid(),
      title: "Game Trigger Finger New",
      price: "260",
      discountPrice: "99",
      rating: 4.5,
      badgeColor: "badge-info",
      badgeText: "-20%",
      image: GiftOnePng,
    },
  ],
};

export const BrandsCardImageList = [
  {
    image: PrestigeLogo,
    alt: "prestige",
  },
  {
    image: VeromodaLogo,
    alt: "veromoda",
  },
  {
    image: BorosilLogo,
    alt: "borosil",
  },
  {
    image: LenovoImage,
    alt: "lenovo",
  },
  {
    image: XechLogo,
    alt: "xech",
  },
  {
    image: BoatLogo,
    alt: "boat",
  },
  {
    image: ParkAvenueLogo,
    alt: "parkavenue",
  },
  {
    image: TitanLogo,
    alt: "titan",
  },
  {
    image: PumaLogo,
    alt: "puma",
  },
  {
    image: BajajLogo,
    alt: "bajaj",
  },
  {
    image: HavellsLogo,
    alt: "havells",
  },
  {
    image: PoliceLogo,
    alt: "police",
  },
  {
    image: BeardLogo,
    alt: "beard",
  },
  {
    image: WildcraftLogo,
    alt: "wildcraft",
  },
  {
    image: PigeonLogo,
    alt: "pigeon",
  },
  {
    image: WonderChefLogo,
    alt: "wonderchef",
  },
];

export const blogCardData = [
  {
    id: nanoid(),
    blogImage: One,
    date: "27  July  2024",
    views: 100,
    heading: "What should I know about...",
    paragraph:
      "lorem ipsum ect dolor emet doloris de futa ipsum ect dolor emet doloris de futa ipsum ect dolor emet doloris de futa",
    buttonHandler: () => {
      console.log("CLICKED ON BLOG CARD");
    },
  },
  {
    id: nanoid(),
    blogImage: Two,
    date: "27  July  2024",
    views: 100,
    heading: "What should I know about...",
    paragraph:
      "lorem ipsum ect dolor emet doloris de futa ipsum ect dolor emet doloris de futa ipsum ect dolor emet doloris de futa",
    buttonHandler: () => {
      console.log("CLICKED ON BLOG CARD");
    },
  },
  {
    id: nanoid(),
    blogImage: Three,
    date: "27  July  2024",
    views: 100,
    heading: "What should I know about...",
    paragraph:
      "lorem ipsum ect dolor emet doloris de futa ipsum ect dolor emet doloris de futa ipsum ect dolor emet doloris de futa",
    buttonHandler: () => {
      console.log("CLICKED ON BLOG CARD");
    },
  },
  {
    id: nanoid(),
    blogImage: Four,
    date: "27  July  2024",
    views: 100,
    heading: "What should I know about...",
    paragraph:
      "lorem ipsum ect dolor emet doloris de futa ipsum ect dolor emet doloris de futa ipsum ect dolor emet doloris de futa",
    buttonHandler: () => {
      console.log("CLICKED ON BLOG CARD");
    },
  },
];