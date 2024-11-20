import React, { Fragment } from 'react';
import { headers } from 'next/headers';
import { size } from 'lodash';
import NotFound from '@/components/not-found';
import CustomizationSection from '@/shared-pages/custom';

export default async function CustomProductPage({
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
                    <CustomizationSection
                        slug={params.slug}
                        //slug={params.slug[0]}
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