import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  vendorId: "",
  categoryId: "",
  desc: "",
  tags: [],
  status: "",
  sku: "",
  attributes: [],
  variants: [],
  coverImg: null,
  readyToShip: null,
  freeShipping: null,
  customization: {},
  commission: {},
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      const {
        name,
        slug,
        description,
        vendorId,
        categoryId,
        tags,
        sku,
        status,
        attributes,
        img,
        readyToShip,
        freeShipping,
        customization,
        commission,
      } = action.payload;
      if (name) {
        state.name = name;
      }
      if (slug) {
        state.slug = slug;
      }
      if (description) {
        state.desc = description;
      }
      if (categoryId) {
        state.categoryId = categoryId;
      }
      if (vendorId) {
        state.vendorId = vendorId;
      }
      if (tags) {
        state.tags = [...tags];
      }
      if (sku) {
        state.sku = sku;
      }
      if (status) {
        state.status = status;
      }
      if (attributes) {
        state.attributes = [...attributes];
      }
      if (img) {
        state.coverImg = img;
      }
      if (freeShipping) {
        state.freeShipping = freeShipping;
      }
      if (readyToShip) {
        state.readyToShip = readyToShip;
      }
      if (customization) {
        state.customization = customization;
      }
      if (commission) {
        state.commission = commission;
      }
    },
    removeProduct: (state, action) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setProduct } = productSlice.actions;
export default productSlice.reducer;
