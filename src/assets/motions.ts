type Animation = {
  initial?: object ,
  animate? : object
  exit?: object ,
  transition?: object,
  whileHover?: object
  
}


function framerAnimations (){
  const transition = { type: 'spring', duration: 0.5 }

  return {
      slideAnimation(direction?:string , animateDelay?:number ): Animation  {
      if (!direction) direction = 'left'
      return {
        initial: {
          x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
          y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
          opacity: 0,
          transition: { ...transition, delay: 0.5 }
        },
        animate: {
          x: 0,
          y: 0,
          opacity: 1,
          transition: { ...transition, delay: animateDelay ?? 0.3 }
        },
        exit: {
          x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
          y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
          transition: { ...transition, delay: 0 }
        }
      }
    }
    ,  fadeAnimation(animationDelay?:number ): Animation {
      return {
        initial: {
          opacity: 0,
          transition: { ...transition, delay: 0.3 }
        },
        animate: {
          opacity: 1,
          transition: { ...transition, delay: animationDelay ?? 0.3 }
        },
        exit: {
          opacity: 0,
          transition: { ...transition, delay: 0.3 , duration : 0.3}
        }
      }
    }
    ,  slideRightToLeftAnimation(animationDelay?:number ): Animation  {
      return {
        initial: { x: 100, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        transition: {
          type: 'spring',
          damping: 5,
          stiffness: 40,
          restDelta: 0.001,
          duration: 0.3,
          delay: animationDelay ?? 0.3
        }
      }
    }
    ,  slideBottomTopAnimation(animationDelay?:number ): Animation  {
      return {
        initial: { y: 100, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: {
          type: 'spring',
          damping: 7,
          stiffness: 30,
          restDelta: 0.001,
          duration: 0.6,
          delay: animationDelay ?? 0.3,
          delayChildren: 0.2
        }
      }
    }
    ,  slideLeftToRightAnimation(animationDelay?:number ): Animation  {
      return {
        initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
        animate: { x: 0, opacity: 1, transition: { ...transition, delay: animationDelay ?? 0.3 } },
        exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } }
      }
    }
    
    ,  rotatingAnimation(animationDelay?:number ): Animation  {
      return {
        initial: { scale: 0 },
        animate: { rotate: 360, scale: 1, duration: 2 },
        transition: {
          type: 'spring',
          stiffness: 260,
          damping: 20,
          delay: animationDelay ?? 0.3,
          duration: 0.5
    
        }
      }
    }
    
    ,  scaleAnimationFromRightBottom(exitDelay?:number ): Animation   {
      return {  
      initial: {x: 100, y: 100, scale : 0 ,opacity : 0  },
      animate: { x:0, y: 0, scale : 1 , opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 } },
      exit: { x: 100, y: 100, scale : 0 ,
      transition: { type: "spring", stiffness: 300, damping: 24  , delay: exitDelay ?? 0.7 } } ,
    
    
    }}
    
    ,  scaleAnimationCenterExitRight(exitDelay?:number ): Animation   {
      return {  
      initial: {x: 0, y: 0, scale : [0,1,0] ,opacity : 0  },
      animate: { x:0, y: 0, scale : 1 , opacity: 1 ,   
      transition: { type: "spring", stiffness: 300, damping: 24 } },
      exit: { x: 200, y: 200, scale : 0 ,duration : 10,
      transition: { type: "spring", stiffness: 300, damping: 24 , delay : exitDelay ?? 0   } }
    
    }}
    
    
    ,  scaleAnimationCenterExitCenter(exitDelay?:number , transitionDelay ?: number): Animation   {
      return {  
      initial: {x: 0, y: 0, scale : [0,1,0] ,opacity : 0 ,  },
      animate: { x:0, y: 0, scale : 1 , opacity: 1 ,   
      transition: { type: "spring", duration : 0.1 , stiffness: 300, damping: 24, delay : transitionDelay ??  0 } },
      exit: { x: 0, y: 0, scale : 0 ,duration : 0.1,
      transition: { type: "spring", stiffness: 300, damping: 24 , duration : 0.1 ,delay : exitDelay ?? 0   } }
    
    }}
    ,  scaleAnimationRightToLeftExitCenter(exitDelay?:number ): Animation   {
      return {  
      initial: {x: 500, y: 0, scale :0 ,opacity : 0  },
      animate: { x:0, y: 0, scale : 1 , opacity: 1 ,   
      transition: { type: "spring", stiffness: 300, damping: 22 } },
      exit: { x: 0, y: 0, scale : 0 ,duration : 10,
      transition: { type: "spring", stiffness: 300, damping: 24 , delay : exitDelay ?? 0   } }
    
    }},
      loopArrowAnimationVertical(): Animation   {
      return {  
      animate: { x: 0, y: [0 , -3 , -6, -10 ,-6 , -3 , 0], scale : 1  ,
      }
     ,
      transition: {   duration : 2 , repeat : Infinity}
    }} , 
    loopArrowAnimationHorizontal(): Animation   {
      return {  
      animate: { y: 0, x: [0 , -3 , -6, -10 ,-6 , -3 , 0], scale : 1  ,
      }
     ,
      transition: {   duration : 2 , repeat : Infinity}
    }} , 
    
     scaleAnimationLeftToBottomRightExitReverse(exitDelay?:number ): Animation   {
      return {  
      initial: {x: -100, y: -50, scale :0  },
      animate: { x:0 , y: 0  , scale : 1 , opacity: 1 ,   
      transition: { type: "spring", stiffness: 300, damping: 22 , duration : 0.1 } },
      exit: { x:  -100, y: -50, scale : 0 , opacity : 0 ,
      transition: { type: "spring", stiffness: 333, damping: 24 ,  delay : exitDelay ?? 0  , duration : 0.1  } }
    
    }}
    
  }
}

const FramerAnimations = framerAnimations()
export default FramerAnimations