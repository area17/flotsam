class t{constructor(t){this.eventName=t,this.callbacks=[]}registerCallback(t){this.callbacks.push(t)}unregisterCallback(t){const e=this.callbacks.indexOf(t);e>-1&&this.callbacks.splice(e,1)}fire(t){this.callbacks.slice(0).forEach(e=>{e(t)})}}class e{constructor(){this.events={},this.uid=Math.floor(1e3+9e4*Math.random())}dispatch(t,e){const s=this.events[t];s&&s.fire(e)}on(e,s){let i=this.events[e];i||(i=new t(e),this.events[e]=i),i.registerCallback(s)}off(t,e){const s=this.events[t];s&&s.callbacks.indexOf(e)>-1&&(s.unregisterCallback(e),0===s.callbacks.length&&delete this.events[t])}}const s="flotsam-modal--is-open";class i extends e{constructor(t){super(),this.options=t,this.$input=t.el,this.data=t.data?t.data:null,this.minChars=t.minChars?t.minChars:2,this.inputPreview="boolean"!=typeof t.inputPreview||t.inputPreview,this.getData="function"==typeof t.getData?t.getData:null,this.markResults="boolean"!=typeof t.markResults||t.markResults,this.submitOnReturn="boolean"!=typeof t.submitOnReturn||t.submitOnReturn,this.hint=t.hint?t.hint:"When autocomplete results are available, use up and down arrows to review and enter to select. Touch device users, explore by touch or with swipe gestures.",this.noResultsText=t.noResultsText?t.noResultsText:"Sorry there are no results for ::term:: please search again.",this.hasEmptyState=!0,this.filteredData=[],this.isOpen=!1,this.currentSelected=null,this.isDisabled=!1,this.init()}setUp(){this.$input.setAttribute("autocomplete","off"),this.$input.setAttribute("aria-expanded","false"),this.$input.setAttribute("aria-haspopup","listbox"),this.$input.setAttribute("role","combobox"),this.$input.setAttribute("aria-autocomplete","list"),this.$input.setAttribute("aria-owns",`modal-${this.uid}-list`),this.$input.id=`flotsam-input-${this.uid}`,this.$input.setAttribute("aria-describedby",`assistiveHint-${this.uid}`)}initModal(){this.$input.insertAdjacentHTML("afterend",this.generateModal()),this.$input.insertAdjacentHTML("afterend",this.generateAssistiveHint()),this.$input.insertAdjacentHTML("afterend",this.generateStatus()),this.$modal=document.querySelector(`#modal-${this.uid}`),this.$status=document.querySelector(`#status-${this.uid}`),setTimeout(()=>{this.list=this.$modal.querySelector(".flotsam-modal__list"),this.$empty=this.$modal.querySelector(".flotsam-modal__empty"),this.$modal.style.pointerEvents="none",this.$modal.style.visibility="hidden"},0)}initInputCheck(){this.isDisabled||this.$input.addEventListener("input",this.getData?t=>{this.value=t.target.value,this.minCharsExcceded()?(super.dispatch("loadingData",{input:this.$input,modal:this.$modal}),this.getData(this.value).then(t=>{this.filteredData=t,super.dispatch("loadedData",{input:this.$input,modal:this.$modal}),this.update(!0)})):this.isOpen&&this.closeModal()}:t=>{this.value=t.target.value,this.minCharsExcceded()?this.update(!1):this.isOpen&&this.closeModal()})}generateAssistiveHint(){return`\n            <div id="assistiveHint-${this.uid}" class="flotsam-modal__hint">\n                ${this.hint}\n            </div>\n        `}generateStatus(){return`\n            <div id="status-${this.uid}" aria-role='status' aria-live="polite" class="flotsam-modal__status">\n            </div>\n        `}update(t){t||(this.filteredData=this.data&&0!==this.data.length?[...this.data].filter(t=>{if(t.toLowerCase().includes(this.value.toLowerCase()))return t}):[]),0===this.filteredData.length?this.showEmptyState():(this.hideEmptyState(),this.generateListItems(),!1===this.isOpen&&this.openModal())}preventSubmit(t){t.preventDefault()}showEmptyState(){this.removeListItems();const t=this.noResultsText.replace("::term::",`<strong>"${this.value}"</strong>`);this.$empty.innerHTML=`<div>${t}</div>`,this.$empty.style.display="block",this.isOpen||this.openModal()}hideEmptyState(){this.$empty.innerHTML="",this.$empty.style.display="none"}openModal(){this.isDisabled||(document.addEventListener("submit",this.preventSubmit),this.checkKey=this.checkKey.bind(this),document.addEventListener("keydown",this.checkKey,!0),this.isOpen=!0,this.$modal.style.pointerEvents="auto",this.$modal.style.visibility="visible",this.$input.classList.add(s),this.$input.setAttribute("aria-expanded","true"),super.dispatch("openModal",{input:this.$input,modal:this.$modal}))}closeModal(){this.hideEmptyState(),this.removeListItems(),this.unsetSelected(),this.isOpen&&(document.removeEventListener("submit",this.preventSubmit),document.removeEventListener("keydown",this.checkKey,!0)),this.$modal.style.pointerEvents="none",this.$modal.style.visibility="hidden",this.$input.classList.remove(s),this.$input.focus(),this.isOpen=!1,super.dispatch("closeModal",{input:this.$input,modal:this.$modal})}checkKey(t){"38"==t.keyCode?this.selectPrev():"40"==t.keyCode?this.selectNext():"37"==t.keyCode||"39"==t.keyCode||("27"==t.keyCode||"9"==t.keyCode?(t.preventDefault(),this.closeModal()):"13"==t.keyCode&&(t.preventDefault(),this.resultClicked(this.currentSelected),this.closeModal(),this.submitOnReturn&&this.$input.closest("form").submit()))}selectItem(){[...this.list.querySelectorAll("li")].forEach((t,e)=>{e===this.currentSelected?(t.classList.add("flotsam-modal__selected-item"),t.setAttribute("aria-selected","true"),this.$input.setAttribute("aria-activedescendant",t.id),this.inputPreview&&this.setInput(t.innerText),super.dispatch("selectKey",{selected:t.textContent.trim(),value:this.value,input:this.$input,modal:this.$modal})):(t.classList.remove("flotsam-modal__selected-item"),t.setAttribute("aria-selected","false"))})}selectNext(){this.currentSelected=null===this.currentSelected?0:this.currentSelected+1,this.selectItem()}selectPrev(){this.currentSelected=this.currentSelected-1,this.selectItem()}unsetSelected(){this.currentSelected=null;const t=[...this.list.querySelectorAll("li")];this.$input.removeAttribute("aria-activedescendant"),t.forEach(t=>{t.classList.remove("flotsam-modal__selected-item")})}generateModal(){return console.log("gene modal"),`\n        <div class="flotsam-modal" id="modal-${this.uid}" >\n            <div class="flotsam-modal__inner">\n                <ul\n                    class="flotsam-modal__list"\n                    role="listbox"\n                    id="modal-${this.uid}-list">\n                </ul>\n                <div class="flotsam-modal__empty" style="display: none"></div>\n            </div>\n        </div>\n    `}generateListItems(){this.unsetSelected();let t="";this.filteredData.forEach((e,s)=>{let i=e;if(this.markResults){const t=new RegExp(this.value,"gi");i=e.replace(t,t=>"<mark>"+t+"</mark>")}t+=`\n                <li class="flotsam-modal__list-item" role="option" aria-posinset="${s+1}" aria-setsize="${this.filteredData.length}" aria-selected="false" id="list-item-${s}--${this.uid}" tab-index="-1">\n                    ${i}\n                </li>`}),this.list.innerHTML=t,[...this.list.querySelectorAll("li")].forEach((t,e)=>{t.addEventListener("click",()=>{this.resultClicked(e),this.closeModal()})})}removeListItems(){this.list.innerHTML=""}resultClicked(t){if(t){const e=this.list.querySelectorAll("li")[t];e&&(super.dispatch("resultClicked",{selected:e.textContent.trim(),value:this.value,input:this.$input,modal:this.$modal}),this.setInput(e.innerText))}}setInput(t){this.$input.value=t}triggerClose(){this.closeModal()}triggerDisable(){this.isDisabled=!0,this.closeModal(),super.dispatch("disabled",{input:this.$input,modal:this.$modal})}triggerEnable(){this.isDisabled=!1}minCharsExcceded(){return this.value.length>=this.minChars}init(){if(!this.data&&!this.getData)return this.isDisabled=!0,void console.error("flotsam: no data specified",this);this.setUp(),this.initModal(),this.initInputCheck(),setTimeout(()=>{super.dispatch("init",{input:this.$input,modal:this.$modal})},0)}}export{i as default};
//# sourceMappingURL=flotsam.modern.js.map
