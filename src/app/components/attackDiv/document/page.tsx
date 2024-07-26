"use client";
import styles from "./page.module.css";
import { ChangeEvent, useState, useRef, useEffect } from "react";

interface ColorsAttacksCollum {
  id: string;
  color: string;
  textColor: string;
}

interface AttacksDivProps {
  readonly height: string | number;
  readonly width: string | number;
  readonly style: any;
  readonly onMouseDown?: any;
  readonly onMouseMove?: any;
  readonly removerItem?: any;
}

export default function AttacksDiv({
  height,
  width,
  style,
  onMouseDown,
  onMouseMove,
  removerItem,
}: AttacksDivProps) {
  const [isNextBlack, setIsNextBlack] = useState<boolean>(false);
  const [colorAttacks, setColorAttacks] = useState<ColorsAttacksCollum[]>([]);
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

  const addNewAttack = () => {
    if (utils) {
      const newAttack: ColorsAttacksCollum = {
        id: new Date().toISOString(),
        color: isNextBlack ? "white" : "black",
        textColor: isNextBlack ? "black" : "white",
      };
      setColorAttacks((prevAttacksColors) => [...prevAttacksColors, newAttack]);
      setIsNextBlack(!isNextBlack);
    }
  };

  const handleDoubleClick = () => {
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

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  return (
    <main
      ref={ref}
      className={styles.main}
      style={{
        ...style,
        height: dimensions.height,
        width: dimensions.width,
        cursor: mouseDown ? "grabbing" : "grab",
      }}
      onDoubleClick={handleDoubleClick}
      onMouseDown={!utils ? onMouseDown : undefined}
      onMouseMove={!utils ? onMouseMove : undefined}
    >
      <section className={styles.containerBase}>
        <div className={styles.containerNameType}>ATAQUE</div>
        <div className={styles.containerNameInput}>
          <div className={styles.containerInitiative}>
            <div>INICIATIVA +</div>
            <input
              defaultValue={"0"}
              type="number"
              maxLength={2}
              onInput={handleInput}
            />
            {utils && (
              <div
                className={styles.resize}
                onMouseDown={handleResizeMouseDown}
              >
                <span className="material-symbols-outlined">resize</span>
              </div>
            )}
          </div>
          {colorAttacks.map((attack) => (
            <div
              key={attack.id}
              className={styles.containerNewAttack}
              style={{ backgroundColor: attack.color, color: attack.textColor }}
            >
              <div className={styles.containerNameAttack}>
                <input
                  defaultValue={"Texto Mudável"}
                  style={{ color: attack.textColor }}
                />
              </div>
              <div className={styles.containerDamege}>
                <input
                  defaultValue={"Texto Mudável"}
                  style={{ color: attack.textColor }}
                />
              </div>
            </div>
          ))}
        </div>
        {utils && (
          <div className={styles.containerButtonAddNew}>
            <button
              className={styles.containerSpan}
              type="button"
              onClick={addNewAttack}
            >
              <span className="material-symbols-outlined">add</span>
            </button>
          </div>
        )}
      </section>
      <section className={styles.containerIcon}>
        {utils && (
          <>
            <div className={styles.containerSpanUtils} onClick={removerItem}>
              <span className="material-symbols-outlined">delete</span>
            </div>
            <div className={styles.containerSpanUtils}>
              <span className="material-symbols-outlined">recenter</span>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
