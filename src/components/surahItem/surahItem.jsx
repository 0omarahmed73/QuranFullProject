import { Link } from "react-router-dom";
import style from "./surahItem.module.css";

const SurahItem = ({arabicName : ar , englishName : en , number : num}) => {
  return <Link to={`/${num}`} className={style.surahItem}>
    <div className={style.surahInner}>
      <div className={style.surahName}>
        <div className={style.arabicName}>{ar}</div>
        <div className={style.englishName}>{en}</div>
      </div>
    </div>
  </Link>;
};

export default SurahItem;
