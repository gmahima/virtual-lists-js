"use client";
import {generateItems} from "../../../utils/generateItems";
import {useEffect} from "react";
import {FixedSizeList as List} from "react-window";

export default function StaticVirtual() {
  const items = generateItems(100000);
  const Item = ({index, style}) => {
    useEffect(() => {
      console.log("rendered item " + `${index}`);
      return () => {
        console.log("unmounted item " + `${index}`);
      };
    }, []);
    let content = items[index].name;
    return (
      <li style={style} className="p-2">
        {content}
      </li>
    );
  };
  return (
    <div className="h-screen p-16">
      <List
        className="bg-gray-300 p-4 list-none"
        height={150}
        itemCount={100000}
        itemSize={30}
      >
        {Item}
      </List>
    </div>
  );
}
