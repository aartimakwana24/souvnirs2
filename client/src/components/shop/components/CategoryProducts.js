import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { nanoid } from "nanoid";
import API_WRAPPER from "../../../api";
import { Slider } from "antd";
import debounce from "lodash/debounce";
import ProductCardMini from "../cards/ProductCardMini";
import { baseUrl } from "../../../api";
import FilterCard from "../cards/FilterCard";

function CategoryProducts() {
  const [filterType, setFilterType] = useState(false);
  const [inputRangeValue, setInputRangeValue] = useState([0, 100000]);
  const [filterList, setFilterList] = useState();
  const [productVariantDetails, setProductVariantDetails] = useState([]);
  const [filters, setFilters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(2);
  const [selctedFilter, setSelctedFilter] = useState("new");
  const { slug } = useParams();
  const getProducts = async () => {
    setLoading(true);
    // const response = await API_WRAPPER.get(`/category/${slug}`);
    // const data = response.data;
    // const changedTitleFilterArr = data.collectionConditionId.map(
    //   (conditionId, index) => ({
    //     selectedTitle: data.selectedTitle[index],
    //     conditionValue: data.conditionValue[index],
    //     inputValue: data.inputValue[index],
    //   })
    // );

    // const radioSelection = data.radioSelection;

    // const productsByConditionsRes = await API_WRAPPER.post(
    //   "/collection/filter-data",
    //   {
    //     changedTitleFilterArr,
    //     radioSelection,
    //   }
    // );

    // const activeProducts = productsByConditionsRes.data.filter(
    //   (product) => !response.data.diactiveProductId.includes(product._id)
    // );
    // const activeProductIds = activeProducts.map((product) => product._id);
    // const queryString = activeProductIds.map((id) => `ids[]=${id}`).join("&");
    // const result = await API_WRAPPER.get(
    //   `/product/get-all-active-ProductsById?${queryString}`
    // );
    // setProductVariantDetails(result.data.productVariantDetails);
    // setFilterList(result.data.filterList);
    setLoading(false);
  };

  useEffect(() => {
    debounce(() => {
      getProducts();
    }, 100)();
  }, [slug, filters, inputRangeValue, selctedFilter, page]);

  const handleFilterSelection = (filterData) => {
    const filterKey = filterData.key;
    const filterValues = filterData.values;
    const existingFilterIndex = filters.findIndex(
      (filter) => filter.key === filterKey
    );

    if (existingFilterIndex !== -1) {
      const updatedFilters = [...filters];
      updatedFilters[existingFilterIndex].values = filterValues;
      setFilters(updatedFilters);
    } else {
      const newFilter = {
        key: filterKey,
        values: filterValues,
      };
      setFilters((prevFilters) => [...prevFilters, newFilter]);
    }
  };
  return (
    <>
      <div className="row">
        <div className="col-lg-3 col-md-12 col-12">
          <div className="container mt-4">
            {filterList &&
              Object.keys(filterList).map((filter) => (
                <FilterCard
                  key={filter}
                  title="Product Filter"
                  onSelect={handleFilterSelection}
                  heading={filter}
                  filters={filterList[filter].map((filterName) => ({
                    filterName,
                  }))}
                />
              ))}
          </div>
        </div>
        <div className="col-lg-9 col-md-12 col-12">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex gap-4 my-2 mt-3">
              <button
                onClick={() => setFilterType((prevState) => !prevState)}
                className={`btn btn-square ${
                  filterType ? "btn-primary" : "btn-outline-primary"
                }`}
              >
                <MdOutlineDashboard className="fs-4" />
              </button>
              <button
                onClick={() => setFilterType((prevState) => !prevState)}
                className={`btn btn-square ${
                  !filterType ? "btn-primary" : "btn-outline-primary"
                }`}
              >
                <AiOutlineUnorderedList className="fs-4" />
              </button>
              <select
                // onChange={(e) => setSelectedFilter(e.target.value)}
                className="form-select"
                name="defaultSorting"
                id="defaultSorting"
                // value={selectedFilter}
              >
                <option value="new">What's new</option>
                <option value="discount">Better Discount</option>
                <option value="htl">Price: High to Low</option>
                <option value="lth">Price: Low to High</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>
          <div className="py-4">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="row">
                {productVariantDetails.map((product) =>
                  product.variants.flatMap((variant) =>
                    variant.details.map((detail) => (
                      <>
                        <ProductCardMini
                          key={detail._id}
                          id={detail._id}
                          price={detail.price}
                          slug={product.slug}
                          rating={4.5}
                          desc={detail.desc}
                          title={product.name}
                          image={
                            variant.cropImgUrl ||
                            `${baseUrl}/${detail.images[0]}`
                          }
                        />
                      </>
                    ))
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryProducts;
