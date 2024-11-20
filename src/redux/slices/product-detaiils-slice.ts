import { PayloadAction } from '@reduxjs/toolkit/react';
import { createSlice } from '@reduxjs/toolkit';
import { isArray, size } from 'lodash';

import { ProductDetailsState } from '@/types/redux/product';
import { sliceNames } from '@/constants/redux';
import { attributeTypes } from '@/server-api/utils/product';

const initialState: ProductDetailsState = {
    currentVariantSku: null,
    currentVariantId: null,
    productDetails: {},
    productGallerImages: [],
    productSpecification: [],
    productVariants: [],
    defaultProductVariantData: null,
    allProductVariantAttributes: [],
    productDetailsLoading: true,
    hexAttributes: [],
    textAttributes: [],
    patternAttributes: [],
    selectedAttribute: {
        selectedTextAttribute: {
            variantId: null,
            attributeId: null,
            attributeDetailId: null
        },
        selectedHexAttribute: {
            variantId: null,
            attributeId: null,
            attributeDetailId: null
        },
        selectedPatternAttribute: {
            variantId: null,
            attributeId: null,
            attributeDetailId: null
        },
    },
    matchedAttributeDetail: {
        hexAttributes: [],
        textAttributes: [],
        patternAttributes: [],
    },
    changeAttributeType: 'text',
    selectedVariantId: null,
};

