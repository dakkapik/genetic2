class Population {
    constructor (p, m, num) {
        this.population; //current population
        this.matingPool; //ArrayList for mating
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

        this.matingPool = [];
        this.calcFitness();
    }

    calcFitness () {
        for(let i = 0; i < this.population.length; i ++) {
            this.population[i].calcFitness(target)
        }
    }

    generate () {
        // this should be oposite for to calculate the least number, or calculate most cells covered?
        let maxFitness = 0;
        for(let i = 0; i < this.population.length; i ++) {
            if(this.population[i].fitness > maxFitness) { 
                maxFitness = this.population[i].fitness;
            }
        }
        
        let newPopulation = [];
        for(let i = 0; i < this.population.length; i++) {
            let partnerA = this.acceptReject(maxFitness);
            let partnerB = this.acceptReject(maxFitness);
            let child = partnerA.crossover(partnerB);
            child.mutate(this.mutationRate);
            newPopulation[i] = child;
        }

        this.population = newPopulation;
        this.generations++;
    }

    acceptReject(maxFitness){
        let besafe = 0
        while (true) {
            let index = Math.floor(Math.random() * this.population.length);
            let partner = this.population[index];
            let r = Math.random() * maxFitness;
            // console.log("PARTNER FITNESS: ", partner.fitness)
            // console.log("FITNESS BENCHMARK: ", r)
            if(r < partner.fitness){
                return partner
            }

            besafe++;
            if(besafe > 10000) {
                console.error("partner not found")
                return null
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