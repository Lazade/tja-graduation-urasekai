import React, { PropsWithChildren, useRef } from 'react';
import {
  TransitionProps,
  TransitionStatus,
} from 'react-transition-group/Transition';
import CSS from 'csstype';
import { Transition } from 'react-transition-group';
import styles from './Cube.module.css';

interface CubeAttr{
  top: string,
  left: string,
  persX: string,
  persY: string,
  color: "green" | "yellow" | "red" | "grey" | "purple" | "black",
  zIndex?: number, 
  delay?: number
}



export const Cube: React.FC<CubeAttr> = (props: CubeAttr) => {
  const nodeRef = useRef(null);
  const defaultStyle: CSS.Properties = {
    position: 'relative',
    left: `${props.left}px`,
    top: `${props.top}px`,
    zIndex: `${props.zIndex ? props.zIndex : 1}`,
    transition: `opacity ${1000}ms ease-in-out`,
    opacity: 0,
  }
  
  const transitionStyles: Partial<Record<TransitionStatus, CSS.Properties>> = {
    entering: { opacity: 1 },
    entered:  { opacity: 1 },
    exiting:  { opacity: 1 },
    exited:  { opacity: 1 },
  }

  return (
    <Transition nodeRef={nodeRef} timeout={300}>
    {state => 
      <div 
        ref={nodeRef}
        className={styles.container}
        style={{
          ...defaultStyle,
          ...transitionStyles[state]
        }}
      >
        <div 
          ref={nodeRef}
          className={styles.cube+" "+styles.pers+" "+styles[`${props.color}`]}
          style={
              {
                perspectiveOrigin:`${props.persX}% ${props.persY}%`,
                animationDelay: `${props.delay}s`,
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
    }
    </Transition>
    
  )
}
