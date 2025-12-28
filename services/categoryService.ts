const categoryDB: Record<string, string[]> = {
    'Hortifruti': [
        // Frutas
        'banana', 'maca', 'maçã', 'uva', 'laranja', 'limao', 'limão', 'mamao', 'mamão', 
        'melancia', 'melao', 'melão', 'abacaxi', 'manga', 'morango', 'pera', 'abacate', 
        'maracuja', 'maracujá', 'kiwi', 'caqui', 'goiaba', 'pessego', 'pêssego', 'ameixa', 
        'cereja', 'figo', 'framboesa', 'graviola', 'jabuticaba', 'jaca', 'mexerica', 'tangerina',
        'bergamota', 'nectarina', 'pitaya', 'coco', 'amora', 'mirtilo', 'blueberry', 'roma', 'romã',
        // Verduras e Legumes
        'batata', 'cebola', 'tomate', 'cenoura', 'alface', 'alho', 'couve', 'pimentao', 'pimentão', 
        'abobrinha', 'berinjela', 'chuchu', 'pepino', 'beterraba', 'brocolis', 'brócolis', 
        'repolho', 'rucula', 'rúcula', 'salsinha', 'cebolinha', 'coentro', 'cheiro verde', 
        'mandioca', 'aipim', 'macaxeira', 'batata doce', 'inhame', 'quiabo', 'vagem', 'gengibre', 
        'hortela', 'hortelã', 'manjericao', 'manjericão', 'espinafre', 'milho', 'milho verde',
        'palmito', 'rabanete', 'nabo', 'agriao', 'agrião', 'chicoria', 'chicória', 'vagem',
        'ervilha torta', 'batata salsa', 'mandioquinha', 'cara', 'cará', 'maxixe', 'jilo', 'jiló',
        'abobora', 'abóbora', 'cabotia', 'cabotiá', 'cogumelo', 'shitake', 'shimeji', 'champignon',
        'alecrim', 'louro', 'oregano fresco', 'salsa', 'tempero verde', 'folhas', 'salada'
    ],
    'Açougue': [
        // Boi
        'carne', 'bife', 'moida', 'moída', 'picanha', 'alcatra', 'contra file', 'filé', 
        'acem', 'acém', 'musculo', 'músculo', 'costela', 'figado', 'fígado', 'boi', 'patinho', 
        'lagarto', 'cupim', 'maminha', 'fraldinha', 'coxao mole', 'coxão mole', 'coxao duro', 
        'ossobuco', 'chuleta', 'bisteca bovina', 'carne de sol', 'charque', 'carne seca',
        // Frango
        'frango', 'peito de frango', 'asa', 'coxa', 'sobrecoxa', 'coracao', 'coração', 
        'file de frango', 'sassami', 'tulipa', 'meio da asa', 'passarinho', 'frango inteiro',
        'galinha', 'moela',
        // Porco
        'porco', 'bisteca', 'linguica', 'linguiça', 'salsicha', 'bacon', 'presunto', 'calabresa', 
        'paio', 'mortadela', 'salame', 'lombo', 'pernil', 'costelinha', 'suino', 'suíno', 
        'toucinho', 'panceta', 'torresmo', 'copa',
        // Peixe
        'peixe', 'file de peixe', 'camarao', 'camarão', 'sardinha', 'hamburguer', 'empanado', 
        'nuggets', 'tilapia', 'tilápia', 'salmao', 'salmão', 'bacalhau', 'merluza', 'atum fresco',
        'lula', 'polvo', 'marisco', 'siri', 'caranguejo',
        // Outros
        'carne de panela', 'carne para assar', 'churrasco', 'espetinho', 'kafta'
    ],
    'Laticínios': [
        'leite', 'queijo', 'mussarela', 'muçarela', 'prato', 'parmesao', 'parmesão', 'minas', 
        'ricota', 'catupiry', 'requeijao', 'requeijão', 'iogurte', 'danone', 'yakult', 'manteiga', 
        'margarina', 'nata', 'creme de leite', 'leite condensado', 'doce de leite', 'chantilly', 
        'leite fermentado', 'coalhada', 'ovo', 'ovos', 'provolone', 'gorgonzola', 'brie', 'gouda',
        'reino', 'fatiado', 'polenguinho', 'petit suisse', 'leite em po', 'leite em pó', 'ninho',
        'molico', 'desnatado', 'integral', 'sem lactose', 'fondue'
    ],
    'Mercearia': [
        // Grãos e Básicos
        'arroz', 'feijao', 'feijão', 'macarrao', 'macarrão', 'oleo', 'óleo', 'azeite', 'sal', 
        'acucar', 'açúcar', 'cafe', 'café', 'farinha', 'fuba', 'fubá', 'milho de pipoca', 
        'ervilha', 'lentilha', 'grao de bico', 'grão de bico', 'soja', 'trigo', 'amido', 'maizena',
        // Matinais e Lanches
        'biscoito', 'bolacha', 'torrada', 'cereal', 'aveia', 'granola', 'mel', 'chocolate', 
        'achocolatado', 'nescau', 'toddy', 'bombom', 'barra de cereal', 'geleia', 'chocolates',
        'bala', 'doce', 'paçoca', 'amendoim', 'salgadinho', 'batata palha', 'chips', 'doritos',
        // Molhos e Conservas
        'molho', 'extrato', 'pomarola', 'maionese', 'ketchup', 'mostarda', 'vinagre', 'shoyu', 
        'palmito', 'azeitona', 'cogumelo em conserva', 'picles', 'seleta', 'milho em lata',
        'sardinha em lata', 'atum em lata', 
        // Instantâneos
        'miojo', 'lamen', 'sopa', 'pipoca', 'gelatina', 'pudim', 'leite de coco', 'creme de cebola', 
        // Temperos
        'tempero', 'pimenta', 'oregano', 'orégano', 'caldo', 'sazon', 'knorr', 'maggi', 'ajinomoto',
        'cominho', 'colorau', 'curry', 'chimichurri', 'paprica', 'páprica', 'canela', 'cravo',
        // Pets
        'racao', 'ração', 'petisco', 'areia de gato', 'sache', 'sachê', 'whiskas', 'pedigree'
    ],
    'Padaria': [
        'pao', 'pão', 'frances', 'baguete', 'ciabatta', 'sonho', 'bolo', 'torta', 'pao de queijo', 
        'pão de queijo', 'salgado', 'coxinha', 'brioche', 'pao de forma', 'integral', 'bisnaguinha',
        'hamburguer', 'hot dog', 'hotdog', 'pao de alho', 'croissant', 'rosquinha', 'panetone', 
        'chocotone', 'carolina', 'broa', 'cuca'
    ],
    'Bebidas': [
        'agua', 'água', 'suco', 'refrigerante', 'coca', 'guarana', 'guaraná', 'pepsi', 'fanta', 
        'cerveja', 'vinho', 'vodka', 'wisky', 'whisky', 'gin', 'cachaca', 'cachaça', 'energetico', 
        'energético', 'cha', 'chá', 'mate', 'agua de coco', 'tonica', 'tônica', 'soda', 'sprite',
        'antarctica', 'skol', 'brahma', 'heineken', 'long neck', 'latão', 'espumante', 'licor',
        'gatorade', 'isotonico', 'isotônico', 'h2oh', 'schweppes', 'campari', 'pinga', 'suco de uva'
    ],
    'Limpeza': [
        'sabao', 'sabão', 'detergente', 'ypê', 'minuano', 'amaciante', 'agua sanitaria', 
        'água sanitária', 'candida', 'cloro', 'desinfetante', 'veja', 'multiuso', 'alcool', 
        'álcool', 'esponja', 'bucha', 'bombril', 'lã de aço', 'palha de aço', 'saco de lixo', 
        'lixeira', 'pano', 'flanela', 'rodo', 'vassoura', 'pa', 'pá', 'sabao em po', 'sabão em pó', 
        'omo', 'tixan', 'vanish', 'tira manchas', 'lustra moveis', 'limpa vidro', 'limpa piso',
        'inseticida', 'sbp', 'raid', 'naftalina', 'pastilha', 'desengordurante', 'cera',
        'papel toalha', 'guardanapo', 'fosforo', 'fósforo', 'acendedor'
    ],
    'Higiene': [
        'papel higienico', 'papel higiênico', 'sabonete', 'shampoo', 'xampu', 'condicionador', 
        'pasta de dente', 'creme dental', 'escova de dente', 'fio dental', 'enxaguante', 'listerine',
        'colgate', 'sorriso', 'desodorante', 'perfume', 'hidratante', 'creme', 'protetor solar', 
        'cotonete', 'hastes flexiveis', 'algodao', 'algodão', 'absorvente', 'fralda', 'lenco', 
        'lenço', 'gilete', 'lâmina', 'barbear', 'espuma de barbear', 'pos barba', 'talco', 
        'esmalte', 'acetona', 'lixa', 'cortador', 'pinca', 'pinça', 'maquiagem', 'rimel', 'batom'
    ]
};

