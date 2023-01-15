import React from 'react';
// import ReactCSSTransitionGroup from 'react-transition-group';
import styles from './Cube.module.css';

interface CubeAttr{
  top: string,
  left: string,
  persX: string,
  persY: string,
  color: "green" | "yellow" | "red" | "grey" | "purple" | "black"
  delay?: number
}

export const Cube: React.FC<CubeAttr> = (props: CubeAttr) => {
  return (
    <div 
      className={styles.container}
      style={
        {
          left: `${props.left}px`,
          top: `${props.top}px`
        }
      }
    >
      <div 
        className={styles.cube+" "+styles.pers+" "+styles[`${props.color}`]}
        style={
            {
              perspectiveOrigin:`${props.persX}% ${props.persY}%`,
              animationDelay: `${props.delay}s`
            }
        }
      >
        <div className={styles.face+" "+styles.front}></div>
        <div className={styles.face+" "+styles.back}></div>
        <div className={styles.face+" "+styles.right}></div>
        <div className={styles.face+" "+styles.left}></div>
        <div className={styles.face+" "+styles.top}></div>
        <div className={styles.face+" "+styles.bottom}></div>
      </div>
    </div>
  )
}
