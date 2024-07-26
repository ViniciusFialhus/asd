"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import MeMDocument from "./memDocument/page";

interface DocumentAreaProps {
  readonly draggedItem: HTMLElement | null;
  readonly setBeingDragged: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DocumentArea({
  draggedItem,
  setBeingDragged,
}: DocumentAreaProps) {
  const [scale, setScale] = useState<number | undefined>(undefined);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setScale(window.devicePixelRatio);
      };
      handleResize();
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);
  if (scale === undefined) {
    return null;
  }

  return (
    <div className={styles.containerMain}>
      <MeMDocument
        draggedItem={draggedItem}
        setBeingDragged={setBeingDragged}
        scale={scale}
      />
    </div>
  );
}
