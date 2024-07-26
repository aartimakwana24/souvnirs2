if (selectedTitle === "tags") {
  const regex = buildRegex(condition.conditionValue, inputValue);
  const tagsQuery = { tags: { $regex: regex } };

  varientsByTags = await VarientsDetails.find(tagsQuery);
  if (varientsByTags.length > 0) {
    const vid = varientsByTags.map((pp) => pp.pvid);
    const id2 = await productVarients2.find({
      _id: { $in: vid },
    });
    const productId = id2.map((pp) => pp.pid);
    if (productId.length > 0) {
      const tagsProductQuery = { _id: { $in: productId } };
      addConditionToQuery(query, tagsProductQuery, radioSelection);
    }
  }
} else {
  addConditionToQuery(query, conditionQuery, radioSelection);
}


......................................................................................

conditionsArray  [
  {
    selectedTitle: 'quantity',
    conditionValue: '6687c5d5c398478e6e661a18',
    inputValue: '100'
  },
  {
    selectedTitle: 'price',
    conditionValue: '6687c5d5c398478e6e661a18',
    inputValue: '3000'
  }
]
operator  $eq
varientByQuantity  [
  {
    _id: new ObjectId('668bac278e73f460b158ecc7'), 
    pvid: new ObjectId('668bab888e73f460b158ecbd'),
    quantity: 100,
    images: [ 'img-1720429607941-824285802.png' ], 
    desc: '<p>Size large</p>',
    price: 3000,
    sku: ' USG-07-02',
    tags: [ 'tag2' ],
    readyToShip: false,
    freeShipping: false,
    data: [ [Object] ],
    Status: 'ACTIVE',
    CreatedTime: 2024-07-08T09:06:47.953Z,
    UpdatedTime: 2024-07-08T09:06:47.953Z,
    __v: 0
  }
]
 inside else  { quantity: { '$eq': /^100$/i } }
inside radio ke if { '$and': [ { quantity: [Object] } ] }       
operator  $eq
productByPrice  [
  {
    _id: new ObjectId('6687944e657f290c6a41c629'),
    pvid: new ObjectId('66879412657f290c6a41c624'),
    quantity: 290,
    images: [ 'img-1720161358764-35650601.png' ],
    desc: '<p>DEsc2</p>',
    price: 3000,
    sku: ' USG-07-04',
    tags: [ 'tag2' ],
    readyToShip: true,
    freeShipping: false,
    data: [ [Object] ],
    Status: 'INACTIVE',
    CreatedTime: 2024-07-05T06:35:58.772Z,
    UpdatedTime: 2024-07-05T06:35:58.772Z,
    __v: 0
  },
  {
    _id: new ObjectId('668bac278e73f460b158ecc7'),
    pvid: new ObjectId('668bab888e73f460b158ecbd'),
    quantity: 100,
    images: [ 'img-1720429607941-824285802.png' ],
    desc: '<p>Size large</p>',
    price: 3000,
    sku: ' USG-07-02',
    tags: [ 'tag2' ],
    readyToShip: false,
    freeShipping: false,
    data: [ [Object] ],
    Status: 'ACTIVE',
    CreatedTime: 2024-07-08T09:06:47.953Z,
    UpdatedTime: 2024-07-08T09:06:47.953Z,
    __v: 0
  }
]
 inside else  { price: { '$eq': /^3000$/i } }