export const detectCategory = (itemName: string): string => {
    const lower = itemName.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    // Check exact matches first or strict includes
    for (const [cat, keywords] of Object.entries(categoryDB)) {
        if (keywords.some(k => lower.includes(k))) return cat;
    }
    
    // Fallback logic for common uncategorized patterns
    if (lower.includes('pote') || lower.includes('plastico')) return 'Utilidades';
    if (lower.includes('lampada') || lower.includes('pilha')) return 'Utilidades';
    
    return 'Outros';
};

export const parseItemsInput = (input: string) => {
    // Split by comma, new line, or the word "e" surrounded by spaces
    const rawItems = input.split(/,|\n|(\s+e\s+)/).map(s => s ? s.trim() : '').filter(s => s.length > 1 && s.toLowerCase() !== 'e');
    
    return rawItems.map(rawName => {
        // Removes quantities at start (e.g., "2kg rice" -> "rice") for better detection
        // Matches "2 kg", "2kg", "2 un", "2", "1/2"
        const cleanName = rawName.replace(/^[\d\.,\/]+\s*([a-zA-Z]{0,3}\s+(de\s+)?)?/i, '');
        return {
            rawName: rawName.replace(/^\W+/, ''), // Remove bullets or weird chars at start
            category: detectCategory(cleanName || rawName)
        };
    });
};