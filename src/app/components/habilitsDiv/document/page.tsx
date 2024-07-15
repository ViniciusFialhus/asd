import styles from "./page.module.css";
import Hability from "../hability/page";
import { useEffect, useState, useRef } from "react";

interface HabilityDivProps {
  readonly height: string | number;
  readonly width: string | number;
  readonly style: any;
  readonly onMouseDown?: any;
  readonly onMouseMove?: any;
}

export default function HabilityDiv({
  height,
  width,
  style,
  onMouseDown,
  onMouseMove,
}: HabilityDivProps) {
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
    <div
      className={styles.containerHabilits}
      ref={ref}
      style={{
        ...style,
        height: height,
        width: width,
        cursor: mouseDown ? "grabbing" : "grab",
      }}
      onDoubleClick={handleDobleClick}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
    >
      <section
        className={styles.containerBase}
        style={{ border: utils ? "1px solid #232323" : "" }}
      >
        <Hability type="FORÇA" height={"60px"} width={"70px"} />
        <Hability type="AGILIDADE" height={"60px"} width={"70px"} />
        <Hability type="LUTA" height={"60px"} width={"70px"} />
        <Hability type="PRONTIDÃO" height={"60px"} width={"70px"} />
        <Hability type="VIGOR" height={"60px"} width={"70px"} />
        <Hability type="DESTREZA" height={"60px"} width={"70px"} />
        <Hability type="INTELECTO" height={"60px"} width={"70px"} />
        <Hability type="PRESENÇA" height={"60px"} width={"70px"} />
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
    </div>
  );
}