inside radio ke if { '$and': [ { quantity: [Object] }, { price: 
[Object] } ] }
Finally all filtered  [
  {
    _id: new ObjectId('66879412657f290c6a41c61e'),
    name: 'LED Bulb',
    vendorId: new ObjectId('663f5902a16d8c5bbf24953d'),
    categoryId: new ObjectId('66614beced4624cdb0703671'),       
    stockStatus: 'IN_STOCK',
    approval: 'APPROVE',
    selectedAtt: [
      new ObjectId('66614b0eed4624cdb070364e'),
      new ObjectId('66614b62ed4624cdb070365e')
    ],
    CreatedTime: 2024-07-05T06:34:58.081Z,
    UpdatedTime: 2024-07-05T06:34:58.081Z,
    createdAt: 2024-07-05T06:34:58.082Z,
    updatedAt: 2024-07-05T06:34:58.082Z,
    __v: 0
  },
  {
    _id: new ObjectId('668bab888e73f460b158ecb3'),
    name: 'Tshirts',
    vendorId: new ObjectId('663f5902a16d8c5bbf24953d'),
    categoryId: new ObjectId('66614cd6ed4624cdb070368d'),       
    stockStatus: 'IN_STOCK',
    approval: 'APPROVE',
    selectedAtt: [
      new ObjectId('66614b07ed4624cdb070364b'),
      new ObjectId('66614b62ed4624cdb070365e'),
      new ObjectId('66614b0eed4624cdb070364e')
    ],
    CreatedTime: 2024-07-08T09:04:08.528Z,
    UpdatedTime: 2024-07-08T09:04:08.528Z,
    createdAt: 2024-07-08T09:04:08.531Z,
    updatedAt: 2024-07-08T09:04:08.531Z,
    __v: 0
  }
]
uniqueFilteredProducts  [
  {
    _id: new ObjectId('66879412657f290c6a41c61e'),
    name: 'LED Bulb',
    vendorId: new ObjectId('663f5902a16d8c5bbf24953d'),
    categoryId: new ObjectId('66614beced4624cdb0703671'),       
    stockStatus: 'IN_STOCK',
    approval: 'APPROVE',
    selectedAtt: [
      new ObjectId('66614b0eed4624cdb070364e'),
      new ObjectId('66614b62ed4624cdb070365e')
    ],
    CreatedTime: 2024-07-05T06:34:58.081Z,
    UpdatedTime: 2024-07-05T06:34:58.081Z,
    createdAt: 2024-07-05T06:34:58.082Z,
    updatedAt: 2024-07-05T06:34:58.082Z,
    __v: 0
  },
  {
    _id: new ObjectId('668bab888e73f460b158ecb3'),
    name: 'Tshirts',
    vendorId: new ObjectId('663f5902a16d8c5bbf24953d'),
    categoryId: new ObjectId('66614cd6ed4624cdb070368d'),       
    stockStatus: 'IN_STOCK',
    approval: 'APPROVE',
    selectedAtt: [
      new ObjectId('66614b07ed4624cdb070364b'),
      new ObjectId('66614b62ed4624cdb070365e'),
      new ObjectId('66614b0eed4624cdb070364e')
    ],
    CreatedTime: 2024-07-08T09:04:08.528Z,
    UpdatedTime: 2024-07-08T09:04:08.528Z,
    createdAt: 2024-07-08T09:04:08.531Z,
    updatedAt: 2024-07-08T09:04:08.531Z,
    __v: 0
  }
]






-----------------------1 price--ye h 


conditionsArray  [
  {
    selectedTitle: 'price',
    conditionValue: '6687c5d5c398478e6e661a18',
    inputValue: '3000'
  },
  {
    selectedTitle: 'quantity',
    conditionValue: '6687c5d5c398478e6e661a18',
    inputValue: '100'
  }
]
operator  $eq
productByPrice  [
  {
    _id: new ObjectId('6687944e657f290c6a41c629'), 
    pvid: new ObjectId('66879412657f290c6a41c624'),
    quantity: 290,
    images: [ 'img-1720161358764-35650601.png' ],  
    desc: '<p>DEsc2</p>',
    price: 3000,
    sku: ' USG-07-04',
    tags: [ 'tag2' ],
    readyToShip: true,
    freeShipping: false,
    data: [ [Object] ],
    Status: 'INACTIVE',
    CreatedTime: 2024-07-05T06:35:58.772Z,
    UpdatedTime: 2024-07-05T06:35:58.772Z,
    __v: 0
  },
  {
    _id: new ObjectId('668bac278e73f460b158ecc7'),
    pvid: new ObjectId('668bab888e73f460b158ecbd'),
    quantity: 100,
    images: [ 'img-1720429607941-824285802.png' ],
    desc: '<p>Size large</p>',
    price: 3000,
    sku: ' USG-07-02',
    tags: [ 'tag2' ],
    readyToShip: false,
    freeShipping: false,
    data: [ [Object] ],
    Status: 'ACTIVE',
    CreatedTime: 2024-07-08T09:06:47.953Z,
    UpdatedTime: 2024-07-08T09:06:47.953Z,
    __v: 0
  }
]
 inside else  { price: { '$eq': /^3000$/i } }
