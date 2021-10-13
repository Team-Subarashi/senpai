import React, { useState, useEffect, useRef } from 'react';
import NET from 'vanta/dist/vanta.net.min';
import * as THREE from 'three';

export default function Vanta(props) {
  const [vantaEffect, setVantaEffect] = useState(0);
  const myRef = useRef(null);
  console.log(NET);
  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(NET({
        el: myRef.current,
        THREE: THREE, // use a custom THREE when initializing
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0x8922e6,
        backgroundColor: 0x2d2d2d,
        points: 8.00,
        showDots: false,
      }));
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);
  return (
    <div ref={myRef} style={{height: "100%"}}>
      {props.children}
    </div>
  );
}
