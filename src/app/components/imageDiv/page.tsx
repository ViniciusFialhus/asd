"use client";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
interface HabilityDivProps {
  readonly height: string | number;
  readonly width: string | number;
  readonly setBeingDragged: any;
  readonly setDragItem: any;
}

export default function ImageDivSelect({
  height,
  width,
  setBeingDragged,
  setDragItem,
}: HabilityDivProps) {
  const [mouseDown, setMouseDown] = useState(false);
  useEffect(() => {
    const handleGlobalMouseDown = () => setMouseDown(true);
    const handleGlobalMouseUp = () => setMouseDown(false);

    window.addEventListener("mousedown", handleGlobalMouseDown);
    window.addEventListener("mouseup", handleGlobalMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleGlobalMouseDown);
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, []);
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("type", "img");
    setBeingDragged(true);
    setDragItem(e.target as HTMLElement);
  };
  const handleDragEnd = (e: React.DragEvent) => {
    setBeingDragged(false);
    setMouseDown(false);
  };
  return (
    <div
      draggable
      className={styles.containerMain}
      style={{
        height: height,
        width: width,
        cursor: mouseDown ? "grabbing" : "grab",
      }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <span className="material-symbols-outlined">image</span>
    </div>
  );
}
