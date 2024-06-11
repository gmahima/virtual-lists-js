import {generateItems} from "../../../utils/generateItems";

export default function Static() {
  const items = generateItems(100000);
  const Item = ({data, style = {}}) => {
    return <li style={style}>{data}</li>;
  };
  return (
    <div className="h-screen p-16">
      <ul className="bg-gray-300 overflow-auto h-[150px]">
        {items.map((item) => (
          <Item key={item.name} data={item.name}></Item>
        ))}
      </ul>
    </div>
  );
}
