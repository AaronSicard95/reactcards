import React, {useState, useRef, useEffect} from "react";
import axios from "axios";

function Cards(){
    const [cards, setCards] = useState([]);
    const [shuffling, setShuffling] = useState(false);
    const shuforget=  useRef(false);
    const deckIDURL = useRef("https://deckofcardsapi.com/api/deck/new/");


    async function fetchDeck(){
            setShuffling(true);
            const deck= await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
            deckIDURL.current = `https://deckofcardsapi.com/api/deck/${deck.data.deck_id}/`;
            setShuffling(false);
        }

    useEffect(function start(){
        fetchDeck();
    },[]);

    async function cardPull(){
        if(cards.length >= 52){
            alert("There are no cards left in the deck. Please Shuffle.");
            return;
        }
            setShuffling(true);
            const newCard = await axios.get(`${deckIDURL.current}draw/?count=1`);
            console.log(newCard.data);
            setCards(newCards =>[...cards,{img: newCard.data.cards[0].image, 
                code: newCard.data.cards[0].code,
                rotation: (Math.random()*50)-25
            }]);
            setShuffling(false);
        }

    async function shufDeck(){
            setShuffling(true);
            setCards([]);
            const newCard = await axios.get(`${deckIDURL.current}shuffle`);
            console.log(newCard.data);
            setShuffling(false);
        }
    
    console.log(cards);
    return <div>
        <button onClick={cardPull} disabled={shuffling}>Draw</button>
        <button onClick={shufDeck} disabled={shuffling}>Shuffle</button>
        <br/>
        <div style={{margin: "200px"}}>
            {cards.map(c=>(<img style={{position: "absolute", transform: `rotate(${c.rotation}deg)`}} src={c.img}></img>))}
        </div>
    </div>
}

export default Cards;