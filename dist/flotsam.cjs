function t(e,i){return t=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},t(e,i)}var e=/*#__PURE__*/function(){function t(t){this.eventName=t,this.callbacks=[]}var e=t.prototype;return e.registerCallback=function(t){this.callbacks.push(t)},e.unregisterCallback=function(t){var e=this.callbacks.indexOf(t);e>-1&&this.callbacks.splice(e,1)},e.fire=function(t){this.callbacks.slice(0).forEach(function(e){e(t)})},t}(),i="flotsam-modal--is-open";module.exports=/*#__PURE__*/function(e){var s,n;function a(t){var i;return(i=e.call(this)||this).options=t,i.$input=t.el,i.data=t.data?t.data:null,i.minChars=t.minChars?t.minChars:2,i.inputPreview="boolean"!=typeof t.inputPreview||t.inputPreview,i.getData="function"==typeof t.getData?t.getData:null,i.markResults="boolean"!=typeof t.markResults||t.markResults,i.submitOnReturn="boolean"!=typeof t.submitOnReturn||t.submitOnReturn,i.hint=t.hint?t.hint:"When autocomplete results are available, use up and down arrows to review and enter to select. Touch device users, explore by touch or with swipe gestures.",i.noResultsText=t.noResultsText?t.noResultsText:"Sorry there are no results for ::term:: please search again.",i.isEmpty=!0,i.hasEmptyState=!0,i.filteredData=[],i.isOpen=!1,i.init(),i}n=e,(s=a).prototype=Object.create(n.prototype),s.prototype.constructor=s,t(s,n);var l=a.prototype;return l.setUp=function(){this.$input.setAttribute("autocomplete","off"),this.$input.setAttribute("aria-expanded","false"),this.$input.setAttribute("aria-haspopup","listbox"),this.$input.setAttribute("role","combobox"),this.$input.setAttribute("aria-autocomplete","list"),this.$input.setAttribute("aria-owns","modal-"+this.uid+"-list"),this.$input.id="flotsam-input-"+this.uid,this.$input.setAttribute("aria-describedby","assistiveHint-"+this.uid)},l.initModal=function(){this.$input.insertAdjacentHTML("afterend",this.generateModal()),this.$input.insertAdjacentHTML("afterend",this.generateAssistiveHint()),this.$input.insertAdjacentHTML("afterend",this.generateStatus()),this.$modal=document.querySelector("#modal-"+this.uid),this.$status=document.querySelector("#status-"+this.uid),this.list=this.$modal.querySelector(".flotsam-modal__list"),this.$empty=this.$modal.querySelector(".flotsam-modal__empty"),this.$modal.style.pointerEvents="none",this.$modal.style.visibility="hidden"},l.initInputCheck=function(){var t=this;this.isDisabled||this.$input.addEventListener("input",this.getData?function(i){t.value=i.target.value,t.minCharsExcceded()?(e.prototype.dispatch.call(t,"loadingData",{input:t.$input,modal:t.$modal}),t.getData(t.value).then(function(i){t.filteredData=i,e.prototype.dispatch.call(t,"loadedData",{input:t.$input,modal:t.$modal}),t.update(!0)})):t.isOpen&&t.closeModal()}:function(e){t.value=e.target.value,t.minCharsExcceded()?t.update(!1):t.isOpen&&t.closeModal()})},l.generateAssistiveHint=function(){return'\n            <div id="assistiveHint-'+this.uid+'" class="flotsam-modal__hint">\n                '+this.hint+"\n            </div>\n        "},l.generateStatus=function(){return'\n            <div id="status-'+this.uid+'" aria-role=\'status\' aria-live="polite" class="flotsam-modal__status">\n\n            </div>\n        '},l.update=function(t){var e=this;t||(this.filteredData=this.data&&0!==this.data.length?[].concat(this.data).filter(function(t){if(t.toLowerCase().includes(e.value.toLowerCase()))return t}):[]),0===this.filteredData.length?this.showEmptyState():(this.hideEmptyState(),this.generateListItems(),!1===this.isOpen&&this.openModal())},l.preventSubmit=function(t){t.preventDefault()},l.showEmptyState=function(){this.removeListItems();var t=this.noResultsText.replace("::term::",'<strong>"'+this.value+'"</strong>');this.$empty.innerHTML="<div>"+t+"</div>",this.$empty.style.display="block",this.isOpen||this.openModal()},l.hideEmptyState=function(){this.$empty.innerHTML="",this.$empty.style.display="none"},l.openModal=function(){this.isDisabled||(document.addEventListener("submit",this.preventSubmit),this.checkKey=this.checkKey.bind(this),document.addEventListener("keydown",this.checkKey,!0),this.isOpen=!0,this.$modal.style.pointerEvents="auto",this.$modal.style.visibility="visible",this.$input.classList.add(i),this.$input.setAttribute("aria-expanded","true"),e.prototype.dispatch.call(this,"openModal",{input:this.$input,modal:this.$modal}))},l.closeModal=function(){this.hideEmptyState(),this.removeListItems(),this.unsetSelected(),this.isOpen&&(document.removeEventListener("submit",this.preventSubmit),document.removeEventListener("keydown",this.checkKey,!0)),this.$modal.style.pointerEvents="none",this.$modal.style.visibility="hidden",this.$input.classList.remove(i),this.$input.focus(),this.isOpen=!1,e.prototype.dispatch.call(this,"closeModal",{input:this.$input,modal:this.$modal})},l.checkKey=function(t){"38"==t.keyCode?this.selectPrev():"40"==t.keyCode?this.selectNext():"37"==t.keyCode||"39"==t.keyCode||("27"==t.keyCode||"9"==t.keyCode?(t.preventDefault(),this.closeModal()):"13"==t.keyCode&&(t.preventDefault(),this.resultClicked(this.currentSelected),this.closeModal(),this.submitOnReturn&&this.$input.closest("form").submit()))},l.selectItem=function(){var t=this;[].concat(this.list.querySelectorAll("li")).forEach(function(i,s){s===t.currentSelected?(i.classList.add("flotsam-modal__selected-item"),i.setAttribute("aria-selected","true"),t.$input.setAttribute("aria-activedescendant",i.id),t.inputPreview&&t.setInput(i.innerText),e.prototype.dispatch.call(t,"selectKey",{selected:i.textContent.trim(),value:t.value,input:t.$input,modal:t.$modal})):(i.classList.remove("flotsam-modal__selected-item"),i.setAttribute("aria-selected","false"))})},l.selectNext=function(){this.currentSelected=null===this.currentSelected?0:this.currentSelected+1,this.selectItem()},l.selectPrev=function(){this.currentSelected=this.currentSelected-1,this.selectItem()},l.unsetSelected=function(){this.currentSelected=null;var t=[].concat(this.list.querySelectorAll("li"));this.$input.removeAttribute("aria-activedescendant"),t.forEach(function(t){t.classList.remove("flotsam-modal__selected-item")})},l.generateModal=function(){return'\n        <div class="flotsam-modal" id="modal-'+this.uid+'" >\n            <div class="flotsam-modal__inner">\n                <ul\n                    class="flotsam-modal__list"\n                    role="listbox"\n                    id="modal-'+this.uid+'-list">\n                </ul>\n                <div class="flotsam-modal__empty" style="display: none"></div>\n            </div>\n        </div>\n    '},l.generateListItems=function(){var t=this;this.unsetSelected();var e="";this.filteredData.forEach(function(i,s){var n=i;if(t.markResults){var a=new RegExp(t.value,"gi");n=i.replace(a,function(t){return"<mark>"+t+"</mark>"})}e+='\n                <li class="flotsam-modal__list-item" role="option" aria-posinset="'+(s+1)+'" aria-setsize="'+t.filteredData.length+'" aria-selected="false" id="list-item-'+s+"--"+t.uid+'" tab-index="-1">\n                    '+n+"\n                </li>"}),this.list.innerHTML=e,[].concat(this.list.querySelectorAll("li")).forEach(function(e,i){e.addEventListener("click",function(){t.resultClicked(i),t.closeModal()})})},l.removeListItems=function(){this.list.innerHTML=""},l.resultClicked=function(t){if(alert("result clicked"),t){var i=this.list.querySelectorAll("li")[t];i&&(this.setInput(i.innerText),e.prototype.dispatch.call(this,"resultClicked",{selected:i.textContent.trim(),value:this.value,input:this.$input,modal:this.$modal}))}},l.setInput=function(t){this.$input.value=t},l.triggerClose=function(){this.closeModal()},l.triggerDisable=function(){this.isDisabled=!0,this.closeModal(),e.prototype.dispatch.call(this,"disabled",{input:this.$input,modal:this.$modal})},l.triggerEnable=function(){this.isDisabled=!1},l.minCharsExcceded=function(){return this.value.length>=this.minChars},l.init=function(){var t=this;if(this._self=this,this.currentSelected=null,this.isDisabled=!1,!this.data&&!this.getData)return this.isDisabled=!0,void console.error("flotsam: no data specified",this);this.setUp(),this.initModal(),this.initInputCheck(),setTimeout(function(){e.prototype.dispatch.call(t,"init",{input:t.$input,modal:t.$modal})},0)},a}(/*#__PURE__*/function(){function t(){this.events={},this.uid=Math.floor(1e3+9e4*Math.random())}var i=t.prototype;return i.dispatch=function(t,e){var i=this.events[t];i&&i.fire(e)},i.addEventListener=function(t,i){var s=this.events[t];s||(s=new e(t),this.events[t]=s),s.registerCallback(i)},i.removeEventListener=function(t,e){var i=this.events[t];i&&i.callbacks.indexOf(e)>-1&&(i.unregisterCallback(e),0===i.callbacks.length&&delete this.events[t])},t}());
//# sourceMappingURL=flotsam.cjs.map
