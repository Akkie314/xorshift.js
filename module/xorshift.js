/*
* Xorshift JavasScript Library
* 
* Copyright OpenJS Foundation and other contributors
* Rekeased under MIT license
*
* Date : 2024/06/29
*/

export class Random {
    constructor(seed) {
        if (typeof seed !== "number" || isNaN(seed) || !isFinite(seed)) {
            seed = Math.floor(Math.random() * 0xFFFFFFFF);
        }
        this.seed = seed >>> 0;
    }

    random(seed) { 
        let x = 0
        
        // シードの型チェック
        if ( typeof seed === 'number' ) x = seed;
        else if ( seed === undefined ) x = this.seed;
        else {
            throw new TypeError('Seed must be a number or undefined')
        }

        // xorshift
        x ^= x << 13;
        x ^= x >> 17;
        x ^= x << 5;

        if ( typeof seed !== "number" ) {
            this.seed = x >>> 0;
            return (this.seed >>> 0) / 0xFFFFFFFF
        } else {
            return ((x >>> 0) >>> 0) / 0xFFFFFFFF
        }
    }

    randInt(min,max,seed) {
        if ( min >= max ) throw new RangeError("min must be less than or equal to max");
        if ( typeof min !== "number" ) throw new RangeError("min must be a number");
        if ( typeof max !== "number" ) throw new RangeError("max must be a number");
        return Math.floor((this.random(seed) * (max - min + 1) )+ min)
    }
}
