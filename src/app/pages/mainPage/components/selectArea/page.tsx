"use client";
import styles from "./page.module.css";
import GenericDivSelect from "@/app/components/genericDiv/page";
import DefensesDivSelect from "@/app/components/defensesDiv/page";
import AttacksDivSelect from "@/app/components/attackDiv/page";
import HabilityDivSelect from "@/app/components/habilitsDiv/page";
import ImageDivSelect from "@/app/components/imageDiv/page";
import ExpertiseDivSelect from "@/app/components/expertiseDiv/page";
import { useState } from "react";
import IdentityDivSelect from "@/app/components/identidyDiv/page";
import BenefitsDivSelect from "@/app/components/benefitsDiv/page";

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
  const [icons, setIcons] = useState(true);
  return (
    <div className={styles.containerMain}>
      <div className={styles.containerIcons}>
        <div
          className={styles.containerFloat}
          style={{ top: !icons ? "1.2vh" : "10.3vh" }}
        />
        <div className={styles.containerSpan} onClick={() => setIcons(false)}>
          <span
            className="material-symbols-outlined"
            style={{ color: !icons ? "#8AB4F8" : "white" }}
          >
            image
          </span>
        </div>
        <div className={styles.containerSpan} onClick={() => setIcons(true)}>
          <span
            className="material-symbols-outlined"
            style={{ color: icons ? "#8AB4F8" : "white" }}
          >
            list_alt
          </span>
        </div>
      </div>
      <div className={styles.containerItems}>
        {icons && (
          <>
            <IdentityDivSelect
              height={"5vh"}
              width={"15vw"}
              setBeingDragged={setBeingDragged}
              setDragItem={setDragItem}
            />
            <ImageDivSelect
              height={"5vh"}
              width={"15vw"}
              setBeingDragged={setBeingDragged}
              setDragItem={setDragItem}
            />
            <GenericDivSelect
              type="Texto Editável"
              height={"10vh"}
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
            <ExpertiseDivSelect
              height={"12vh"}
              width={"15vw"}
              setBeingDragged={setBeingDragged}
              setDragItem={setDragItem}
            />
            <BenefitsDivSelect
              height={"12vh"}
              width={"15vw"}
              setBeingDragged={setBeingDragged}
              setDragItem={setDragItem}
            />
            <AttacksDivSelect
              height={"5vh"}
              width={"15vw"}
              setBeingDragged={setBeingDragged}
              setDragItem={setDragItem}
            />
          </>
        )}
      </div>
    </div>
  );
}
