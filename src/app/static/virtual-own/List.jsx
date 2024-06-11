import React, {useEffect, useRef, useState} from "react";

//@ts-ignore
export const List = ({list, Item, windowHeight, itemHeight, overscan}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const startIndex = Math.floor(scrollTop / itemHeight);
  const paddedStartIndex = Math.max(0, startIndex - overscan);

  const endIndex = Math.ceil((scrollTop + windowHeight) / itemHeight);
  const paddedEndIndex = Math.min(list.length, endIndex + overscan);
  const generateRows = () => {
    console.log(paddedStartIndex);
    return list
      .slice(paddedStartIndex, paddedEndIndex)
      .map((item) => <Item key={item.name}>{item.name}</Item>);
  };
  return (
    <ul
      className="h-[500px] overflow-y-scroll"
      onScroll={(e) => {
        console.log(e.currentTarget.scrollTop);
        setScrollTop(e.currentTarget.scrollTop);
      }}
    >
      <div
        style={{
          height: `${list.length * itemHeight}px`,
        }}
      >
        <div
          className="bg-white p-4"
          style={{
            transform: `translateY(${paddedStartIndex * itemHeight}px)`,
          }}
        >
          {generateRows()}
        </div>
      </div>
    </ul>
  );
};
