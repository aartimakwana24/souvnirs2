import categoriesModal from "../schema/categoriesModal.js";
import productVarients2 from "../schema/productVarients2.js";
import productModal from "../schema/product.js";
import attributeModal from "../schema/attributeModal.js";
import varientsDetails from "../schema/productVarientsDetails.js";
import personalized from "../schema/productVariantsPersonalized.js";
import productAttributeType from "../schema/productAttributeType.js";

export const addCategoryController = async (req, res) => {
  try {
    const { name, hsn_code, description, attributes, parentId, type, slug } =
      req.body;
    console.log("Sulg is ", slug);
    const existingSlug = await categoriesModal.findOne({ slug: slug });
    console.log("existingSlug ", existingSlug);
    if (existingSlug) {
      console.log("existingSlug ", existingSlug);
      return res.status(200).json({
        msg: "This slig is already exist please enter another slug",
      });
    }
    if (req.body.parentId) {
      const Parent = await categoriesModal.findById(req.body.parentId);
      const category = await categoriesModal.create({
        name,
        slug,
        hsn_code,
        desc: description,
        parentId,
        type,
        attributes: [...Parent.attributes, ...attributes],
      });
      return res.status(201).json(category);
    } else {
      const category = await categoriesModal.create({ ...req.body });
      res.status(201).json(category);
    }
  } catch (error) {
    console.log("Error in Categories controller ", error);
    res.status(400).json({ error: error.message });
  }
};

