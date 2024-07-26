"use client";
import styles from "./page.module.css";
import { useEffect, useRef, useState } from "react";

interface GenericProps {
  readonly type: string;
  readonly height: string | number;
  readonly width: string | number;
  readonly style: any;
  readonly onMouseDown?: any;
  readonly onMouseMove?: any;
  readonly removerItem?: any;
}

export default function GenericDiv({
  type,
  style,
  height,
  width,
  onMouseDown,
  onMouseMove,
  removerItem,
}: GenericProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [utils, setUtils] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dimensions, setDimensions] = useState({ width, height });

  const handleDoubleClick = () => {
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

  const handleResizeMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsResizing(true);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isResizing) {
      const newWidth =
        event.clientX - (ref.current?.getBoundingClientRect().left || 0);
      const newHeight =
        event.clientY - (ref.current?.getBoundingClientRect().top || 0);
      setDimensions({ width: newWidth, height: newHeight });
    }
  };

  const handleMouseUp = () => {
    if (isResizing) {
      setIsResizing(false);
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

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
      style={{
        ...style,
        height: dimensions.height,
        width: dimensions.width,
        cursor: mouseDown ? "grabbing" : "grab",
      }}
      onDoubleClick={handleDoubleClick}
      className={styles.isMain}
      onMouseDown={!utils ? onMouseDown : undefined}
      onMouseMove={!utils ? onMouseMove : undefined}
    >
      <section
        className={styles.containerBase}
        style={{ border: utils ? "1px solid #232323" : "" }}
      >
        <div className={styles.containerText}>
          <input
            defaultValue={type}
            style={{ pointerEvents: utils ? "auto" : "none" }}
          />
        </div>
        <div className={styles.containerInput}>
          <textarea
            style={{ pointerEvents: utils ? "auto" : "none" }}
            onMouseDown={handleTextAreaMouseDown}
          />
        </div>
        {utils && (
          <div className={styles.resize} onMouseDown={handleResizeMouseDown}>
            <span className="material-symbols-outlined">resize</span>
          </div>
        )}
      </section>
      <section className={styles.containerIcon}>
        {utils && (
          <>
            <div className={styles.containerSpan} onClick={removerItem}>
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
