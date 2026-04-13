const readline = require('readline');

const cores = {
    reset: "\x1b[0m", cyan: "\x1b[36m", green: "\x1b[32m",
    yellow: "\x1b[33m", red: "\x1b[31m", bold: "\x1b[1m", magenta: "\x1b[35m"
};

// Cenários para o teste do algoritmo de dijkstra

const cenarios = {
    "1": {
        titulo: "E-commerce Padrão (10 Nós)",
        inicio: "Gateway", destino: "DB_Principal",
        unidade: "ms",
        grafo: {
            "Gateway": { "Auth": 15, "Cache": 5, "Catalogo": 20 },
            "Auth": { "Gateway": 15, "Checkout": 25, "DB_Principal": 45 },
            "Cache": { "Gateway": 5, "Catalogo": 10, "Carrinho": 15 },
            "Catalogo": { "Gateway": 20, "Cache": 10, "DB_Principal": 35 },
            "Carrinho": { "Cache": 15, "Checkout": 20 },
            "Checkout": { "Auth": 25, "Carrinho": 20, "Pagamento": 30, "Estoque": 25 },
            "Pagamento": { "Checkout": 30, "Notificacao": 10, "DB_Principal": 50 },
            "Estoque": { "Checkout": 25, "DB_Principal": 40 },
            "Notificacao": { "Pagamento": 10, "DB_Principal": 15 },
            "DB_Principal": { "Auth": 45, "Catalogo": 35, "Pagamento": 50, "Estoque": 40, "Notificacao": 15 }
        },
        desenhar: () => {
            console.log(`${cores.cyan}      (Auth)-15-(Gateway)-5-(Cache)-15-(Carrinho)`);
            console.log(`         |          |          |            |`);
            console.log(`        45         20         10           20`);
            console.log(`         |          |          |            |`);
            console.log(`(DB_Principal)-35-(Catalogo)   |        (Checkout)`);
            console.log(`   |     |                     |        /   |`);
            console.log(`   15    40                    |      25   30`);
            console.log(`   |     |                     |      /     |`);
            console.log(`(Notif)-10-(Pagamento)---------+-(Estoque)  |`);
            console.log(`   |          |                             |`);
            console.log(`   +----50----+-----------------------------+${cores.reset}`);
        }
    },
    "2": {
        titulo: "Plataforma de Streaming (12 Nós)",
        inicio: "LoadBalancer", destino: "DataWarehouse",
        unidade: "ms",
        grafo: {
            "LoadBalancer": { "API_Gateway": 10, "CDN": 5 },
            "API_Gateway": { "LoadBalancer": 10, "Auth": 15, "Perfil": 20, "Recomendacao": 30 },
            "CDN": { "LoadBalancer": 5, "Transcoder": 40, "Video_Catalog": 15 },
            "Auth": { "API_Gateway": 15, "MetaDB": 25 },
            "Perfil": { "API_Gateway": 20, "MetaDB": 15, "Analytics": 35 },
            "Recomendacao": { "API_Gateway": 30, "Analytics": 20, "DataWarehouse": 60 },
            "Video_Catalog": { "CDN": 15, "MetaDB": 10, "Transcoder": 25 },
            "Transcoder": { "CDN": 40, "Video_Catalog": 25, "Fila_Msg": 15 },
            "MetaDB": { "Auth": 25, "Perfil": 15, "Video_Catalog": 10, "DataWarehouse": 50 },
            "Analytics": { "Perfil": 35, "Recomendacao": 20, "Fila_Msg": 10 },
            "Fila_Msg": { "Transcoder": 15, "Analytics": 10, "DataWarehouse": 25 },
            "DataWarehouse": { "Recomendacao": 60, "MetaDB": 50, "Fila_Msg": 25 }
        },
        desenhar: () => {
            console.log(`${cores.cyan}           (LoadBalancer)`);
            console.log(`            /          \\`);
            console.log(`          10            5`);
            console.log(`          /              \\`);
            console.log(`    (API_Gateway)       (CDN)`);
            console.log(`     /   |   \\          /   \\`);
            console.log(`   15   20   30       40    15`);
            console.log(`   /     |     \\      /      \\`);
            console.log(`(Auth) (Perfil) (Recom) (Transcoder) (Video_Catalog)`);
            console.log(`  \\      |       |       /       /      /`);
            console.log(`  25    15       20    15      25     10`);
            console.log(`    \\    |       |     /       /      /`);
            console.log(`   (MetaDB)  (Analytics)-10-(Fila_Msg)`);
            console.log(`        \\        |              |`);
            console.log(`         50     ---             25`);
            console.log(`           \\    /               |`);
            console.log(`          (DataWarehouse)-------+${cores.reset}`);
        }
    },
        "3": {
        titulo: "App de Delivery (12 Nós)",
        inicio: "Gateway", destino: "DB_Pedidos",
        unidade: "ms",
        grafo: {
            "Gateway": { "Auth": 10, "Restaurantes": 15, "Rastreamento": 20 },
            "Auth": { "Gateway": 10, "Checkout": 25 },
            "Restaurantes": { "Gateway": 15, "Carrinho": 10, "Avaliacao": 20 },
            "Carrinho": { "Restaurantes": 10, "Checkout": 15 },
            "Checkout": { "Auth": 25, "Carrinho": 15, "Pagamento": 30 },
            "Pagamento": { "Checkout": 30, "Notificacao": 10, "DB_Pedidos": 40 },
            "Notificacao": { "Pagamento": 10, "DB_Pedidos": 15 },
            "Rastreamento": { "Gateway": 20, "Geo_Routing": 15, "Entregadores": 25 },
            "Geo_Routing": { "Rastreamento": 15, "Entregadores": 10 },
            "Entregadores": { "Rastreamento": 25, "Geo_Routing": 10, "DB_Pedidos": 35 },
            "Avaliacao": { "Restaurantes": 20, "DB_Pedidos": 30 },
            "DB_Pedidos": { "Pagamento": 40, "Notificacao": 15, "Entregadores": 35, "Avaliacao": 30 }
        },
        desenhar: () => {
            console.log(`${cores.cyan}(Auth)---25---(Checkout)---30---(Pagamento)---10---(Notificacao)`);
            console.log(`  |               |                  |                  |`);
            console.log(` 10              15                 40                 15`);
            console.log(`  |               |                  |                  |`);
            console.log(`(Gateway)-15-(Restaurantes)-10-(Carrinho)               |`);
            console.log(`  |               |                                     |`);
            console.log(` 20              20                                     |`);
            console.log(`  |               |                                     |`);
            console.log(`(Rastreamento) (Avaliacao)---------30-------+           |`);
            console.log(`  |       \\                                 |           |`);
            console.log(` 25       15                                |           |`);
            console.log(`  |         \\                               |           |`);
            console.log(`(Entregadores)-10-(Geo_Routing)        (DB_Pedidos)-----+`);
            console.log(`         \\                                  /`);
            console.log(`          +---------------35---------------+${cores.reset}`);
        }
    }
};

