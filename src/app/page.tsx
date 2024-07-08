"use client";
import React from 'react';
import styles from "./page.module.css";
import HabilityDiv from "./components/habilitsDiv/page";
import GenericDiv from "./components/genericDiv/page";
import AttacksDiv from "./components/attackDiv/page";
import DefensesDiv from "./components/defensesDiv/page";
import img from "./public/persons/656f3fad9dc1629228801a9c0140359c (1).jpg";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Home() {
  const downloadPDF = () => {
    const input = document.getElementById("containerBannerSheet");
    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "px",
          format: [canvas.width, canvas.height]
        });
        pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
        pdf.save("download.pdf");
      });
    } else {
      console.error("Elemento não encontrado");
    }
  };

  return (
    <main className={styles.main}>
      {/* <button onClick={downloadPDF} className={styles.button}>Download PDF</button> */}
      <div className={styles.containerBannerSheet} id="containerBannerSheet">
        <div className={styles.containerLeft}>
          <div className={styles.containerImg}>
            <img src={img.src} />
          </div>
          <div className={styles.containerAttack}>
            <AttacksDiv />
          </div>
        </div>
        <div className={styles.containerRigth}>
          <div className={styles.containerHabilits}>
            <HabilityDiv type="FORÇA" />
            <HabilityDiv type="AGILIDADE" />
            <HabilityDiv type="LUTA" />
            <HabilityDiv type="PRONTIDÃO" />
            <HabilityDiv type="VIGOR" />
            <HabilityDiv type="DESTREZA" />
            <HabilityDiv type="INTELECTO" />
            <HabilityDiv type="PRESENÇA" />
          </div>
          <div className={styles.containerDefenses}>
            <DefensesDiv />
          </div>
          <div className={styles.containerText}>
            <GenericDiv type="Observações" />
          </div>
        </div>
      </div>
    </main>
  );
}
