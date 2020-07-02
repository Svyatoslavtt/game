import React, { useEffect } from 'react';
import styles from './ImageBlock.module.scss';

const ImageBlock = ({ image, id, idx, maxItems, rotateChange, set, handleCount }) => {
  
  const [rotate, setRotate] = React.useState(false);
  
  const handleBlock = () => {
    setRotate(true);
  }
  
  useEffect(() => {
    setRotate(rotateChange);
  }, [rotateChange]);
  
  const handleCounter = () => {
    if (!rotate) {
      handleCount(id, set);
    }
  }
  
  return (
    <div className={styles.container} onClick={handleCounter}>
      <div className={`${styles.display} ${rotate && styles.locking}`} style={maxItems ? {display: 'block'} : null}></div>
      <div className={styles.card} onClick={handleBlock} style={rotate ? {transform: `rotateY(180deg)`} : null}>
        <div className={styles.content} style={maxItems ? {background: '#DC5D61'} : null}>
          { idx }
        </div>
        <div className={styles.imageBlock}>
          <img src={image} className={styles.image}  alt='card'/>
        </div>
      </div>
    </div>
  )
}

export default ImageBlock;