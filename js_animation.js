function adicionarLinha() {
    const tbody = document.querySelector('#tabela-carga tbody');
    const tr = document.createElement('tr');

    // AWB
    const tdAwb = document.createElement('td');
    const inputAwb = document.createElement('input');
    tdAwb.appendChild(inputAwb);

    // Qtd
    const tdQtd = document.createElement('td');
    const inputQtd = document.createElement('input');
    tdQtd.appendChild(inputQtd);

    // Peso (KG)
    const tdPeso = document.createElement('td');
    const inputPeso = document.createElement('input');
    tdPeso.appendChild(inputPeso);

    // Unid.
    const tdUnid = document.createElement('td');
    const selectUnid = document.createElement('select');
    ['', 'L', 'KG', 'T.I'].forEach(opt => {
        const option = document.createElement('option');
        option.value = opt;
        option.textContent = opt;
        if (opt === '') option.style.color = '#bbb';
        selectUnid.appendChild(option);
    });
    tdUnid.appendChild(selectUnid);

    // Destino
    const tdDestino = document.createElement('td');
    const inputDestino = document.createElement('input');
    tdDestino.appendChild(inputDestino);

    // Tipo de Carga
    const tdTipoCarga = document.createElement('td');
    const selectTipo = document.createElement('select');
    selectTipo.innerHTML = `
        <option value="" style="color:#bbb;">Selecione</option>
        <option value="Normal (NOR/SEC)">Normal (NOR/SEC)</option>
        <option value="Especial (SPL)">Especial (SPL)</option>
        <option value="Perigosa (DGR)">Perigosa (DGR)</option>
    `;
    tdTipoCarga.appendChild(selectTipo);

    // SPL/DGR
    const tdSplDgr = document.createElement('td');
    const selectSplDgr = document.createElement('select');
    selectSplDgr.innerHTML = `<option value="" style="color:#bbb;">Selecione</option>`;
    tdSplDgr.appendChild(selectSplDgr);

    selectTipo.addEventListener('change', () => {
        atualizarSplDgr(selectTipo, selectSplDgr);
    });

    // Serviço
    const tdServico = document.createElement('td');
    const selectServico = document.createElement('select');
    ['', 'Premium', 'Expresso', 'Standard', 'Especial', 'Fretamento', 'Internacional']
        .forEach(opt => {
            const option = document.createElement('option');
            option.value = opt;
            option.textContent = opt;
            if (opt === '') option.style.color = '#bbb';
            selectServico.appendChild(option);
        });
    tdServico.appendChild(selectServico);

    // Porão
    const tdPorao = document.createElement('td');
    const selectPorao = document.createElement('select');
    selectPorao.setAttribute('data-porao', 'true');
    tdPorao.appendChild(selectPorao);

    // Inicializa o campo porão com base no equipamento atual
    const equipElement = document.getElementById('equip_acft');
    const equipValue = equipElement ? equipElement.value : '';
    atualizarOpcoesPorao(selectPorao, equipValue);

    // Montagem da linha na ordem correta
    tr.appendChild(tdAwb);
    tr.appendChild(tdQtd);
    tr.appendChild(tdPeso);
    tr.appendChild(tdUnid);
    tr.appendChild(tdDestino);
    tr.appendChild(tdTipoCarga);
    tr.appendChild(tdSplDgr);
    tr.appendChild(tdServico);
    tr.appendChild(tdPorao);

    tbody.appendChild(tr);

    atualizarBotaoRemover();
}

function atualizarSplDgr(selectTipoCarga, selectSplDgr) {
    const tipo = selectTipoCarga.value;
    selectSplDgr.innerHTML = "";

    let opcoes = [];

    if (tipo === "Normal (NOR/SEC)") {
        opcoes = ["NOR", "SEC"];
    } else if (tipo === "Especial (SPL)") {
        opcoes = ["AVI", "HUM", "PER", "VAL", "VUN"];
    } else if (tipo === "Perigosa (DGR)") {
        opcoes = [
            "ELI", "ELM", "ICE", "RCL", "RCM", "RDS", "REQ", "RFG", "RFL", "RFS", "RFW",
            "RGX", "RLI", "RLM", "RMD", "RNG", "ROP", "ROX", "RPB", "RPG", "RRE", "RRW",
            "RRY", "RSB", "RSC", "RXB", "RXC", "RXD", "RXE", "RXG", "RXS"
        ];
    }

    const defaultOption = document.createElement('option');
    defaultOption.value = "";
    defaultOption.text = "Selecione";
    defaultOption.style.color = '#bbb';
    selectSplDgr.appendChild(defaultOption);

    opcoes.forEach(op => {
        const option = document.createElement('option');
        option.value = op;
        option.text = op;
        selectSplDgr.appendChild(option);
    });
}

