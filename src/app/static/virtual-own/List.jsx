import React, {useEffect, useRef, useState} from "react";

export const List = ({list, Item, windowHeight, itemHeight, overscan}) => {
  // TODO: track the scroll position with scrollTop
  const startIndex = 0; // TODO: Find the correct start position a/c to scrollTop with padding
  const endIndex = list.length; // TODO: Find the optimized end position a/c to scrollTop and container height with padding

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
