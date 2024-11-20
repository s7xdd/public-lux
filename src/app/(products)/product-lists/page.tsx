import ProductList from '@/shared-pages/products/product-lists';
import { headers } from 'next/headers';
import React from 'react';

const ProductsList = async ({
    params,
}: {
    params: {
        slug: string
    };
}) => {
    const headersList = await headers();
    return (
        <ProductList slug={params.slug} hostName={headersList.get('host')} />
    );
}

export default ProductsList;
