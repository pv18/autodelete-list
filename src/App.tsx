import { useState } from 'react';
import { ItemList } from './ItemList';

const MAX_VALUE = 30;
const MIN_VALUE = 10;

const defaultValue = [
  { id: '1', time: 13 },
  { id: '12', time: 25 },
  { id: '13', time: 15 },
];

const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

interface IList {
  id: string;
  time: number;
}

export const App = () => {
  const [list, setList] = useState<IList[]>(defaultValue);

  const addItemList = () => {
    const newItemList = {
      id: crypto.randomUUID(),
      time: getRandomInt(MIN_VALUE, MAX_VALUE),
    };
    setList([...list, newItemList]);
  };

  const removeItemList = (id: string) => {
    setList(list.filter((item) => item.id !== id));
  };

  return (
    <div className='list'>
      <button onClick={addItemList}>Добавить</button>
      <div>
        {list.map((item, index) => (
          <ItemList
            key={item.id}
            id={item.id}
            time={item.time}
            serialNumber={index + 1}
            removeItemList={removeItemList}
          />
        ))}
      </div>
    </div>
  );
};