inside radio ke if {
  "$and": [
    {
      "price": {
        "$eq": {}
      }
    }
  ]
}
operator  $eq
varientByQuantity  [
  {
    _id: new ObjectId('668bac278e73f460b158ecc7'),
    pvid: new ObjectId('668bab888e73f460b158ecbd'),
    quantity: 100,
    images: [ 'img-1720429607941-824285802.png' ],
    desc: '<p>Size large</p>',
    price: 3000,
    sku: ' USG-07-02',
    tags: [ 'tag2' ],
    readyToShip: false,
    freeShipping: false,
    data: [ [Object] ],
    Status: 'ACTIVE',
    CreatedTime: 2024-07-08T09:06:47.953Z,
    UpdatedTime: 2024-07-08T09:06:47.953Z,
    __v: 0
  }
]
 inside else  { quantity: { '$eq': /^100$/i } }
inside radio ke if {
  "$and": [
    {
      "price": {
        "$eq": {}
      }
    },
    {
      "quantity": {
        "$eq": {}
      }
    }
  ]
}
Finally all filtered  [
  {
    _id: new ObjectId('668bab888e73f460b158ecb3'),
    name: 'Tshirts',
    vendorId: new ObjectId('663f5902a16d8c5bbf24953d'),
    categoryId: new ObjectId('66614cd6ed4624cdb070368d'),       
    stockStatus: 'IN_STOCK',
    approval: 'APPROVE',
    selectedAtt: [
      new ObjectId('66614b07ed4624cdb070364b'),
      new ObjectId('66614b62ed4624cdb070365e'),
      new ObjectId('66614b0eed4624cdb070364e')
    ],
    CreatedTime: 2024-07-08T09:04:08.528Z,
    UpdatedTime: 2024-07-08T09:04:08.528Z,
    createdAt: 2024-07-08T09:04:08.531Z,
    updatedAt: 2024-07-08T09:04:08.531Z,
    __v: 0
  }
]
uniqueFilteredProducts  [
  {
    _id: new ObjectId('668bab888e73f460b158ecb3'),
    name: 'Tshirts',
    vendorId: new ObjectId('663f5902a16d8c5bbf24953d'),
    categoryId: new ObjectId('66614cd6ed4624cdb070368d'),       
    stockStatus: 'IN_STOCK',
    approval: 'APPROVE',
    selectedAtt: [
      new ObjectId('66614b07ed4624cdb070364b'),
      new ObjectId('66614b62ed4624cdb070365e'),
      new ObjectId('66614b0eed4624cdb070364e')
    ],
    CreatedTime: 2024-07-08T09:04:08.528Z,
    UpdatedTime: 2024-07-08T09:04:08.528Z,
    createdAt: 2024-07-08T09:04:08.531Z,
    updatedAt: 2024-07-08T09:04:08.531Z,
    __v: 0
  }
]


