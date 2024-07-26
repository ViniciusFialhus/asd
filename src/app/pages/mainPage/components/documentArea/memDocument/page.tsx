"use client";
import styles from "./page.module.css";
import { useRef, useState } from "react";
import {
  ComponentPosition,
  DocumentAreaProps,
} from "../../../../../utils/types";
import { CharacterMeM } from "../../../../../utils/class";
import GenericDiv from "@/app/components/genericDiv/document/page";
import DefensesDiv from "@/app/components/defensesDiv/documents/page";
import AttacksDiv from "@/app/components/attackDiv/document/page";
import HabilityDiv from "@/app/components/habilitsDiv/document/page";
import ImageDiv from "@/app/components/imageDiv/document/page";
import ExpertiseDiv from "@/app/components/expertiseDiv/document/page";
import IdentityDiv from "@/app/components/identidyDiv/document/page";
import BenefitsDiv from "@/app/components/benefitsDiv/document/page";

export default function MeMDocument({
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
  const [character, setCharacter] = useState<CharacterMeM>(
    new CharacterMeM("Nome do Personagem", 1, 15, {})
  );

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setBeingDragged(false);

    if (draggedItem && containerRef.current) {
      const genericData = e.dataTransfer.getData("type");
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const newComponent = {
        id: components.length,
        left: x,
        top: y,
        name: "",
        type: "",
      };

      switch (genericData) {
        case "identity":
          newComponent.name = "Identity Element";
          newComponent.type = "identity";
          break;
        case "benefits":
          newComponent.name = "Benefits Element";
          newComponent.type = "benefits";
          break;
        case "generic":
          newComponent.name = "Texto Editável";
          newComponent.type = "generic";
          break;
        case "defenses":
          newComponent.name = "Defensive Element";
          newComponent.type = "defenses";
          break;
        case "attack":
          newComponent.name = "Attack Element";
          newComponent.type = "attacks";
          break;
        case "hability":
          newComponent.name = "Hability Element";
          newComponent.type = "hability";
          break;
        case "img":
          newComponent.name = "Image Element";
          newComponent.type = "img";
          break;
        case "expertise":
          newComponent.name = "Expertise Element";
          newComponent.type = "expertise";
          break;
        default:
          break;
      }

      setComponents((prev) => [...prev, newComponent]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    setDragging(true);
    setCurrentDraggedId(id);

    const component = components.find((comp) => comp.id === id);
    if (component) {
      setStartPosition({ x: component.left, y: component.top });
      setStartMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragging && currentDraggedId !== null) {
      const deltaX = e.clientX - startMousePosition.x;
      const deltaY = e.clientY - startMousePosition.y;
      const newX = startPosition.x + deltaX;
      const newY = startPosition.y + deltaY;
      
      setComponents((prev) =>
        prev.map((comp) =>
          comp.id === currentDraggedId
            ? {
                ...comp,
                left: newX,
                top: newY,
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

  const handleRemoveComponent = (id: number) => {
    setComponents((prev) => prev.filter((component) => component.id !== id));
  };

  const renderComponent = (component: ComponentPosition) => {
    const commonProps = {
      key: component.id,
      type: "Descrição",
      height: "150px",
      width: "350px",
      style: {
        position: "absolute",
        left: component.left,
        top: component.top,
      },
      removerItem: () => handleRemoveComponent(component.id),
      onMouseDown: (e: React.MouseEvent<HTMLDivElement>) =>
        handleMouseDown(e, component.id),
      onMouseMove: (e: React.MouseEvent<HTMLDivElement>) => handleMouseMove(e),
    };

    switch (component.type) {
      case "identity":
        return (
          <IdentityDiv
            {...commonProps}
            character={character}
            characterUpdate={setCharacter}
          />
        );
      case "generic":
        return <GenericDiv {...commonProps} />;
      case "benefits":
        return <BenefitsDiv {...commonProps} />;
      case "defenses":
        return <DefensesDiv {...commonProps} character={character} />;
      case "attacks":
        return <AttacksDiv {...commonProps} />;
      case "hability":
        return (
          <HabilityDiv
            {...commonProps}
            character={character}
            characterUpdate={setCharacter}
          />
        );
      case "img":
        return <ImageDiv {...commonProps} />;
      case "expertise":
        return <ExpertiseDiv {...commonProps} character={character} />;
      default:
        return null;
    }
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
      {components.map(renderComponent)}
    </div>
  );
}
