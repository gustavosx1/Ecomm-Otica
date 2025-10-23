import sql from './database/connetion.js';

async function testProductsStructure() {
  try {
    console.log('🔍 Verificando estrutura da tabela products...');
    
    // Verificar colunas da tabela products
    const columns = await sql`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'products' 
      ORDER BY ordinal_position
    `;
    
    console.log('\n📋 Colunas da tabela products:');
    columns.forEach((col: any) => {
      console.log(`  - ${col.column_name} (${col.data_type}) ${col.is_nullable === 'YES' ? 'NULL' : 'NOT NULL'}`);
    });
    
    // Verificar alguns produtos
    console.log('\n📦 Primeiros produtos:');
    const products = await sql`SELECT * FROM products LIMIT 3`;
    console.log(JSON.stringify(products, null, 2));
    
    // Verificar colunas da tabela categories
    const categoryColumns = await sql`
      SELECT column_name, data_type, is_nullable 
      FROM information_schema.columns 
      WHERE table_name = 'categories' 
      ORDER BY ordinal_position
    `;
    
    console.log('\n🏷️ Colunas da tabela categories:');
    categoryColumns.forEach((col: any) => {
      console.log(`  - ${col.column_name} (${col.data_type}) ${col.is_nullable === 'YES' ? 'NULL' : 'NOT NULL'}`);
    });
    
  } catch (error) {
    console.error('❌ Erro:', error);
  } finally {
    await sql.end();
  }
}

testProductsStructure();