export const getParentCategories = async (req, res) => {
  try {
    const categories = await categoriesModal.find({ parentId: "0" });
    res.status(200).json(categories);
  } catch (error) {
    console.log("Error in getParentCategories controller ", error);
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categoryList = await categoriesModal.find().sort({ createdAt: -1 });
    res.status(200).json(categoryList);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const existingCategory = await categoriesModal.findById(req.params.id);
    if (!existingCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    const { attributes } = req.body;
    const { name, hsn_code, status, type, parentId, slug } = req.body;
    const existingSlug = await categoriesModal.findOne(slug);
    if (existingSlug) {
      return res.status(400).json({
        msg: "This slig is already exist please enter another slug",
      });
    }
    const updatedAttributes = existingCategory.attributes.filter((attr) =>
      attributes.includes(attr.toString())
    );

    updatedAttributes.push(...attributes);

    existingCategory.name = name ?? existingCategory.name;
    existingCategory.slug = slug ?? existingCategory.slug;
    existingCategory.hsn_code = hsn_code ?? existingCategory.hsn_code;
    existingCategory.status = status ?? existingCategory.status;
    existingCategory.type = type ?? existingCategory.type;
    existingCategory.attributes = updatedAttributes;

    if (parentId) {
      existingCategory.parentId = parentId ?? existingCategory.parentId;
    }

    const updatedCategory = await existingCategory.save();
    res.status(200).json(updatedCategory);
  } catch (error) {
    console.log("categoryController.js", error);
    res.status(400).json({ error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const deletedCategory = await categoriesModal.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      res.status(400).json({ message: "No cateogry found" });
    }
    res.status(200).json(deletedCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const category = await categoriesModal.findById(req.params.id);
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateParentCategory = async (req, res) => {
  try {
    const categories = await categoriesModal.find({
      _id: req.params.id,
    });
    let id = categories[0].parentId;
    if (id != "0") {
      const parentData = await categoriesModal.find({
        _id: id,
      });
      const allParentCatData = await categoriesModal.find({ parentId: "0" });
      res.status(200).json({ allParentCatData, parentData });
    }
  } catch (error) {
    console.log("Error in getParentCategories controller ", error);
  }
};

// export const getCategoryBySlug = async (req, res) => {
//   try {
//     const { slug } = req.params;
//     const normalizedSlug = slug.replace(/\s+/g, " ");
//     console.log("normalizedSlug ", normalizedSlug);
//     const regex = new RegExp(
//       `^${normalizedSlug.split(" ").join("\\s*")}$`,
//       "i"
//     );
//     const categoriesData = await categoriesModal.findOne({
//       slug: regex,
//     });
//     if (!categoriesData) {
//       console.log("categoriesData in if ", categoriesData);
//       return res.status(404).json({ msg: "No category found" });
//     }

//     const products = await productModal.find({
//       categoryId: categoriesData._id,
//     });
//     if (products) {
//       const productObjectIds = products.map((product) => product._id);
//       console.log("productsIds ", productObjectIds);

//       const variants = await productVarients2.find({
//         pid: { $in: productObjectIds },
//       });

//       const variantIds = variants.map((variant) => variant._id);

//       console.log("variantIds ", variantIds);
//       const variantDetails = await varientsDetails.find({
//         pvid: { $in: variantIds },
//       });

//       console.log("variantDetails ", variantDetails);
//       const personalizedImages = await personalized.find({
//         pvid: { $in: variantIds },
//       });
//       console.log("personalizedImages ", personalizedImages);
//       return res
//         .status(200)
//         .json({ products, variantDetails, personalizedImages });
//     }
//   } catch (error) {
//     console.log("Error in getCategoryBySlug ", error);
//   }
// };


export const getCategoryBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const normalizedSlug = slug.replace(/\s+/g, " ");
    const regex = new RegExp(
      `^${normalizedSlug.split(" ").join("\\s*")}$`,
      "i"
    );
    const categoriesData = await categoriesModal.findOne({
      slug: regex,
    });

    if (!categoriesData) {
      return res.status(404).json({ msg: "No category found" });
    }

    const products = await productModal.find({
      categoryId: categoriesData._id,
    });

    if (products) {
      console.log("products ", products);
      const productObjectIds = products.map((product) => product._id);

      const variants = await productVarients2.find({
        pid: { $in: productObjectIds },
      });

      const variantIds = variants.map((variant) => variant._id);

      const variantDetails = await varientsDetails.find({
        pvid: { $in: variantIds },
      });

      const personalizedImages = await personalized.find({
        pvid: { $in: variantIds },
      });

      const productVariantDetails = products.map((product) => {
        const productVariants = variants.filter(
          (variant) => variant.pid.toString() === product._id.toString()
        );

        const productVariantDetail = productVariants.map((variant) => {
          const details = variantDetails.filter(
            (detail) => detail.pvid.toString() === variant._id.toString()
          );
          const personalized = personalizedImages.find(
            (personalized) =>
              personalized.pvid.toString() === variant._id.toString()
          );

          const formattedDetails = details.map(
            ({
              _id,
              pvid,
              quantity,
              images,
              desc,
              price,
              sku,
              tags,
              readyToShip,
              freeShipping,
              data,
              Status,
              CreatedTime,
              UpdatedTime,
              __v,
            }) => ({
              _id,
              pvid,
              quantity,
              images,
              desc,
              price,
              sku,
              tags,
              readyToShip,
              freeShipping,
              data,
              Status,
              CreatedTime,
              UpdatedTime,
              __v,
            })
          );

          return {
            _id: variant._id,
            pid: variant.pid,
            varients: variant.varients,
            Status: variant.Status,
            CreatedTime: variant.CreatedTime,
            UpdatedTime: variant.UpdatedTime,
            __v: variant.__v,
            details: formattedDetails,
            cropImgUrl: personalized?.cropImgUrl || null,
          };
        });

        return {
          _id: product._id,
          name: product.name,
          vendorId: product.vendorId,
          categoryId: product.categoryId,
          stockStatus: product.stockStatus,
          approval: product.approval,
          selectedAtt: product.selectedAtt,
          CreatedTime: product.CreatedTime,
          UpdatedTime: product.UpdatedTime,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
          __v: product.__v,
          variants: productVariantDetail,
        };
      });

      const attributeIds = products.flatMap((product) => product.selectedAtt);
      const attributes = await attributeModal.find({
        _id: { $in: attributeIds },
      });

      const attributeTypeIds = attributes.map((attribute) => attribute._id);
      const attributeTypes = await productAttributeType.find({
        paid: { $in: attributeTypeIds },
      });

      const filterList = attributes.reduce((acc, attribute) => {
        const attributeName = attribute.name;
        if (!acc[attributeName]) {
          acc[attributeName] = [];
        }
        const attributeType = attributeTypes.find(
          (type) => type.paid.toString() === attribute._id.toString()
        );
        if (attributeType) {
          acc[attributeName] = [
            ...new Set([...acc[attributeName], ...attributeType.attvalue]),
          ];
        }
        return acc;
      }, {});

      return res.status(200).json({ productVariantDetails, filterList });
    }
  } catch (error) {
    console.log("Error in getCategoryBySlug ", error);
    res.status(500).json({ error: "Failed to fetch category data" });
  }
};
