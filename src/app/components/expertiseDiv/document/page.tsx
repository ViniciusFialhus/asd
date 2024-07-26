"use client";
import styles from "./page.module.css";
import { useEffect, useState, ChangeEvent, useRef } from "react";

interface DefensesDivProps {
  readonly height: string | number;
  readonly width: string | number;
  readonly style: any;
  readonly onMouseDown?: (event: React.MouseEvent<HTMLDivElement>) => void;
  readonly onMouseMove?: (event: React.MouseEvent<HTMLDivElement>) => void;
  readonly removerItem?: any;
  readonly character: any;
}

export default function ExpertiseDiv({
  height,
  width,
  style,
  onMouseDown,
  onMouseMove,
  removerItem,
  character,
}: DefensesDivProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<string[]>([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [utils, setUtils] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dimensions, setDimensions] = useState({ width, height });
  const [inputValues, setInputValues] = useState<{
    [key: string]: { [key: number]: number };
  }>({});
  const expertiseOptions = [
    {
      nome: "Acrobacia",
      atributo: "AGILIDADE",
      tipo: "Sim",
      movimento: "livre",
    },
    { nome: "Atletismo", atributo: "FORÇA", tipo: "Não", movimento: "nenhum" },
    {
      nome: "Combate à Distância",
      atributo: "DESTREZA",
      tipo: "Não",
      movimento: "padrão",
    },
    {
      nome: "Combate Corpo a Corpo",
      atributo: "LUTA",
      tipo: "Não",
      movimento: "padrão",
    },
    {
      nome: "Enganação",
      atributo: "PRESENÇA",
      tipo: "Não",
      movimento: "padrão",
    },
    {
      nome: "Especialidade",
      atributo: "INTELECTO",
      tipo: "Sim*",
      movimento: "—",
    },
    {
      nome: "Furtividade",
      atributo: "AGILIDADE",
      tipo: "Não",
      movimento: "nenhum",
    },
    {
      nome: "Intimidação",
      atributo: "PRESENÇA",
      tipo: "Não",
      movimento: "padrão",
    },
    {
      nome: "Intuição",
      atributo: "PRONTIDÃO",
      tipo: "Não",
      movimento: "livre",
    },
    {
      nome: "Investigação",
      atributo: "INTELECTO",
      tipo: "Sim",
      movimento: "—",
    },
    { nome: "Percepção", atributo: "PRONTIDÃO", tipo: "Não", movimento: "—" },
    {
      nome: "Persuasão",
      atributo: "PRESENÇA",
      tipo: "Não",
      movimento: "padrão",
    },
    {
      nome: "Prestidigitação",
      atributo: "DESTREZA",
      tipo: "Sim",
      movimento: "padrão",
    },
    {
      nome: "Tecnologia",
      atributo: "INTELECTO",
      tipo: "Sim",
      movimento: "padrão",
    },
    {
      nome: "Tratamento",
      atributo: "INTELECTO",
      tipo: "Sim",
      movimento: "padrão",
    },
    { nome: "Veículos", atributo: "DESTREZA", tipo: "Sim", movimento: "livre" },
  ];

  const handleDobleClick = () => {
    setUtils(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setUtils(false);
    }
  };

  const addItem = (item: string) => {
    const include = items.includes(item)
    if(include){
      return
    }
    setItems((prevItems) => [...prevItems, item]);
    setInputValues((prevValues) => ({
      ...prevValues,
      [item]: { 0: 0, 1: 0 },
    }));
    setSelectedValue("");
  };

  const removeItem = (item: string) => {
    const removeList = items.filter((i) => i !== item);
    setItems(removeList);
    setInputValues((prevValues) => {
      const newValues = { ...prevValues };
      delete newValues[item];
      return newValues;
    });
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    if (value) {
      addItem(value);
    }
  };

  const handleInputChange = (item: string, index: number, value: string) => {
    setInputValues((prevValues) => ({
      ...prevValues,
      [item]: {
        ...prevValues[item],
        [index]: parseInt(value, 10) || 0,
      },
    }));
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
  return (
    <div
      ref={ref}
      className={styles.main}
      style={{
        ...style,
        height: dimensions.height,
        width: dimensions.width,
        cursor: mouseDown ? "grabbing" : "grab",
      }}
      onDoubleClick={handleDobleClick}
      onMouseDown={
        !utils && typeof onMouseDown === "function" ? onMouseDown : undefined
      }
      onMouseMove={
        !utils && typeof onMouseMove === "function" ? onMouseMove : undefined
      }
    >
      <section className={styles.containerBase}>
        <div className={styles.containerText}>PERÍCIAS</div>
        <div
          className={styles.containerContent}
          style={{ border: utils ? "2px solid black" : "" }}
        >
          {utils && (
            <div className={styles.resize} onMouseDown={handleResizeMouseDown}>
              <span className="material-symbols-outlined">resize</span>
            </div>
          )}
          <select
            value={selectedValue}
            onChange={handleSelectChange}
            style={{ marginBottom: "5px", marginTop: "5px" }}
          >
            <option value="" disabled>
              Selecione sua Péricia
            </option>
            {expertiseOptions.map((expertise, index) => (
              <option key={index} value={expertise.nome}>
                {expertise.nome}
              </option>
            ))}
          </select>
          {items.map((item, index) => {
            const expertise = expertiseOptions.find((exp) => exp.nome === item);
            const atributo = expertise ? expertise.atributo : undefined;
            const abilityValue = atributo ? character.abilities[atributo] : 0;
            const showInputs =
              item === "Combate Corpo a Corpo" ||
              item === "Combate à Distância" ||
              item === "Especialidade";
            const sum =
              inputValues[item][0] +
              inputValues[item][1] +
              (isNaN(abilityValue) ? 0 : abilityValue);
            if (!showInputs) {
              return (
                <div className={styles.dynamicItem} key={index}>
                  <div className={styles.containerSpan}>
                    <span
                      className="material-symbols-outlined"
                      onClick={() => removeItem(item)}
                    >
                      delete
                    </span>
                  </div>
                  <div className={styles.containerName}>{item}</div>
                  <div className={styles.containerInput}>
                    <input
                      readOnly
                      defaultValue={0}
                      maxLength={2}
                      value={sum}
                      style={{
                        backgroundColor: "white",
                        border: "1px solid black",
                      }}
                    />
                    <input
                      readOnly
                      defaultValue={0}
                      maxLength={2}
                      value={abilityValue}
                    />
                    <input
                      maxLength={2}
                      defaultValue={0}
                      value={inputValues[item][0]}
                      onChange={(e) =>
                        handleInputChange(item, 0, e.target.value)
                      }
                    />
                    <input
                      maxLength={2}
                      defaultValue={0}
                      value={inputValues[item][1]}
                      onChange={(e) =>
                        handleInputChange(item, 1, e.target.value)
                      }
                    />
                  </div>
                </div>
              );
            } else {
              return (
                <div className={styles.dynamicItem} key={index}>
                  <div className={styles.containerSpan}>
                    <span
                      className="material-symbols-outlined"
                      onClick={() => removeItem(item)}
                    >
                      delete
                    </span>
                  </div>
                  <div className={styles.containerName}>
                    <input defaultValue={"Valor Mudável"}/>
                  </div>
                  <div className={styles.containerInput}>
                    <input
                      readOnly
                      defaultValue={0}
                      maxLength={2}
                      value={sum}
                      style={{
                        backgroundColor: "white",
                        border: "1px solid black",
                      }}
                    />
                    <input
                      readOnly
                      defaultValue={0}
                      maxLength={2}
                      value={abilityValue}
                    />
                    <input
                      maxLength={2}
                      defaultValue={0}
                      value={inputValues[item][0]}
                      onChange={(e) =>
                        handleInputChange(item, 0, e.target.value)
                      }
                    />
                    <input
                      maxLength={2}
                      defaultValue={0}
                      value={inputValues[item][1]}
                      onChange={(e) =>
                        handleInputChange(item, 1, e.target.value)
                      }
                    />
                  </div>
                </div>
              );
            }
          })}
        </div>
      </section>
      <section className={styles.containerIcon}>
        {utils && (
          <>
            <div className={styles.containerSpan}>
              <span className="material-symbols-outlined" onClick={removerItem}>
                delete
              </span>
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
