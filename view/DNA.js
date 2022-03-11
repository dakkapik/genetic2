function newChar() {
    // this is our range of probavilities 
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz. ';
    return characters.charAt(Math.floor(Math.random() * characters.length))
}

class DNA {
    // this would be the random heading on circle point
    constructor(num) {
        this.genes = []
        this.fitness = 0;
        for (let i = 0; i < num; i++){
            this.genes[i] = newChar();
        }
    }

    // get path
    getPhrase () {
        return this.genes.join("");
    }

    // returns fitness number based on target
    calcFitness(target) {
        let score = 0;
        for (let i = 0; i < this.genes.length; i++) {
            if(this.genes[i] == target[i]){
                score ++;
            }
        }
        this.fitness = score / target.length;
    }

    crossover (partner) {
        // parent mates with new child? lol
        let child = new DNA(this.genes.length);
        
        // were to splice
        let midpoint = Math.floor(Math.random() * this.genes.length);

        for(let i = 0; i < this.genes.length; i++){
            if(i > midpoint) child.genes[i] = this.genes[i];
            else child.genes[i] = partner.genes[i];
        }
        return child;
    }

    mutate(mutationRate) {
        for(let i = 0; i < this.genes.length; i++){
            if(Math.random() < mutationRate) {
                this.genes[i] = newChar();
            }
        }
    }
}