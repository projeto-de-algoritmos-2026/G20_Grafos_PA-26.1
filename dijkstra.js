const readline = require('readline');

// Tabela de cores ANSI
const cores = {
    reset: "\x1b[0m", cyan: "\x1b[36m", green: "\x1b[32m",
    yellow: "\x1b[33m", red: "\x1b[31m", bold: "\x1b[1m", magenta: "\x1b[35m"
};

// ==========================================
// DEFINIÇÃO DOS CENÁRIOS DE MICROSSERVIÇOS
// ==========================================

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