"use client";
import styles from "./page.module.css";
import GenericDiv from "@/app/components/genericDiv/document/page";
import DefensesDiv from "@/app/components/defensesDiv/documents/page";
import AttacksDiv from "@/app/components/attackDiv/document/page";
import HabilityDiv from "@/app/components/habilitsDiv/document/page";
import { useRef, useState } from "react";

interface DocumentAreaProps {
  readonly draggedItem: HTMLElement | null;
  readonly setBeingDragged: React.Dispatch<React.SetStateAction<boolean>>;
  readonly scale: any;
}

interface ComponentPosition {
  id: number;
  left: number;
  top: number;
  type: string;
  name: string;
}

export default function ScaleComponent({
  draggedItem,
  setBeingDragged,
  scale,
}: DocumentAreaProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [components, setComponents] = useState<ComponentPosition[]>([]);
  const [dragging, setDragging] = useState(false);
  const [currentDraggedId, setCurrentDraggedId] = useState<number | null>(null);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [startMousePosition, setStartMousePosition] = useState({ x: 0, y: 0 });

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setBeingDragged(false);

    if (draggedItem && containerRef.current) {
      const genericData = e.dataTransfer.getData("type");
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (genericData === "generic") {
        setComponents((prev) => [
          ...prev,
          {
            id: prev.length,
            left: x,
            top: y,
            name: `${genericData}`,
            type: "Texto Editável",
          },
        ]);
      } else if (genericData === "defenses") {
        setComponents((prev) => [
          ...prev,
          {
            id: prev.length,
            left: x,
            top: y,
            name: "Defensive Element",
            type: "defenses",
          },
        ]);
      } else if (genericData === "attack") {
        setComponents((prev) => [
          ...prev,
          {
            id: prev.length,
            left: x,
            top: y,
            name: "Defensive Element",
            type: "attacks",
          },
        ]);
      } else if (genericData === "hability") {
        setComponents((prev) => [
          ...prev,
          {
            id: prev.length,
            left: x,
            top: y,
            name: "Defensive Element",
            type: "hability",
          },
        ]);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleMouseDown = (e: React.MouseEvent, id: number) => {
    setDragging(true);
    setCurrentDraggedId(id);

    const component = components.find((comp) => comp.id === id);
    if (component) {
      setStartPosition({ x: component.left, y: component.top });
      setStartMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging && currentDraggedId !== null && containerRef.current) {
      const deltaX = e.clientX - startMousePosition.x;
      const deltaY = e.clientY - startMousePosition.y;
      setComponents((prev) =>
        prev.map((comp) =>
          comp.id === currentDraggedId
            ? {
                ...comp,
                left: startPosition.x + deltaX,
                top: startPosition.y + deltaY,
              }
            : comp
        )
      );
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
    setCurrentDraggedId(null);
  };

  return (
    <div
      ref={containerRef}
      className={styles.containerMain}
      style={{ transform: `scale(${scale})` }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {components.map((component) =>
        component.type === "Texto Editável" ? (
          <GenericDiv
            key={component.id}
            height={"150px"}
            width={"450px"}
            type={component.type}
            style={{
              position: "absolute",
              left: component.left,
              top: component.top,
            }}
            onMouseDown={(e) => handleMouseDown(e, component.id)}
          />
        ) : component.type === "defenses" ? (
          <DefensesDiv
            key={component.id}
            height={"150px"}
            width={"350px"}
            style={{
              position: "absolute",
              left: component.left,
              top: component.top,
            }}
            onMouseDown={(e) => handleMouseDown(e, component.id)}
          />
        ) : component.type === "attacks" ? (
          <AttacksDiv
            key={component.id}
            height={"150px"}
            width={"350px"}
            style={{
              position: "absolute",
              left: component.left,
              top: component.top,
            }}
            onMouseDown={(e) => handleMouseDown(e, component.id)}
          />
        ) : component.type === "hability" ? (
          <HabilityDiv
            key={component.id}
            height={"150px"}
            width={"350px"}
            style={{
              position: "absolute",
              left: component.left,
              top: component.top,
            }}
            onMouseDown={(e) => handleMouseDown(e, component.id)}
          />
        ) : (
          ""
        )
      )}
    </div>
  );
}
