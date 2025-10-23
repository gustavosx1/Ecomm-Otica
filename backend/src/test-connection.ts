import sql from './database/connetion.js';

async function testConnection() {
  try {
    console.log('🔗 Testando conexão com o banco AWS...');
    
    // Teste básico de conexão
    const result = await sql`SELECT NOW() as current_time, version() as version`;
    console.log('✅ Conexão estabelecida com sucesso!');
    console.log('📅 Horário do servidor:', result[0]?.current_time);
    console.log('🔧 Versão PostgreSQL:', result[0]?.version);
    
    // Testar se as tabelas existem
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `;
    
    console.log('\n📋 Tabelas encontradas:');
    if (tables.length === 0) {
      console.log('⚠️  Nenhuma tabela encontrada no banco');
    } else {
      tables.forEach((table: any) => {
        console.log(`  - ${table.table_name}`);
      });
    }

    // Testar consulta nas tabelas principais
    try {
      const produtosCount = await sql`SELECT COUNT(*) as total FROM products`;
      console.log(`\n📦 Total de produtos: ${produtosCount[0]?.total}`);
    } catch (error) {
      console.log('⚠️  Tabela "products" não encontrada ou inacessível');
    }

    try {
      const categoriasCount = await sql`SELECT COUNT(*) as total FROM categories`;
      console.log(`🏷️  Total de categorias: ${categoriasCount[0]?.total}`);
    } catch (error) {
      console.log('⚠️  Tabela "categories" não encontrada ou inacessível');
    }

    // Testar uma consulta mais detalhada
    try {
      const sampleProducts = await sql`
        SELECT p.id, p.name, p.price, c.name as category 
        FROM products p 
        JOIN categories c ON p.category_id = c.id 
        LIMIT 3
      `;
      console.log('\n🔍 Exemplo de produtos:');
      sampleProducts.forEach((product: any) => {
        console.log(`  - ${product.name} (${product.category}) - $${product.price}`);
      });
    } catch (error) {
      console.log('⚠️  Erro ao consultar produtos com categorias');
    }

  } catch (error) {
    console.error('❌ Erro na conexão:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('ENOTFOUND')) {
        console.error('🔍 Problema: Host do banco não encontrado. Verifique DB_HOST no .env');
      } else if (error.message.includes('authentication failed')) {
        console.error('🔐 Problema: Falha na autenticação. Verifique DB_USER e DB_PASSWORD no .env');
      } else if (error.message.includes('database') && error.message.includes('does not exist')) {
        console.error('🗄️  Problema: Banco de dados não existe. Verifique DB_NAME no .env');
      } else if (error.message.includes('SSL')) {
        console.error('🔒 Problema: Erro SSL. Verifique se DB_SSL=true está correto');
      }
    }
  } finally {
    // Encerrar conexões
    await sql.end();
    console.log('\n🔌 Conexões encerradas');
  }
}

testConnection();