import React, { Fragment } from 'react';
import { headers } from 'next/headers';
import { size } from 'lodash';
import NotFound from '@/components/not-found';
import ProductDetail from '@/shared-pages/products/product-detail';


export default async function ProductDetailPage({
    params,
}: {
    params: {
        slug?: string | any
    };
}) {

    const headersList = await headers();

    return (
        <Fragment>
            {(params && params.slug && size(params.slug) > 0) ? (
                <>
                    <ProductDetail
                        slug={params.slug}
                        // slug={params.slug[0]}
                        hostName={headersList.get('host')}
                    />
                </>
            ) : (
                <>
                    <NotFound />
                </>
            )
            }
        </Fragment>
    )
}