const productDetailsDetailsSlice = createSlice({
    name: sliceNames.productDetailsData,
    initialState,
    reducers: {
        setProductDetailsData: (state, action: PayloadAction<any>) => {
            const { productVariants, imageGallery, productSpecification, ...restData } = action.payload;
            state.productDetails = restData;
            state.productGallerImages = imageGallery;
            if (size(productSpecification) > 0) {
                state.productSpecification = productSpecification;
            }
            state.productDetailsLoading = false;
        },
        setCurrentVariantSku: (state, action: PayloadAction<any>) => {
            state.currentVariantSku = action.payload;
        },
        setProductGallerImages: (state, action: PayloadAction<any>) => {
            state.productGallerImages = action.payload;
        },
        setProductSpecification: (state, action: PayloadAction<any>) => {
            state.productSpecification = action.payload;
        },
        setProductVariantsData: (state, action: any) => {
            state.allProductVariantAttributes = [];
            state.hexAttributes = [];
            state.textAttributes = [];
            state.patternAttributes = [];

            const { productVariants, allProductVariants, allProductVariantAttributes } = action.payload;
            state.productVariants = allProductVariants;
            state.allProductVariantAttributes = allProductVariantAttributes;
            let defaultVariant: any = (isArray(productVariants) && size(productVariants) > 0) ? productVariants[0] : null;

            if (!defaultVariant) {
                for (const productVariant of (action as any).payload) {
                    // Check if variantSku matches currentVariantSku
                    if (productVariant.variantSku === state.currentVariantSku) {
                        defaultVariant = productVariant;
                        break;
                    }
                    // Otherwise, check if isDefault is true
                    if (!defaultVariant && (productVariant.isDefault === 1 || productVariant.isDefault === '1')) {
                        defaultVariant = productVariant;
                    }
                    // Also, check if variantSku matches productDetails.sku if defaultVariant is still not set
                    if (!defaultVariant && productVariant.variantSku === state.productDetails.sku) {
                        defaultVariant = productVariant;
                    }
                    // if (!defaultVariant && Number(productVariant.quantity) > 0) {
                    //     defaultVariant = productVariant;
                    // }
                }
            }

            if (defaultVariant) {
                state.defaultProductVariantData = defaultVariant;
                if (isArray(defaultVariant?.variantImageGallery) && size(defaultVariant?.variantImageGallery) > 0) {
                    state.productGallerImages = defaultVariant?.variantImageGallery;
                }
                if (isArray(defaultVariant?.productSpecification) && size(defaultVariant?.productSpecification) > 0) {
                    state.productSpecification = defaultVariant?.productSpecification;
                }
            } else if (isArray(state.productVariants) && size(state.productVariants) > 0) {
                state.defaultProductVariantData = state.productVariants[0];
            } else {
                state.defaultProductVariantData = null;
            }
            // const allAttributes = action.payload
            //     .filter((variant: any) => Number(variant.quantity) > 0)
            //     .flatMap((variant: any) => variant.productVariantAttributes);
            if (size(allProductVariantAttributes) > 0) {
                const uniqueAttributes = Array.from(new Map(allProductVariantAttributes.map((attr: any) => [attr.attributeDetail._id, attr])).values());

                const textAttributes: any = uniqueAttributes.filter((attr: any) => attr.attributeType === attributeTypes.text);
                const hexAttributes: any = uniqueAttributes.filter((attr: any) => attr.attributeType === attributeTypes.hex);
                const patternAttributes: any = uniqueAttributes.filter((attr: any) => attr.attributeType === attributeTypes.pattern);

                let defaultTextAttributes: any = [];
                let defaultHexAttributes: any = []
                let defaultPatternAttributes: any = []
                if (defaultVariant) {
                    state.selectedVariantId = defaultVariant._id

                    if (size(defaultVariant.productVariantAttributes) > 0) {
                        const defualtUniqueAttributes = Array.from(new Map(defaultVariant.productVariantAttributes.map((attr: any) => [attr.attributeDetail._id, attr])).values());
                        if (state.selectedAttribute.selectedTextAttribute.variantId !== null && state.selectedAttribute.selectedTextAttribute.attributeId !== null && state.selectedAttribute.selectedTextAttribute.attributeDetailId !== null) {
                            defaultTextAttributes = defualtUniqueAttributes.filter((attr: any) =>
                                (attr.attributeType === attributeTypes.text) &&
                                attr.attributeId === state.selectedAttribute.selectedTextAttribute.attributeId &&
                                attr.attributeDetail._id === state.selectedAttribute.selectedTextAttribute.attributeDetailId
                            );
                        } else {
                            defaultTextAttributes = defualtUniqueAttributes.filter((attr: any) => attr.attributeType === attributeTypes.text);

                        }
                        if (state.selectedAttribute.selectedHexAttribute.variantId !== null && state.selectedAttribute.selectedHexAttribute.attributeId !== null && state.selectedAttribute.selectedHexAttribute.attributeDetailId !== null) {
                            defaultHexAttributes = defualtUniqueAttributes.filter((attr: any) =>
                                (attr.attributeType === attributeTypes.hex) &&
                                attr.attributeId === state.selectedAttribute.selectedHexAttribute.attributeId &&
                                attr.attributeDetail._id === state.selectedAttribute.selectedHexAttribute.attributeDetailId
                            );
                        } else {
                            defaultHexAttributes = defualtUniqueAttributes.filter((attr: any) => attr.attributeType === attributeTypes.hex);

                        }
                        if (state.selectedAttribute.selectedPatternAttribute.variantId !== null && state.selectedAttribute.selectedPatternAttribute.attributeId !== null && state.selectedAttribute.selectedPatternAttribute.attributeDetailId !== null) {
                            defaultPatternAttributes = defualtUniqueAttributes.filter((attr: any) =>
                                (attr.attributeType === attributeTypes.pattern) &&
                                attr.attributeId === state.selectedAttribute.selectedPatternAttribute.attributeId &&
                                attr.attributeDetail._id === state.selectedAttribute.selectedPatternAttribute.attributeDetailId
                            );
                        } else {
                            defaultPatternAttributes = defualtUniqueAttributes.filter((attr: any) => attr.attributeType === attributeTypes.pattern);
                        }
                    }
                }

                if ((isArray(hexAttributes) && (size(textAttributes) > 0))) {
                    state.textAttributes = textAttributes;
                    state.changeAttributeType = attributeTypes.text;

                    state.selectedAttribute.selectedTextAttribute.variantId = (size(defaultTextAttributes) > 0 ? defaultTextAttributes[0].variantId : textAttributes[0].variantId ?? null);
                    state.selectedAttribute.selectedTextAttribute.attributeId = (size(defaultTextAttributes) > 0 ? defaultTextAttributes[0].attributeId : textAttributes[0].attributeId ?? null);
                    state.selectedAttribute.selectedTextAttribute.attributeDetailId = (size(defaultTextAttributes) > 0 ? defaultTextAttributes[0].attributeDetail?._id : textAttributes[0].attributeDetail?._id ?? null);
                }
                if ((isArray(hexAttributes) && (size)(hexAttributes) > 0)) {
                    state.hexAttributes = hexAttributes;

                    state.selectedAttribute.selectedHexAttribute.variantId = (size(defaultHexAttributes) > 0 ? defaultHexAttributes[0].variantId : hexAttributes[0].variantId ?? null);
                    state.selectedAttribute.selectedHexAttribute.attributeId = (size(defaultHexAttributes) > 0 ? defaultHexAttributes[0].attributeId : hexAttributes[0].attributeId ?? null);
                    state.selectedAttribute.selectedHexAttribute.attributeDetailId = (size(defaultHexAttributes) > 0 ? defaultHexAttributes[0].attributeDetail?._id : hexAttributes[0].attributeDetail?._id ?? null);

                    if (size(textAttributes) === 0) {
                        state.changeAttributeType = attributeTypes.hex;
                    }
                }
                if (isArray(patternAttributes) && (size(patternAttributes) > 0)) {
                    state.patternAttributes = patternAttributes;

                    state.selectedAttribute.selectedPatternAttribute.variantId = (size(defaultPatternAttributes) > 0 ? defaultPatternAttributes[0].variantId : patternAttributes[0].variantId ?? null);
                    state.selectedAttribute.selectedPatternAttribute.attributeId = (size(defaultPatternAttributes) > 0 ? defaultPatternAttributes[0].attributeId : patternAttributes[0].attributeId ?? null);
                    state.selectedAttribute.selectedPatternAttribute.attributeDetailId = (size(defaultPatternAttributes) > 0 ? defaultPatternAttributes[0].attributeDetail?._id : patternAttributes[0].attributeDetail?._id ?? null);

                    if ((size(textAttributes) === 0) && (size(textAttributes) === 0)) {
                        state.changeAttributeType = attributeTypes.pattern;
                    }
                }

                const matchedVariants: any[] = [];
                for (let variant of allProductVariants) {
                    if (((variant as any).variantSku === state.defaultProductVariantData.variantSku)) {
                        state.currentVariantSku = state.defaultProductVariantData.variantSku
                    }
                    if (((variant as any)._id === state.defaultProductVariantData._id)) {
                        state.currentVariantId = state.defaultProductVariantData._id
                    }

                    if (isArray(allProductVariantAttributes) && size(allProductVariantAttributes) > 0) {
                        let matchedAttributes = []
                        if ((isArray(textAttributes) && (size(textAttributes) > 0))) {
                            matchedAttributes = allProductVariantAttributes.filter(
                                (attribute: any) =>
                                    attribute.attributeId === textAttributes[0].attributeId &&
                                    attribute.attributeDetail._id === textAttributes[0].attributeDetail?._id
                            );
                        }
                        if ((isArray(hexAttributes) && (size)(hexAttributes) > 0)) {
                            if (size(textAttributes) === 0) {
                                matchedAttributes = allProductVariantAttributes.filter(
                                    (attribute: any) =>
                                        attribute.attributeId === hexAttributes[0].attributeId &&
                                        attribute.attributeDetail._id === hexAttributes[0].attributeDetail?._id
                                );
                            }
                        }
                        if (isArray(patternAttributes) && (size(patternAttributes) > 0)) {
                            if ((size(textAttributes) === 0) && (size(textAttributes) === 0)) {
                                matchedAttributes = allProductVariantAttributes.filter(
                                    (attribute: any) =>
                                        attribute.attributeId === patternAttributes[0].attributeId &&
                                        attribute.attributeDetail._id === patternAttributes[0].attributeDetail?._id
                                );
                            }
                        }
                        if (matchedAttributes.length > 0) {
                            matchedVariants.push(variant);
                        }
                    }
                }

                if (isArray(matchedVariants) && size(matchedVariants) > 0) {
                    // const allAttributes = matchedVariants
                    //     .filter((variant: any) => Number(variant.quantity) > 0)
                    //     .flatMap((variant: any) => variant.productVariantAttributes);

                    const uniqueAttributes = Array.from(new Map(allProductVariantAttributes.map((attr: any) => [attr.attributeDetail._id, attr])).values());

                    state.matchedAttributeDetail.textAttributes = uniqueAttributes.filter((attr: any) => attr.attributeType === attributeTypes.text).map((filterAttr: any) => filterAttr.attributeDetail._id);
                    state.matchedAttributeDetail.hexAttributes = uniqueAttributes.filter((attr: any) => attr.attributeType === attributeTypes.hex).map((filterAttr: any) => filterAttr.attributeDetail._id);
                    state.matchedAttributeDetail.patternAttributes = uniqueAttributes.filter((attr: any) => attr.attributeType === attributeTypes.pattern).map((filterAttr: any) => filterAttr.attributeDetail._id);

                }
            } else {
                state.allProductVariantAttributes = [];
                state.hexAttributes = [];
                state.textAttributes = [];
                state.patternAttributes = [];
                state.selectedAttribute.selectedTextAttribute.variantId = null;
                state.selectedAttribute.selectedTextAttribute.attributeId = null;
                state.selectedAttribute.selectedTextAttribute.attributeDetailId = null;

                state.selectedAttribute.selectedHexAttribute.variantId = null;
                state.selectedAttribute.selectedHexAttribute.attributeId = null;
                state.selectedAttribute.selectedHexAttribute.attributeDetailId = null;

                state.selectedAttribute.selectedPatternAttribute.variantId = null;
                state.selectedAttribute.selectedPatternAttribute.attributeId = null;
                state.selectedAttribute.selectedPatternAttribute.attributeDetailId = null;

                state.matchedAttributeDetail.hexAttributes = [];
                state.matchedAttributeDetail.textAttributes = [];
                state.matchedAttributeDetail.patternAttributes = [];
            }
            state.productDetailsLoading = false;
        },
        setDefaultProductVariantData: (state, action: PayloadAction<ProductDetailsState>) => {
            state.defaultProductVariantData = action.payload;
        },
        setSelectedAttribute: (state, action: PayloadAction<any>) => {
            const productVariants = JSON.parse(JSON.stringify(state.productVariants));
            const allProductVariantAttributes = JSON.parse(JSON.stringify(state.allProductVariantAttributes));
            if (size(allProductVariantAttributes) > 0) {
                if ((productVariants) && (size(productVariants) > 0)) {
                    if (action.payload.type) {
                        const { type, variantId, attributeId, attributeDetailId } = action.payload;
                        const { selectedAttribute, changeAttributeType }: any = state;

                        if (type === attributeTypes.text) {
                            selectedAttribute.selectedTextAttribute = { variantId, attributeId, attributeDetailId };
                        } else if (type === attributeTypes.hex) {
                            selectedAttribute.selectedHexAttribute = { variantId, attributeId, attributeDetailId };
                        } else if (type === attributeTypes.pattern) {
                            selectedAttribute.selectedPatternAttribute = { variantId, attributeId, attributeDetailId };
                        }

                        if (changeAttributeType === type) {
                            if (type !== attributeTypes.text) {
                                selectedAttribute.selectedTextAttribute = { variantId: null, attributeId: null, attributeDetailId: null };
                            }
                            if (type !== attributeTypes.hex) {
                                selectedAttribute.selectedHexAttribute = { variantId: null, attributeId: null, attributeDetailId: null };
                            }
                            if (type !== attributeTypes.pattern) {
                                selectedAttribute.selectedPatternAttribute = { variantId: null, attributeId: null, attributeDetailId: null };
                            }
                            state.selectedVariantId = null;
                        }
                        // // const productVariants = JSON.parse(JSON.stringify(selectedAttribute));
                        // console.log(JSON.parse(JSON.stringify(selectedAttribute)));
                        // console.log('attributeId', attributeId);

                        if (state.changeAttributeType === type) {
                            const matchedVariants: any[] = [];
                            const matchedAttributes = allProductVariantAttributes.filter(
                                (attribute: any) =>
                                    attribute.variantId === variantId &&
                                    attribute.attributeId === attributeId &&
                                    attribute.attributeDetail._id === attributeDetailId
                            );

                            if (size(matchedAttributes) > 0) {
                                const matchedVariantDetails = productVariants.find((variant: any) => variant._id === matchedAttributes[0].variantId)
                                if (matchedVariantDetails) {
                                    matchedVariants.push(matchedVariantDetails);
                                }
                            }

                            if (isArray(matchedVariants) && size(matchedVariants) > 0) {
                                const uniqueAttributes = Array.from(new Map(allProductVariantAttributes?.map((attr: any) => [attr.attributeDetail._id, attr])).values());
                                state.matchedAttributeDetail.textAttributes = uniqueAttributes.filter((attr: any) => attr.attributeType === attributeTypes.text).map((filterAttr: any) => filterAttr.attributeDetail._id);
                                state.matchedAttributeDetail.hexAttributes = uniqueAttributes.filter((attr: any) => attr.attributeType === attributeTypes.hex).map((filterAttr: any) => filterAttr.attributeDetail._id);
                                state.matchedAttributeDetail.patternAttributes = uniqueAttributes.filter((attr: any) => attr.attributeType === attributeTypes.pattern).map((filterAttr: any) => filterAttr.attributeDetail._id);
                            }
                        } else {
                            const attributeCombinations = [
                                { selected: [state.selectedAttribute.selectedTextAttribute, state.selectedAttribute.selectedHexAttribute], check: state.textAttributes, fill: "patternAttributes", type: attributeTypes.pattern },
                                { selected: [state.selectedAttribute.selectedTextAttribute, state.selectedAttribute.selectedPatternAttribute], check: state.textAttributes, fill: "hexAttributes", type: attributeTypes.hex },
                                { selected: [state.selectedAttribute.selectedHexAttribute, state.selectedAttribute.selectedPatternAttribute], check: state.hexAttributes, fill: "textAttributes", type: attributeTypes.text },
                                { selected: [state.selectedAttribute.selectedTextAttribute], check: state.textAttributes, fill: "hexAttributes", type: attributeTypes.hex },
                                { selected: [state.selectedAttribute.selectedHexAttribute], check: state.hexAttributes, fill: "textAttributes", type: attributeTypes.text },
                                { selected: [state.selectedAttribute.selectedTextAttribute], check: state.textAttributes, fill: "patternAttributes", type: attributeTypes.pattern },
                                { selected: [state.selectedAttribute.selectedPatternAttribute], check: state.patternAttributes, fill: "hexAttributes", type: attributeTypes.hex },
                                { selected: [state.selectedAttribute.selectedHexAttribute], check: state.hexAttributes, fill: "patternAttributes", type: attributeTypes.pattern },
                                { selected: [state.selectedAttribute.selectedPatternAttribute], check: state.patternAttributes, fill: "textAttributes", type: attributeTypes.text }
                            ];

                            attributeCombinations.forEach(({ selected, check, fill, type }) => {
                                if (isArray(check) && size(check) > 0) {
                                    if (selected.every(attr => attr.attributeId !== null && attr.attributeDetailId !== null)) {
                                        const checkAttribute = allProductVariantAttributes.some((attribute: any) =>
                                            attribute.variantId === variantId &&
                                            attribute.attributeId === attributeId &&
                                            attribute.attributeDetail._id === attributeDetailId
                                        );
                                        if (checkAttribute) {
                                            const fillAttributeId = allProductVariantAttributes.find((attribute: any) => attribute.attributeType === type)?.attributeDetail?._id;
                                            if (fillAttributeId) {
                                                (state as any).matchedAttributeDetail[fill] = [fillAttributeId];
                                            }
                                        }
                                    }
                                }
                            });
                        }

                        const textAttributes = JSON.parse(JSON.stringify(state.textAttributes));
                        const hexAttributes = JSON.parse(JSON.stringify(state.hexAttributes));
                        const patternAttributes = JSON.parse(JSON.stringify(state.patternAttributes));

                        const setNewSelectVariantId = (newAttributeId: string, newAttributeDetailId: string) => {
                            const checkAttributes = allProductVariantAttributes.find((attribute: any) =>
                                attribute.variantId === variantId &&
                                attribute.attributeId === newAttributeId &&
                                attribute.attributeDetail._id === newAttributeDetailId
                            );
                            state.selectedVariantId = checkAttributes ? checkAttributes.variantId : null;
                        }

                        if ((size(textAttributes) > 0) && (size(hexAttributes) > 0) && (size(patternAttributes) > 0)) { // set selectedVariantId
                            const { selectedTextAttribute, selectedHexAttribute, selectedPatternAttribute } = state.selectedAttribute;
                            const attributes = [selectedTextAttribute, selectedHexAttribute, selectedPatternAttribute];
                            if (attributes.every(attr => attr.variantId !== null && attr.attributeId !== null && attr.attributeDetailId !== null)) {
                                setNewSelectVariantId(attributeId, attributeDetailId);
                            }
                        } else if ((size(textAttributes) > 0) && (size(hexAttributes) > 0)) {
                            const { selectedTextAttribute, selectedHexAttribute } = state.selectedAttribute;
                            const attributes = [selectedTextAttribute, selectedHexAttribute];
                            if (attributes.every(attr => attr.variantId !== null && attr.attributeId !== null && attr.attributeDetailId !== null)) {
                                setNewSelectVariantId(attributeId, attributeDetailId);
                            }
                        } else if ((size(textAttributes) > 0) && (size(patternAttributes) > 0)) {
                            const { selectedTextAttribute, selectedPatternAttribute } = state.selectedAttribute;
                            const attributes = [selectedTextAttribute, selectedPatternAttribute];
                            if (attributes.every(attr => attr.variantId !== null && attr.attributeId !== null && attr.attributeDetailId !== null)) {
                                setNewSelectVariantId(attributeId, attributeDetailId);
                            }
                        } else if ((size(hexAttributes) > 0) && (size(patternAttributes) > 0)) {
                            const { selectedHexAttribute, selectedPatternAttribute } = state.selectedAttribute;
                            const attributes = [selectedHexAttribute, selectedPatternAttribute];
                            if (attributes.every(attr => attr.variantId !== null && attr.attributeId !== null && attr.attributeDetailId !== null)) {
                                setNewSelectVariantId(attributeId, attributeDetailId);
                            }
                        } else if (size(textAttributes) > 0) {
                            const { selectedTextAttribute } = state.selectedAttribute;
                            if (
                                selectedTextAttribute.variantId !== null &&
                                selectedTextAttribute.attributeId !== null &&
                                selectedTextAttribute.attributeDetailId !== null
                            ) {
                                setNewSelectVariantId(selectedTextAttribute.attributeId, selectedTextAttribute.attributeDetailId);
                            }
                        } else if (size(hexAttributes) > 0) {
                            const { selectedHexAttribute } = state.selectedAttribute;
                            if (
                                selectedHexAttribute.variantId !== null &&
                                selectedHexAttribute.attributeId !== null &&
                                selectedHexAttribute.attributeDetailId !== null
                            ) {
                                setNewSelectVariantId(selectedHexAttribute.attributeId, selectedHexAttribute.attributeDetailId);
                            }
                        } else if (size(patternAttributes) > 0) {
                            const { selectedPatternAttribute } = state.selectedAttribute;
                            if (
                                selectedPatternAttribute.variantId !== null &&
                                selectedPatternAttribute.attributeId !== null &&
                                selectedPatternAttribute.attributeDetailId !== null
                            ) {
                                setNewSelectVariantId(selectedPatternAttribute.attributeId, selectedPatternAttribute.attributeDetailId);
                            }
                        } else {
                            state.selectedVariantId = null;
                        }
                    }
                }
            } else {

            }
        },
        setProductDetailsLoading: (state, action: PayloadAction<boolean>) => {
            state.productDetailsLoading = action.payload;
        },
    },
});

export const { setProductDetailsData, setCurrentVariantSku, setProductVariantsData, setProductSpecification, setSelectedAttribute, setProductGallerImages, setProductDetailsLoading } = productDetailsDetailsSlice.actions;

export default productDetailsDetailsSlice.reducer;
