import {FetchUserResponseData} from "../models/models";
import {useInfiniteQuery} from "@tanstack/react-query";
import {getUsers} from "../services/user.service";

export function useUsers() {
    const {isLoading, isError, data, refetch, fetchNextPage, hasNextPage} = useInfiniteQuery<FetchUserResponseData>(
        {
            queryKey: ['users'], // <- The key of the information or query
            queryFn: getUsers, // <- How to get the information
            getNextPageParam: (lastPage) => lastPage.nextPage,
            initialPageParam: 1,
            // refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 5 // 5 minutes
        },
    );

    return {
        isLoading,
        isError,
        users: data?.pages?.flatMap(({users}) => users) ?? [],
        refetch,
        fetchNextPage,
        hasNextPage
    };
}
