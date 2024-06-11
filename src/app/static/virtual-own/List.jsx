import React, {useEffect, useRef, useState} from "react";

export const List = ({list, Item, windowHeight, itemHeight, overscan}) => {
  // TODO: track the scroll position with scrollTop: initially, 0
  // use the onScroll event handler to track it in a state variable

  const startIndex = 0; // TODO: remove this after calculating the new position
  // TODO: Find the correct start position a/c to scrollTop with padding
  // 1. scrollTop/itemHeight -> Actual Starting index position
  // 2. Math.max(0, Math.floor(scrollTop/itemHeight) - overscan) -> Padded, rounded off starting position

  const endIndex = list.length; // TODO: remove this after calculating the new position

  // TODO: Find the optimized end position a/c to scrollTop and container height with padding
  // 1. End index: (scrollTop + windowHeight)/itemHeight
  // 2. Math.min(list.length, Math.ceil((scrollTop+windowHeight) / itemHeight ) + overscan)

  // generate item rows
  const generateRows = () => {
    return list
      .slice(startIndex, endIndex)
      .map((item) => <Item key={item.name}>{item.name}</Item>);
  };

  return (
    <ul
      className="h-[500px] overflow-y-scroll"
      // TODO: track the scroll top of this container
      // onScroll={(e) => {
      //   setScrollTop(e.currentTarget.scrollTop);
      // }}
    >
      <div
        style={{
          height: `${list.length * itemHeight}px`, // div to occupy the total original length. This should be consistent, so that the UX is good and not janky.
        }}
      >
        {/* mobile window div - should move along with the scroll*/}
        <div
          className="bg-white p-4"
          // TODO: uncomment below code to make the div travel along with the scrolling position
          // style={{
          //   transform: `translateY(${startIndex * itemHeight}px)`,
          // }}
        >
          {generateRows()}
        </div>
      </div>
    </ul>
  );
};
