import React, { useMemo, useState } from 'react';

export const useVisibleListItems = (number: number, list) => {
  const [sortedList, setSortedList] = useState([]);
  const [visibleList, setVisibleList] = useState([]);

  useMemo(() => {
    const newList = [...list];

    (newList || []).sort((one, two) => {
      if (one?.id > two?.id) return 1;
      else if (one?.id === two?.id) return 0;
      else return -1;
    });

    setSortedList(newList);
  }, [list]);

  useMemo(() => {
    const newList = [];

    for (let i = 0; i < sortedList.length; i++) {
      if (i < number) newList.push(sortedList[i]);
      else break;
    }
    setVisibleList(newList);
  }, [number, sortedList]);

  return visibleList;
};
