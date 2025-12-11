const db = firebase.firestore();

// DOM Elements
const marketsDiv = document.getElementById('markets');
const vendorsDiv = document.getElementById('vendors');
const productsDiv = document.getElementById('products');
const searchInput = document.getElementById('search');
const categorySelect = document.getElementById('categoryFilter');
const loadBtn = document.getElementById('loadMarkets');
const orderForm = document.getElementById('orderForm');
const orderProduct = document.getElementById('orderProduct');
const orderQty = document.getElementById('orderQty');
const orderResult = document.getElementById('orderResult');

let currentProducts = [];

// Initialize sample data in Firestore if empty
async function initSampleDataIfEmpty(){
  const mSnap = await db.collection('markets').limit(1).get();
  if (!mSnap.empty) return;

  const markets = [
    {name:'Twin Cities Growers Exchange', location:'Minneapolis, MN', marketDate:'2025-12-01', marketTime:'08:00:00'},
    {name:'Duluth Harbor Market', location:'Duluth, MN', marketDate:'2025-12-02', marketTime:'09:00:00'},
    {name:'St. Cloud Riverwalk Market', location:'St. Cloud, MN', marketDate:'2025-12-03', marketTime:'10:00:00'},
    {name:'Rochester Roots Market', location:'Rochester, MN', marketDate:'2025-12-04', marketTime:'08:30:00'},
    {name:'Mankato Prairie Market', location:'Mankato, MN', marketDate:'2025-12-05', marketTime:'09:30:00'},
    {name:'Bemidji Lakeside Market', location:'Bemidji, MN', marketDate:'2025-12-06', marketTime:'10:30:00'},
    {name:'Maple Grove Harvest Hub', location:'Maple Grove, MN', marketDate:'2025-12-07', marketTime:'09:00:00'},
    {name:'Iron Range Farmers Market', location:'Virginia, MN', marketDate:'2025-12-08', marketTime:'08:00:00'},
    {name:'Stillwater Riverfront Market', location:'Stillwater, MN', marketDate:'2025-12-09', marketTime:'09:00:00'},
    {name:'Winona Valley Market', location:'Winona, MN', marketDate:'2025-12-10', marketTime:'10:00:00'}
  ];

  const vendorData = [
    ['Maya Thompson','North Star Organics','maya@northstar.com','612-555-1001',1],
    ['Eli Becker','Riverbend Dairy','eli@riverbend.com','612-555-1002',1],
    ['Tina Nguyen','Maple Grove Honeyworks','tina@honeyworks.com','612-555-1003',1],
    ['Jamal Carter','Iron Range Produce','jamal@ironproduce.com','612-555-1004',1],
    ['Sofia Martinez','Prairie Harvest Greens','sofia@prairiegreens.com','612-555-1005',1],
    ['Liam O\'Connor','Loonsong Bakery','liam@loonsong.com','612-555-1006',1],
    ['Grace Lee','Twin Lakes Dairy','grace@twinlakes.com','612-555-1007',1],
    ['Noah Johnson','St. Cloud Spices','noah@cloudspice.com','612-555-1008',1],
    ['Ava Patel','Bemidji Berries','ava@bemidjiberries.com','612-555-1009',1],
    ['Henry Kim','Kim\'s Organic Roots','henry@organicroots.com','612-555-1010',1],
    ['Olivia Scott','Winona Wildflowers','olivia@wildflowers.com','612-555-1011',1],
    ['Daniel Green','Green Grains Co.','daniel@greengrains.com','612-555-1012',1],
    ['Chloe White','White Family Farm','chloe@whitefarm.com','612-555-1013',1],
    ['Benjamin Reed','Reed\'s Maple Syrup','ben@reedmaple.com','612-555-1014',1],
    ['Natalie Brooks','Brooks Herbal Teas','natalie@brookstea.com','612-555-1015',1],
    ['Owen Davis','Davis Dairy Goods','owen@davisdairy.com','612-555-1016',1],
    ['Isabella Flores','Flores Fresh Pick','isabella@floresfresh.com','612-555-1017',1],
    ['Logan Price','Price\'s Pickles','logan@pickles.com','612-555-1018',1],
    ['Emma Young','Young\'s Jam & Jelly','emma@youngjam.com','612-555-1019',1],
    ['William Adams','Adams Artisan Breads','william@adamsbread.com','612-555-1020',1]
  ];

  const products = [
    [1,'Honeycrisp Apples','Fruit',2.47,93],
    [1,'Organic Kale','Vegetable',1.89,60],
    [2,'Cheese Curds','Dairy',5.32,41],
    [2,'Whole Milk','Dairy',3.15,70],
    [3,'Raw Honey','Specialty',6.75,50],
    [3,'Beeswax Candles','Specialty',4.25,30],
    [4,'Sweet Corn','Vegetable',1.25,120],
    [4,'Red Potatoes','Vegetable',0.95,100],
    [5,'Spinach','Vegetable',1.65,80],
    [5,'Beets','Vegetable',1.45,75],
    [6,'Sourdough Bread','Baked Goods',4.50,40],
    [6,'Cinnamon Rolls','Baked Goods',3.25,50],
    [7,'Goat Cheese','Dairy',5.85,35],
    [7,'Yogurt Cups','Dairy',2.10,60],
    [8,'Chili Powder','Spices',3.75,45],
    [8,'Garlic Salt','Spices',2.95,55],
    [9,'Blueberries','Fruit',3.25,70],
    [9,'Raspberries','Fruit',3.45,65],
    [10,'Carrots','Vegetable',1.10,90],
    [10,'Parsnips','Vegetable',1.35,80],
    [11,'Wildflowers Bouquet','Specialty',7.50,25],
    [11,'Pressed Flower Cards','Specialty',4.00,40],
    [12,'Wild Rice','Grain',7.15,25],
    [12,'Oats','Grain',2.75,100],
    [13,'Eggs (Dozen)','Dairy',3.60,50],
    [13,'Butter Blocks','Dairy',4.80,45],
    [14,'Maple Syrup (8oz)','Specialty',6.95,40],
    [14,'Maple Candy','Specialty',3.50,30],
    [15,'Chamomile Tea','Specialty',3.89,60],
    [15,'Mint Tea','Specialty',3.75,55],
    [16,'Cream Cheese','Dairy',4.25,50],
    [16,'Greek Yogurt','Dairy',2.95,60],
    [17,'Strawberries','Fruit',3.10,85],
    [17,'Blackberries','Fruit',3.40,70],
    [18,'Dill Pickles','Specialty',4.15,45],
    [18,'Spicy Pickles','Specialty',4.35,40],
    [19,'Strawberry Jam','Specialty',3.95,60],
    [19,'Rhubarb Jelly','Specialty',4.10,50],
    [20,'Whole Wheat Bread','Baked Goods',4.25,35],
    [20,'Multigrain Rolls','Baked Goods',3.75,40],
    [1,'Zucchini','Vegetable',1.20,80],
    [2,'Cottage Cheese','Dairy',3.85,50],
    [3,'Honeycomb','Specialty',5.95,30],
    [4,'Yellow Squash','Vegetable',1.30,90],
    [5,'Turnips','Vegetable',1.15,70],
    [6,'Banana Bread','Baked Goods',4.10,45],
    [7,'Cream Milk','Dairy',3.45,55],
    [8,'Coriander','Spices',2.85,50],
    [9,'Gooseberries','Fruit',3.60,40],
    [10,'Celery','Vegetable',1.25,85]
  ];

  // Add markets
  for (const m of markets) await db.collection('markets').add(m);

  // Add vendors
  for (let i = 0; i < vendorData.length; i++){
    const v = vendorData[i];
    await db.collection('vendors').add({
      name: v[0],
      businessName: v[1],
      email: v[2],
      phone: v[3],
      approved: !!v[4],
      marketIndex: i + 1
    });
  }

  // Get vendor IDs
  const vendorDocs = await db.collection('vendors').get();
  const vendorIds = vendorDocs.docs.map(d => d.id);

  // Add products
  for (let i = 0; i < products.length; i++){
    const p = products[i];
    const vendorIndex = p[0] - 1;
    const vendorId = vendorIds[vendorIndex] || vendorIds[0];
    await db.collection('products').add({
      vendorID: vendorId,
      name: p[1],
      category: p[2],
      price: Number(p[3]),
      quantityAvailable: Number(p[4])
    });
  }
}

