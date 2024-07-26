import HeaderCards from "../../components/shop/cards/HeaderCards";
import FeaturesCard from "../../components/shop/cards/FeaturesCard";
import MainBannerImg from "../../assets/images/mainBannerImg.png";
import SmallCardBackgroundOne from "../../assets/images/smallCardBackground.jpg";
import SmallCardBackgroundTwo from "../../assets/images/smallCardBackgroundTwo.png";
import BannerProductImgOne from "../../assets/images/bannerProduct.png";
import BannerImageTwo from "../../assets/images/bannerImageTwo.png";
import TvImagePng from "../../assets/images/tvImage.png";
import { BsBoxSeam, BsCreditCard2Front } from "react-icons/bs";
import { LiaShippingFastSolid } from "react-icons/lia";
import { HiOutlineChatBubbleLeftRight } from "react-icons/hi2";

function LandingPage() {
  return (
    <>
      <HeaderCards
        mainImage={MainBannerImg}
        secondaryImageOne={SmallCardBackgroundOne}
        secondaryImageTwo={SmallCardBackgroundTwo}
        productImgOne={BannerProductImgOne}
        productImageTwo={BannerImageTwo}
        productImageThree={TvImagePng}
        mainHeading="Band & Olufson"
        mainHeadingTwo="Staycation"
        mainSubHeading="Cozy and comforting stay-at-home set"
        secondaryHeadingOne="Diwali Sale Coming"
        secondaryHeadingTwo="Smartphone"
        secondarySubHeadingOne="with touch"
        tertioryHeadingOne="Diwali Sale Coming"
        tertioryHeadingTwo="Smart 4K TV"
        tertiorySubHeading="Watch Now"
      />

      <FeaturesCard
        iconOne={
          <HiOutlineChatBubbleLeftRight className="fs-3  text-primary" />
        }
        headingOne="SUPPORT 24/7"
        subHeadingOne="Dedicate 24/7 Support"
        iconTwo={<BsBoxSeam className="text-primary fs-3 " />}
        headingTwo="EASY RETURNS"
        subHeadingTwo="Shop With Confidence"
        iconThree={<BsCreditCard2Front className="fs-3  text-primary" />}
        headingThree="CARD PAYMENT"
        subHeadingThree="12 Months Installments"
        iconFour={<LiaShippingFastSolid className="fs-3  text-primary" />}
        headingFour="FREE SHIPPING"
        subHeadingFour="Capped at $50 per order"
      />

      
    </>
  );
}

export default LandingPage;
