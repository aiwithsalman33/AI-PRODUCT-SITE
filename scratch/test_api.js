
async function test() {
  const url = 'https://script.google.com/macros/s/AKfycbxhUUnlMVpOND41-5MV60lqXBvSDLr6okfwDmX0-Nt9LnqG_zqQkjbGb1CAD8gzZVdfRA/exec';
  
  console.log('Testing GET action=products...');
  const res1 = await fetch(`${url}?action=products`);
  console.log('GET action=products:', await res1.json());

  console.log('\nTesting POST action=add_product...');
  const res2 = await fetch(url, {
    method: 'POST',
    body: JSON.stringify({
      action: 'add_product',
      name: 'Test Product ' + Date.now(),
      features: 'Testing API connectivity',
      price: 100,
      category: 'Electronics'
    })
  });
  const added = await res2.json();
  console.log('POST Result:', added);

  if (added.product_id) {
    console.log('\nTesting GET single product with id=' + added.product_id + '...');
    const res3 = await fetch(`${url}?action=products&id=${added.product_id}`);
    console.log('GET action=products&id=...:', await res3.json());
    
    const res4 = await fetch(`${url}?action=product&id=${added.product_id}`);
    console.log('GET action=product&id=...:', await res4.json());
  }

  console.log('\nTesting status filters...');
  const statuses = ['received', 'pending_approval', 'generated', 'published', 'all'];
  for (const s of statuses) {
    const r = await fetch(`${url}?action=products&status=${s}`);
    const res = await r.json();
    console.log(`GET action=products&status=${s}:`, res);
  }
}

test().catch(console.error);
