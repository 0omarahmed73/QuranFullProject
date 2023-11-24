import { Container, Row } from "react-bootstrap";
import style from "./Home.module.css";
import SurahItem from "./../../components/surahItem/surahItem";
import { useContext } from "react";
import { SurahsContext } from "../../contexts/SurahsContext";
const Home = () => {
  const {surahs} = useContext(SurahsContext);
  console.log(surahs);
  return (
    <div className={style.Home}>
      <div className={style.inner2}>
        <div className={style.upper}>
          <p>مَا أَنزَلْنَا عَلَيْكَ الْقُرْآنَ لِتَشْقَىٰ</p>
        </div>
        <div className={`${style.lower}`}>
          <Row className="gap-1 justify-content-center  align-items-center ">
            {surahs.map((surah) => (
              <div className={`col-6 col-md-4 col-lg-2`} key={surah.number}>
                <SurahItem {...surah} />
              </div>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Home;
