import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineUnorderedList } from "react-icons/ai";
import debounce from "lodash/debounce";
import API_WRAPPER from "../../../api";
import ProductCardMini from "../cards/ProductCardMini";
import { baseUrl } from "../../../api";
import FilterCard from "../cards/FilterCard";
import success, { swalError } from "../../../utils";

function CollectionProducts() {
  const [filterType, setFilterType] = useState(false);
  const [inputRangeValue, setInputRangeValue] = useState([0, 100000]);
  const [filterList, setFilterList] = useState([]);
  const [productVariantDetails, setProductVariantDetails] = useState([]);
  const [filters, setFilters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [defaultSelections, setDefaultSelections] = useState({});
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(2);
  const [selectedFilter, setSelectedFilter] = useState("new");
  const [showModal, setShowModal] = useState(false);
  const { slug } = useParams();

  const getProducts = useCallback(async () => {
    setLoading(true);
    try {
      const response = await API_WRAPPER.get(`/collection/${slug}`);
      const data = response.data;

      if (data.msg) {
        swalError("Warning", data.msg, () => {
          setShowModal(false);
        });
        return;
      }

      if (data && data.collectionConditionId) {
        const changedTitleFilterArr = data.collectionConditionId.map(
          (conditionId, index) => ({
            selectedTitle: data.selectedTitle[index],
            conditionValue: data.conditionValue[index],
            inputValue: data.inputValue[index],
          })
        );

        const productsByConditionsRes = await API_WRAPPER.post(
          "/collection/filter-data",
          {
            changedTitleFilterArr,
            radioSelection: data.radioSelection,
          }
        );

        const activeProducts = productsByConditionsRes.data.filter(
          (product) => !response.data.diactiveProductId.includes(product._id)
        );

        const activeProductIds = activeProducts.map((product) => product._id);
        const queryString = activeProductIds
          .map((id) => `ids[]=${id}`)
          .join("&");

        const result = await API_WRAPPER.get(
          `/product/get-all-active-ProductsById?${queryString}`
        );

        let productVariants = result.data.productVariantDetails;

        const filterMap = filters.reduce((acc, filter) => {
          acc[filter.key] = filter.values;
          return acc;
        }, {});

        function isVariantMatching(variant, filterMap) {
          return Object.keys(filterMap).every((key) => {
            const filterValues = filterMap[key];

            if (filterValues.length === 0) {
              return true;
            }

            const variantValue = (variant[key] || "").toLowerCase();
            const normalizedFilterValues = filterValues.map((value) =>
              value.toLowerCase()
            );

            return normalizedFilterValues.includes(variantValue);
          });
        }

        const filteredProducts = productVariants
          .map((product) => {
            const matchingVariants = product.variants.filter((variantObj) =>
              variantObj.varients.some((variant) =>
                isVariantMatching(variant, filterMap)
              )
            );

            return {
              ...product,
              variants: matchingVariants,
            };
          })
          .filter((product) => product.variants.length > 0);

        console.log(
          "filteredProducts ",
          filteredProducts?.[0]?.variants?.[0]?.varients?.[0]
        );
        const defaultSelections = {};
        if (filteredProducts?.[0]?.variants?.[0]?.varients?.[0]) {
          filteredProducts?.[0]?.variants?.[0]?.varients?.[0] &&
            Object.keys(
              filteredProducts?.[0]?.variants?.[0]?.varients?.[0]
            ).forEach((key) => {
              defaultSelections[key] =
                filteredProducts?.[0]?.variants?.[0]?.varients?.[0][key];
            });
        }
        console.log("yaha defaultSelections ", defaultSelections);
        setDefaultSelections(defaultSelections);

        setProductVariantDetails(filteredProducts);
        setFilterList(result.data.filterList);
      }
    } catch (error) {
      console.error("Error in CollectionProducts.js", error);
      swalError("Error", "Failed to fetch products.", () => {
        setShowModal(false);
      });
    } finally {
      setLoading(false);
    }
  }, [slug, filters, inputRangeValue, selectedFilter, page]);

  useEffect(() => {
    const debouncedGetProducts = debounce(getProducts, 300);
    debouncedGetProducts();
    return () => {
      debouncedGetProducts.cancel();
    };
  }, [getProducts]);

  const handleFilterSelection = (filterData) => {
    const { key, values } = filterData;
    setFilters((prevFilters) => {
      const existingFilterIndex = prevFilters.findIndex(
        (filter) => filter.key === key
      );

      if (existingFilterIndex !== -1) {
        const updatedFilters = [...prevFilters];
        updatedFilters[existingFilterIndex].values = values;
        return updatedFilters;
      } else {
        return [...prevFilters, { key, values }];
      }
    });
  };

  return (
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
                defaultSelection={defaultSelections[filter] || ""}
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
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="form-select"
              name="defaultSorting"
              id="defaultSorting"
              value={selectedFilter}
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
              {productVariantDetails.map(
                (product) =>
                  product.variants.length > 0 && (
                    <ProductCardMini
                      key={product.variants[0].details[0]._id}
                      id={product.variants[0]._id}
                      price={product.variants[0].details[0].price}
                      slug={product.slug}
                      rating={4.5}
                      desc={product.variants[0].details[0].desc}
                      title={product.name}
                      image={
                        product.variants[0].cropImgUrl ||
                        `${baseUrl}/${product.variants[0].details[0].images[0]}`
                      }
                      data={productVariantDetails}
                    />
                  )
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CollectionProducts;