---
conditionsArray  [
  {
    selectedTitle: 'quantity',
    conditionValue: '6687c5d5c398478e6e661a18',
    inputValue: '100'
  },
  {
    selectedTitle: 'price',
    conditionValue: '6687c5d5c398478e6e661a18',
    inputValue: '3000'
  }
]
operator  $eq
varientByQuantity  [
  {
    _id: new ObjectId('668bac278e73f460b158ecc7'),
    pvid: new ObjectId('668bab888e73f460b158ecbd'),
    quantity: 100,
    images: [ 'img-1720429607941-824285802.png' ],
    desc: '<p>Size large</p>',
    price: 3000,
    sku: ' USG-07-02',
    tags: [ 'tag2' ],
    readyToShip: false,
    freeShipping: false,
    data: [ [Object] ],
    Status: 'ACTIVE',
    CreatedTime: 2024-07-08T09:06:47.953Z,
    UpdatedTime: 2024-07-08T09:06:47.953Z,
    __v: 0
  }
]
does not having price and quantity 
prixe , qanjNAJ  { quantity: { '$eq': 100 } }
conditionQuery in if  { quantity: { '$eq': 100 } }
inside radio ke if {
  "$and": [
    {
      "quantity": {
        "$eq": 100
      }
    }
  ]
}
operator  $eq
productByPrice  [
  {
    _id: new ObjectId('6687944e657f290c6a41c629'),
    pvid: new ObjectId('66879412657f290c6a41c624'),
    quantity: 290,
    images: [ 'img-1720161358764-35650601.png' ],
    desc: '<p>DEsc2</p>',
    price: 3000,
    sku: ' USG-07-04',
    tags: [ 'tag2' ],
    readyToShip: true,
    freeShipping: false,
    data: [ [Object] ],
    Status: 'INACTIVE',
    CreatedTime: 2024-07-05T06:35:58.772Z,
    UpdatedTime: 2024-07-05T06:35:58.772Z,
    __v: 0
  },
  {
    _id: new ObjectId('668bac278e73f460b158ecc7'),
    pvid: new ObjectId('668bab888e73f460b158ecbd'),
    quantity: 100,
    images: [ 'img-1720429607941-824285802.png' ],
    desc: '<p>Size large</p>',
    price: 3000,
    sku: ' USG-07-02',
    tags: [ 'tag2' ],
    readyToShip: false,
    freeShipping: false,
    data: [ [Object] ],
    Status: 'ACTIVE',
    CreatedTime: 2024-07-08T09:06:47.953Z,
    UpdatedTime: 2024-07-08T09:06:47.953Z,
    __v: 0
  }
]
does not having price and quantity 
prixe , qanjNAJ  { price: { '$eq': 3000 } }
conditionQuery in if  { price: { '$eq': 3000 } }
inside radio ke if {
  "$and": [
    {
      "quantity": {
        "$eq": 100
      }
    },
    {
      "price": {
        "$eq": 3000
      }
    }
  ]
}
someMoreProducts  []
Finally all filtered  [
  {
    _id: new ObjectId('66879412657f290c6a41c61e'),
    name: 'LED Bulb',
    vendorId: new ObjectId('663f5902a16d8c5bbf24953d'),
    categoryId: new ObjectId('66614beced4624cdb0703671'),       
    stockStatus: 'IN_STOCK',
    approval: 'APPROVE',
    selectedAtt: [
      new ObjectId('66614b0eed4624cdb070364e'),
      new ObjectId('66614b62ed4624cdb070365e')
    ],
    CreatedTime: 2024-07-05T06:34:58.081Z,
    UpdatedTime: 2024-07-05T06:34:58.081Z,
    createdAt: 2024-07-05T06:34:58.082Z,
    updatedAt: 2024-07-05T06:34:58.082Z,
    __v: 0
  },
  {
    _id: new ObjectId('668bab888e73f460b158ecb3'),
    name: 'Tshirts',
    vendorId: new ObjectId('663f5902a16d8c5bbf24953d'),
    categoryId: new ObjectId('66614cd6ed4624cdb070368d'),       
    stockStatus: 'IN_STOCK',
    approval: 'APPROVE',
    selectedAtt: [
      new ObjectId('66614b07ed4624cdb070364b'),
      new ObjectId('66614b62ed4624cdb070365e'),
      new ObjectId('66614b0eed4624cdb070364e')
    ],
    CreatedTime: 2024-07-08T09:04:08.528Z,
    UpdatedTime: 2024-07-08T09:04:08.528Z,
    createdAt: 2024-07-08T09:04:08.531Z,
    updatedAt: 2024-07-08T09:04:08.531Z,
    __v: 0
  }
]
uniqueFilteredProducts  [
  {
    _id: new ObjectId('66879412657f290c6a41c61e'),
    name: 'LED Bulb',
    vendorId: new ObjectId('663f5902a16d8c5bbf24953d'),
    categoryId: new ObjectId('66614beced4624cdb0703671'),       
    stockStatus: 'IN_STOCK',
    approval: 'APPROVE',
    selectedAtt: [
      new ObjectId('66614b0eed4624cdb070364e'),
      new ObjectId('66614b62ed4624cdb070365e')
    ],
    CreatedTime: 2024-07-05T06:34:58.081Z,
    UpdatedTime: 2024-07-05T06:34:58.081Z,
    createdAt: 2024-07-05T06:34:58.082Z,
    updatedAt: 2024-07-05T06:34:58.082Z,
    __v: 0
  },
  {
    _id: new ObjectId('668bab888e73f460b158ecb3'),
    name: 'Tshirts',
    vendorId: new ObjectId('663f5902a16d8c5bbf24953d'),
    categoryId: new ObjectId('66614cd6ed4624cdb070368d'),       
    stockStatus: 'IN_STOCK',
    approval: 'APPROVE',
    selectedAtt: [
      new ObjectId('66614b07ed4624cdb070364b'),
      new ObjectId('66614b62ed4624cdb070365e'),
      new ObjectId('66614b0eed4624cdb070364e')
    ],
    CreatedTime: 2024-07-08T09:04:08.528Z,
    UpdatedTime: 2024-07-08T09:04:08.528Z,
    createdAt: 2024-07-08T09:04:08.531Z,
    updatedAt: 2024-07-08T09:04:08.531Z,
    __v: 0
  }
]