// Função do dijkstra

function dijkstraVisual(grafo, inicio, destino, unidadeMedida) {
    const distancias = {};
    const anteriores = {};
    const naoVisitados = new Set(Object.keys(grafo));

    for (let no in grafo) {
        distancias[no] = Infinity;
        anteriores[no] = null;
    }
    distancias[inicio] = 0;

    console.log(`\n${cores.yellow}Iniciando rastreamento de [${inicio}] para [${destino}]...${cores.reset}\n`);

    while (naoVisitados.size > 0) {
        let noAtual = null;
        for (let no of naoVisitados) {
            if (noAtual === null || distancias[no] < distancias[noAtual]) {
                noAtual = no;
            }
        }

        if (distancias[noAtual] === Infinity) break;
        if (noAtual === destino) break;

        console.log(`--> Analisando nó [${cores.bold}${noAtual}${cores.reset}] (Menor custo atual: ${distancias[noAtual]}${unidadeMedida})`);
        naoVisitados.delete(noAtual);

        for (let vizinho in grafo[noAtual]) {
            let peso = grafo[noAtual][vizinho];
            let distanciaTotal = distancias[noAtual] + peso;

            if (distanciaTotal < distancias[vizinho]) {
                distancias[vizinho] = distanciaTotal;
                anteriores[vizinho] = noAtual;
                console.log(`   └─ Atualizou rota para [${vizinho}]: ${distanciaTotal}${unidadeMedida}`);
            }
        }
    }

    let caminho = [];
    let noPasso = destino;
    while (noPasso) {
        caminho.unshift(noPasso);
        noPasso = anteriores[noPasso];
    }

    return { caminho, custoTotal: distancias[destino] };
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function exibirMenu() {
    console.clear();
    console.log(`${cores.magenta}${cores.bold}==================================================`);
    console.log(`  SIMULADOR DE DIJKSTRA - ARQUITETURA CLOUD`);
    console.log(`==================================================${cores.reset}\n`);
    
    console.log(`Escolha uma topologia de microsserviços para testar:\n`);
    
    for (let key in cenarios) {
        console.log(`  [${cores.green}${key}${cores.reset}] - ${cenarios[key].titulo}`);
    }
    console.log(`  [${cores.red}0${cores.reset}] - Sair\n`);

    rl.question(`Digite o número da opção desejada: `, (resposta) => {
        if (resposta === '0') {
            console.log(`\nEncerrando terminal...`);
            rl.close();
            return;
        }

        const cenarioEscolhido = cenarios[resposta];

        if (cenarioEscolhido) {
            executarCenario(cenarioEscolhido);
        } else {
            console.log(`\n${cores.red}Opção inválida!${cores.reset}`);
            setTimeout(exibirMenu, 1500);
        }
    });
}

exibirMenu();

function executarCenario(cenario) {
    console.clear();
    console.log(`${cores.magenta}${cores.bold}=== ${cenario.titulo.toUpperCase()} ===${cores.reset}\n`);
    
    cenario.desenhar();

    setTimeout(() => {
        const resultado = dijkstraVisual(cenario.grafo, cenario.inicio, cenario.destino, cenario.unidade);
        
        console.log(`\n${cores.green}${cores.bold}╔════════════════════════════════════════════════════════════════════════╗${cores.reset}`);
        console.log(`${cores.green}${cores.bold}║ ROTA DE MENOR LATÊNCIA ENCONTRADA!                                     ║${cores.reset}`);
        console.log(`${cores.green}${cores.bold}╚════════════════════════════════════════════════════════════════════════╝${cores.reset}`);
        console.log(`${cores.green}-> Caminho percorrido: ${resultado.caminho.join(' ➔ ')}${cores.reset}`);
        console.log(`${cores.green}-> Latência Total: ${resultado.custoTotal} ${cenario.unidade}${cores.reset}\n`);
        
        rl.question(`Pressione ENTER para voltar ao menu principal...`, () => {
            exibirMenu();
        });

    }, 800);
}
