import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchBrands, fetchCategories } from "./SectionAPI";

const initialState = {
  brands: [],
  categories: [],
};

export const fetchBrandsAsync = createAsyncThunk(
  "product/fetchBrands",
  async () => {
    const response = await fetchBrands();
    return response;
  }
);

export const fetchCategoriesAsync = createAsyncThunk(
  "product/fetchCategories",
  async () => {
    const response = await fetchCategories();
    return response;
  }
);

export const sectionSlice = createSlice({
  name: "section",
  initialState,
  reducers: {
    updateChecked(state, action) {
      const { section, id } = action.payload;
      if (section === "category") {
        const categoryToUpdate = state.categories.find((category) => category.id === id);
        if (categoryToUpdate) {
          categoryToUpdate.checked = !categoryToUpdate.checked;
        }
      } else if (section === "brand") {
        const brandToUpdate = state.brands.find((brand) => brand.id === id);
        if (brandToUpdate) {
          brandToUpdate.checked = !brandToUpdate.checked;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // <-- Brand Fetch -->
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })

      // <-- Categories fetch -->
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      });
  },
});

export const { updateChecked } = sectionSlice.actions;
export default sectionSlice.reducer;

export const SelectCategory = (state) => state.sectionIndex.categories;
export const SelectBrands = (state) => state.sectionIndex.brands;
