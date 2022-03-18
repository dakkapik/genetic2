// Shakespeare
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/nrKjSeoc7fc
// https://thecodingtrain.com/more/achive/nature-of-code/9-genetic-algorithms/9.3-shakespeare-monkey-example.html
// https://editor.p5js.org/codingtrain/sketches/GUZKUFxKo

// http://natureofcode.com

// Genetic Algorithm, Evolving Shakespeare

// Demonstration of using a genetic algorithm to perform a search

// setup()
//  # Step 1: The Population
//    # Create an empty population (an array or ArrayList)
//    # Fill it with DNA encoded objects (pick random values to start)

// draw()
//  # Step 1: Selection
//    # Create an empty mating pool (an empty ArrayList)
//    # For every member of the population, evaluate its fitness based on some criteria / function,
//      and add it to the mating pool in a manner consistant with its fitness, i.e. the more fit it
//      is the more times it appears in the mating pool, in order to be more likely picked for reproduction.

//  # Step 2: Reproduction Create a new empty population
//    # Fill the new population by executing the following steps:
//       1. Pick two "parent" objects from the mating pool.
//       2. Crossover -- create a "child" object by mating these two parents.
//       3. Mutation -- mutate the child's DNA based on a given probability.
//       4. Add the child object to the new population.
//    # Replace the old population with the new population
//
//   # Rinse and repeat

let target;
let popmax;
let mutationRate;
let population;
let stats;
let done = false;


setUp();

const interval = setInterval(() => {
    //Create next generation
    population.generate();
    // Calculate fitness
    population.calcFitness();
    
    population.evaluate();
    
    // If we found the target phrase, stop
    if (population.isFinished()) {
      console.log("DONE")
      clearInterval(interval)
    }
    
    displayInfo();
}, 50)


function setUp () {
    // target = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores vel ex, odit porro a quaerat at cupiditate commodi ratione repudiandae impedit veritatis in? Soluta hic dignissimos nemo! Odio, ipsam libero!";
    target = "To be or nor to be."
    popmax = 2000;
    mutationRate = 0.01;
    //POPULATION AMOUNT INCREASES SPEED
    
    population = new Population(target, mutationRate, popmax);
    
    //Create next generation
    population.generate();
    // Calculate fitness
    population.calcFitness();
    
    population.evaluate();
    
    // If we found the target phrase, stop
    if (population.isFinished()) {
      console.log("DONE")
      clearInterval(interval)
    }
    
    displayInfo();
}

function displayInfo() {
  // Display current status of population
    let answer = population.getBest();

    document.getElementById("best-phrase").innerHTML = answer;
    document.getElementById("target").innerHTML = target;
    
    document.getElementById("current-gen").innerHTML = population.getGenerations()
    document.getElementById("average-fitness").innerHTML = population.getAverageFitness()
    document.getElementById("total-population").innerHTML = popmax
    document.getElementById("mutation-rate").innerHTML = Math.floor(mutationRate * 100) + "%"
    
    // document.getElementById("stats").innerHTML = statstext;
    document.getElementById("all-phrases-container").innerHTML = "All phrases:<br>" + population.allPhrases()
}