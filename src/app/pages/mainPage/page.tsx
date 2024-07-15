"use client";
import { useState } from "react";
import styles from "./page.module.css";
import DocumentArea from "./components/documentArea/page";
import SelectArea from "./components/selectArea/page";
import UtilsArea from "./components/utilsArea/page";

export default function MainPage() {
  const [beingDragged, setBeingDragged] = useState(false);
  const [dragItem, setDragItem] = useState<HTMLElement | null>(null);
  const [utils, setUtils] = useState(false);

  return (
    <div className={styles.containerMain}>
      <UtilsArea />
      <div className={styles.containerBottom}>
        <SelectArea
          beingDragged={beingDragged}
          setBeingDragged={setBeingDragged}
          setDragItem={setDragItem}
          utils={utils}
          setUtils={setUtils}
        />
        <DocumentArea
          draggedItem={dragItem}
          setBeingDragged={setBeingDragged}
        />
      </div>
    </div>
  );
}
