import { PayloadAction } from '@reduxjs/toolkit/react';
import { createSlice } from '@reduxjs/toolkit';

import { sliceNames } from '@/constants/redux';
import { ProductState } from '@/types/redux/product';

const initialState: ProductState = {
    products: [],
    filterChanged: false,
    gridColumnsChanged: false,
    productLoading: true,
    stopProductReLoading: false,
    productSpreadOperation: false,
    productPageSize: 1,
    discountRanges: [],
    filterBrands: [],
    filterAttributes: [],
    totalProductsCount: 0,
    categorySlug: null,
    brandSlug: null,
    collectionId: null,
    randomValue: Math.random()
};

const productsSlice = createSlice({
    name: sliceNames.products,
    initialState,
    reducers: {
        setProductData: (state, action: PayloadAction<ProductState[]>) => {
            const newProducts = action.payload;
            if (state.productPageSize === 1) {
                state.products = newProducts;
                state.productSpreadOperation = false;
            } else {
                if (!state.productSpreadOperation) {
                    state.products = newProducts;
                    state.productSpreadOperation = false;
                } else {
                    const existingProduct = JSON.parse(JSON.stringify(state.products));
                    const existingProductIds = new Set(existingProduct.map((product: any) => product._id));
                    const nonDuplicateProducts = newProducts.filter((product: any) => !existingProductIds.has(product._id));

                    state.products = [...existingProduct, ...nonDuplicateProducts];
                }
            }
            state.stopProductReLoading = false;
        },
        clearProduct: (state, action: PayloadAction<any[]>) => {
            state.products = action.payload
        },
        setFilter: (state, action: PayloadAction<boolean>) => {
            state.filterChanged = action.payload;
        },
        setDiscountRanges: (state, action: PayloadAction<any[]>) => {
            state.discountRanges = action.payload
        },
        setFilterBrands: (state, action: PayloadAction<any[]>) => {
            state.filterBrands = action.payload
        },
        setFilterAttributes: (state, action: PayloadAction<any[]>) => {
            state.filterAttributes = action.payload
        },
        setCollectionId: (state, action: PayloadAction<string | null>) => {
            state.collectionId = action.payload;
        },
        setGridColumnsChanged: (state, action: PayloadAction<boolean>) => {
            state.gridColumnsChanged = action.payload;
        },
        setTotalProductsCount: (state, action: PayloadAction<number>) => {
            state.totalProductsCount = action.payload;
        },
        setProductPageSize: (state, action: PayloadAction<number>) => {
            state.productPageSize = Number(action.payload);
        },
        setProductLoading: (state, action: PayloadAction<boolean>) => {
            state.productLoading = action.payload;
        },
        setProductSpreadOperation: (state, action: PayloadAction<boolean>) => {
            state.productSpreadOperation = action.payload;
        },
        setCategorySlug: (state, action: PayloadAction<string | null>) => {
            state.categorySlug = action.payload || null;
        },
        setBrandSlug: (state, action: PayloadAction<string | null>) => {
            state.brandSlug = action.payload || null;
        },
        setStopProductReLoading: (state, action: PayloadAction<boolean>) => {
            state.stopProductReLoading = action.payload;
        },
        setRandomValue: (state, action: PayloadAction<number>) => {
            state.randomValue = action.payload;
        },
    },
});

export const { setProductData, setDiscountRanges, setFilterAttributes, setFilterBrands, setCollectionId, clearProduct, setRandomValue, setProductLoading, setStopProductReLoading, setTotalProductsCount, setProductPageSize, setProductSpreadOperation, setGridColumnsChanged, setFilter, setCategorySlug, setBrandSlug } = productsSlice.actions;

export default productsSlice.reducer;