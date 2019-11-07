import React, {Component} from 'react';
import unbeatables from './unbeatables.jpg';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
          message: "",
          categories: [],
          category: ""
        };
    }

    componentDidMount() {
        setInterval(this.getServerTime, 250);
        this.getCategories();
        this.getRandomCategory();
    }

    getServerTime = () => {
        fetch('/api/time')
            .then(response => response.text())
            .then(message => {
                this.setState({message: message});
            });
    }

    getCategories = () => {
      fetch("api/categories")
            .then(response => response.text())
            .then(categories => {
              this.setState({categories: categories});
            });
    }

    // TODO: update to api/word when backend logic has been updated with dictionary
    getRandomCategory = () => {
      fetch("api/category")
            .then(response => response.text())
            .then(category => {
              this.setState({category: category});
            });
    }

    render() {
        return (
          <div className="App">
            <header className="App-header">
              <h1> Welcome to Unbeatables Hangman!</h1>
              <img src={unbeatables} className="App-logo" />
              <h3>List of word categories on the server: {this.state.categories}</h3>
              <h3>Random category from the server: {this.state.category}</h3>
              <h3>Time at the Java Rest API: {this.state.message}</h3>
            </header>
          </div>
        );
    }
}

export default App;
