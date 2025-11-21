const allQuestions = [
    // --- NÍVEL FÁCIL: CONSCIENTIZAÇÃO GERAL & ESCRITÓRIO ---
    { 
        question: "Qual é a principal fonte de consumo de energia em escritórios típicos?", 
        options: ["Impressoras", "Iluminação", "Computadores", "Ar-condicionado"], 
        answer: 3, 
        points: 1000 
    },
    { 
        question: "Qual prática ajuda a reduzir o consumo de energia com iluminação?", 
        options: ["Usar lâmpadas incandescentes", "Manter luzes acesas o tempo todo", "Aproveitar luz natural e sensores de presença", "Pintar as paredes de cores escuras"], 
        answer: 2, 
        points: 1000 
    },
    { 
        question: "O que indica que um equipamento tem eficiência energética comprovada no Brasil?", 
        options: ["Selo do Inmetro/Procel A", "Selo de Garantia Estendida", "Ser importado", "Ser da cor verde"], 
        answer: 0, 
        points: 1000 
    },
    { 
        question: "Comparando equipamentos para o mesmo uso, quem geralmente consome menos energia?", 
        options: ["Um computador Desktop (torre)", "Um Notebook/Laptop", "Um servidor antigo", "Uma impressora a laser industrial"], 
        answer: 1, 
        points: 1000 
    },
    { 
        question: "Qual atitude simples reduz drasticamente o consumo dos computadores em pausas longas?", 
        options: ["Deixar ligado com protetor de tela", "Ativar modo de suspensão/hibernação", "Aumentar brilho da tela", "Desligar apenas o monitor"], 
        answer: 1, 
        points: 1000 
    },
    { 
        question: "Se você for o último a sair de uma sala de reunião, o que deve fazer?", 
        options: ["Deixar tudo ligado para o dia seguinte", "Desligar ar-condicionado e luzes", "Colocar um aviso na porta", "Apenas fechar a porta"], 
        answer: 1, 
        points: 1000 
    },
    { 
        question: "Qual é o horário de ponta (pico) de energia na maioria das regiões do Brasil?", 
        options: ["Madrugada (00h às 06h)", "Meio-dia", "Entre 18h e 21h (aprox.)", "Manhã cedo"], 
        answer: 2, 
        points: 1000 
    },
    { 
        question: "Qual a temperatura ideal para o ar-condicionado equilibrar conforto e economia?", 
        options: ["17°C (Mínimo possível)", "Entre 23°C e 24°C", "30°C", "Ligar e desligar a cada 10 minutos"], 
        answer: 1, 
        points: 1000 
    },
    { 
        question: "O que acontece se deixarmos janelas abertas com o ar-condicionado ligado?", 
        options: ["O ambiente esfria mais rápido", "O consumo de energia dispara pois o ar tenta compensar o calor externo", "Não muda nada", "O ar-condicionado desliga sozinho"], 
        answer: 1, 
        points: 1000 
    },
    { 
        question: "O que é o 'consumo fantasma' em eletrônicos?", 
        options: ["Energia usada por aparelhos em stand-by (tomada)", "Energia gerada por fantasmas", "Erro na conta de luz", "Perda de calor pelos cabos"], 
        answer: 0, 
        points: 1000 
    },
    
    // --- NÍVEL MÉDIO: TI, HARDWARE & BOAS PRÁTICAS ---
    { 
        question: "Além do selo Procel (Brasil), qual selo internacional é comum em computadores eficientes?", 
        options: ["Energy Star", "ISO 9001", "Organic Food", "IEEE 802.11"], 
        answer: 0, 
        points: 1500 
    },
    { 
        question: "Qual o benefício energético de usar 'Modo Escuro' em telas OLED (celulares/monitores modernos)?", 
        options: ["Nenhum, é apenas estético", "Pixels pretos ficam desligados, economizando bateria/energia", "Aumenta o consumo pois exige mais processamento", "Esquenta mais a tela"], 
        answer: 1, 
        points: 1500 
    },
    { 
        question: "Qual o benefício de substituir HDs antigos por SSDs em laptops corporativos?", 
        options: ["Apenas velocidade", "SSDs consomem menos energia e geram menos calor que HDs mecânicos", "Ficam mais bonitos", "Não há diferença de energia"], 
        answer: 1, 
        points: 1500 
    },
    { 
        question: "Para equipamentos de rede (Cisco, TP-Link) que funcionam 24h, qual recurso ajuda na economia?", 
        options: ["Energy Efficient Ethernet (EEE) ou modo 'Green'", "Cabos de ouro", "Luzes LED RGB piscando", "Reiniciar o aparelho a cada hora"], 
        answer: 0, 
        points: 1500 
    },
    { 
        question: "Como a digitalização de documentos (Paperless) ajuda na economia de energia?", 
        options: ["Não ajuda", "Reduz energia gasta na produção de papel, impressão e transporte físico", "Gasta mais energia pois usa scanners", "Aumenta o uso de ar-condicionado"], 
        answer: 1, 
        points: 1500 
    },
    { 
        question: "O que administradores de rede podem usar para forçar economia em centenas de PCs ao mesmo tempo?", 
        options: ["Enviar um e-mail pedindo para desligar", "GPOs (Políticas de Grupo) para configurar suspensão automática", "Desligar a chave geral do prédio", "Instalar vírus"], 
        answer: 1, 
        points: 1500 
    },
    { 
        question: "Nobreaks (UPS) antigos podem ser vilões de energia. Por quê?", 
        options: ["Eles roubam energia dos vizinhos", "Baterias viciadas e circuitos antigos têm baixa eficiência na conversão elétrica", "Eles ficam apitando muito", "Eles não consomem energia"], 
        answer: 1, 
        points: 1500 
    },

    // --- NÍVEL DIFÍCIL: INFRAESTRUTURA CRÍTICA, CLOUD & DATACENTER ---
    { 
        question: "Em computação em nuvem (Cloud), o que são 'Zombie Instances'?", 
        options: ["Servidores infectados por vírus", "Máquinas virtuais ligadas sem uso útil, consumindo energia e dinheiro", "Computadores antigos do escritório", "Sistemas de backup automáticos"], 
        answer: 1, 
        points: 2000 
    },
    { 
        question: "Uma máquina virtual na nuvem é acessada apenas 2 horas por dia. Qual a melhor prática?", 
        options: ["Deixá-la ligada 24h para garantir disponibilidade", "Agendar scripts de automação (Scheduling) para ligar/desligar", "Diminuir a memória RAM", "Não usar nuvem"], 
        answer: 1, 
        points: 2000 
    },
    { 
        question: "O que é 'Right-sizing' no contexto de servidores e nuvem?", 
        options: ["Comprar o maior servidor possível", "Ajustar os recursos (CPU/RAM) exatamente à necessidade da carga de trabalho", "Usar monitores maiores", "Trocar de fornecedor de nuvem todo mês"], 
        answer: 1, 
        points: 2000 
    },
    { 
        question: "Equipamentos de vídeo (ex: Evertz, Sony) e servidores geram muito calor. Qual o impacto indireto?", 
        options: ["Nenhum, o calor se dissipa sozinho", "Reduz a conta de luz", "Aumenta drasticamente o consumo do ar-condicionado", "Melhora o desempenho do processador"], 
        answer: 2, 
        points: 2000 
    },
    { 
        question: "Em um Data Center, o que o indicador PUE (Power Usage Effectiveness) mede?", 
        options: ["A velocidade da internet", "A eficiência energética (energia total vs. energia usada pelos equipamentos de TI)", "A quantidade de funcionários", "O lucro da empresa"], 
        answer: 1, 
        points: 2500 
    },
    { 
        question: "Qual técnica de layout de Data Center evita a mistura de ar quente com ar frio?", 
        options: ["Confinamento de Corredor Quente/Frio", "Ventiladores de teto", "Deixar as portas abertas", "Espalhar os servidores aleatoriamente"], 
        answer: 0, 
        points: 2500 
    },
    { 
        question: "O que é 'Free Cooling' em grandes Data Centers?", 
        options: ["Distribuição de sorvete grátis", "Usar o ar externo (frio) para refrigerar o ambiente sem ligar compressores", "Deixar servidores na geladeira", "Desligar tudo para esfriar"], 
        answer: 1, 
        points: 2500 
    },
    { 
        question: "Servidores legados (antigos) muitas vezes consomem energia mesmo sem processar dados úteis. Qual a solução?", 
        options: ["Mantê-los ligados por segurança", "Consolidação (virtualização) ou desativação (Decommissioning)", "Colocar ventiladores extras", "Apenas desligar o monitor deles"], 
        answer: 1, 
        points: 2000 
    },
    { 
        question: "Qual o conceito de 'Serverless' na nuvem e sua vantagem energética?", 
        options: ["Servidores invisíveis", "Executar código apenas quando acionado (sob demanda), sem manter servidores ociosos ligados", "Usar servidores de papel", "Rodar tudo no celular"], 
        answer: 1, 
        points: 2500 
    },

    // --- EXTRAS: COMPORTAMENTO E SUSTENTABILIDADE ---
    { 
        question: "Por que usar protetores de tela (screensavers) animados NÃO é recomendado para economia?", 
        options: ["Eles impedem o monitor de entrar em modo de suspensão (sleep)", "Eles gastam a internet", "Eles estragam a tela", "Eles são muito claros"], 
        answer: 0, 
        points: 1000 
    },
    { 
        question: "No contexto de 'TI Verde', o que deve ser feito com lixo eletrônico (e-waste)?", 
        options: ["Jogar no lixo comum", "Queimar", "Descarte em empresas de reciclagem certificadas", "Guardar no armário para sempre"], 
        answer: 2, 
        points: 1000 
    },
    { 
        question: "Cada e-mail enviado ou vídeo assistido gera uma pequena 'pegada de carbono'. Por quê?", 
        options: ["Porque usa papel", "Porque dados trafegam por redes e data centers que consomem eletricidade mundialmente", "Porque aquece o celular", "É mentira, internet não gasta energia"], 
        answer: 1, 
        points: 2000 
    },
    { 
        question: "Qual a vantagem de centralizar impressoras (print servers) em vez de ter uma por mesa?", 
        options: ["Obriga as pessoas a caminharem (saúde)", "Reduz o número de equipamentos ligados em stand-by e facilita manutenção", "Aumenta o barulho", "Gasta mais papel"], 
        answer: 1, 
        points: 1500 
    }
];