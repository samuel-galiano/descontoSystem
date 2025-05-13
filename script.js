window.onload = () => {
    // Preenche dropdown de parcelas (1 a 12)
    const select = document.getElementById("parcelas");
    if (select) {
        for (let i = 1; i <= 12; i++) {
            const option = document.createElement("option");
            option.value = i;
            option.textContent = `${i}x`;
            select.appendChild(option);
        }
    }
};

function trocarAba(aba, event) {
    const tabs = document.querySelectorAll(".tab-content");
    const buttons = document.querySelectorAll(".tab-buttons button");

    tabs.forEach(tab => tab.classList.remove("active"));
    buttons.forEach(btn => btn.classList.remove("active"));

    document.getElementById("aba-" + aba).classList.add("active");
    event.target.classList.add("active");
}

function calcularTroco() {
    const total = parseFloat(document.getElementById("valorTotal").value);
    const pago = parseFloat(document.getElementById("valorPago").value);
    const resultado = document.getElementById("resultadoTroco");

    if (isNaN(total) || isNaN(pago)) {
        resultado.innerHTML = "Por favor, preencha os dois campos.";
        resultado.style.background = "#f8d7da";
        resultado.style.color = "#721c24";
        return;
    }

    if (pago < total) {
        resultado.innerHTML = "Valor pago é insuficiente.";
        resultado.style.background = "#f8d7da";
        resultado.style.color = "#721c24";
        return;
    }

    const troco = +(pago - total).toFixed(2);
    const detalhesTroco = calcularNotasTroco(troco);

    resultado.style.background = "#e9f7ef";
    resultado.style.color = "#155724";
    resultado.innerHTML = `
      <p><strong>Troco: R$ ${troco.toFixed(2)}</strong></p>
      <p>Entregar ao cliente:</p>
      ${detalhesTroco}
    `;
}

function calcularNotasTroco(valor) {
    const cedulas = [
        { nome: "Nota R$ 100", valor: 100 },
        { nome: "Nota R$ 50", valor: 50 },
        { nome: "Nota R$ 20", valor: 20 },
        { nome: "Nota R$ 10", valor: 10 },
        { nome: "Nota R$ 5", valor: 5 },
        { nome: "Nota R$ 2", valor: 2 },
        { nome: "Moeda R$ 1", valor: 1 },
        { nome: "Moeda R$ 0,50", valor: 0.5 },
        { nome: "Moeda R$ 0,25", valor: 0.25 },
        { nome: "Moeda R$ 0,10", valor: 0.10 },
        { nome: "Moeda R$ 0,05", valor: 0.05 },
        // { nome: "R$ 0,01", valor: 0.01 },
    ];

    let restante = valor;
    let resultado = `<div class="troco-lista">`;

    for (const item of cedulas) {
        const qtd = Math.floor(restante / item.valor);
        if (qtd > 0) {
            resultado += `
          <div class="troco-item">${qtd}x</div>
          <div class="troco-item">${item.nome}</div>
        `;
            restante = +(restante - qtd * item.valor).toFixed(2);
        }
    }

    resultado += "</div>";
    return resultado;
}

function calcularDesconto() {
    const original = parseFloat(document.getElementById("valorOriginal").value);
    const pagoPorMes = parseFloat(document.getElementById("valorFinal").value);
    const parcelas = parseInt(document.getElementById("parcelas").value);
    const resultado = document.getElementById("resultadoDesconto");

    if (isNaN(original) || isNaN(pagoPorMes)) {
        resultado.innerHTML = "Preencha os dois campos.";
        resultado.style.background = "#f8d7da";
        resultado.style.color = "#721c24";
        return;
    }

    const totalPago = pagoPorMes * parcelas;

    if (totalPago > original) {
        resultado.innerHTML = `
        O valor total pago (${parcelas}x R$ ${pagoPorMes.toFixed(2)} = R$ ${totalPago.toFixed(2)})
        é maior que o valor original (R$ ${original.toFixed(2)}).
      `;
        resultado.style.background = "#fff3cd";
        resultado.style.color = "#856404";
        return;
    }

    const desconto = (original - totalPago).toFixed(2);
    const percentual = ((desconto / original) * 100).toFixed(2);

    resultado.style.background = "#e9f7ef";
    resultado.style.color = "#155724";
    resultado.innerHTML = `
      <p>Total pago: ${parcelas}x R$ ${pagoPorMes.toFixed(2)} = R$ ${totalPago.toFixed(2)}</p>
      <p>Desconto: R$ ${desconto} (${percentual}%)</p>
    `;
}
  