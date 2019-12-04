import React, {Component} from 'react';
import Keyboard from 'react-simple-keyboard';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
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
          incorrectGuesses: 0,
          shouldShowWinModal: false,
          shouldShowLetterGuessedModal: false,
          shouldShowLoseModal: false,
          previousLetterGuessed: ""
        };
    }

    getHangmanImage = () => {
      return IMAGES[this.state.incorrectGuesses];
    }

    checkIfLetterHasBeenGuessed = (letter) => {
      if (this.state.lettersGuessed.includes(letter)) {
        this.setState({previousLetterGuessed: letter});
        this.handleLetterGuessedModalShow();
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
            this.handleLoseModalShow();
          }
        }
        this.setState(state => {
          const lettersGuessed = state.lettersGuessed.concat(letter);
          return {
            lettersGuessed
          };
        });
        if (this.checkWinCondition()) {
          this.handleWinModalShow();
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
              this.setState({category: category});
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

    handleWinModalShow = () => {
      this.setState({shouldShowWinModal: true});
    }

    handleWinModalClose = () => {
      this.setState({shouldShowWinModal: false});
      window.location.reload();
    }

    handleLoseModalShow = () => {
      this.setState({shouldShowLoseModal: true});
    }

    handleLoseModalClose = () => {
      this.setState({shouldShowLoseModal: false});
      window.location.reload();
    }

    handleLetterGuessedModalShow = () => {
      this.setState({shouldShowLetterGuessedModal: true});
    }

    handleLetterGuessedModalClose = () => {
      this.setState({shouldShowLetterGuessedModal: false});
    }

    render() {
        return (
          <>
            <div id="outter">
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
              <div id="inner_remaining" />
            </div>

            <Modal 
              show={this.state.shouldShowWinModal} 
              onHide={this.handleWinModalClose}
              size="sm"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Congratulations!</Modal.Title>
              </Modal.Header>
              <Modal.Body>You won!!</Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={this.handleWinModalClose}>
                  Start New Game
                </Button>
                <Button variant="secondary" onClick={this.handleWinModalClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal 
              show={this.state.shouldShowLoseModal} 
              onHide={this.handleLoseModalClose}
              size="sm"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Sorry!</Modal.Title>
              </Modal.Header>
              <Modal.Body>You Lose!! The word was <b>{this.state.correctWord}</b></Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={this.handleLoseModalClose}>
                  Start New Game
                </Button>
                <Button variant="secondary" onClick={this.handleLoseModalClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal 
              show={this.state.shouldShowLetterGuessedModal} 
              onHide={this.handleLetterGuessedModalClose}
              size="sm"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Oops!</Modal.Title>
              </Modal.Header>
              <Modal.Body><b>{this.state.previousLetterGuessed}</b> has been guessed already, try again!</Modal.Body>
              <Modal.Footer>
                <Button variant="primary" onClick={this.handleLetterGuessedModalClose}>
                  OK
                </Button>
                <Button variant="secondary" onClick={this.handleLetterGuessedModalClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </>
        );
    }
}

export default App;
