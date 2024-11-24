class Calculadora {
    constructor() {
        this.num = ''; //ler numero de entrada e concatenar
        this.historico = ''; //historico da conta

        //uma calculadora tem uma funcao de calcular
        const calculo = new Calculo();
        this.calculo = calculo;
        
        //uma calculadora tem um display
        const display = new Display();
        this.display = display;
    }
    
    limparNum () {
        this.num = "";
        return;
    }

    apagarNumero() {
            this.num = this.num.slice(0, -1)
            this.historico = this.historico.slice(0, -1)
            this.display.atualizarDisplay(this.num, this.historico)
            return
    }
        
    lerOperando(operando) {
            if (operando === '*'|| operando === "/") {
                return this.calculo.incrementarMultDiv();
            }
            else if (operando === '+' || operando === '-') {
                return this.calculo.incrementarSomasSub();
            }
    }
    
    concatenarNumero(numero) {
        if (this.calculo.lista.length === 1 && this.num === "") {
            this.historico = ""; 
            this.calculo.lista = [];
        }

        if (numero === '.' && this.num.includes('.')) {
            return;
        } //verifica se tem apenas um '.' na operacao

        this.num += numero;
        this.historico += numero
        this.display.atualizarDisplay(this.num, this.historico)
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
        
        this.historico += " " + operando + " ";
        this.display.atualizarDisplay(operando, this.historico)
    
        if (operando === "=") {
            this.calculo.realizarConta()
        }
    }        
}    


class Calculo {
    constructor() {
        this.qntMultDiv = 0; //multiplicacao e divisao
        this.qntSomasSub = 0; //adicao e subtracao
        this.lista = [];
        this.resultado = 0;
    }
    
    realizarConta() {
        
        while(this.qntMultDiv > 0) {
            this.resolverMultDiv(this.lista)
        }
        while(this.qntSomasSub > 0) {
            this.resolverSomasSub(this.lista)
        }
        this.resultado = this.lista[0]
        calculadora.display.atualizarDisplay(this.resultado, calculadora.historico)
        this.zerarConta();
    }
    
    incrementarMultDiv () {
        this.qntMultDiv += 1;
    }
    incrementarSomasSub() {
        this.qntSomasSub += 1;
    }
    
    zerarConta() { //chamada ao finalizar uma conta
        calculadora.num = this.resultado
        calculadora.historico = calculadora.num
        this.lista = []
        this.qntMultDiv = 0;
        this.qntSomasSub = 0;    
    }

    resetar() { //chamada pelo botao C para limpar a conta
        this.lista = [];
        this.qntMultDiv = 0;
        this.qntSomasSub = 0;
        calculadora.historico = ""
        calculadora.num = "";
        calculadora.display.limparTela()
    }

    resolverSomasSub (lista) {
        for (let i=1; i<lista.length-1; i += 2) {
            if (lista[i] === "+") {
                lista[i-1] += lista[i+1]
                lista.splice(i,2)
                this.qntSomasSub -= 1;
                return
            }
            else if(lista[i] === '-') {
                lista[i-1] -= lista[i+1]
                lista.splice(i,2)
                this.qntSomasSub -= 1;
                return
            }
        }
    }

    resolverMultDiv(lista) {
        for (let i=1; i<lista.length-1; i += 2) {
            if (lista[i] === "*") {
                lista[i-1] = lista[i-1] * lista[i+1];
                lista.splice(i,2);
                this.qntMultDiv -= 1;
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
                this.qntMultDiv -= 1;
                return
            }
        }
        return null;   
    }

}

class Display {
    constructor() {
    }
    adicionarAoDisplay(conta) {
        var mostra = document.getElementById("resultado")
        mostra.textContent = conta;
        return
    }
    adicionarAoHistorico(simbolos) {
        var mostra = document.getElementById("historico");
        mostra.textContent = simbolos
        return
    }
    limparTela() {
        var mostra = document.getElementById("resultado")
        var mostra1 = document.getElementById("historico")

        mostra.textContent = " ";
        mostra1.textContent = " ";
    }

    atualizarDisplay(item1, item2) {
        this.adicionarAoDisplay(item1)
        this.adicionarAoHistorico(item2)
        return;
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
    else if (key === '.') {
        calculadora.concatenarNumero(key)
    }
    else if (key === "Backspace") {
        calculadora.apagarNumero();
    }
});

const calculadora = new Calculadora();
