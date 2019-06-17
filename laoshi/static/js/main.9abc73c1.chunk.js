(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,,,function(t,e,n){t.exports=n(21)},,,,,,function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},function(t,e,n){},,function(t,e,n){"use strict";n.r(e);var a=n(1),i=n(2),r=n(4),c=n(3),o=n(5),s=n(0),l=n.n(s),u=n(7),h=n.n(u),p=(n(15),n(16),function(t){function e(){var t,n;Object(a.a)(this,e);for(var i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];return(n=Object(r.a)(this,(t=Object(c.a)(e)).call.apply(t,[this].concat(o)))).state={size:32},n.updateSize=function(){var t=document.getElementById("CharacterContainer"),e=document.getElementById("Char"),n=t.clientWidth,a=e.textContent.length,i=n/(a>1?1.5*a:3);e.style.fontSize=i+"px"},n}return Object(o.a)(e,t),Object(i.a)(e,[{key:"componentDidMount",value:function(){this.updateSize()}},{key:"componentDidUpdate",value:function(){this.updateSize()}},{key:"render",value:function(){return l.a.createElement("section",{id:"CharacterContainer",className:"Character"},l.a.createElement("h1",{id:"Char"},this.props.char))}}]),e}(l.a.Component)),d=(n(17),function(t){function e(){var t,n;Object(a.a)(this,e);for(var i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];return(n=Object(r.a)(this,(t=Object(c.a)(e)).call.apply(t,[this].concat(o)))).clear=function(){n.input.value=""},n}return Object(o.a)(e,t),Object(i.a)(e,[{key:"render",value:function(){var t=this;return l.a.createElement("section",{className:"AnswerInput"},l.a.createElement("label",null,this.props.label,":",l.a.createElement("span",{className:"correct tip"}," ",this.props.tip),l.a.createElement("input",{type:"text",ref:function(e){return t.input=e},onChange:this.props.onChange})))}}]),e}(l.a.Component)),f=(n(18),function(t,e){setTimeout(e,1e3*t)}),m=function(t){return console.log(typeof t),t.length>0&&(t=t.charAt(0).toUpperCase()+t.substring(1)),t},b=function(t){function e(){var t,n;Object(a.a)(this,e);for(var i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];return(n=Object(r.a)(this,(t=Object(c.a)(e)).call.apply(t,[this].concat(o)))).state={show:!0,pinyinAnswer:"",pinyinTip:"",englishAnswer:"",englishTip:""},n.updatePinyin=function(t){n.setState({pinyinAnswer:t.target.value.toLowerCase()})},n.updateTranslation=function(t){n.setState({englishAnswer:t.target.value.toLowerCase()})},n.check=function(t){t.preventDefault(),document.activeElement.blur();var e=n.props.card.pinyin.includes(n.state.pinyinAnswer),a=n.props.card.english.includes(n.state.englishAnswer);n.setState({pinyinTip:m(n.props.card.pinyin[0])}),n.setState({englishTip:m(n.props.card.english[0])});var i=e&&a;f(.5,function(){i&&n.setState({show:!1},function(){f(.5,function(){n.props.nextCard(),n.setState({show:!0,pinyinTip:"",englishTip:""}),n.pinyinInput.clear(),n.englishInput.clear()})})})},n}return Object(o.a)(e,t),Object(i.a)(e,[{key:"render",value:function(){var t=this;return l.a.createElement("div",{className:"Card ".concat(this.state.show?"slide-in":"slide-out")},l.a.createElement(p,{char:this.props.card.character}),l.a.createElement("form",null,l.a.createElement(d,{label:"Pinyin",onChange:this.updatePinyin,ref:function(e){return t.pinyinInput=e},tip:this.state.pinyinTip}),l.a.createElement(d,{label:"Translation",onChange:this.updateTranslation,ref:function(e){return t.englishInput=e},tip:this.state.englishTip}),l.a.createElement("button",{type:"submit",onClick:this.check},"Check")))}}]),e}(l.a.Component),g=(n(19),n(8)),y=function(t){function e(){return Object(a.a)(this,e),Object(r.a)(this,Object(c.a)(e).apply(this,arguments))}return Object(o.a)(e,t),Object(i.a)(e,[{key:"render",value:function(){return l.a.createElement("ul",{className:"Navbar"},l.a.createElement("li",{className:"brand"},l.a.createElement("a",{href:"https://github.com/AdamCollins/laoshi"},this.props.brand)),l.a.createElement("li",{className:"badge"},l.a.createElement(g.a,{href:"https://github.com/AdamCollins/laoshi","data-size":"large","data-show-count":"true","aria-label":"Star AdamCollins/laoshi on GitHub"},"Star")))}}]),e}(l.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var v=function(t){function e(){var t,n;Object(a.a)(this,e);for(var i=arguments.length,o=new Array(i),s=0;s<i;s++)o[s]=arguments[s];return(n=Object(r.a)(this,(t=Object(c.a)(e)).call.apply(t,[this].concat(o)))).state={loading:!0,cards:[]},n.nextCard=function(){n.setState({index:(n.state.index+1)%n.state.cards.length})},n}return Object(o.a)(e,t),Object(i.a)(e,[{key:"componentDidMount",value:function(){var t=this;this.setState({loading:!0}),fetch("data/vocab.json").then(function(t){return t.json()}).then(function(e){return t.setState({cards:e,loading:!1,index:Math.floor(Math.random()*e.length)})})}},{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement(y,{brand:"\u8001\u5e08."}),this.state.loading?"...":l.a.createElement(b,{card:this.state.cards[this.state.index],nextCard:this.nextCard}))}}]),e}(l.a.Component);h.a.render(l.a.createElement(v,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}],[[9,1,2]]]);
//# sourceMappingURL=main.9abc73c1.chunk.js.map