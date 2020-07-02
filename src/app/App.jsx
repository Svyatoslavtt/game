import React, { useEffect } from 'react';
import styles from './App.module.scss';
import ImageBlock from "./components/ImageBlock/ImageBlock";
import { IMAGES } from "./components/ImageBlock/const/const";

const App = () => {
  
  const [itemsSelected, setItemsSelected] = React.useState([]);
  
  const [randomOrders, setRandomOrders] = React.useState([]);
  
  const [stepCounter, setStepCounter] = React.useState(0);
  
  const randomNumbers = [];
  
  useEffect(() => {
    if (itemsSelected.length === 2) {
      setStepCounter(stepCounter + 1);
    }
  }, [itemsSelected.length]);
  
  useEffect(() => {
    while (randomNumbers.length < 13) {
      const number = Math.round(Math.random() * IMAGES.length);
      
      if (!randomNumbers.includes(number)) {
        randomNumbers.push(number);
      }
    }
  
    const arr = IMAGES.map((item, idx) => {
      return {
        ...item,
        order: randomNumbers[idx],
      }
    });
  
    setRandomOrders(arr.sort((a, b) => a.order - b.order));
  }, []);
  
  const handleCount = (id, set) => {
    const addItem = [];
    
    if (itemsSelected.length) {
      if (itemsSelected[0].id === id) {
        return
      }
    }
  
    if (id && itemsSelected && itemsSelected.length <= 1) {
      addItem.push({id, set});
    }
  
    setItemsSelected(itemsSelected.concat(addItem));
  }
  
  useEffect(() => {
    setTimeout(() => {
      if (itemsSelected.length && itemsSelected.length === 2) {
        setItemsSelected([]);
      }
    }, 2000);
  }, [itemsSelected.length]);
  
  return (
    <div className={styles.container}>
      <div className={styles.counter}>Steps: {stepCounter}</div>
      
      <div className={styles.block}>
        {randomOrders &&
          randomOrders.map((item, idx) => {
            if (itemsSelected.length && itemsSelected.length === 2) {
              if ((itemsSelected[0].set !== itemsSelected[1].set) && (itemsSelected[0].id === item.id || itemsSelected[1].id === item.id)) {
                return (
                  <ImageBlock
                    {...item}
                    key={item.id}
                    idx={idx + 1}
                    rotateChange={() => setTimeout(() => false, 2000)}
                    maxItems={itemsSelected && itemsSelected.length === 2}
                    handleCount={handleCount}
                  />
                )
              }
            }
            return (
              <ImageBlock
                {...item}
                key={item.id}
                idx={idx + 1}
                maxItems={itemsSelected && itemsSelected.length === 2}
                handleCount={handleCount}
              />
            )
          })
        }
      </div>
    </div>
  )
}

export default App;