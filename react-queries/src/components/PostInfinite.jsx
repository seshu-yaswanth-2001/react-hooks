import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { fetchPostsInfinite } from "../API/api";

const PostInfinite = () => {
    const observerRef = useRef(null);

    const {
        data,
        isLoading,
        isError,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ["posts-infi"],
        queryFn: fetchPostsInfinite,
        getNextPageParam: (lastPage) => {
            const nextSkip = lastPage.skip + lastPage.limit;

            return nextSkip < lastPage.total ? nextSkip : undefined; 
        },
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
    });

    const handleObserver = useCallback((entries) => {
        const [ target ] = entries;
        if(target.isIntersecting && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [fetchNextPage, hasNextPage, isFetchingNextPage])


    useEffect(() => {
        const element = observerRef.current;
        const option = {
            root: null,
            rootMargin: "20px",
            threshold: 0,
        }

        const observer = new IntersectionObserver(handleObserver, option);

        if(element) observer.observe(element);

        return () => {
            if(element) observer.unobserve(element);
        }

    }, [handleObserver]);

    const allPosts = data?.pages?.flatMap((page) => page.posts) || [];

    return(
        <div className="container">
            <h1>Posts List - Infinite Scroll</h1>

            {isLoading && <p>Intial Posts are loading..</p>}
            {isError  && <p>{error.message}</p>}

            {allPosts?.map((post) => (
                <div key={post.id} className="post">
                    <Link to={`/posts/${post.id}`}>{post.title}</Link>
                    {post?.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                    ))}
                </div>
            ))}

            <div ref={observerRef} />

            {isFetchingNextPage && <p>Loading more Posts...</p>}

            {!hasNextPage && allPosts.length > 0 && (
                <p>No Posts to show.</p>
            )}
        </div>
    )
}

export default PostInfinite;