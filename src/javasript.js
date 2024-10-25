let num = "";
let lista = [];
qnt_multdiv = 0;
qnt_simples = 0; //adicao e subtracao


function adicionar_ao_display(conta) {
    var mostra = document.getElementById("tela")
    mostra.textContent = conta;

}

function concatenar_numero(numero) {
    num += numero;
    adicionar_ao_display(num)

}

function operacao(operando)  {
    if (operando === '*'|| operando === "/") {
        qnt_multdiv += 1;
    }
    else if (operando === '+' || operando === '-') {
        qnt_simples += 1;
    }
    let numero_convertido = Number(num);
    lista.push(numero_convertido);
    num = "";
    if (operando !== '=' ) {
        lista.push(operando);
    }
    
    adicionar_ao_display(operando)

    if (operando === "=") {
        if (qnt_multdiv > 0) {
            while(qnt_multdiv > 0) {
                verificar_multdiv(lista)
            }
        }
        if (qnt_simples > 0) {
            while(qnt_simples > 0) {
                resolver_simples(lista)
            }
        }

        adicionar_ao_display(lista[0])
        num = lista[0]
        lista = []
        qnt_multdiv = 0;
        qnt_simples = 0;        
    }
        
    }

function verificar_multdiv(lista) {
        for (let i=1; i<lista.length-1; i += 2) {
            if (lista[i] === "*") {
                lista[i-1] = lista[i-1] * lista[i+1];
                lista.splice(i,2);
                qnt_multdiv -= 1;
                return
            }
            else if(lista[i] === "/") {
                lista[i-1] = lista[i-1] / lista[i+1];
                lista.splice(i,2);
                qnt_multdiv -= 1;
                return
            }
        }   
    }
    
    function resolver_simples (lista) {
        for (let i=1; i<lista.length-1; i += 2) {
            if (lista[i] === "+") {
                lista[i-1] += lista[i+1]
                lista.splice(i,2)
                qnt_simples -= 1;
                return
            }
            else if(lista[i] === '-') {
                lista[i-1] -= lista[i+1]
                lista.splice(i,2)
                qnt_simples -= 1;
                return
            }
        }
    }
    
function resetar() {
    lista = []
    qnt_multdiv = 0;
    qnt_simples = 0;
    num = ""
    adicionar_ao_display("")

}


document.addEventListener('keydown', function(event) {
    const key = event.key;
    // Verifica se a tecla pressionada é um número ou um operador
    if (!isNaN(key)) {
        concatenar_numero(key); // Para números
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        operacao(key); // Para operadores
    } else if (key === 'Enter') {
        operacao('='); // Para igual
    }
});