------------------------------------

import conditionValueModal from "../schema/conditionValueModal.js";
import categoriesModal from "../schema/categoriesModal.js";
import vendorModal from "../schema/vendorModal.js";
import productModal from "../schema/product.js";
import productVarients2 from "../schema/productVarients2.js";
import VarientsDetails from "../schema/productVarientsDetails.js";
import { getOperator } from "../utils/index.js";

const addConditionToQuery = (query, condition, radioSelection) => {
  if (radioSelection == "all") {
    query.$and.push(condition);
  } else {
    query.$or.push(condition);
  }
};

export const getRawDataForFilter = async (req, res) => {
  try {
    const conditionsArray = req.body.changedTitleFilterArr;
    const radioSelection = req.body.radioSelection;
    console.log("conditionsArray ", conditionsArray);
    let filteredProducts = [];
    let query;
    if (radioSelection == "all") {
      query = {
        $and: [],
      };
    } else {
      query = {
        $or: [],
      };
    }

    for (const condition of conditionsArray) {
      let { selectedTitle, conditionValue, inputValue } = condition;

      const actualConditionValue = await conditionValueModal.find({
        _id: conditionValue,
      });

      if (actualConditionValue) {
        condition.conditionValue = actualConditionValue[0].conditionValue;
        const operator = getOperator(condition.conditionValue);
        console.log("operator ", operator);
        let categories;
        if (selectedTitle == "category") {
          categories = await categoriesModal.find({
            name: { $regex: inputValue, $options: "i" },
          });
          if (categories) {
            const categoryIds = categories.map((c) => c._id);

            filteredProducts = await productModal.find({
              categoryId: { $in: categoryIds },
            });
          }
        }

        let vendors;
        if (selectedTitle === "vendorId") {
          vendors = await vendorModal.find({
            $or: [
              { firstName: { $regex: inputValue, $options: "i" } },
              { email: { $regex: inputValue, $options: "i" } },
            ],
          });
          const vendorIds = vendors.map((vendor) => {
            vendor._id;
            condition.inputValue = vendor._id;
          });
          if (condition.conditionValue === "equal") {
            filteredProducts = await productModal.find({
              vendorId: { $in: vendorIds },
            });
          } else if (condition.conditionValue === "not equal") {
            filteredProducts = await productModal.find({
              vendorId: { $nin: vendorIds },
            });
          }
          // res.json(filteredProducts);
          // return;
        }

        let productByName;
        if (selectedTitle === "Name") {
          productByName = await productModal.find({
            name: { $regex: inputValue, $options: "i" },
          });
          console.log("productByName ", productByName);
          if (productByName) {
            const productIds = productByName.map((p) => p._id);
            filteredProducts = await productModal.find({
              categoryId: { $in: productIds },
            });
          }
        }

        let productByPrice, priceQuery;
        if (selectedTitle === "price") {
          const priceValue = parseFloat(inputValue);
          switch (condition.conditionValue) {
            case "equal":
              priceQuery = { price: { $eq: priceValue } };
              break;
            case "not equal":
              priceQuery = { price: { $ne: priceValue } };
              break;
            case "greater than":
              priceQuery = { price: { $gt: priceValue } };
              break;
            case "less than":
              priceQuery = { price: { $lt: priceValue } };
              break;
            default:
              break;
          }
          productByPrice = await VarientsDetails.find(priceQuery);
          console.log("productByPrice ", productByPrice);
          if (productByPrice) {
            const vid = productByPrice.map((pp) => pp.pvid);
            let id2 = await productVarients2.find({
              _id: { $in: vid },
            });
            let productId = id2.map((pp) => pp.pid);
            if (productId) {
              filteredProducts = await productModal.find({
                _id: { $in: productId },
              });
            }
          }
        }

        let varientByQuantity , quantityQuery;;
        if (selectedTitle === "quantity") {
          const quantityeValue = parseFloat(inputValue);

          switch (condition.conditionValue) {
            case "equal":
              quantityQuery = { quantity: { $eq: quantityeValue } };
              break;
            case "not equal":
              quantityQuery = { quantity: { $ne: quantityeValue } };
              break;
            case "greater than":
              quantityQuery = { quantity: { $gt: quantityeValue } };
              break;
            case "less than":
              quantityQuery = { quantity: { $lt: quantityeValue } };
              break;
            default:
              break;
          }
          varientByQuantity = await VarientsDetails.find(quantityQuery);
          console.log("varientByQuantity ", varientByQuantity);
          if (varientByQuantity) {
            const vid = varientByQuantity.map((pp) => pp.pvid);
            let id2 = await productVarients2.find({
              _id: { $in: vid },
            });
            let productId = id2.map((pp) => pp.pid);
            if (productId) {
              filteredProducts = await productModal.find({
                _id: { $in: productId },
              });
            }
          }
        }

        if (condition.conditionValue === "equal") {
          inputValue = new RegExp(`^${inputValue}$`, "i");
        } else if (condition.conditionValue === "not equal") {
          inputValue = new RegExp(`^(?!${inputValue}$).*`, "i");
        } else if (condition.conditionValue == "start with") {
          inputValue = new RegExp(`^${inputValue}`, "i");
        } else if (condition.conditionValue === "end with") {
          inputValue = new RegExp(`${inputValue}$`, "gi");
        } else if (condition.conditionValue === "contains") {
          console.log("Inside else if contains");
          inputValue = new RegExp(inputValue, "gi");
        } else if (condition.conditionValue === "does not contain") {
          inputValue = new RegExp(inputValue, "gi");
        }

        let conditionQuery;
        if (selectedTitle == "vendorId") {
          conditionQuery = {
            [selectedTitle]: { [operator]: condition.inputValue.toString() },
          };
        } else {
          conditionQuery = {
            [selectedTitle]: { [operator]: inputValue },
          };
        }
        if (radioSelection == "all") {
          query.$and.push(conditionQuery);
        } else {
          query.$or.push(conditionQuery);
        }
      }
    }

    const someMoreProducts = await productModal.find(query);
    filteredProducts = [...someMoreProducts, ...filteredProducts];
    const uniqueFilteredProducts = Array.from(
      new Map(
        filteredProducts.map((product) => [product._id.toString(), product])
      ).values()
    );
    console.log("Finally all filtered ", filteredProducts);
    console.log("uniqueFilteredProducts ", uniqueFilteredProducts);
    res.json(uniqueFilteredProducts);
  } catch (error) {
    console.error("Error occurred while filtering products", error);
    res.status(400).json({ error: "somthing went wrong" });
  }
};







no it can be anything in case if categote it is equal , not equal in case of vendorsId it is equal and not equal in case of name it is contains , does not contains ends with start with