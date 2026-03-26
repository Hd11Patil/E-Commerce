import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import './AdminPanel.css';

const TABS = ['Dashboard','Products','Orders','Add Product'];

const AdminPanel = ({ onClose }) => {
  const { products, orders, addProduct, deleteProduct, updateProduct } = useApp();
  const [tab, setTab] = useState('Dashboard');
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ brand:'', name:'', price:'', originalPrice:'', discount:'', category:'Women', emoji:'👗', color:'#fce4ec', stock:'' });
  const [editForm, setEditForm] = useState({});
  const [msg, setMsg] = useState('');

  const totalRevenue = orders.filter(o=>o.status==='Delivered').reduce((s,o)=>s+o.amount,0);
  const statusColor = s => ({Delivered:'#2e7d32',Processing:'#e65100',Shipped:'#1565c0',Cancelled:'#c62828'}[s]||'#666');

  const handleAdd = () => {
    if(!form.brand||!form.name||!form.price){setMsg('Please fill required fields.');return;}
    addProduct({...form, price:+form.price, originalPrice:+form.originalPrice, discount:+form.discount, stock:+form.stock});
    setForm({brand:'',name:'',price:'',originalPrice:'',discount:'',category:'Women',emoji:'👗',color:'#fce4ec',stock:''});
    setMsg('✅ Product added!'); setTimeout(()=>setMsg(''),3000);
  };

  const startEdit = (p) => { setEditId(p.id); setEditForm({...p}); };
  const saveEdit = () => { updateProduct(editId, {...editForm, price:+editForm.price, originalPrice:+editForm.originalPrice, discount:+editForm.discount, stock:+editForm.stock}); setEditId(null); setMsg('✅ Updated!'); setTimeout(()=>setMsg(''),3000); };

  return (
    <div className="admin-overlay">
      <div className="admin-panel">
        {/* Header */}
        <div className="admin-header">
          <div className="admin-title">
            <span className="admin-logo">⚙️</span>
            <div><h2>Admin Panel</h2><p>Nykaa Fashion Management</p></div>
          </div>
          <button className="admin-close" onClick={onClose}>✕</button>
        </div>

        {/* Tabs */}
        <div className="admin-tabs">
          {TABS.map(t=><button key={t} className={`admin-tab${tab===t?' active':''}`} onClick={()=>setTab(t)}>{t}</button>)}
        </div>

        {msg && <div className="admin-msg">{msg}</div>}

        <div className="admin-body">

          {/* DASHBOARD */}
          {tab==='Dashboard' && (
            <div className="dash-content">
              <div className="dash-stats">
                <div className="stat-card pink"><div className="stat-icon">📦</div><div><p className="stat-val">{products.length}</p><p className="stat-label">Total Products</p></div></div>
                <div className="stat-card blue"><div className="stat-icon">🛒</div><div><p className="stat-val">{orders.length}</p><p className="stat-label">Total Orders</p></div></div>
                <div className="stat-card green"><div className="stat-icon">✅</div><div><p className="stat-val">{orders.filter(o=>o.status==='Delivered').length}</p><p className="stat-label">Delivered</p></div></div>
                <div className="stat-card gold"><div className="stat-icon">💰</div><div><p className="stat-val">₹{totalRevenue.toLocaleString()}</p><p className="stat-label">Revenue</p></div></div>
              </div>
              <div className="dash-bottom">
                <div className="dash-recent">
                  <h3>Recent Orders</h3>
                  <table className="admin-table">
                    <thead><tr><th>Order</th><th>Customer</th><th>Amount</th><th>Status</th></tr></thead>
                    <tbody>{orders.slice(0,5).map(o=>(
                      <tr key={o.id}>
                        <td className="order-id">{o.id}</td>
                        <td>{o.customer}</td>
                        <td>₹{o.amount.toLocaleString()}</td>
                        <td><span className="status-badge" style={{background:statusColor(o.status)+'22',color:statusColor(o.status)}}>{o.status}</span></td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
                <div className="dash-quick">
                  <h3>Quick Stats</h3>
                  <div className="quick-list">
                    <div className="quick-item"><span>Low Stock (&lt;10)</span><span className="quick-val red">{products.filter(p=>p.stock<10).length} items</span></div>
                    <div className="quick-item"><span>Processing Orders</span><span className="quick-val orange">{orders.filter(o=>o.status==='Processing').length}</span></div>
                    <div className="quick-item"><span>Shipped Orders</span><span className="quick-val blue">{orders.filter(o=>o.status==='Shipped').length}</span></div>
                    <div className="quick-item"><span>Cancelled Orders</span><span className="quick-val red">{orders.filter(o=>o.status==='Cancelled').length}</span></div>
                    <div className="quick-item"><span>Categories</span><span className="quick-val">{[...new Set(products.map(p=>p.category))].length}</span></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PRODUCTS */}
          {tab==='Products' && (
            <div className="table-wrap">
              <table className="admin-table full">
                <thead><tr><th>Item</th><th>Brand</th><th>Category</th><th>Price</th><th>Stock</th><th>Discount</th><th>Actions</th></tr></thead>
                <tbody>
                  {products.map(p=>(
                    <tr key={p.id}>
                      {editId===p.id ? (
                        <>
                          <td><input className="edit-input" value={editForm.name} onChange={e=>setEditForm({...editForm,name:e.target.value})} /></td>
                          <td><input className="edit-input" value={editForm.brand} onChange={e=>setEditForm({...editForm,brand:e.target.value})} /></td>
                          <td><select className="edit-input" value={editForm.category} onChange={e=>setEditForm({...editForm,category:e.target.value})}><option>Women</option><option>Men</option><option>Kids</option></select></td>
                          <td><input className="edit-input" type="number" value={editForm.price} onChange={e=>setEditForm({...editForm,price:e.target.value})} /></td>
                          <td><input className="edit-input" type="number" value={editForm.stock} onChange={e=>setEditForm({...editForm,stock:e.target.value})} /></td>
                          <td><input className="edit-input" type="number" value={editForm.discount} onChange={e=>setEditForm({...editForm,discount:e.target.value})} /></td>
                          <td className="action-btns">
                            <button className="btn-save" onClick={saveEdit}>💾 Save</button>
                            <button className="btn-cancel" onClick={()=>setEditId(null)}>✕</button>
                          </td>
                        </>
                      ):(
                        <>
                          <td><span style={{fontSize:18,marginRight:8}}>{p.emoji}</span>{p.name}</td>
                          <td>{p.brand}</td>
                          <td><span className="cat-tag">{p.category}</span></td>
                          <td>₹{p.price.toLocaleString()}</td>
                          <td><span className={`stock-badge${p.stock<10?' low':''}`}>{p.stock}</span></td>
                          <td><span className="disc-tag">{p.discount}%</span></td>
                          <td className="action-btns">
                            <button className="btn-edit" onClick={()=>startEdit(p)}>✏️</button>
                            <button className="btn-del" onClick={()=>deleteProduct(p.id)}>🗑️</button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ORDERS */}
          {tab==='Orders' && (
            <div className="table-wrap">
              <table className="admin-table full">
                <thead><tr><th>Order ID</th><th>Customer</th><th>Product</th><th>Amount</th><th>Date</th><th>Status</th></tr></thead>
                <tbody>
                  {orders.map(o=>(
                    <tr key={o.id}>
                      <td className="order-id">{o.id}</td>
                      <td>{o.customer}</td>
                      <td>{o.product}</td>
                      <td>₹{o.amount.toLocaleString()}</td>
                      <td>{o.date}</td>
                      <td><span className="status-badge" style={{background:statusColor(o.status)+'22',color:statusColor(o.status)}}>{o.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ADD PRODUCT */}
          {tab==='Add Product' && (
            <div className="add-form">
              <h3>Add New Product</h3>
              <div className="form-grid">
                {[['Brand *','brand','text'],['Product Name *','name','text'],['Price *','price','number'],['Original Price','originalPrice','number'],['Discount %','discount','number'],['Stock','stock','number']].map(([label,key,type])=>(
                  <div className="form-group" key={key}>
                    <label>{label}</label>
                    <input type={type} value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})} placeholder={label.replace(' *','')} />
                  </div>
                ))}
                <div className="form-group">
                  <label>Category</label>
                  <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})}>
                    <option>Women</option><option>Men</option><option>Kids</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Emoji</label>
                  <input value={form.emoji} onChange={e=>setForm({...form,emoji:e.target.value})} placeholder="e.g. 👗" />
                </div>
                <div className="form-group">
                  <label>Card Color</label>
                  <div className="color-row">
                    <input type="color" value={form.color} onChange={e=>setForm({...form,color:e.target.value})} />
                    <span>{form.color}</span>
                  </div>
                </div>
              </div>
              <div className="form-preview">
                <p>Preview:</p>
                <div className="preview-card" style={{background:form.color}}>
                  <span style={{fontSize:48}}>{form.emoji||'👗'}</span>
                  <div><strong>{form.brand||'Brand'}</strong> — {form.name||'Product Name'}</div>
                  <div>₹{form.price||'0'} <span style={{color:'var(--pink)'}}>{form.discount}% off</span></div>
                </div>
              </div>
              <button className="btn-add-product" onClick={handleAdd}>+ Add Product to Store</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
export default AdminPanel;
