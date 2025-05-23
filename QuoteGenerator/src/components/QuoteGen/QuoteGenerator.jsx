import React, {useState,useEffect} from 'react'
import axios from 'axios';
import './QuoteGenerator.css';
// import myImage from '../../assets/myimage.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRetweet,faShare } from '@fortawesome/free-solid-svg-icons';

function QuoteGenerator() {
    const [array,setArray]=useState([]);
    const [filteredData,setFilteredData]=useState([]);
    const [quote,setQuote]  =useState('');
    const [author,setAuthor]=useState('');
    const [error,setError]  =useState('');

    useEffect(() => {
      const fetchData = async () => {
        try {
          let res = await axios.get("https://dummyjson.com/quotes");
          // console.log(res);
          // console.log(res.data.quote); // Quote text
          // console.log(res.data.author);  // Author
          
          const quotesArray=res.data.quotes;
          const randomIndex=Math.floor(Math.random()* quotesArray.length);

          const randomQuote=quotesArray[randomIndex];

          setAuthor(randomQuote.author);
          setQuote(randomQuote.quote);

          setArray(quotesArray);
        } catch (error) {
          console.error("Failed to fetch quote:", error);
        }
      };
  
      fetchData();
    }, []);

   
  let handleRandom=async()=>{
    let res = await axios.get("https://dummyjson.com/quotes/random");
    console.log(res.data); // Quote text
    // console.log(res.data.author);  // Author
    // console.log(res);
    setAuthor(res.data.author);
    setQuote(res.data.quote);
  }

  let handleFamous=()=>{
if(array.length>0){
  const filtered=array.filter(item=>
  {
    return (item.author)=="Abdul Kalam";
  }
  );
  setFilteredData(filtered);
  const randomIndex=Math.floor(Math.random()* filtered.length);
  const randomQuote=filtered[randomIndex];
  // console.log(randomIndex);
  setAuthor(randomQuote.author);
  setQuote(randomQuote.quote);
}
  }
  let handleInsp=()=>{
    if(array.length>0){
      const filtered=array.filter(item=>
      {
        return (item.author)!="Abdul Kalam";
      }
      );
      setFilteredData(filtered);
      const randomIndex=Math.floor(Math.random()* filtered.length);
      const randomQuote=filtered[randomIndex];
      console.log(randomIndex);
      setAuthor(randomQuote.author);
      setQuote(randomQuote.quote);
    }
  }
 
  return (
    <div className='main'>
        <div className="container">
            {/* <img src={myImage}/> */}
        <h2>{author}</h2>
      <div className="buttons">
        <button onClick={handleFamous} className='btn btn-1'>Famous Quotes</button>
        <button onClick={handleInsp} className='btn btn-2'>Inspirational</button>
      </div>
      <h2>{quote}</h2>
        </div>
     
    <div className="outer-btns">
        <button onClick={handleRandom} className='btns random-btn'>
            Random 
            <FontAwesomeIcon className='random' icon={faRetweet} />
        </button>
        <button className='btns share-btn'>
            Share
            <FontAwesomeIcon className='share' icon={faShare} />
        </button>
     </div>
     
    </div>
  )
}

export default QuoteGenerator