// Initialize sample data
initSampleDataIfEmpty();

// Load markets
loadBtn.addEventListener('click', async () => {
  marketsDiv.innerHTML = 'Loading...';
  const snap = await db.collection('markets').orderBy('marketDate').get();
  marketsDiv.innerHTML = '';
  snap.forEach(doc => {
    const m = doc.data();
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `<strong>${m.name}</strong><div><small>${m.location} — ${m.marketDate} ${m.marketTime}</small></div>`;
    div.addEventListener('click', () => loadVendors(doc.id));
    marketsDiv.appendChild(div);
  });
});

// Load vendors for a market
async function loadVendors(marketDocId){
  vendorsDiv.innerHTML='Loading...';
  productsDiv.innerHTML='';
  const vendorSnap = await db.collection('vendors').get();
  vendorsDiv.innerHTML='';
  vendorSnap.forEach(async doc => {
    const v = doc.data();
    if (v.marketIndex && v.marketIndex.toString() && (await matchesMarketIndex(v.marketIndex, marketDocId))) {
      const div = document.createElement('div');
      div.className='card';
      div.innerHTML = `<strong>${v.businessName}</strong><div><small>${v.name} — ${v.email || ''}</small></div>`;
      div.addEventListener('click', ()=> loadProducts(doc.id));
      vendorsDiv.appendChild(div);
    }
  });
}

