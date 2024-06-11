"use client";
import {gql, useLazyQuery} from "@apollo/client";

import React, {useState} from "react";
const GET_POSTS = gql`
  query Feed($first: Int!, $after: String) {
    feed(first: $first, after: $after) {
      edges {
        node {
          id
          title
          subtitle
          url
          author {
            name
          }
        }
      }
      pageInfo {
        endCursor
      }
    }
  }
`;
//   const url = "https://gql.hashnode.com";
//   const variables = {
//     first: 10,
//     after,
//   };
//   const options = {
//     method: "POST",
//     headers: {"Content-Type": "application/json"},
//     body: JSON.stringify({query: postQuery, variables}),
//   };
//   console.log("called fetchNames");
//   try {
//     const response = await fetch(url, options);
//     if (!response.ok) {
//       throw new Error(`Network response was not ok: ${response.statusText}`);
//     }
//     const data = await response.json();
//     console.log("data.data", data.data);
//     const names = data.data.feed.edges.map((edge) => ({
//       id: edge.node.id,
//       title: edge.node.title, // Use title or subtitle if available
//     }));
//     const endCursor = data.data.feed.pageInfo.endCursor;
//     console.log("Fetched names:", names);
//     return {names, endCursor};
//   } catch (error) {
//     console.error("Error fetching names:", error);
//   }
// };
export default function App() {
  const [getPosts, {loading, error, data}] = useLazyQuery(GET_POSTS);
  const [after, setAfter] = useState("");
  //     setIsLoading(true);
  //     const loadedNamesData = await fetchNames(endCursor);
  //     console.log(loadedNamesData);
  //     if (loadedNamesData) {
  //       setNames((names) => [...names, ...loadedNamesData.names]);
  //       setEndCursor(loadedNamesData.endCursor);
  //       setIsLoading(false);
  //     }
  //   };
  const [allPosts, setAllPosts] = useState([]);
  if (error) return <p>Error : {error.message}</p>;
  return (
    <div className="h-screen p-16">
      <h1 className="text-4xl font-semibold text-center">Async List: Normal</h1>
      <h2 className="text-2xl text-center p-4 italic">
        Loads a list of{" "}
        <a href="https://hashnode.com/" className="text-blue-700 underline">
          Hashnode
        </a>{" "}
        posts
      </h2>
      <div className="">
        <button
          className="text-sm font-semibold text-white py-3 px-4 bg-slate-900 hover:bg-slate-700 rounded-lg"
          onClick={() => {
            console.log("after", after);
            getPosts({variables: {first: 10, after}}).then((data) => {
              console.log(data);
              setAfter(data?.data?.feed?.pageInfo?.endCursor ?? "");
              setAllPosts((posts) => [...posts, ...data.data.feed.edges]);
            });
          }}
        >
          {allPosts?.length > 0 ? "load more posts" : "load posts"}
        </button>
      </div>
      {(loading || allPosts?.length > 0) && (
        <ul className="h-[500px] bg-gray-50 p-4 mt-4 rounded overflow-auto">
          {allPosts.map((edge) => (
            <li key={edge.node.title} className="p-4">
              <span className="block text-lg font-bold text-slate-900">
                {edge.node.title}
              </span>
              <span className="mt-1 text-base leading-7 text-slate-600">
                by{" "}
                <e className="italic text-slate-900">{edge.node.author.name}</e>
              </span>
              <a
                href={edge.node.url}
                className="ml-2 rounded-lg text-sm font-semibold py-2 px-3 bg-white/0 text-slate-900 ring-1 ring-slate-900/10 hover:bg-white/25 hover:ring-slate-900/15"
              >
                Go to post
              </a>
            </li>
          ))}
          {loading && <li>loading</li>}
        </ul>
      )}
    </div>
  );
}
