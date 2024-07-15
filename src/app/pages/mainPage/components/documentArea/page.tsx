"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import ScaleComponent from "./memDocument/page";

interface DocumentAreaProps {
  readonly draggedItem: HTMLElement | null;
  readonly setBeingDragged: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DocumentArea({
  draggedItem,
  setBeingDragged,
}: DocumentAreaProps) {
  const [scale, setScale] = useState(window.devicePixelRatio);

  useEffect(() => {
    const handleResize = () => {
      setScale(window.devicePixelRatio);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className={styles.containerMain}>
      <ScaleComponent
        draggedItem={draggedItem}
        setBeingDragged={setBeingDragged}
        scale={scale}
      />
    </div>
  );
}
