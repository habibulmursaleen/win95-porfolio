"use client";
import Image from "next/image";
import { useState } from "react";
import Draggable from "react-draggable";
import ResumePDF from "../../public/resume.pdf";
import FileManager from "../fileManager/FileManager";
import Mail from "../mail/Mail";
import RickRoll from "../misc/RickRoll";
import Modal from "../modal/Modal";
import Wordpad from "../wordpad/Wordpad";
import styles from "./mainInterface.module.scss";
import { mainInterfaceItems } from "./mainInterfaceItems";

const MainInterface = () => {
  const [activeWordpad, setActiveWordpad] = useState([]);
  const [activeModals, setActiveModals] = useState([]);
  const [activeMail, setActiveMail] = useState(false);
  const [showFileManager, setShowFileManager] = useState([]);
  const [isRickRolled, setIsRickRolled] = useState(false);

  const downloadResume= () =>{
    const pdfUrl= ResumePDF
    const link= document.createElement("a")
    link.href= pdfUrl
    link.download= "Mursaleen-Resume"
    link.target= "_blank"
    link.rel="noopener noreferrer"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const selectApp = (item) => {
    switch (item.id) {
      case "aboutMe":
        if (!activeWordpad.some((ele) => ele.item.id === item.id)) {
          setActiveWordpad([...activeWordpad, { item }]);
        }
        break;
      case "projects":
        if (!activeWordpad.some((ele) => ele.item.id === item.id)) {
          setActiveWordpad([...activeWordpad, { item }]);
        }
        break;
      case "myComputer":
        if (!activeModals.some((modal) => modal.item.id === item.id)) {
          setActiveModals([...activeModals, { item }]);
        }
        break;
      case "networkNeighbourhood":
        if (!activeModals.some((modal) => modal.item.id === item.id)) {
          setActiveModals([...activeModals, { item }]);
        }
        break;
      case "recycleBin":
        if (!activeModals.some((modal) => modal.item.id === item.id)) {
          setActiveModals([...activeModals, { item }]);
        }
        break;
      case "mail":
        setActiveMail(true);
        break;

      case "memes":
        if (!showFileManager.some((file) => file.item.id === item.id)) {
          setShowFileManager([...showFileManager, { item }]);
          break;
        }
      case "secret":
        setIsRickRolled(true);
        break
      case "resume":
        downloadResume()
        break
      default:
        console.log("something went wrong");
    }
  };

  return (
    <div className={styles.interface}>
      <div className={styles.elementsList}>
        {mainInterfaceItems.map((item) => (
          <Draggable
            handle=".handle"
            key={item.id}
            defaultPosition={{ x: 0, y: 0 }}
            position={null}
            grid={[25, 25]}
            scale={1}
          >
            <div
              key={item.id}
              className={`${styles.item} handle`}
              onDoubleClick={() => selectApp(item)}
              onTouchStart={() => selectApp(item)}
            >
              <Image
                className={styles.icon}
                src={item.icon}
                alt={item.name}
                width={50}
                height={50}
              />
              <div className={styles.text}>{item.name}</div>
            </div>
          </Draggable>
        ))}
      </div>

      {activeWordpad.map((wordpadInfo) => (
        <Wordpad
          key={wordpadInfo.item.id}
          data={wordpadInfo.item}
          activeWordpad={activeWordpad}
          setActiveWordpad={setActiveWordpad}
          onClose={() => closeApp(wordpadInfo.item)}
        />
      ))}

      {activeModals.map((modalInfo) => (
        <Modal
          key={modalInfo.item.id}
          data={modalInfo.item}
          activeModals={activeModals}
          setActiveModals={setActiveModals}
        />
      ))}
      {activeMail && <Mail setActiveMail={setActiveMail} />}

      {showFileManager.map((fileInfo) => (
        <FileManager
          key={fileInfo.item.id}
          data={fileInfo.item}
          showFileManager={showFileManager}
          setShowFileManager={setShowFileManager}
        />
      ))}
      {isRickRolled && <RickRoll setIsRickRolled={setIsRickRolled} />}
    </div>
  );
};

export default MainInterface;
