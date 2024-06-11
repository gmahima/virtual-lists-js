"use client";
import {generateItems} from "../../../utils/generateItems";
import {useEffect} from "react";
import {FixedSizeList as List} from "react-window";

export default function StaticVirtual() {
  const items = generateItems(100000);
  const Item = ({index, style}) => {
    let content = items[index].name;
    return (
      <li style={style} className="p-2">
        {content}
      </li>
    );
  };
  return (
    <div className="h-screen p-16">
      <h1 className="text-4xl font-semibold text-center p-8">
        Virtual List: With React Window
      </h1>
      <div className="bg-white p-4">
        <List
          className="bg-white list-none"
          height={500}
          itemCount={100000}
          itemSize={40}
        >
          {Item}
        </List>
      </div>
    </div>
  );
}
