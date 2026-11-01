const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
const dataDir = path.join(__dirname, 'data');
const bookingsFile = path.join(dataDir, 'bookings.json');
fs.mkdirSync(dataDir, { recursive: true });
if (!fs.existsSync(bookingsFile)) fs.writeFileSync(bookingsFile, '[]');
app.use(express.json({limit:'1mb'}));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/api/health', (req,res) => res.json({ok:true, studio:'МамаПлюс'}));
app.post('/api/bookings', (req,res) => {
 const {name,phone,program,preferredTime,childAge,comment,consent}=req.body||{};
 if(!name||!phone||!program||!consent) return res.status(400).json({error:'Заполните обязательные поля и подтвердите согласие.'});
 let list=[]; try{list=JSON.parse(fs.readFileSync(bookingsFile,'utf8'));}catch{}
 list.unshift({id:Date.now().toString(36),name,phone,program,preferredTime,childAge,comment,status:'Новая',createdAt:new Date().toISOString()});
 fs.writeFileSync(bookingsFile,JSON.stringify(list,null,2));
 res.status(201).json({ok:true,message:'Заявка принята! Мы свяжемся с вами для подтверждения.'});
});
app.listen(PORT,'0.0.0.0',()=>console.log('МамаПлюс запущен на порту '+PORT));
