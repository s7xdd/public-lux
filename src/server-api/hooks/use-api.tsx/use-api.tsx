import { useState } from "react";
import { useQuery } from "@tanstack/react-query";


import FetchAPIData from '@/server-api/apifunctions/apifetch';
import { get, isEmpty, size } from "lodash";
import useReport from "../useReport";
import { productFilterKeys } from "@/server-api/utils/product";

export interface UseApiProps {
    pagePath?: any;
    apiEndpoint: any;
    hostName: any;
    enableFetchApi: boolean;
    onSuccessCallback?: any;
    searchParams?: Record<string, any>;
    useFilterKeys?: boolean;
    getBlockValues?: boolean;
    pageLimit?: number;
    fetchRandom?: boolean;
}

const useApi = ({
    pagePath = false,
    hostName,
    apiEndpoint,
    searchParams = {},
    useFilterKeys = false,
    enableFetchApi = false,
    onSuccessCallback,
    pageLimit = 10,
    getBlockValues = false,
    fetchRandom = false
}: UseApiProps) => {

    const uRS = useReport({
        fetchFunction: pagePath ? () => refetch() : undefined,
        pagePath: pagePath || "",
        page: 1,
        limit: pageLimit,
    });

    const activeURS = useFilterKeys ? uRS : {
        getCombinedParams: () => ({}),
        setRowsCount: () => { },
        filterValues: {}
    };

    const fetchAPIData = () => {
        return FetchAPIData.fetchAPIData({
            apiEndpoint,
            ...searchParams,
            ...activeURS.getCombinedParams(),
        }, hostName);
    };

    const [randomSuffix] = useState(() => fetchRandom ? Math.random() : '');

    const queryKey = useFilterKeys
        ? [apiEndpoint, ...productFilterKeys.map((key: any) => activeURS.filterValues?.[key] || ''), JSON.stringify(searchParams), randomSuffix]
        : [apiEndpoint, JSON.stringify(searchParams), randomSuffix];


    const { data, isLoading, refetch } = useQuery({
        queryKey,
        staleTime: Infinity,
        refetchInterval: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchIntervalInBackground: false,
        queryFn: async () => {
            const retVal: any = await fetchAPIData();
            if (retVal.status) {
                if (onSuccessCallback) {
                    onSuccessCallback(retVal.requestedData);
                }
                if (useFilterKeys) {
                    activeURS.setRowsCount(retVal.totalCount || 0);
                }
            }
            return retVal
        },
        enabled: Boolean(queryKey && enableFetchApi)
    });

    return {
        data: !getBlockValues
            ? get(data, 'requestedData')
            : !isEmpty(data) &&
                !isEmpty(get(data, 'requestedData')) &&
                size(get(data, 'requestedData.blockValues')) > 0
                ? get(data, 'requestedData.blockValues')
                : undefined,
        isLoading,
        refetch,
        apiEndpoint,
        queryKey,
        uRS: activeURS as any,
    };
};

export default useApi;
