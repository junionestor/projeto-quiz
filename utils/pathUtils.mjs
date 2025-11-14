import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

/**
 * Obtém o diretório do arquivo atual de forma compatível com ESM e CJS
 * Funciona tanto em ESM nativo quanto quando compilado para CJS pelo esbuild
 */
export function getDirname() {
    try {
        // Tenta usar import.meta.url (ESM nativo)
        if (typeof import.meta !== 'undefined' && import.meta.url) {
            const url = import.meta.url;
            if (url && typeof url === 'string') {
                const __filename = fileURLToPath(url);
                return path.dirname(__filename);
            }
        }
    } catch (e) {
        // Se falhar, continua para fallback
    }
    
    // Fallback: tenta obter o diretório baseado no caminho do módulo
    // Para Netlify Functions, usa process.cwd() como último recurso
    // mas tenta ajustar para o diretório raiz do projeto
    const cwd = process.cwd();
    
    // Se estiver em um diretório de função do Netlify, tenta subir para o root
    if (cwd.includes('.netlify') || cwd.includes('netlify/functions')) {
        // Tenta encontrar o diretório raiz do projeto
        const parts = cwd.split(path.sep);
        const netlifyIndex = parts.findIndex(p => p === 'netlify' || p === '.netlify');
        if (netlifyIndex > 0) {
            return parts.slice(0, netlifyIndex).join(path.sep);
        }
    }
    
    return cwd;
}

/**
 * Obtém o diretório raiz do projeto
 * Tenta detectar o diretório raiz baseado em arquivos conhecidos (package.json, etc)
 * Começa do diretório de trabalho atual e sobe até encontrar o package.json
 */
export function getProjectRoot() {
    // Começa do diretório de trabalho atual (onde o node foi executado)
    let current = process.cwd();
    
    // Procura por package.json para encontrar a raiz do projeto
    // Sobe na árvore de diretórios até encontrar
    while (current !== path.dirname(current)) {
        const packageJsonPath = path.join(current, 'package.json');
        if (fs.existsSync(packageJsonPath)) {
            return current;
        }
        current = path.dirname(current);
    }
    
    // Se não encontrar package.json, tenta usar getDirname() como fallback
    try {
        const dirname = getDirname();
        // Se getDirname retornou algo diferente de process.cwd(), tenta usar
        if (dirname !== process.cwd()) {
            current = dirname;
            while (current !== path.dirname(current)) {
                const packageJsonPath = path.join(current, 'package.json');
                if (fs.existsSync(packageJsonPath)) {
                    return current;
                }
                current = path.dirname(current);
            }
        }
    } catch (e) {
        // Ignora erros
    }
    
    // Último recurso: retorna o diretório de trabalho atual
    return process.cwd();
}

