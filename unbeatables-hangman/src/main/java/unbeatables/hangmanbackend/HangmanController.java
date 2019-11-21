package unbeatables.hangmanbackend;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
public class HangmanController {

    private Map _wordDictionary = new HashMap<String, List<String>>();

    public HangmanController() {
        // TODO: make more categories: food, nature, etc
        PopulateAnimals(_wordDictionary);
        PopulateFoods(_wordDictionary);
        PopulateSports(_wordDictionary);
    }

    @GetMapping("api/time")
    public String time() {
        return "" + new Date() + "\n";
    }

    @GetMapping("api/getRandomCategoryAndWord")
    public Map<String, String> GetRandomCategoryAndWord() {
        Map<String, String> randomCategoryAndWord = new HashMap<String, String>();
        Object[] dictCategories = _wordDictionary.keySet().toArray();
        String randomCategory = (String) dictCategories[new Random().nextInt(dictCategories.length)];
        List<String> words = (List<String>) _wordDictionary.get(randomCategory);
        String randomWord = words.get(new Random().nextInt(words.size()));
        randomCategoryAndWord.put(randomCategory, randomWord);
        return randomCategoryAndWord;
    }

    private void PopulateAnimals(Map wordDictionary){
        List<String> animals = new ArrayList<String>(
                Arrays.asList("ALLIGATOR", "ANT", "BEAR", "BEE", "BIRD", "CAMEL", "CAT", "CHEETAH", "CHICKEN",
                              "CHIMPANZEE", "COW", "CROCODILE", "DEER", "DOG", "DOLPHIN", "DUCK", "EAGLE", "ELEPHANT",
                              "FISH", "FLY", "FOX", "FROG", "GIRAFFE", "GOAT", "GOLDFISH", "HAMSTER", "HORSE", "KANGAROO",
                              "KITTEN", "LION", "LOBSTER", "MONKEY", "OCTOPUS", "OWL", "PANDA", "PIG", "PUPPY", "RABBIT",
                               "RAT", "SCORPION", "SEAL", "SHARK", "SHEEP", "SNAIL", "SNAKE", "SPIDER", "SQUIRREL", "TIGER",
                               "TURTLE", "WOLF", "ZEBRA")
        );
        wordDictionary.put("Animals", animals);
    }

    private void PopulateFoods(Map wordDictionary){
        List<String> foods = new ArrayList<String>(
                Arrays.asList("ANCHOVY", "AVOCADO", "ASPARAGUS", "APRICOT", "BACON", "BERRY", "BEEF", "BLUEBERRY", "BROWNIE",
                        "CAKE", "CARROT", "CELERY", "DOUGH", "DATES", "CRAB", "COOKIE", "FLOUR", "GRANOLA",
                        "GRAPE", "GRAPEFRUIT", "JACKFRUIT", "LASAGNA", "LEMON", "MACARONI", "MOZZARELLA", "MEATBALL", "MANGO", "OATMEAL",
                        "PEPPERONI", "PIE", "PEA", "PANCAKE", "PINEAPPLE", "PUDDING", "SPINACH", "SALAD", "SUSHI", "TACO",
                        "TOMATO", "VENISON", "WATERMELON", "WAFFLE", "WALNUT", "YAM", "YOGURT", "ZUCCHINI", "TOAST", "STEAK",
                        "SALAMI", "PEACH", "PASTA")
        );
        wordDictionary.put("Foods", foods);
    }

    private void PopulateSports(Map wordDictionary){
        List<String> sports = new ArrayList<String>(
                Arrays.asList("ARCHERY", "BADMINTON", "CRICKET", "BOWLING", "BOXING", "CURLING", "TENNIS", "SKATEBOARDING", "SURFING",
                              "HOCKEY", "YOGA", "FENCING", "FITNESS", "GYMNASTICS", "KARATE", "VOLLEYBALL", "WEIGHTLIFTING", "BASKETBALL",
                              "BASEBALL", "RUGBY", "WRESTLING", "CYCLING", "RUNNING", "FISHING", "JUDO", "CLIMBING", "BILLIARDS", "SHOOTING",
                              "GOLF", "FOOTBALL", "SOCCER", "CRICKET")
        );
        wordDictionary.put("Sports", sports);
    }
}
