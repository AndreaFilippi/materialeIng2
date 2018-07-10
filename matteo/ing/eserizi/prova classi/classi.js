

function Ambiente_luce(valll){
    this.val = valll
  }
  // class methods
  Ambiente_luce.prototype.crea_ascolto = function(){
    console.log(this.val);
};

var istanza = new Ambiente_luce("ciao");
console.log(istanza.crea_ascolto());