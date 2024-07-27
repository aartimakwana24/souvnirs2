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
import ProductCarosel from "../../components/shop/components/ProductCarosel";
import { carouselMappingDailyDeals } from "../../mappings";
import Tabs from "../../components/ui/Tabs/index.js";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import API_WRAPPER from "../../api/index.js";
import Ratings from "../../components/shop/components/Ratings.js";
import tshirt from "../../assets/images/tshirts.jpg";
import GradiantCardList from "../../components/shop/components/GradiantCardList.js";
import { gradiantCardListCardData } from "../../mappings";
import FullWidthBannerCard from "../../components/shop/cards/FullWidthBannerCard.js";
import BudsImage from "../../assets/images/buds.png";
import WatchImage from "../../assets/images/watch.png";
import ProductsListWithFilters from "../../components/shop/components/ProductsListWithFilters.js";
import { productListFiltersAndProducts } from "../../mappings";
import HalfWidthBannerCard from "../../components/shop/cards/HalfWidthBannerCard.js";
import HalfWidthBannerImgOne from "../../assets/images/halfWidthcardImgOne.png";
import HalfWidthBannerImgTwo from "../../assets/images/halfWidthCardImgTwo.png";
import GiftOnePngImage from "../../assets/images/giftOne.png";
import { BrandsCardImageList } from "../../mappings";
import BrandsCard from "../../components/shop/cards/BrandsCard.js";
import SingleTab from "./SingleTab.js";
import BlogList from "../../components/shop/components/BlogList.js";
import { blogCardData } from "../../mappings";

function LandingPage() {
  const navigate = useNavigate();
  const getAllProducts = async () => {
    try {
      const response = await API_WRAPPER.get("products/get-all-products");

      if (response.status === 200) {
        const products = response.data;
        const uniqueProducts = [];
        const productIds = new Set();

        products.forEach((item) => {
          const productId = item.product._id.toString();
          if (!productIds.has(productId)) {
            uniqueProducts.push(item);
            productIds.add(productId);
          }
        });
        console.log("Product List ", uniqueProducts);

        let personalizedRes = await API_WRAPPER.get("/productsDetails/get-all-personalized");
        console.log("personalizedRes ", personalizedRes);
        return uniqueProducts;
      } else {
        throw new Error("Failed to fetch products");
      }
    } catch (error) {
      console.log("Error while fetching products in landing page ", error);
      throw error;
    }
  };

  const {
    data: productsList,
    isLoading,
    error,
  } = useQuery("get-all-products", getAllProducts);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div style={{ overflow: "hidden" }}>
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

      <div className="row d-flex flex-column flex-md-row justify-content-md-between mt-5 bg-white">
        <div className="col col-md-12 col-12 col-lg-3">
          <ProductCarosel
            className="flex-1"
            items={carouselMappingDailyDeals}
          />
        </div>

        <div className="col col-lg-9 col-md-12 col-12">
          <Tabs
            alignCenter
            tabs={[
              {
                content: (
                  <div className="row row-cols-1 row-cols-md-2 g-4">
                    {productsList?.slice(0, 6).map((product) => (
                      <div
                        key={product._id}
                        className="col bg-white p-4 rounded shadow-sm cursor-pointer"
                        onClick={() => navigate(`productInfo/${product.slug}`)}
                      >
                        <div className="d-flex align-items-center gap-3">
                          <img
                            className="w-25 h-auto rounded"
                            // src={product.coverImage}
                            src={tshirt}
                            alt="Product"
                          />
                          <div className="flex-grow">
                            <h2 className="h5 text-muted">
                              {product.product.name}
                            </h2>
                            <div className="text-primary"></div>
                            <div className="d-flex align-items-center gap-3 mt-2">
                              <Ratings rating={3} />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ),
                label: "CONTENT 1",
              },
              {
                content: (
                  <div className="row row-cols-1 row-cols-md-2 g-4">
                    {productsList?.slice(6, 12)?.map((product) => (
                      <div
                        key={product._id}
                        className="col bg-white p-4 rounded shadow-sm cursor-pointer"
                        onClick={() => navigate(`productInfo/${product.slug}`)}
                      >
                        <div className="d-flex align-items-center gap-3">
                          <img
                            className="w-100 h-auto rounded"
                            src={product.coverImage}
                            alt="Product"
                          />
                          <div className="flex-grow">
                            <h2 className="h5 text-muted">
                              {product.product.name}
                            </h2>
                            <div className="text-primary"></div>
                            <div className="d-flex align-items-center gap-3 mt-2">
                              <Ratings rating={4} />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ),
                label: "CONTENT 2",
              },
              {
                content: (
                  <div className="row row-cols-1 row-cols-md-2 g-4">
                    {productsList?.slice(12, 18)?.map((product) => (
                      <div
                        key={product._id}
                        className="col bg-white p-4 rounded shadow-sm cursor-pointer"
                        onClick={() => navigate(`productInfo/${product.slug}`)}
                      >
                        <div className="d-flex align-items-center gap-3">
                          <img
                            className="w-100 h-auto rounded"
                            // src={product.coverImage}
                            src={tshirt}
                            alt="Product"
                          />
                          <div className="flex-grow">
                            <h2 className="h5 text-muted">
                              {product.product.name}
                            </h2>
                            <div className="text-primary"></div>
                            <div className="d-flex align-items-center gap-3 mt-2">
                              <Ratings rating={4} />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ),
                label: "CONTENT 3",
              },
            ]}
          />
        </div>
      </div>

      <GradiantCardList cardData={gradiantCardListCardData} />

      <FullWidthBannerCard
        mainHeading="Score An Extra 30% Off"
        subHeading="On Your Entire Order"
        imageOne={BudsImage}
        imageTwo={WatchImage}
      />

      <ProductsListWithFilters
        heading="Best Products at price"
        filters={productListFiltersAndProducts.filters}
        products={productListFiltersAndProducts.products}
      />

      <HalfWidthBannerCard
        backgroundImageOne={HalfWidthBannerImgOne}
        backgroundImageTwo={HalfWidthBannerImgTwo}
        headingOne="Get 50% Off"
        headingTwo="Get 50% Off"
        cardTitleOne="Smart TV with Pen"
        cardTitleTwo="Smart Phone with Pen"
        productImageOne={GiftOnePngImage}
        productImageTwo={GiftOnePngImage}
        buttonHandlerOne={() =>
          console.log("CLICKED ON HALF WIDTH BANNER CARD")
        }
        buttonHandlerTwo={() =>
          console.log("CLICKED ON HALF WIDTH BANNER CARD")
        }
      />

      <BrandsCard imagesList={BrandsCardImageList} />

      <div className="mt-5">
        <div className="row">
          <div className="col col-lg-4 col-md-12 col-12">
            <SingleTab heading="Budget Buy" />
          </div>
          <div className="col col-lg-4 col-md-12 col-12">
            <SingleTab heading="Recently Added" />
          </div>
          <div className="col col-lg-4 col-md-12 col-12">
            <SingleTab heading="Trending Products" />
          </div>
        </div>
      </div>

      <BlogList blogItemsData={blogCardData} />
    </div>
  );
}

export default LandingPage;
