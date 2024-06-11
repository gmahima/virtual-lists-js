"use client";
import {gql, useLazyQuery} from "@apollo/client";
import {FixedSizeList as List} from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

import React, {useState} from "react";
const GET_POSTS = gql`
  query Feed($first: Int!, $after: String) {
    feed(first: $first, after: $after) {
      edges {
        node {
          id
          title
          subtitle
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

  const itemCount = hasNextPage ? allPosts.length + 1 : allPosts.length;

  const isItemLoaded = (index) => {
    if (loading && index < allPosts.length) {
      return true;
    } else {
      false;
    }
  };
  const Item = ({index, style}) => {
    console.log("allposts", allPosts);
    if (!allPosts[index]) {
      return <li>loading ...</li>;
    }
    const item = allPosts[index].node;

    return (
      <li key={item.title} style={{style}}>
        {item.title}
      </li>
    );
  };

  const loadItems = () => {
    console.log("after", after);
    getPosts({variables: {first: 10, after}}).then((data) => {
      console.log(data);
      setAfter(data.data.feed.pageInfo.endCursor ?? "");
      setAllPosts((posts) => [...posts, ...data.data.feed.edges]);
      setHasNextPage(data.data.feed.pageInfo.hasNextPage ?? false);
    });
  };
  if (error) return <p>Error : {error.message}</p>;
  return (
    <div className="h-screen p-16">
      <div className="">
        <button className="bg-white  p-4 rounded shadow" onClick={loadItems}>
          {allPosts?.length > 0 ? "load more posts" : "load posts"}
        </button>
      </div>
      <ul className="h-40 bg-gray-50 p-4 mt-4 rounded overflow-auto">
        {allPosts?.length > 0 && (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={itemCount}
            loadMoreItems={loadItems}
          >
            {({onItemsRendered, ref}) => (
              <List
                className="List"
                height={150}
                itemCount={itemCount}
                itemSize={24}
                onItemsRendered={onItemsRendered}
                ref={ref}
              >
                {Item}
              </List>
            )}
          </InfiniteLoader>
        )}
      </ul>
    </div>
  );
}
