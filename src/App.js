import logo from './logo.svg';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

const BidActions = (props) => {
  const [bid, setBid] = React.useState();
  const [minBid, setMinBid] = React.useState();

  const handleSubmit = (event) => {
    props.bidFunction(parseFloat(bid));
    event.preventDefault();
  };

  const handleChange = (event) => {
    setBid(event.target.value);
  };

  React.useEffect(() => {
    let newBidPrice = props.price + 0.1;
    newBidPrice = newBidPrice.toFixed(2);
    setMinBid(newBidPrice);
    setBid(newBidPrice);
  }, [props.price]);

  return (
    <form onSubmit={handleSubmit}>
      <label for="amount">Bid:</label>
      <input
        name="amount"
        type="number"
        min={minBid}
        step={0.1}
        value={bid}
        onChange={handleChange}
      />
      <input type="submit" value="Bid" />
      <button type="button" onClick={props.skipFunction}>
        Skip
      </button>
    </form>
  );
};

const AuctionForm = (props) => {
  const [playerName, setPlayerName] = React.useState("");
  const [initialBidder, setInitialBidder] = React.useState(
    props.auctionMemberArray[0]
  );
  const [bid, setBid] = React.useState("0.1");

  const handleSubmit = (event) => {
    props.startAuctionFunction(playerName, initialBidder, parseFloat(bid));
    event.preventDefault();
  };

  const handleBidChange = (event) => {
    setBid(event.target.value);
  };

  const handleInitialBidderChange = (event) => {
    setInitialBidder(event.target.value);
  };

  const handlePlayerNameChange = (event) => {
    setPlayerName(event.target.value);
  };

  return (
    <form class="auction-form" onSubmit={handleSubmit}>
      <label>Player Name:</label>
      <input type="text" onChange={handlePlayerNameChange} />
      <label>Initial Bidder:</label>
      <select onChange={handleInitialBidderChange} value={initialBidder}>
        {props.auctionMemberArray.map((value) => {
          return <option value={value}>{value}</option>;
        })}
      </select>
      <label>Starting Bid:</label>
      <input
        type="number"
        min={0.1}
        step={0.1}
        value={bid}
        onChange={handleBidChange}
      />
      <input type="submit" value="Start Auction" />
    </form>
  );
};

export const Auction = (props) => {
  const initialMemberArray = [
    "Cliff",
    "Mike",
    "Joe",
    "Tom M",
    "Jerry",
    "Tom K",
    "Larry",
    "Dom",
    "Thomas",
    "Pat",
    "Rich"
  ];
  const [auctionMemberArray, setAuctionMemberArray] = React.useState(
    initialMemberArray
  );
  const [memberArray, setMemberArray] = React.useState(initialMemberArray);
  const [player, setPlayer] = React.useState("Player Name");
  const [price, setPrice] = React.useState(0.1);
  const [currentBidder, setCurrentBidder] = React.useState("Cliff");
  const [lastBidder, setLastBidder] = React.useState("");

  const advanceBidder = () => {
    const indexOfCurrentBidder = memberArray.indexOf(currentBidder);
    let newBidderIndex = indexOfCurrentBidder;
    if (memberArray.length === indexOfCurrentBidder + 1) {
      newBidderIndex = 0;
    } else {
      newBidderIndex = indexOfCurrentBidder + 1;
    }
    setCurrentBidder(memberArray[newBidderIndex]);
  };

  const skipBidder = () => {
    const indexOfCurrentBidder = memberArray.indexOf(currentBidder);
    if (indexOfCurrentBidder !== -1) {
      const newMemberArray = [...memberArray];
      newMemberArray.splice(indexOfCurrentBidder, 1);
      setMemberArray(newMemberArray);
      advanceBidder();
    }
  };

  const placeBid = (bidAmount) => {
    setPrice(bidAmount);
    setLastBidder(currentBidder);
    advanceBidder();
  };

  const startAuction = (playerName, initialBidder, bidAmount) => {
    setPlayer(playerName);
    setPrice(bidAmount);
    setLastBidder(initialBidder);
    setMemberArray(initialMemberArray);
    const indexOfCurrentBidder = initialMemberArray.indexOf(initialBidder);
    let newBidderIndex = indexOfCurrentBidder;
    if (initialMemberArray.length === indexOfCurrentBidder + 1) {
      newBidderIndex = 0;
    } else {
      newBidderIndex = indexOfCurrentBidder + 1;
    }
    setCurrentBidder(initialMemberArray[newBidderIndex]);
  };

  return (
    <div class="auction">
      <AuctionForm
        auctionMemberArray={auctionMemberArray}
        startAuctionFunction={startAuction}
      />
      <div>
        <div>Player: {player}</div>
        <div>Last Bidder: {lastBidder}</div>
        <div>Price: {price.toFixed(2)}</div>
      </div>
      <BidActions
        price={price}
        bidFunction={placeBid}
        skipFunction={skipBidder}
      />

      <div>
        {memberArray.map((member) => (
          <div class={currentBidder === member ? "current-bidder" : ""}>
            {member}
          </div>
        ))}
      </div>
    </div>
  );
};

const element = <Auction />;
ReactDOM.render(element, document.getElementById("root"));

