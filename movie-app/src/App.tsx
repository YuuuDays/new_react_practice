import { useState,useEffect } from 'react';
import './App.css'

// 追加
type Movie = {
  id: string;
  original_title: string;
  poster_path: string;
  overview: string;
};

// 追加
type MovieJson = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

function App() {

  //Jsのコードを書く
    const defaultMovieList = [
    {
      id: 1,
      name: "君の名は",
      image:
        "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/yLglTwyFOUZt5fNKm0PWL1PK5gm.jpg",
      overview:
        "1ヵ月後に1000年ぶりの彗星が訪れる日本。東京で暮らす平凡な男子高校生・瀧と、山深い村で都会の生活に憧れながら憂鬱な日々を送る女子高校生・三葉。つながりのない2人は、互いが入れ替わる不思議な夢を見る。",
    },
    {
      id: 2,
      name: "ハウルの動く城",
      image:
        "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/v0K2e1t6ocUNnkZ9BeiFdcOT9LG.jpg",
    },
    {
      id: 3,
      name: "もののけ姫",
      image:
        "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/mVdz3vlmioKWZaHTGfu99zIuayZ.jpg",
    },
    {
      id: 4,
      name: "バック・トゥ・ザ・フューチャー",
      image:
        "https://media.themoviedb.org/t/p/w300_and_h450_bestv2/oHaxzQXWSvIsctZfAYSW0tn54gQ.jpg",
    },
  ];
  //追加
  const fetchMovieList = async () =>{
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=ja&page=1`,
      {
        headers:{
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
        },
      }
    );
    const data = await response.json();
    // useStateに型を入れ込みます
    // mapとはJavaScriptの配列に対して使えるメソッドです
    setMovieList(
      data.results.map((movie: Movie) => ({
        id: movie.id,
        original_title: movie.original_title,
        poster_path: movie.poster_path,
        overview: movie.overview,
      }))
    );
  
    console.log('★tyeofdata = ',typeof(data));
    console.log('★data.resul = ',typeof(data.resuls));
    console.log(data.results);

    return data.result;
  }

  // React(関数コンポーネント)ではuseStateで定義された状態(state)が変化するとコンポーネントが再レンダリングされる
  const[keyword,setKeyword] = useState("");
  const[movieList, setMovieList] = useState<Movie[]>([]);
  
  //第一引数に実行したい処理を含む関数、第二引数に依存配列を渡す
  useEffect(() =>{
    //実行させる処理
    fetchMovieList();
  },[]);
  
  // e はイベントオブジェクトで、e.target.value で入力された文字列を取得できる
  return (
    <div>
      <div>{keyword}</div>
      <input type="text" onChange={(e) =>setKeyword(e.target.value)}/>

      {movieList
        .filter((movie) => movie.original_title.includes(keyword))
        .map((movie) =>(
        <div key={movie.id}>
          <h2>{movie.original_title}</h2>
          <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.original_title}
            />
          <p>{movie.overview}</p>
          
        </div>
      ))}
    </div>
     
  )
}

export default App