// Helper to match market index
async function matchesMarketIndex(index, marketDocId){
  const markets = await db.collection('markets').orderBy('marketDate').get();
  const target = markets.docs[index-1];
  if (!target) return false;
  return target.id === marketDocId;
}

// Load products for a vendor
async function loadProducts(vendorId){
  productsDiv.innerHTML='Loading...';
  orderProduct.innerHTML = '<option value="">Select product</option>';
  const snap = await db.collection('products').where('vendorID','==', vendorId).get();
  const products = [];
  snap.forEach(doc => products.push({id:doc.id, ...doc.data()}));
  currentProducts = products;
  renderProducts(products);
  populateOrderSelect(products);
}

// Render product cards
function renderProducts(products){
  productsDiv.innerHTML='';
  if (!products.length){ productsDiv.innerHTML='No products'; return; }
  products.forEach(p => {
    const div = document.createElement('div');
    div.className='card';
    div.innerHTML = `
      <div class="product-meta">
        <strong>${p.name}</strong>
        <div><small>${p.category} • $${Number(p.price).toFixed(2)} • Qty: ${p.quantityAvailable}</small></div>
      </div>
      <div>
        <button class="action-btn" data-id="${p.id}">Order</button>
      </div>
    `;
    div.querySelector('.action-btn').addEventListener('click', ()=>{
      orderProduct.value = p.id;
      orderQty.value = 1;
      orderResult.innerText = '';
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    });
    productsDiv.appendChild(div);
  });
}

// Populate order select dropdown
function populateOrderSelect(products){
  orderProduct.innerHTML = '<option value="">Select product</option>';
  products.forEach(p=>{
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = `${p.name} (Qty ${p.quantityAvailable})`;
    orderProduct.appendChild(opt);
  });
}

// Global search
async function globalSearchProducts(query, category){
  productsDiv.innerHTML = 'Searching...';
  currentProducts = [];
  const snap = await db.collection('products').get();
  let products = [];
  snap.forEach(doc=>{
    const p = doc.data();
    if ((!query || p.name.toLowerCase().includes(query.toLowerCase())) &&
        (!category || p.category === category)){
      products.push({id: doc.id, ...p});
    }
  });
  currentProducts = products;
  renderProducts(products);
}

// Search and filter listeners
searchInput.addEventListener('input', ()=>{
  globalSearchProducts(searchInput.value.trim(), categorySelect.value);
});
categorySelect.addEventListener('change', ()=>{
  globalSearchProducts(searchInput.value.trim(), categorySelect.value);
});

// Place order
orderForm.addEventListener('submit', async (e)=>{
  e.preventDefault();
  const customerName = document.getElementById('customerName').value;
  const customerEmail = document.getElementById('customerEmail').value.toLowerCase();
  const customerPhone = document.getElementById('customerPhone').value;
  const productID = orderProduct.value;
  const quantity = Number(orderQty.value);
  if (!productID || quantity<=0){ orderResult.innerText='Choose product and valid qty'; return; }
  orderResult.innerText='Placing order...';
  const productRef = db.collection('products').doc(productID);

  try{
    await db.runTransaction(async t=>{
      const prodDoc = await t.get(productRef);
      if (!prodDoc.exists) throw new Error('Product not found');
      const prod = prodDoc.data();
      if (prod.quantityAvailable < quantity) throw new Error('Insufficient stock');

      const custId = encodeURIComponent(customerEmail);
      const custRef = db.collection('customers').doc(custId);
      const custDoc = await t.get(custRef);
      if (!custDoc.exists) t.set(custRef,{Name:customerName,Email:customerEmail,Phone:customerPhone,CreatedAt:firebase.firestore.FieldValue.serverTimestamp()});

      const orderRef = db.collection('orders').doc();
      t.set(orderRef,{CustomerID:custId,OrderDate:firebase.firestore.FieldValue.serverTimestamp(),Status:'Placed',CreatedAt:firebase.firestore.FieldValue.serverTimestamp()});

      const orderItemRef = db.collection('orderitems').doc();
      t.set(orderItemRef,{OrderID:orderRef.id,ProductID:productID,Quantity:quantity,PriceAtSale:prod.price,CreatedAt:firebase.firestore.FieldValue.serverTimestamp()});

      t.update(productRef,{quantityAvailable: prod.quantityAvailable - quantity});
    });

    orderResult.innerText = 'Order placed successfully';
    const updatedProd = await db.collection('products').doc(productID).get();
    const p = updatedProd.data();
    const prodIndex = currentProducts.findIndex(x=>x.id===productID);
    if (prodIndex>=0) currentProducts[prodIndex].quantityAvailable = p.quantityAvailable;
    renderProducts(currentProducts);
    populateOrderSelect(currentProducts);

  } catch(err){
    orderResult.innerText = 'Error: ' + (err.message || err);
  }
});


