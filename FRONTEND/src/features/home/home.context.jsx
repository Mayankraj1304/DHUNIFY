import { useState } from "react";
import { createContext } from "react";
export const SongContext = createContext();

export const SongContextProvider = ({ children }) => {
  const [song, setsong] = useState({
    url: "https://ik.imagekit.io/mayank123raj/Baby_John_-_Beast_Mode__From__Baby_John__mp3_dPbZfcqJN",
    posterUrl:
      "https://ik.imagekit.io/mayank123raj/Baby_John_-_Beast_Mode__From__Baby_John___xL9gV-zWz.jpeg",
    title: 'Baby John - Beast Mode (From "Baby John")',
    mood: "happy",
  });
  const [loading, setloading] = useState(false);

  return (
    <SongContext.Provider value={{ loading, setloading, song, setsong }}>
      {children}
    </SongContext.Provider>
  );
};