function atualizarOpcoesPorao(selectElement, equipValue) {
    selectElement.innerHTML = '';

    let opcoesPorao = [];

    switch (equipValue) {
        case 'AT76':
            opcoesPorao = ['Diant.', 'Bulk'];
            break;
        case 'ATR(QC)':
            opcoesPorao = ['3A', '3B', '3C', '3D', '2C', '2D'];
            break;
        case 'E190/E195':
        case 'E295':
            opcoesPorao = ['1', '2'];
            break;
        case 'A20N':
        case 'A21N':
        case 'A332/A339':
            opcoesPorao = ['1', '2', '3', '4', '5'];
            break;
        case 'A21F':
            opcoesPorao = ['1', '2', '3', '4', '5'];
            for (let i = 1; i <= 14; i++) {
                opcoesPorao.push(`P${i}`);
            }
            break;
        default:
            opcoesPorao = [];
    }

    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'Selecionar';
    placeholder.style.color = '#bbb';
    selectElement.appendChild(placeholder);

    opcoesPorao.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt;
        option.textContent = opt;
        selectElement.appendChild(option);
    });
}

function atualizarPoraoDeTodasAsLinhas() {
    const equipValue = document.getElementById('equip_acft').value;
    const selectsPorao = document.querySelectorAll('select[data-porao="true"]');

    selectsPorao.forEach(select => {
        atualizarOpcoesPorao(select, equipValue);
    });
}

function removerUltimaLinha() {
    const tbody = document.querySelector('#tabela-carga tbody');
    if (tbody.children.length > 1) {
        tbody.removeChild(tbody.lastElementChild);
    }
    atualizarBotaoRemover();
}

function atualizarBotaoRemover() {
    const tbody = document.querySelector('#tabela-carga tbody');
    const btnRemoverTopo = document.querySelector('.botoes-topo button.remover');
    if (tbody.children.length > 1) {
        btnRemoverTopo.style.display = 'inline-block';
    } else {
        btnRemoverTopo.style.display = 'none';
    }
}

function limparTabela() {
    if (confirm('Tem certeza que deseja limpar toda a tabela? Esta ação não pode ser desfeita.')) {
        const tbody = document.querySelector('#tabela-carga tbody');
        tbody.innerHTML = '';
        adicionarLinha();
        atualizarBotaoRemover();
    }
}

function copiarTabela() {
    const tbody = document.querySelector('#tabela-carga tbody');
    let textoCopiado = '';

    for (let tr of tbody.children) {
        let linha = [];
        for (let td of tr.children) {
            let valor = '';
            if (td.querySelector('input')) {
                valor = td.querySelector('input').value.trim();
            } else if (td.querySelector('select')) {
                valor = td.querySelector('select').value.trim();
            } else {
                valor = td.textContent.trim();
            }
            linha.push(valor);
        }
        textoCopiado += linha.join('\t') + '\n';
    }

    navigator.clipboard.writeText(textoCopiado).then(() => {
        alert('Tabela copiada para a área de transferência!');
    }).catch(() => {
        alert('Erro ao copiar a tabela.');
    });
}

async function copiarImagemDaTela() {
    const captura = document.getElementById('captura');

    try {
        const canvas = await html2canvas(captura, { scale: 2 });
        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));

        if (!blob) {
            alert('Falha ao gerar imagem');
            return;
        }

        const item = new ClipboardItem({ 'image/png': blob });
        await navigator.clipboard.write([item]);

        alert('Imagem copiada para a área de transferência!');
    } catch (error) {
        alert('Erro ao copiar imagem: ' + error.message);
        console.error(error);
    }
}

// Inicialização
window.onload = () => {
    adicionarLinha();
    atualizarBotaoRemover();
    const equipElement = document.getElementById('equip_acft');
    if (equipElement) {
        equipElement.addEventListener('change', atualizarPoraoDeTodasAsLinhas);
    }
};
