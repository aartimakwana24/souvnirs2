import categoriesModal from "../schema/categoriesModal.js";

// export const addCategoryController = async(req,res)=>{
//   console.log("Addd cat ....",req.body);
//  try {
//    const { name, hsn_code, description, attributes, parentId, type } = req.body;
//    if (req.body.parentId) {
//      const Parent = await categoriesModal.findById(req.body.parentId);
//      const category = new categoriesModal({
//        name,
//        hsn_code,
//        Description: description,
//        parentId,
//        type,
//        attributes: [...Parent.attributes, ...attributes]
//      });
//     //  await categoriesModal.save();
//      return res.status(201).json(category);
//    } else {
//     console.log("----->---> ",req.body);
//      const category = new categoriesModal({ ...req.body });
//      await categoriesModal.save();
//      res.status(201).json(category);
//    }
//  } catch (error) {
//     console.log("Error in Categories controller ",error);
//    res.status(400).json({ error: error.message });
//  }
// }

export const addCategoryController = async (req, res) => {
  try {
    const { name, hsn_code, description, attributes, parentId, type } = req.body;
    if (req.body.parentId) {
      const Parent = await categoriesModal.findById(req.body.parentId);
      const category = await categoriesModal.create({
        name,
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
      const categories = await categoriesModal.find({ parentId: '0' });
      res.status(200).json(categories);
  } catch (error) {
    console.log("Error in getParentCategories controller ",error);
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

// export const updateCategory = async (req, res) => {
//   try {
//     const existingCategory = await categoriesModal.findById(req.params.id);
//     if (!existingCategory) {
//       return res.status(404).json({ message: "Category not found" });
//     }

//     const { attributes } = req.body;
//     const existingAttributeIds = existingCategory.attributes.map((attr) =>
//       attr.toString()
//     );
//     const { name, hsn_code, status, type } = req.body;
//     const uniqueAttributes = attributes.filter(
//       (attrId, index) => attributes.indexOf(attrId) === index
//     );
//     (existingCategory.name = name ?? existingCategory.name),
//       (existingCategory.hsn_code = hsn_code ?? existingCategory.hsn_code),
//       (existingCategory.status = status ?? existingCategory.status),
//       (existingCategory.type = type ?? existingCategory.type),
//       (existingCategory.attributes =
//         existingCategory.attributes.concat(uniqueAttributes));
//     const updatedCategory = await existingCategory.save();
//     res.status(200).json(updatedCategory);
//   } catch (error) {
//     console.log("categoryController.js", error);
//     res.status(400).json({ error: error.message });
//   }
// };

export const updateCategory = async (req, res) => {
  try {
    const existingCategory = await categoriesModal.findById(req.params.id);
    if (!existingCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    const { attributes } = req.body;
    const { name, hsn_code, status, type ,parentId} = req.body;

    // Filter out deleted attributes
    const updatedAttributes = existingCategory.attributes.filter((attr) =>
      attributes.includes(attr.toString())
    );

    updatedAttributes.push(...attributes);

    existingCategory.name = name ?? existingCategory.name;
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

export const updateParentCategory = async(req,res) =>{
   try {
     const categories = await categoriesModal.find({
       _id: req.params.id,
     });
     let id = categories[0].parentId;
     if(id != '0'){
       const parentData = await categoriesModal.find({
         _id: id,
       });
       const allParentCatData = await categoriesModal.find({ parentId: "0" });
       res.status(200).json({ allParentCatData, parentData });

     }
  } catch (error) {
    console.log("Error in getParentCategories controller ",error);
  }
}

// export const updateGetParentCategories = async (req, res) => {
//   try {
//     const categories = await categoriesModal.find({ parentId: "0" });
//     res.status(200).json(categories);
//   } catch (error) {
//     console.log("Error in getParentCategories controller ", error);
//   }
// };
