package unbeatables.hangmanbackend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

@RestController
public class HangmanController {
    /*
        List of Categories
     */
    //TODO: update to a dictionary of words and categories so getRandomCategory
    // can convert to getRandomWord which randomly selects a word from the category
    private List<String> _categories = new ArrayList<>();

    public HangmanController() {
        // Initialize the categories
        _categories.add("Companies");
        _categories.add("TV Shows");
        _categories.add("Candy");
        _categories.add("Cars");
        _categories.add("Books");
    }

    @GetMapping("api/time")
    public String time() {
        return "" + new Date() + "\n";
    }

    @GetMapping("api/categories")
    public List<String> categories() {
        return _categories;
    }

    // TODO: update to api/word and fix logic to randomly grab a category and a random word from it
    @GetMapping("api/category")
    public String getRandomCategory() {
        Random randomizer = new Random();
        return _categories.get(randomizer.nextInt(_categories.size()));
    }
}
