export interface ProductListingProps {
    slug: string | null;
    hostName: string | null;
}

export interface ProductDetailProps {
    slug: string
    sku?: string;
    hostName: string | null
}