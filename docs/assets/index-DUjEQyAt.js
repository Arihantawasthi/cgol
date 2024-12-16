(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))o(s);new MutationObserver(s=>{for(const e of s)if(e.type==="childList")for(const r of e.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&o(r)}).observe(document,{childList:!0,subtree:!0});function i(s){const e={};return s.integrity&&(e.integrity=s.integrity),s.referrerPolicy&&(e.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?e.credentials="include":s.crossOrigin==="anonymous"?e.credentials="omit":e.credentials="same-origin",e}function o(s){if(s.ep)return;s.ep=!0;const e=i(s);fetch(s.href,e)}})();const c=300,l=100;class d{constructor(t,i=20){if(!t.startsWith("#"))throw new Error("Canvas Id should start with '#' symbol");if(this.canvas=document.querySelector(t),this.canvasPadding=c,this.ctx=this.canvas.getContext("2d"),!this.ctx)throw new Error("Couldn't get canvas context");this.cellSize=i,this.rows=this.getRows(),this.cols=this.getCols(),this.resizeCanvas()}getRows(){return Math.floor(this.canvas.height/this.cellSize)}getCols(){return Math.floor(this.canvas.width/this.cellSize)}resizeCanvas(){this.canvasPadding=c,window.innerWidth<=1e3&&(this.canvasPadding=l),this.canvas.width=window.innerWidth-this.canvasPadding,this.canvas.height=window.innerHeight-this.canvasPadding,this.rows=this.getRows(),this.cols=this.getCols()}drawCell(t,i,o){this.ctx.fillStyle=o,this.ctx.fillRect(t,i,this.cellSize,this.cellSize)}}const h=[[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]];class f{constructor(t){this.canvas=t,this.rows=this.canvas.rows,this.cols=this.canvas.cols,this.state=this.createState(this.rows,this.cols)}createState(t,i){const o=[[]];for(let e=0;e<t;e++){o[e]=[];for(let r=0;r<i;r++)o[e][r]=Math.random()<.2?1:0}return o[1][2]=1,o[2][3]=1,o[3][1]=1,o[3][2]=1,o[3][3]=1,o}getNeighborCount(t,i){let o=[],s=0;for(let e=0;e<h.length;e++){o=h[e];const r=t+o[0],a=i+o[1];r<0||r>=this.rows||a<0||a>=this.cols||this.state[r][a]==1&&s++}return s}updateState(){const t=this.state.map(i=>[...i]);for(let i=0;i<t.length;i++){const o=t[i];for(let s=0;s<o.length;s++){const e=this.getNeighborCount(i,s);e<=1&&(t[i][s]=0),e>=4&&(t[i][s]=0),e==3&&(t[i][s]=1)}}this.state=t}draw(){this.state.forEach((t,i)=>{t.forEach((o,s)=>{this.canvas.drawCell(s*this.canvas.cellSize,i*this.canvas.cellSize,this.state[i][s]==1?"white":"#1b1b1b")})})}handleResize(){this.canvas.resizeCanvas(),this.rows=this.canvas.rows,this.cols=this.canvas.cols,this.state=this.createState(this.rows,this.cols),this.updateState(),this.draw()}}window.addEventListener("load",()=>{const n=new d("#game",20),t=new f(n);setInterval(()=>{t.updateState(),t.draw()},100),window.addEventListener("resize",()=>{t.handleResize()})});
