
export interface ProductState {
    products: any;
    filterChanged: boolean;
    gridColumnsChanged: boolean;
    productLoading: boolean;
    stopProductReLoading: boolean;
    productSpreadOperation: boolean;
    productPageSize: number;
    discountRanges: any[];
    filterBrands: any[];
    filterAttributes: any[];
    totalProductsCount: number;
    categorySlug: string | null;
    brandSlug: string | null;
    collectionId: string | null;
    randomValue: number;
}

export interface ProductAttribute {
    attributeType: string;
    attributeDetail: {
        _id: string;
        itemName: string;
        itemValue: string;
    };
}

export interface ProductDetailsState {
    currentVariantSku: string | null;
    currentVariantId: string | null;
    productDetails: any;
    productVariants: any;
    productGallerImages: any[];
    productSpecification: any[];
    defaultProductVariantData: any;
    allProductVariantAttributes: any;
    productDetailsLoading: boolean;
    hexAttributes: ProductAttribute[];
    textAttributes: ProductAttribute[];
    patternAttributes: ProductAttribute[];
    selectedAttribute: {
        selectedTextAttribute: {
            variantId: null | string;
            attributeId: null | string;
            attributeDetailId: null | string;
        };
        selectedHexAttribute: {
            variantId: null | string;
            attributeId: null | string;
            attributeDetailId: null | string;
        };
        selectedPatternAttribute: {
            variantId: null | string;
            attributeId: null | string;
            attributeDetailId: null | string;
        };
    };
    matchedAttributeDetail: {
        hexAttributes: any[];
        textAttributes: any[];
        patternAttributes: any[];
    }
    changeAttributeType: string
    selectedVariantId: string | null
}