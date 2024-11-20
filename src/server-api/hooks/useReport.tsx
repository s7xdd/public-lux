'use client';

import { useState, useEffect, SetStateAction, useCallback } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { headers } from "next/headers";

// import { MyPagination as MyPaginationComponent } from '@/utils/pagination';
// import { generatePaginationConfig } from '@/utils/functions';

interface UseReportParams {
    defaultfilterValues?: any; // Adjust the type as needed
    page_size?: string;
    sb?: string;
    limit?: number;
    page?: number;
    fetchFunction?: () => void;
    combinedFilters?: Record<string, string>;
    pagePath?: string;
}

const useReport = (params: UseReportParams = {}) => {
    const router = useRouter();
    const pathname = usePathname();

    let queryParams: { [key: string]: string } = {};
    const searchParams: any = useSearchParams();

    for (const [key, value] of searchParams?.entries()) {
        queryParams[key] = value;
    }

    const defaultfilterValue = {
        ...(params?.defaultfilterValues || {}),
        ...(queryParams ? { ...queryParams } : {}),
        // page_size: searchParams.get('page_size') || params.page_size || '1',
        // sb: params.sb || searchParams?.sb || '',
        // limit: searchParams.get('limit') || params.limit || 20,
        // page: params.page || searchParams?.page,
    };

    const [filterValues, setFilterValues] = useState(defaultfilterValue);
    const [recordCount, setRecordCount] = useState<number | null>(null);
    const [filterBlockShow, setFilterBlockShow] = useState(false);
    const [isClient, setIsClient] = useState(false);

    const combinedFilters = params.combinedFilters || {};

    useEffect(() => {
        if (searchParams) {
            setFilterValues({
                ...defaultfilterValue,
                ...queryParams,
            });
        }
    }, [router, searchParams]);

    useEffect(() => {
        setIsClient(true)
    }, []);

    useEffect(() => {
        setIsClient(true)
        isClient && params?.fetchFunction && params?.fetchFunction();
    }, [filterValues]);

    const sortClick = (column: string) => {
        let thisColumn = null;
        let thisDirection = null;
        if (column.endsWith('asc')) {
            thisColumn = column.substring(0, column.length - 3);
            thisDirection = 'asc';
        } else if (column.endsWith('desc')) {
            thisColumn = column.substring(0, column.length - 4);
            thisDirection = 'desc';
        } else if (column == 'Sort') {
            thisColumn = '';
            thisDirection = '';
        } else {
            thisColumn = column;
            thisDirection = null;
        }

        if (thisDirection != null) {
            filterChanged({
                ...filterValues,
                sb: (thisColumn + ' ' + thisDirection).trim(),
                // page_size: 1,
            }, true);
        } else {
            filterChanged({
                ...filterValues,
                sb: (filterValues.sb == thisColumn + ' asc'
                    ? thisColumn + ' desc'
                    : thisColumn + ' asc'
                ).trim(),
                // page_size: 1,
            }, true);
        }
    };
    // console.log('context.query?.page', params.page);

    const getCombinedParams = () => {
        return {
            ...filterValues,
            ...checkFilterValuesAvailability(),
            // page_size: filterValues.page_size == '1' || !recordCount ? '1' : null,
        };
    };

    const checkFilterValuesAvailability = () => {
        let retVal: Record<string, any> = {};
        for (const combinedFilter in combinedFilters) {
            if (!filterValues[combinedFilter]) {
                retVal[combinedFilters[combinedFilter]] = null;
            }
            retVal[combinedFilter] = null;
        }
        return retVal;
    };

    const setRowsCount = (totalCount: SetStateAction<number | null>) => {
        if (totalCount) {
            setRecordCount(totalCount);
        }
    };

    const handleFilterClick = (fetchFunction: () => void) => {
        (filterValues.page_size == 1 && fetchFunction()) ||
            filterChanged({ ...filterValues, page_size: '1' }, true);
    };

    const filterChanged = (newParam: any = {}, replace = false) => {
        if (replace) {
            router.push(`${'/' + params.pagePath || pathname || '/nopage'}?${Object.keys(newParam)
                .map((key) => key + '=' + newParam[key])
                .join('&')}`, { scroll: false })
        } else {
            const redirectTo = `${pathname || '/nopage'}?${Object.keys({
                ...filterValues,
                // page_size: '1',
                ...newParam,
            })
                .map((key) =>
                    key + '=' + { ...filterValues, ...newParam }[key]
                )
                .join('&')}`

            const getLink = (path: string) => `${path}`;
            router.push(getLink(redirectTo), { scroll: false })
        }
    };

    const buildQueryString = (extraParams: Record<string, any>) => {
        let allParams = { ...filterValues, ...extraParams };
        return Object.keys(allParams).map(key => key + '=' + allParams[key]).join('&');
    };

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString())
            params.set(name, value)

            return params
        },
        [searchParams]
    )
    // const MyPagination = () => {
    //     return (
    //         (Math.ceil(recordCount! / filterValues.limit) > 1 && (
    //             <MyPaginationComponent
    //                 pageNumber={parseInt(filterValues.page_size)}
    //                 pageCount={Math.ceil(recordCount! / filterValues.limit)}
    //                 handleChangePage={(page_size: any) => {
    //                     if (parseInt(filterValues.page_size) !== Number(page_size)) {
    //                         filterChanged({
    //                             ...filterValues,
    //                             page_size: page_size,
    //                             page: (generatePaginationConfig(50, filterValues?.limit || params.limit) as any).find((pagination: any) => pagination.page_size === page_size).limit
    //                         }, true)
    //                     }
    //                 }}
    //             />
    //         )) || <></>
    //     );
    // };

    return {
        filterValues,
        setRecordCount,
        getCombinedParams,
        recordCount,
        setRowsCount,
        filterChanged,
        // MyPagination,
        filterBlockShow,
        setFilterBlockShow,
        sortClick,
        createQueryString
    };
};

export default useReport;