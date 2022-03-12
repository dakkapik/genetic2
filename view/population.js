class Population {
    constructor (p, m, num) {
        this.population; //current population
        this.generations = 0; // number of generations passed
        this.finished = false; // done?
        this.target = p; 
        this.mutationRate = m;
        this.perfectScore = 1;

        this.best = "";

        this.population = [];

        // num = length of population
        for(let i = 0; i < num; i ++) {
            this.population[i] = new DNA(this.target.length)
        }

        this.calcFitness();
    }

    calcFitness () {
        for(let i = 0; i < this.population.length; i ++) {
            this.population[i].calcFitness(target)
        }
    }

    generate () {
        // this should be oposite for to calculate the least number, or calculate most cells covered?
        let fitnessSum = 0
        for(let i = 0; i < this.population.length; i++){
            fitnessSum += this.population[i].fitness
        }

        this.population = this.population.sort((a, b) => (a.fitness <= b.fitness) ? 1 : -1)

        let newPopulation = [];
        
        //add inmortals here
        // this.population - inmortal num
        for(let i = 0; i < this.population.length; i++){
            const partnerA = this.naturalSelection(fitnessSum)
            const partnerB = this.naturalSelection(fitnessSum)
            let child = partnerA.crossover(partnerB)
            child.mutate(this.mutationRate)
            newPopulation[i] = child
        }

        this.population = newPopulation;
        this.generations ++;
    }

    naturalSelection(fitnessSum){
        let naturalSelector = Math.random() * fitnessSum
        
        for(let i = 0; i < this.population.length; i++){
            fitnessSum -= this.population[i].fitness
            if(fitnessSum  < naturalSelector){
                return this.population[i]

            }
        }
    }

    getBest() {
        return this.best;
    }

    evaluate () {
        let worldrecord = 0.0;
        let index = 0;
        for(let i = 0; i < this.population.length; i++) {
            if(this.population[i].fitness > worldrecord){
                index = i;
                worldrecord = this.population[i].fitness;
            }
        }
        this.best = this.population[index].getPhrase();
        if(worldrecord >= this.perfectScore) {
            this.finished = true;
        }
    }

    isFinished() {
        return this.finished;
    }

    getGenerations() {
        return this.generations;
    }

    getAverageFitness () {
        let total = 0;
        for (let i = 0; i < this.population.length; i ++) {
            total += this.population[i].fitness;
        }
        return total/this.population.length;
    }

    allPhrases() {
        let everything = "";
        let displayLimit = Math.min(this.population.length, 50);

        for(let i = 0; i < displayLimit; i ++) {
            everything += this.population[i].getPhrase() + "<br>";
        }
        return everything; 
    }

}