import styles from "./page.module.css";
import Hability from "../hability/page";
import { useEffect, useState, useRef } from "react";

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

export default function HabilityDiv({
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
  const [dimensions, setDimensions] = useState({ width, height });
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

  const handleHabilityChange = (type: string, value: number) => {
    characterUpdate((prevCharacter:any) => {
      const updatedAbilities = { ...prevCharacter.abilities };

      if (value >= 1) {
        updatedAbilities[type] = value;
      } else {
        const { [type]: _, ...rest } = updatedAbilities;
        return {
          ...prevCharacter,
          abilities: rest,
        };
      }
      return {
        ...prevCharacter,
        abilities: updatedAbilities,
      };
    });
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
    <div
      className={styles.containerHabilits}
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
        <Hability
          type="FORÇA"
          height={"60px"}
          width={"70px"}
          utils={utils}
          abiltyValue={character?.abilities?.FORÇA || 0}
          onChange={handleHabilityChange}
        />
        <Hability
          type="AGILIDADE"
          height={"60px"}
          width={"70px"}
          utils={utils}
          abiltyValue={character?.abilities?.AGILIDADE || 0}
          onChange={handleHabilityChange}
        />
        <Hability
          type="LUTA"
          height={"60px"}
          width={"70px"}
          utils={utils}
          abiltyValue={character?.abilities?.LUTA || 0}
          onChange={handleHabilityChange}
        />
        <Hability
          type="PRONTIDÃO"
          height={"60px"}
          width={"70px"}
          utils={utils}
          abiltyValue={character?.abilities?.PRONTIDÃO || 0}
          onChange={handleHabilityChange}
        />
        <Hability
          type="VIGOR"
          height={"60px"}
          width={"70px"}
          utils={utils}
          abiltyValue={character?.abilities?.VIGOR || 0}
          onChange={handleHabilityChange}
        />
        <Hability
          type="DESTREZA"
          height={"60px"}
          width={"70px"}
          utils={utils}
          abiltyValue={character?.abilities?.DESTREZA || 0}
          onChange={handleHabilityChange}
        />
        <Hability
          type="INTELECTO"
          height={"60px"}
          width={"70px"}
          utils={utils}
          abiltyValue={character?.abilities?.INTELECTO || 0}
          onChange={handleHabilityChange}
        />
        <Hability
          type="PRESENÇA"
          height={"60px"}
          width={"70px"}
          utils={utils}
          abiltyValue={character?.abilities?.PRESENÇA || 0}
          onChange={handleHabilityChange}
        />
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
