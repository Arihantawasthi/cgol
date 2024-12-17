(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const t of s)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function i(s){const t={};return s.integrity&&(t.integrity=s.integrity),s.referrerPolicy&&(t.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?t.credentials="include":s.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(s){if(s.ep)return;s.ep=!0;const t=i(s);fetch(s.href,t)}})();const c=0,h=0;class d{constructor(e,i=20){if(!e.startsWith("#"))throw new Error("Canvas Id should start with '#' symbol");if(this.canvas=document.querySelector(e),this.canvasPadding=c,this.ctx=this.canvas.getContext("2d"),!this.ctx)throw new Error("Couldn't get canvas context");this.cellSize=i,this.rows=this.getRows(),this.cols=this.getCols(),this.resizeCanvas()}getRows(){return Math.floor(this.canvas.height/this.cellSize)}getCols(){return Math.floor(this.canvas.width/this.cellSize)}resizeCanvas(){this.canvasPadding=c,window.innerWidth<=1e3&&(this.canvasPadding=h),this.canvas.width=window.innerWidth-this.canvasPadding,this.canvas.height=window.innerHeight-this.canvasPadding,this.rows=this.getRows(),this.cols=this.getCols()}drawCell(e,i,o){this.ctx.fillStyle=o,this.ctx.fillRect(e,i,this.cellSize,this.cellSize)}}const l=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];class u{constructor(e){this.canvas=e,this.rows=this.canvas.rows,this.cols=this.canvas.cols,this.state=this.createState(this.rows,this.cols)}createState(e,i){const o=[[]];for(let t=0;t<e;t++){o[t]=[];for(let n=0;n<i;n++)o[t][n]=Math.random()<.2?1:0}return o}getNeighborCount(e,i){let o=[],s=0;for(let t=0;t<l.length;t++){o=l[t];const n=e+o[0],a=i+o[1];n<0||n>=this.rows||a<0||a>=this.cols||this.state[n][a]==1&&s++}return s}updateState(){const e=this.state.map(i=>[...i]);for(let i=0;i<e.length;i++){const o=e[i];for(let s=0;s<o.length;s++){const t=this.getNeighborCount(i,s);t<=1&&(e[i][s]=0),t>=4&&(e[i][s]=0),t==3&&(e[i][s]=1)}}this.state=e}drawAndCalculatePopuation(){let e=0;return this.state.forEach((i,o)=>{i.forEach((s,t)=>{this.state[o][t]==1&&e++,this.canvas.drawCell(t*this.canvas.cellSize,o*this.canvas.cellSize,this.state[o][t]==1?"white":"#111")})}),e}handleResize(){this.canvas.resizeCanvas(),this.rows=this.canvas.rows,this.cols=this.canvas.cols,this.state=this.createState(this.rows,this.cols),this.updateState(),this.drawAndCalculatePopuation()}}window.addEventListener("load",()=>{const r=new d("#game",10),e=new u(r);let i=1;setInterval(()=>{e.updateState();const o=e.drawAndCalculatePopuation(),s=document.querySelector("#population");s&&(s.textContent=o.toString());const t=document.querySelector("#generationCount");t&&(t.textContent=i.toString()),i++},100),window.addEventListener("resize",()=>{e.handleResize()})});