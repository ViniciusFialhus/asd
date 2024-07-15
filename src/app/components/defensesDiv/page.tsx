"use client";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
interface DefensesDivProps {
  readonly height: string | number;
  readonly width: string | number;
  readonly setBeingDragged: any;
  readonly setDragItem: any;
}

export default function DefensesDivSelect({
  height,
  width,
  setBeingDragged,
  setDragItem,
}: DefensesDivProps) {
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
    e.dataTransfer.setData("type", "defenses");
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
      className={styles.main}
      style={{
        height: height,
        width: width,
        cursor: mouseDown ? "grabbing" : "grab",
      }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className={styles.containerNameType}>DEFESAS</div>
      <div className={styles.containerNameInput}>
        <div className={styles.containerList}>
          <div className={styles.containerOneDefense}>
            <div className={styles.containerName}>
              <div>ESQUIVA</div>
              <div className={styles.fakeInput}>0</div>
            </div>
          </div>
          <div className={styles.containerTwoDefense}>
            <div className={styles.containerName}>
              <div>FORTITUDE</div>
              <div className={styles.fakeInput}>0</div>
            </div>
          </div>
        </div>
        <div
          className={styles.containerList}
          style={{ backgroundColor: "black", color: "white" }}
        >
          <div className={styles.containerOneDefense}>
            <div className={styles.containerName}>
              <div>RESISTÊNCIA</div>
              <div className={styles.fakeInput}>0</div>
            </div>
          </div>
          <div className={styles.containerTwoDefense}>
            <div className={styles.containerName}>
              <div>APARAR</div>
              <div className={styles.fakeInput}>0</div>
            </div>
          </div>
        </div>
        <div className={styles.containerList} style={{ height: "40%" }}>
          <div className={styles.containerOneDefense}>
            <div className={styles.containerName}>
              <div>VONTADE</div>
              <div className={styles.fakeInput}>0</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
