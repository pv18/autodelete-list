import { useState, memo, FC, useEffect, useRef } from 'react';

interface IItemList {
  serialNumber: number;
  time: number;
  id: string;
  removeItemList: (id: string) => void;
}

export const ItemList: FC<IItemList> = memo(({ id, serialNumber, time, removeItemList }) => {
  const [timer, setTimer] = useState<number>(time);
  const timerId = useRef<NodeJS.Timer | null>(null);

  const clear = () => {
    if (timerId.current) {
      clearInterval(timerId.current);
    }
  };

  useEffect(() => {
    timerId.current = setInterval(() => {
      setTimer((time) => time - 1);
    }, 1000);

    return () => clear();
  }, []);

  useEffect(() => {
    if (!timer) {
      clear();
      removeItemList(id);
    }
  }, [timer]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div>номер {serialNumber}:&nbsp;</div>
      <div>осталось времени {timer}</div>
    </div>
  );
});
