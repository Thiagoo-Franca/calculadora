class Calculadora {
    constructor() {
        this.num = '';

        const calculo = new Calculo();
        this.calculo = calculo;
        
        const display = new Display();
        this.display = display;
    }

    concatenarNumero(numero) {
        this.num += numero;
        this.display.adicionarAoDisplay(this.num)
    }

    limparNum () {
        this.num = "";
    }

    lerOperando(operando) {
        if (operando === '*'|| operando === "/") {
            this.calculo.incrementarMultDiv();
        }
        else if (operando === '+' || operando === '-') {
            this.calculo.incrementarSomasSub();
        }
    }

    operacao(operando) {
        this.lerOperando(operando);
        if (operando === "=" && this.calculo.lista.length === 0) {
            this.display.adicionarAoDisplay("Erro");
            return;
        }
        let numero_convertido = Number(this.num);
        
        this.calculo.lista.push(numero_convertido);
        this.limparNum();
        
        if (operando !== '=' ) {
            this.calculo.lista.push(operando);
        }
        
        this.display.adicionarAoDisplay(operando)
    
        if (operando === "=") {
            if (this.calculo.qnt_multdiv > 0) {
                while(this.calculo.qnt_multdiv > 0) {
                    this.calculo.resolverMultDiv(this.calculo.lista)
                }
            }
            if (this.calculo.qnt_simples > 0) {
                while(this.calculo.qnt_simples > 0) {
                    this.calculo.resolverSomasSub(this.calculo.lista)
                }
            }
    
            this.display.adicionarAoDisplay(this.calculo.lista[0])
            this.calculo.zerarConta();
        }        
    }    
}

document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (!isNaN(key)) {
        calculadora.concatenarNumero(key); // Para números
    }
    else if (key === '+' || key === '-' || key === '*' || key === '/') {
        calculadora.operacao(key); // Para operadores
    }
    else if (key === 'Enter') {
        calculadora.operacao('='); // Para igual
    }
});

class Calculo {
    constructor() {
        this.qnt_multdiv = 0; //multiplicacao e divisao
        this.qnt_simples = 0; //adicao e subtracao
        this.lista = [];
    }
    
    incrementarMultDiv () {
        this.qnt_multdiv += 1;
    }
    incrementarSomasSub() {
        this.qnt_simples += 1;
    }

    resetar() {
        this.lista = [];
        this.qnt_multdiv = 0;
        this.qnt_simples = 0;
        this.num = "";
        calculadora.display.adicionarAoDisplay("");
    }

    resolverSomasSub (lista) {
        for (let i=1; i<lista.length-1; i += 2) {
            if (lista[i] === "+") {
                lista[i-1] += lista[i+1]
                lista.splice(i,2)
                this.qnt_simples -= 1;
                return
            }
            else if(lista[i] === '-') {
                lista[i-1] -= lista[i+1]
                lista.splice(i,2)
                this.qnt_simples -= 1;
                return
            }
        }
    }

    resolverMultDiv(lista) {
        for (let i=1; i<lista.length-1; i += 2) {
            if (lista[i] === "*") {
                lista[i-1] = lista[i-1] * lista[i+1];
                lista.splice(i,2);
                this.qnt_multdiv -= 1;
                return
            }
            else if(lista[i] === "/" && lista[i+1] === 0) {
                    this.lista[0] = 0;
                    this.zerarConta()
                    return;
            }
            else if (lista[i] === "/") {
                lista[i-1] = lista[i-1] / lista[i+1];
                lista.splice(i,2);
                this.qnt_multdiv -= 1;
                return
            }
        }
        return null;   
    }

    zerarConta() {
        calculadora.num = this.lista[0]
        this.lista = []
        this.qnt_multdiv = 0;
        this.qnt_simples = 0;        
    }

}

class Display {
    constructor() {

    }
    adicionarAoDisplay(conta) {
        var mostra = document.getElementById("tela")
        mostra.textContent = conta;
    }
}


const calculadora = new Calculadora();
