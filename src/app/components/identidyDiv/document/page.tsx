import styles from "./page.module.css";
import { useEffect, useState, useRef, ChangeEvent } from "react";

interface HabilityDivProps {
  readonly height: string | number;
  readonly width: string | number;
  readonly style: any;
  readonly onMouseDown?: any;
  readonly onMouseMove?: any;
  readonly removerItem?: any;
  readonly character: any;
  readonly characterUpdate: any;
}

export default function IdentityDiv({
  height,
  width,
  style,
  onMouseDown,
  onMouseMove,
  removerItem,
  character,
  characterUpdate,
}: HabilityDivProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [utils, setUtils] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dimensions, setDimensions] = useState({ width, height })

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

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value; 
    characterUpdate({ ...character, name: newName });
  };

  const handlePowerLevelChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPowerLevel = e.target.value.slice(0, 2);
    const numericValue = Number(newPowerLevel);
    if (isNaN(numericValue) || numericValue < 0) return;
    const newPowerPoints = Math.floor(numericValue * 15);
    characterUpdate({
      ...character,
      powerLevel: numericValue,
      powerPoints: newPowerPoints,
    });
    
  };
  
  const handlePowerPointsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newPowerPoints = e.target.value.slice(0, 2);
    const numericValue = Number(newPowerPoints);
    if (isNaN(numericValue) || numericValue < 0) return;
    const newPowerLevel = numericValue / 15;
    characterUpdate({
      ...character,
      powerLevel: newPowerLevel,
      powerPoints: numericValue,
    });
  };

  return (
    <div
      className={styles.containerMain}
      ref={ref}
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
        {utils && (
          <div className={styles.resize} onMouseDown={handleResizeMouseDown}>
            <span className="material-symbols-outlined">resize</span>
          </div>
        )}
        <div className={styles.containerTop}>
          <div className={styles.containerInput}>
            <div className={styles.label}>Nome do Personagem</div>
            <input type="text" value={character.name} onChange={handleNameChange} />
          </div>
        </div>
        <div className={styles.containerBottom}>
          <div className={styles.containerInput}>
            <div className={styles.label}>Nível de Poder:</div>
            <input
              type="number"
              name="powerLevel"
              maxLength={2}
              value={character.powerLevel}
              onChange={handlePowerLevelChange}
            />
          </div>
          <div className={styles.containerInput}>
            <div className={styles.label}>Pontos de Poder:</div>
            <input
              type="number"
              name="powerPoints"
              maxLength={2}
              value={character.powerPoints}
              onChange={handlePowerPointsChange}
            />
          </div>
        </div>
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
