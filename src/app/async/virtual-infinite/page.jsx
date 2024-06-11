"use client";
import {gql, useLazyQuery} from "@apollo/client";
import Wrapper from "./wrapper";
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
        hasNextPage
      }
    }
  }
`;

export default function App() {
  const [getPosts, {loading, error, data}] = useLazyQuery(GET_POSTS);
  const [after, setAfter] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const isItemLoaded = (index) => !hasNextPage || index < allPosts.length;

  const loadItems = () => {
    console.log("after", after);
    if (hasNextPage) {
      getPosts({variables: {first: 10, after}}).then((data) => {
        console.log(data);
        setAfter(data.data.feed.pageInfo.endCursor ?? "");
        setAllPosts((posts) => [...posts, ...data.data.feed.edges]);
        setHasNextPage(data.data.feed.pageInfo.hasNextPage ?? false);
      });
    }
  };
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
      <Wrapper
        hasNextPage={hasNextPage}
        isNextPageLoading={loading}
        items={allPosts}
        loadNextPage={loadItems}
      ></Wrapper>
    </div>
  );
}
