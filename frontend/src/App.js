import React, {Component} from 'react';
import Keyboard from 'react-simple-keyboard';
import './App.css';
import 'react-simple-keyboard/build/css/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const IMAGES = {
  hangman0: require('./images/hangman0.png'),
  hangman1: require('./images/hangman1.png'),
  hangman2: require('./images/hangman2.png'),
  hangman3: require('./images/hangman3.png'),
  hangman4: require('./images/hangman4.png'),
  hangman5: require('./images/hangman5.png'),
  hangman6: require('./images/hangman6.png')
}

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
          message: "",
          category: "",
          blankedWord: [],
          correctWord: "",
          lettersGuessed: [],
          incorrectGuesses: 0
        };
    }

    getHangmanImage = () => {
      return IMAGES[this.state.incorrectGuesses];
    }

    checkIfLetterHasBeenGuessed = (letter) => {
      if (this.state.lettersGuessed.includes(letter)) {
        // TODO: replace with react bootstrap modal
        alert(letter + " has been guessed already!");
      }
      else {
        if (this.state.correctWord.includes(letter)) {
          var indices = [];
          var blankedWordCopy = this.state.blankedWord;
          for (var i=0; i < this.state.correctWord.length; i++) {
            if (this.state.correctWord[i] === letter) {
              indices.push(i);
            }
          }
          for (var i=0; i < indices.length; i++) {
            blankedWordCopy[indices[i]] = letter;
          }
          this.setState({blankedWord: blankedWordCopy});
        }
        else {
          this.setState({incorrectGuesses: this.state.incorrectGuesses += 1})
          if (this.state.incorrectGuesses == 6) {
            // TODO: replace with react bootstrap modal
            if (window.confirm("Game Over!! Starting a new game...")) {
              setTimeout(window.location.reload(), 5000);
            }
            else {
              setTimeout(window.location.reload(), 5000);
            }
          }
        }
        this.setState(state => {
          const lettersGuessed = state.lettersGuessed.concat(letter);
          return {
            lettersGuessed
          };
        });
        if (this.checkWinCondition()) {
          // TODO: replace with react bootstrap modal
          if (window.confirm("You won!! Starting a new game...")) {
            window.location.reload();
          }
          else {
            window.location.reload();
          }
        }
      }
    }

    checkWinCondition = () => {
      if (!this.state.blankedWord.includes("_")) {
        return true;
      }
      return false;
    }

    componentDidMount = () => {
        setInterval(this.getServerTime, 250);
        this.getRandomCategoryAndWord();
    }

    getServerTime = () => {
        fetch('/api/time')
            .then(response => response.text())
            .then(message => {
                this.setState({message: message});
            });
    }

    getRandomCategoryAndWord = () => {
      fetch("api/getRandomCategoryAndWord")
            .then(response => response.text())
            .then(categoryAndWord => {
              let response = JSON.parse(categoryAndWord);
              let category = Object.keys(response)[0];
              console.log("Category is: " + category);
              this.setState({category: category});
              console.log("Word is: " + response[category]);
              this.setState({correctWord: response[category]});
              this.blankWord(response[category]);
            })
    }

    blankWord = (word) => {
      var blankedWordArray = [];
      for (var i = 0; i < word.length; i++) {
        blankedWordArray[i] = "_";
      }
      this.setState({blankedWord: blankedWordArray});
    }

    render() {
        return (
          <div className="App">
            <header className="App-header">
              <h4>Welcome to Unbeatables Hangman!</h4>
            </header>
            <div className="Category-Section">
              <p className="Category">Category: <b>{this.state.category}</b></p>
              <p className="GuessesRemaining">Guesses Remaining: {6 - this.state.incorrectGuesses}</p>
              <p className="IncorrectGuesses">Incorrect Guesses: {this.state.incorrectGuesses}</p>
            </div>
            <div className="Hangman-Section">
              <img src={IMAGES['hangman' + this.state.incorrectGuesses]} alt="Hangman"/>
            </div>
            <div className="Letters-Guessed-Section">
              <span className="Letters-Guessed">Letters guessed -> {this.state.lettersGuessed.join(", ")}</span>
            </div>
            <div className="Word-Section">
              Word: {this.state.blankedWord.join(' ')}
            </div>
            <div className="Keyboard">
              <Keyboard
                layout={{
                  'default': [
                    'Q W E R T Y U I O P',
                    'A S D F G H J K L',
                    'Z X C V B N M'
                  ]
                }}
                onKeyReleased={button =>
                  this.checkIfLetterHasBeenGuessed(button)}
                physicalKeyboardHighlight={true}
                physicalKeyboardHighlightBgColor={"#09d3ac"}
              />
            </div>
          </div>
        );
    }
}

export default App;
