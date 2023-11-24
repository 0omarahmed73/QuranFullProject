import { useContext, useEffect, useState } from "react";
import { SurahsContext } from "../../contexts/SurahsContext";
import style from "./Surah.module.css";
import { useLocation } from "react-router";
import { motion } from "framer-motion";
import { createPortal } from "react-dom";
import { Accordion, Button } from "react-bootstrap";
import Modal from "../../components/Modal/Modal";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const Surah = () => {
  const [tafseer , setTafseer] = useState("")
  const [audio, setAudio] = useState("");
  const [translation, setTranslation] = useState("");
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [ayahs, setAyahs] = useState([]);
  const location = useLocation();
  const { surahs } = useContext(SurahsContext);
  const surahNumber = location.pathname.split("/")[1];
  console.log(surahNumber)
  const [ar, setAr] = useState("");
  const [en, setEn] = useState("");
  useEffect(() => {
    if (surahs.length > 0) {
      const surah = surahs.find((surah) => surah.number == surahNumber);
      setAr(surah.arabicName);
      setEn(surah.englishName);
    }
  }, [surahs, surahNumber]);
  useEffect(() => {
    const func = async () => {
      const ayat = await fetch(
        `https://api.alquran.cloud/v1/surah/${surahNumber}/editions/quran-uthmani,en.asad,en.pickthall`,
        {
          method: "GET",
        }
      );
      const result = await ayat.json();
      setAyahs(result.data[0]["ayahs"]);
    };
    func();
  }, []);
  const getTranslation = async (ayahNum) => {
    const ayat = await fetch(
      `https://api.alquran.cloud/v1/ayah/${ayahNum}/en.asad`,
      {
        method: "GET",
      }
    );
    const result = await ayat.json();
    const translation =
      result.data.text[0].toUpperCase() + result.data.text.slice(1);
    setTranslation(translation);
  };
  const getAudio = async (ayahNum) => {
    const ayat = await fetch(
      `https://api.alquran.cloud/v1/ayah/${ayahNum}/ar.alafasy`,
      {
        method: "GET",
      }
    );
    const result = await ayat.json();
    const audio = result.data.audioSecondary[0];
    setAudio(audio);
  };
  const getTafseer = async (ayahNum) => { 
    const ayat = await fetch(
      `https://quranenc.com/api/v1/translation/aya/arabic_moyassar/${surahNumber}/${ayahNum}`,
      {
        method: "GET",
      }
    );
    const result = await ayat.json();
    console.log(result)
    setTafseer(result.result.translation)
  };
  console.log(show);
  return (
    <div
      onClick={() => {
        handleShow();
      }}
      className={style.Surah}
    >
      <div className={style.names}>
        <h3>سورة {ar}</h3>
        <h3>{en}</h3>
      </div>
      {ayahs.length > 0 ? (
        ayahs.map((ayah) => {
          return (
            <div
              onClick={() => {
                handleShow();
                getTranslation(ayah.number);
                getAudio(ayah.number);
                getTafseer(ayah.numberInSurah);
                console.log(ayah.numberInSurah);
              }}
              key={crypto.randomUUID()}
              className={style.ayah}
            >
              <p className={style.text}>
                {ayah.text}&nbsp; [{ayah.numberInSurah}]
              </p>
            </div>
          );
        })
      ) : (
        <>
          <span className="loader"></span>
          <p className="mt-2">جاري التحميل...</p>
        </>
      )}
      {createPortal(
        <Modal show={show} setShow={setShow}>
          <Accordion style={{ width: "100%" }}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>الإستماع الى الأية &nbsp;</Accordion.Header>
              <Accordion.Body>
                <AudioPlayer
                muted={true}
                  autoPlay={false}
                  showSkipControls={false}
                  showJumpControls={false}
                  showFilledVolume={false}
                  showFilledProgress={false}
                  src={audio}
                  onPlay={(e) => console.log("onPlay")}
                  // other props here
                />
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>عرض التفسير &nbsp;</Accordion.Header>
              <Accordion.Body>
                <p className="text-end">{tafseer}</p>
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="2">
              <Accordion.Header>
                عرض الترجمة - Translation &nbsp;
              </Accordion.Header>
              <Accordion.Body dir="ltr">{translation}</Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Modal>,
        document.getElementById("modal-root")
      )}
    </div>
  );
};

export default Surah;
