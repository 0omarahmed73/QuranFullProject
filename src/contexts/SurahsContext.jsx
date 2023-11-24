import { createContext } from "react";
import { useEffect, useState } from "react";

export const SurahsContext = createContext();

const SurahsProvider = ({ children }) => {
  const [surahs, setSurahs] = useState([]);
  useEffect(() => {
    fetch("https://api.quran.com/api/v4/chapters")
      .then((response) => response.json())
      .then((data) => {
        const surahs = data.chapters.map((chapter) => ({
          number: chapter.id,
          arabicName: chapter.name_arabic,
          englishName: chapter.name_simple,
        }));
        setSurahs(surahs);
      });
  }, []);

  return (
    <SurahsContext.Provider value={{ surahs }}>
      {children}
    </SurahsContext.Provider>
  );
};

export default SurahsProvider;
