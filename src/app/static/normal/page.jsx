import {generateItems} from "../../../utils/generateItems";

export default function Static() {
  const items = generateItems(100000);
  const Item = ({data, style = {}}) => {
    return (
      <li style={style} className="p-2">
        {data}
      </li>
    );
  };
  return (
    <div className="h-screen p-16">
      <ul className="bg-white overflow-auto h-[500px] p-4">
        {items.map((item) => (
          <Item key={item.name} data={item.name}></Item>
        ))}
      </ul>
    </div>
  );
}
