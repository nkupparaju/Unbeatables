import React, {Component} from 'react';
import Keyboard from 'react-simple-keyboard';
import hangman from './hangman.png'
import './App.css';
import 'react-simple-keyboard/build/css/index.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
          message: "",
          category: "",
          word: "",
          lettersGuessed: []
        };
    }

    onKeyPress = (button) => {
      console.log("Button pressed", button);
      this.setState(state => {
        const lettersGuessed = state.lettersGuessed.concat(button);
        return {
          lettersGuessed
        };
      });
    }

    componentDidMount() {
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
              this.setState({word: response[category]});
            })
    }

    render() {
        return (
          <div className="App">
            <header className="App-header">
              <h4>Welcome to Unbeatables Hangman!</h4>
            </header>
            <div className="Category-Section">
              <p className="Category">Category: {this.state.category}</p>
            </div>
            <div className="Hangman-Section">
              {/*TODO: we will want to alternate the picture based on how many wrong guesses
                       a user has, i.e. hangman-1=HEAD, hangman-2=HEAD+BODY, etc
                       will also need to append Letters Guessed
               */}
              <img src={hangman} alt="Hangman"/>
            </div>
            <div className="Letters-Guessed-Section">
              <span className="Letters-Guessed">Letters guessed -> {this.state.lettersGuessed.join(", ")}</span>
            </div>
            <div className="Word-Section">
              {/*TODO: replace with blanks from random word returned from server */}
              Word: {this.state.word}
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
                onKeyPress={button =>
                  this.onKeyPress(button)}
                physicalKeyboardHighlight={true}
              />
            </div>
          </div>
        );
    }
}

export default App;
