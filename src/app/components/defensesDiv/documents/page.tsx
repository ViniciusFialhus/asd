"use client";
import styles from "./page.module.css";
import { ChangeEvent } from "react";
import { useEffect, useRef, useState } from "react";
interface DefensesDivProps {
  readonly height: string | number;
  readonly width: string | number;
  readonly style: any;
  readonly onMouseDown?: any;
  readonly onMouseMove?: any;
  readonly removerItem?: any;
  readonly character: any;
}

export default function DefensesDiv({
  height,
  width,
  style,
  onMouseDown,
  onMouseMove,
  removerItem,
  character,
}: DefensesDivProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [utils, setUtils] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dimensions, setDimensions] = useState({ width, height });
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length > 2) {
      e.target.value = value.slice(0, 2);
    }
  };
  const handleDobleClick = () => {
    setUtils(true);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setUtils(false);
    }
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

  console.log(character.abilities);
  

  return (
    <div
      ref={ref}
      className={styles.isMain}
      style={{
        ...style,
        height: dimensions.height,
        width: dimensions.width,
        cursor: mouseDown ? "grabbing" : "grab",
      }}
      onDoubleClick={handleDobleClick}
      onMouseDown={!utils ? onMouseDown : undefined}
      onMouseMove={!utils ? onMouseMove : undefined}
    >
      <section
        className={styles.containerBase}
        style={{ border: utils ? "1px solid #232323" : "" }}
      >
        <div className={styles.containerNameType}>DEFESAS</div>
        <div className={styles.containerNameInput}>
          <div className={styles.containerList}>
            <div className={styles.containerOneDefense} style={{ backgroundColor: "white", color: "black" }}>
              <div>ESQUIVA</div>
              <input
                defaultValue={character.abilities.AGILIDADE || 0}
                min={character.abilities.AGILIDADE}
                type="number"
                maxLength={2}
                onInput={handleInput}
              />
            </div>
            <div className={styles.containerTwoDefense}  style={{ backgroundColor: "white", color: "black" }}>
              <div>FORTITUDE</div>
              <input
              defaultValue={character.abilities.VIGOR || 0}
              min={character.abilities.VIGOR}
                type="number"
                maxLength={2}
                onInput={handleInput}
              />
            </div>
          </div>
          <div
            className={styles.containerList}
            style={{ backgroundColor: "black", color: "white" }}
          >
            <div className={styles.containerOneDefense}>
              <div>APARAR</div>
              <input
              defaultValue={character.abilities.LUTA || 0}
              min={character.abilities.LUTA}
                type="number"
                maxLength={2}
                onInput={handleInput}
                style={{ color: "white", backgroundColor: "black" }}
              />
            </div>
            <div className={styles.containerTwoDefense}>
              <div>RESISTÊNCIA</div>
              <input
                 defaultValue={character.abilities.VIGOR || 0}
                 min={character.abilities.VIGOR}
                type="number"
                maxLength={2}
                onInput={handleInput}
                style={{ color: "white", backgroundColor: "black" }}
              />
            </div>
          </div>
          <div className={styles.containerList} style={{ height: "25%" }}>
            <div className={styles.containerOneDefense}>
              <div>VONTADE</div>
              <input
                  defaultValue={character.abilities.PRONTIDÃO || 0}
                  min={character.abilities.PRONTIDÃO}
                type="number"
                maxLength={2}
                onInput={handleInput}
              />
            </div>
          </div>
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
    </div>
  );
}
