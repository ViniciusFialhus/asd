"use client";
import styles from "./page.module.css";
import GenericDivSelect from "@/app/components/genericDiv/page";
import DefensesDivSelect from "@/app/components/defensesDiv/page";
import AttacksDivSelect from "@/app/components/attackDiv/page";
import HabilityDivSelect from "@/app/components/habilitsDiv/page";

interface SelectAreaProps {
  readonly setBeingDragged: React.Dispatch<React.SetStateAction<boolean>>;
  readonly setDragItem: React.Dispatch<
    React.SetStateAction<HTMLElement | null>
  >;
}

export default function SelectArea({
  setBeingDragged,
  setDragItem,
}: SelectAreaProps) {
  return (
    <div className={styles.containerMain}>
      <GenericDivSelect
        type="Texto Editável"
        height={"15vh"}
        width={"15vw"}
        setBeingDragged={setBeingDragged}
        setDragItem={setDragItem}
      />
      <DefensesDivSelect
        height={"15vh"}
        width={"15vw"}
        setBeingDragged={setBeingDragged}
        setDragItem={setDragItem}
      />
      <HabilityDivSelect
        height={"15vh"}
        width={"15vw"}
        setBeingDragged={setBeingDragged}
        setDragItem={setDragItem}
      />
      <AttacksDivSelect
        height={"15vh"}
        width={"15vw"}
        setBeingDragged={setBeingDragged}
        setDragItem={setDragItem}
      />
    </div>
  );
}
