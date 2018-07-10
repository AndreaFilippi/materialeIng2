class Food {
    
        constructor (name) {
            this.name = name;
        }
    
        print () {
          console.log(this.name);
        }
}

var istanza = new Food("ciao");
istanza.print();