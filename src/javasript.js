class Calculadora {
    constructor() {
        this.num = '';
        this.aritimetica = '';

        const calculo = new Calculo();
        this.calculo = calculo;
        
        const display = new Display();
        this.display = display;
    }

    concatenarNumero(numero) {
        if (this.calculo.lista.length === 1 && this.num === "") {
            this.aritimetica = ""; 
            this.calculo.lista = [];
        }
        if (numero === '.' && this.num.includes('.')) {
            return;
        }
        this.num += numero;
        this.aritimetica += numero
        this.display.adicionarAoDisplay(this.num)
        this.display.adicionarAoHistorico(this.aritimetica)
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
        this.aritimetica += operando
        this.display.adicionarAoHistorico(this.aritimetica)
    
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
            this.aritimetica = this.calculo.lista[0];
            this.calculo.zerarConta();
            this.display.adicionarAoHistorico(this.aritimetica)
        }        
    }    
}

document.addEventListener('keydown', function(event) {
    const key = event.key;
    if (!isNaN(key)) {
        calculadora.concatenarNumero(key); // Para números
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        calculadora.operacao(key); // Para operadores
    } else if (key === 'Enter') {
        calculadora.operacao('='); // Para igual
    }
    else if (key == '.') {
        calculadora.concatenarNumero(key)
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
        calculadora.aritimetica = ""
        this.num = "";
        calculadora.display.limparTela()
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
        return
    }
    adicionarAoHistorico(simbolos) {
        var mostra = document.getElementById("conta");
        mostra.textContent = simbolos
        return
    }
    limparTela() {
        var mostra = document.getElementById("tela")
        var mostra1 = document.getElementById("conta")

        mostra.textContent = " ";
        mostra1.textContent = " ";

    }
}


const calculadora = new Calculadora();
