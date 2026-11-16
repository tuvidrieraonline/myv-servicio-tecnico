"use strict";
const $ = s => document.querySelector(s);
const chat = mensaje => "https://wa.me/5491153088029?text=" + encodeURIComponent(mensaje);
const menu = $("#x-menu"), toggle = $(".x-burger");
function mostrarMenu(abierto) {
  menu.classList.toggle("is-open", abierto);
  toggle.setAttribute("aria-expanded", String(abierto));
  toggle.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
}
toggle.addEventListener("click", () => mostrarMenu(!menu.classList.contains("is-open")));
menu.addEventListener("click", () => mostrarMenu(false));
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && menu.classList.contains("is-open")) { mostrarMenu(false); toggle.focus(); }
});
for (const card of document.querySelectorAll(".photo-card")) {
  card.querySelector(".link").href = chat("Hola MYV, quiero consultar por el servicio de " + card.querySelector("h3").textContent.toLowerCase() + ".");
}
function procesarConsulta(e) {
  e.preventDefault();
  const form=e.currentTarget, data=new FormData(form);
  const campos=[["Nombre","nombre"],["Teléfono","telefono"],["Equipo","equipo"],["Problema","problema"]];
  const valores=[];
  for(const [label,key] of campos){
    const field=form.elements.namedItem(key), value=String(data.get(key)||"").trim();
    if(!value){
      field.setCustomValidity("Completá este campo."); field.reportValidity();
      field.addEventListener("input",()=>field.setCustomValidity(""),{once:true}); return;
    }
    valores.push(label+": "+value);
  }
  window.open(chat(["Hola MYV Servicio Técnico, quiero realizar una consulta.",...valores].join("\n")),"_blank","noopener");
  const modal=form.closest("dialog");
  if(modal?.open)modal.close();
}
document.querySelectorAll(".js-consulta-form").forEach(form=>form.addEventListener("submit",procesarConsulta));
const modal=$("#consulta-modal");
if(modal){
  modal.querySelector(".consulta-modal__close").addEventListener("click",()=>modal.close());
  modal.addEventListener("click",e=>{if(e.target===modal)modal.close();});
  if(typeof modal.showModal==="function")modal.showModal(); else modal.setAttribute("open","");
}
function el(tag, clase, texto) {
  const n=document.createElement(tag); if(clase)n.className=clase; if(texto)n.textContent=texto; return n;
}
function ficha(t) {
  const card=el("article","case"), figure=el("figure","compare"), pair=el("div","pair");
  for (const [key,label] of [["antes","Antes"],["despues","Después"]]) {
    const img=el("img"); img.src=t[key]; img.alt=label+" del servicio: "+t.equipo; img.loading="lazy"; pair.append(img);
  }
  const label=el("label",null,"Antes · Deslizá para comparar · Después"), range=el("input");
  range.type="range"; range.min="0"; range.max="100"; range.value="50";
  range.addEventListener("input",()=>pair.style.setProperty("--cut",range.value+"%"));
  label.append(range); figure.append(pair,label);
  const desc=el("div"); desc.append(el("small",null,"Ficha de servicio"),el("h3",null,t.equipo));
  if (t.descripcion) desc.append(el("p", null, t.descripcion));
  for(const [key,title] of [["problema","Problema"],["trabajo","Qué hicimos"],["resultado","Resultado"]]){
    if (!t[key]) continue;
    const p=el("p"); p.append(el("strong",null,title+": "),t[key]); desc.append(p);
  }
  card.append(figure,desc); return card;
}
const trabajos=(window.MYV?.trabajos||[]).filter(t=>t&&["equipo","antes","despues"].every(k=>t[k]?.trim()));
if(trabajos.length)$("#trabajos-lista").replaceChildren(...trabajos.map(ficha));
const opiniones=(window.MYV?.opiniones||[]).filter(o=>o?.comentario?.trim()&&o?.nombre?.trim());
if(opiniones.length)$("#opiniones-lista").replaceChildren(...opiniones.map(o=>{
  const q=el("blockquote","review"); q.append(el("p",null,"“"+o.comentario+"”"),el("cite",null,[o.nombre,o.servicio,o.origen].filter(Boolean).join(" · ")));return q;
}));
