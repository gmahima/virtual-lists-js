"use client";
import {List} from "./List";
import {generateItems} from "../../../utils/generateItems";
export default function Static() {
  const items = generateItems(100); // generate item data with the util function

  // Item UI
  const Item = ({children, className, style}) => {
    return (
      <div style={style} className={"p-2 " + className}>
        {children}
      </div>
    );
  };

  return (
    <div className="h-screen p-16">
      <h1 className="text-4xl font-semibold text-center p-8">
        Virtual List: Implement from Scratch
      </h1>
      <List
        overscan={5} // Number of items to pre-load above and below the visible window
        windowHeight={500}
        itemHeight={40}
        list={items}
        Item={Item}
      />
    </div>
  );
}
