"use client";
import styles from "./page.module.css";
import { useEffect, useRef, useState } from "react";
interface GenericProps {
  readonly type: string;
  readonly height: string | number;
  readonly width: string | number;
  readonly style: any;
  readonly onMouseDown?: any;
  readonly onMouseMove? :any
}

export default function GenericDiv({
  type,
  style,
  height,
  width,
  onMouseDown,
  onMouseMove
}: GenericProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [utils, setUtils] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);
  const handleDobleClick = () => {
    setUtils(true);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setUtils(false);
    }
  };
  const handleTextAreaMouseDown = (
    event: React.MouseEvent<HTMLTextAreaElement>
  ) => {
    event.stopPropagation();
  };

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
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <main
      ref={ref}
      style={{ ...style, height: height, width: width,  cursor: mouseDown ? "grabbing" : "grab" }}
      onDoubleClick={handleDobleClick}
      className={styles.isMain}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
    >
      <section
        className={styles.containerBase}
        style={{ border: utils ? "1px solid #232323" : "" }}
      >
        <div className={styles.containerText}>{type}</div>
        <div className={styles.containerInput}>
          <textarea
            style={{ pointerEvents: utils ? "auto" : "none" }}
            onMouseDown={handleTextAreaMouseDown}
          />
        </div>
      </section>
      <section className={styles.containerIcon}>
        {utils && (
          <>
            <div className={styles.containerSpan}>
              <span className="material-symbols-outlined">delete</span>
            </div>
            <div className={styles.containerSpan}>
              <span className="material-symbols-outlined">recenter</span>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
