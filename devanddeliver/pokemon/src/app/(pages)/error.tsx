"use client";

export default function Error({error}: {error: Error} ) {
    return(
        <div>
            <h1>Error</h1>
            <h2>{error.message}</h2>
        </div>
    )
}