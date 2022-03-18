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