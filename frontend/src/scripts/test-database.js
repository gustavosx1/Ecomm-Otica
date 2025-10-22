// src/scripts/test-database-modern.js
import postgres from 'postgres';

async function runTests() {
  const sql = postgres({
    host: 'localhost',
    port: 5432,
    database: 'minha_otica',
    username: 'postgres',
    password: 'root', 
  });

  try {
    console.log(' INICIANDO TESTES DE CONEXÃO...\n');
    
    // Teste 1: Conexão básicanode src/scripts/test-database.js
    console.log(' Testando conexão básica...');
    const [version] = await sql`SELECT version() as postgres_version`;
    console.log(' Conexão estabelecida!');
    console.log(' Versão do PostgreSQL:', version.postgres_version.split(',')[0]);

    // Teste 2: Verificar tabelas
    console.log('\n Verificando tabelas...');
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;
    console.log('📦 Tabelas encontradas:');
    tables.forEach(table => {
      console.log(`   - ${table.table_name}`);
    });

    // Teste 3: Contar produtos
    console.log('\n Contando produtos...');
    const [count] = await sql`SELECT COUNT(*) as total FROM produtos`;
    console.log('Total de produtos:', count.total);

    // Teste 4: Buscar  produtos
    console.log('\n Buscando produtos de exemplo...');
    const produtos = await sql`
      SELECT p.nome, p.preco, c.nome as categoria 
      FROM produtos p 
      JOIN categorias c ON p.categoria_id = c.id 
      WHERE p.disponivel = true
      LIMIT 3
    `;
    console.log('📝 Exemplo de produtos:');
    produtos.forEach(produto => {
      console.log(`   - ${produto.nome} (${produto.categoria}): R$ ${produto.preco}`);
    });

    console.log('\n🎉 TODOS OS TESTES PASSARAM! O banco está funcionando perfeitamente!');

  } catch (error) {
    console.error('❌ ERRO NOS TESTES:', error.message);
    
    if (error.code === '28P01') {
      console.log('🔑 Problema de autenticação - verifique usuário/senha');
    } else if (error.code === '3D000') {
      console.log('📁 Banco de dados não existe - crie o banco "otica_online"');
    } else if (error.code === 'ECONNREFUSED') {
      console.log('🚫 Servidor PostgreSQL não está rodando');
    } else {
      console.log('🔧 Erro desconhecido - verifique a configuração');
    }
  } finally {
    await sql.end();
  }
}

runTests();