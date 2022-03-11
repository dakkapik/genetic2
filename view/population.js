class Population {
    constructor (p, m, num) {
        this.population;
        this.matingPool;
        this.generations = 0;
        this.finished = false; 
        this.target = p;
        this.mutationRate = m;
        this.perfectScore = 1;

        this.best = "";

        this.population = [];

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

    naturalSelection () {
        this.matingPool = [];

        let maxFitness = 0;
        for(let i = 0; i < this.population.length; i ++) {
            maxFitness = this.population[i].fitness;
        }

        for(let i = 0; i < this.population.length; i++) {
            // scale from this.population[i].fitness 
            // 0 > maxfitness
            // 0 > 1 
            console.log(this.population[i])
            
            const power = this.population[i].fitness.toString().length
            const divider = Math.pow(10, power)
            
            let fitness = this.population[i].fitness / divider
            console.log("fitness: ",fitness)
            
            
            let n = Math.round(fitness * 100);

            for (let j = 0; j < n; j++) {
                this.matingPool.push(this.population[i]);
            }
        }

    }

    generate () {
        for(let i = 0; i < this.population.length; i++){
            let a = Math.floor(Math.random(this.matingPool.length));
            let b = Math.floor(Math.random(this.matingPool.length));
            console.log(b)
            let partnerA = this.matingPool[a];
            let partnerB = this.matingPool[b];
            let child = partnerA.crossover(partnerB);
            child.mutate(this.mutationRate);
            this.population[i] = child;
        }
        this.generations ++;
    }

    getBest() {
        return this.best;
    }

    evaluate () {
        let worldrecord = 0.0;
        let index = 0;
        for(let i = 0; i < this.population.length; i++) {
            index = i;
            worldrecord = this.population[i].fitness;
        }

        this.best = this.population[index].getPhrase();
        if(worldrecord === this.perfectScore) {
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
        let displayLimit = min(this.population.length, 50);

        for(let i = 0; i < displayLimit; i ++) {
            everything += this.population[i].getPhrase() + "<p>";
        }
        return everything; 
    }

}