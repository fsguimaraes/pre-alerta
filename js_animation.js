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
        opcoes = ["AVI", "HEA", "HUM", "PER", "VAL", "VUN"];
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
            opcoesPorao = ['1', '2', '3', '4'];
            break;
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


//FUNÇAO DE LIMPAR A TABELA

function limparTabela() {
  if (!confirm('Tem certeza que deseja limpar toda a tabela? Esta ação não pode ser desfeita.')) {
    return; // cancela se o usuário clicar "Cancelar"
  }

  // Limpa o corpo da tabela (tbody)
  const tabela = document.getElementById('tabela-carga');
  if (!tabela) {
    alert('Tabela não encontrada!');
    return;
  }

  const tbody = tabela.querySelector('tbody');
  if (tbody) {
    tbody.innerHTML = '';
  } else {
    // Se não tiver tbody, limpa a tabela toda menos o cabeçalho
    while (tabela.rows.length > 1) {
      tabela.deleteRow(1);
    }
  }

  // Limpa os campos especificados (mantendo os que quer preservar)
  const camposParaLimpar = [
    'numeroVoo',
    'horaSaida',
    'horaChegada',
    'destino',
    'equip_acft',
    'prefixo',
    'listagemManifesto',
    'saidaVoo'
  ];

  camposParaLimpar.forEach(id => {
    const campo = document.getElementById(id);
    if (campo) {
      campo.value = '';
    }
  });
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

//===== VERIFICAÇÃO DOS CAMPOS ==========//
function verificarCampos() {
    const camposObrigatorios = [
        { id: 'numeroVoo', nome: 'Número do Voo' },
        { id: 'data_voo', nome: 'Data do Voo' },
        { id: 'origem', nome: 'Origem' },
        { id: 'horaSaida', nome: 'Hora de Saída' },
        { id: 'destino', nome: 'Destino' },
        { id: 'horaChegada', nome: 'Hora de Chegada' },
        { id: 'equip_acft', nome: 'Equipamento' },
        { id: 'prefixo', nome: 'Prefixo' },
    ];

    let camposVazios = [];

    camposObrigatorios.forEach(campo => {
        const valor = document.getElementById(campo.id).value;
        if (!valor) {
            camposVazios.push(campo.nome);
        }
    });

    const tabela = document.getElementById('tabela-carga').getElementsByTagName('tbody')[0];
    if (tabela.rows.length === 0) {
        camposVazios.push('Informações de Carga (Tabela)');
    }

    if (camposVazios.length > 0) {
        alert('⚠️ Atenção! Os seguintes campos estão vazios:\n\n- ' + camposVazios.join('\n- '));
        return false;
    }

    return true;
}


//===== MENSAGEM COPIADA PARA E-MAIL =====//

function copiarTabela() {
    const camposFormulario = [
        'numeroVoo',
        'prefixo',
        'equip_acft',
        'data_voo',
        'origem',
        'horaSaida',
        'destino',
        'horaChegada'
    ];

    // Cabeçalho inicial
    let mensagem = `🚩 PRÉ-ALERTA DE VOO\n\n`;

    camposFormulario.forEach(id => {
        const elem = document.getElementById(id);
        if (!elem) return;

        const nomeCampo = {
            numeroVoo: `✈️ Voo`,
            prefixo: '📝 Prefixo',
            equip_acft: '🔢 Equipamento',
            data_voo: '📅 Data',
            origem: '🛫 Origem',
            horaSaida: '🕒 Hora/Saída',
            destino: '🛬 Destino',
            horaChegada: '🕒 Hora/Chegada',
        }[id] || id;

        let valor = (elem.value || '').toString().trim();

        // Adiciona prefixo no número do voo
        if (id === 'numeroVoo') {
            valor = `AD-${valor}`;
        }

        mensagem += `${nomeCampo}: ${valor}\n`;
    });


    // Cabeçalho da tabela
    mensagem += `\n📦 INFORMAÇÕES DE EMBARQUE:\n`;
    mensagem += `╔═════════════════════════════════════════════════════════════════════════════════════════════════╗\n`;
    mensagem += `║ AWB/CT-e       | Vols  | Peso      | Destino  | Tipo     | Serviço          | Porão             ║\n`;
    mensagem += `╠═════════════════════════════════════════════════════════════════════════════════════════════════╣\n`;


    // Processa linhas da tabela
    const linhas = document.querySelectorAll('#tabela-carga tbody tr');

    linhas.forEach(linha => {
        const colawb = linha.querySelector('td:nth-child(1) input')?.value.trim() || '';
        const colvols = linha.querySelector('td:nth-child(2) input')?.value.trim() || '';
        const colpeso = linha.querySelector('td:nth-child(3) input')?.value.trim() || '';
        const colunid = linha.querySelector('td:nth-child(4) select')?.value.trim() || '';
        const coldestino = linha.querySelector('td:nth-child(5) input')?.value.trim() || '';
        const coltipo = linha.querySelector('td:nth-child(7) select')?.value.trim() || '';
        const colservico = linha.querySelector('td:nth-child(8) select')?.value.trim() || '';
        const colporao = linha.querySelector('td:nth-child(9) select')?.value.trim() || '';

        // Formata valores
        const colawbFormatado = colawb.length >= 3 ? `${awb.slice(0, 3)}-${awb.slice(3)}` : awb;
        const colvolsFormatado = colvols;
        const colpesoFormatado = `${colpeso} ${colunid}`.toUpperCase();
        const coldestinoFormatado = coldestino.toUpperCase();
        const coltipoFormatado = coltipo.toUpperCase();
        const colservicoFormatado = colservico.toUpperCase();
        const colporaoFormatado = colporao.toUpperCase();

        // Monta linha da tabela com padding fixo
        mensagem += `║ ${colawbFormatado.padEnd(15)} | ${colvolsFormatado.padEnd(6)} | ${colpesoFormatado.padEnd(10)} | ${coldestinoFormatado.padEnd(9)} | ${coltipoFormatado.padEnd(9)} | ${colservicoFormatado.padEnd(17)} | ${colporaoFormatado.padEnd(6)} ║\n`;

    });

    mensagem += `╚════════════════════════════════════════════════════════════════════════════════════════════════╝\n\n`;


    // Observações
    const obs = document.getElementById('observacoes')?.value.trim();
    if (obs) {
        mensagem += `📌 Observações:\n${obs}\n\n`;
    }

    mensagem += `Atenciosamente,\n`

    // Copia para área de transferência
    navigator.clipboard.writeText(mensagem).then(() => {
        alert("✅ Mensagem copiada para a área de transferência!");
    }).catch(err => {
        console.error('Erro ao copiar: ', err);
        alert("❌ Falha ao copiar mensagem.");
    });
}
