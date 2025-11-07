TanStack Query - 

It centralizes server state management — not local state.

Server state = anything that comes from a remote source (API, DB, etc.)

It handles for you:
    # Caching (reuses fetched data)
    # Automatic refetching when needed
    # Stale vs fresh data distinction
    # Background updates
    # Mutation and cache invalidation
    # Retry + error handling
    # Devtools to debug
    # You stop writing repetitive fetch logic and just declare:


Simple Mental Model:


Think of it like this:

Concept	Analogy
QueryClient	        The “brain” — holds all cache
QueryKey	        The “label” — uniquely identifies cached data
QueryFn	            The “fetcher” — defines how to get that data
useQuery	        The “hook” — requests and subscribes to the data
useMutation	        The “hook” — performs actions that change the data

You get automatic caching, deduplication, and background refetching out of the box.


