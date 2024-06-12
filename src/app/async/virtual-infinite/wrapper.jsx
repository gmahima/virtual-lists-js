import React from "react";
import {FixedSizeList as List} from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

export default function ExampleWrapper({
  // Are there more items to load?
  // (This information comes from the most recent API request.)
  hasNextPage,

  // Are we currently loading a page of items?
  // (This may be an in-flight flag in your Redux store for example.)
  isNextPageLoading,

  // Array of items loaded so far.
  items,

  // Callback function responsible for loading the next page of items.
  loadNextPage,
}) {
  // If there are more items to be loaded then add an extra row to hold a loading indicator.
  const itemCount = hasNextPage ? items.length + 1 : items.length;

  // Only load 1 page of items at a time.
  // Pass an empty callback to InfiniteLoader in case it asks us to load more than once.
  const loadMoreItems = isNextPageLoading ? () => {} : loadNextPage;

  // Every row is loaded except for our loading indicator row.
  const isItemLoaded = (index) => !hasNextPage || index < items.length;

  // Render an item or a loading indicator.
  const Item = ({index, style}) => {
    let content;
    if (!isItemLoaded(index)) {
      content = "Loading...";
      return <div style={style}>{content}</div>;
    } else {
      const edge = items[index];
      return (
        <div style={style} className="p-4" key={edge.node.id}>
          <span className="block text-lg font-bold text-slate-900">
            {edge.node.title.length > 100
              ? edge.node.title.slice(0, 99) + "..."
              : edge.node.title}
          </span>
          <span className="mt-1 text-base leading-7 text-slate-600">by </span>{" "}
          <span className="italic text-slate-900">
            {edge.node.author.name.length > 34
              ? edge.node.author.name.slice(0, 33) + "..."
              : edge.node.author.name}
          </span>
          <a
            href={edge.node.url}
            className="ml-2 rounded-lg text-sm font-semibold py-2 px-3 bg-white/0 text-slate-900 ring-1 ring-slate-900/10 hover:bg-white/25 hover:ring-slate-900/15"
          >
            Go to post
          </a>
        </div>
      );
    }


  };

  return (
    <ul className="bg-gray-50 p-4 mt-4 rounded overflow-auto">
      <InfiniteLoader
        isItemLoaded={isItemLoaded}
        itemCount={itemCount}
        loadMoreItems={loadMoreItems}
      >
        {({onItemsRendered, ref}) => (
          <List
            className="List"
            height={500}
            itemCount={itemCount}
            itemSize={88}
            onItemsRendered={onItemsRendered}
            ref={ref}
          >
            {Item}
          </List>
        )}
      </InfiniteLoader>
    </ul>
  );
}
