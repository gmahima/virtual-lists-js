"use client";
import {useEffect} from "react";
import {List} from "./List";
import {generateItems} from "../../../utils/generateItems";
export default function Static() {
  const items = generateItems(10000);
  const Item = ({children, className, style}) => {
    return (
      <div style={style} className={"p-2 " + className}>
        {children}
      </div>
    );
  };
  return (
    <div className="h-screen p-16">
      <List
        overscan={5} //optional, gives a smoother scroll since scrolling is expected
        windowHeight={500}
        itemHeight={40}
        list={items}
        Item={Item}
      />
    </div>
  );
}
