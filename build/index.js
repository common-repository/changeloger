(()=>{"use strict";var e,t={366:()=>{const e=window.wp.element,t=window.wp.blocks,o=window.wp.i18n,n=window.lodash,a=window.wp.components,r=window.wp.blockEditor,l=window.wp.primitives,s=(0,e.createElement)(l.SVG,{xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 24 24"},(0,e.createElement)(l.Path,{d:"M18 11.2h-5.2V6h-1.6v5.2H6v1.6h5.2V18h1.6v-5.2H18z"})),c=(window.React,window.wp.data);class i{constructor(e){this.changelog=e,this.datePattern=/\b(\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}|\d{4}-\d{2}-\d{2}|\d{1,2} \w+ \d{4})\b/,this.versionPattern=/(?:[vV]?\s*)?(\d+(\.\d+){0,3})(?:\s*\(.*\))?/}parseSection(e){const t=e.split("\n").filter((e=>""!==e.trim()));if(!(t.length>1))return!1;const o=t[0].trim(),n=this.datePattern.exec(o),a=this.versionPattern.exec(o);if(!a)return!1;const r=a[1].trim(),l=t.slice(1);return{version:r,date:n?n[0]:null,changes:this.parseChanges(l)}}parseChanges(e){const t=[];return e.forEach((e=>{if(""===e.trim())return;const o=e.indexOf(":"),n=e.indexOf(" - "),a=-1!==o&&(-1===n||o<n)?o:n;if(-1!==a){let o=e.substring(0,a).trim();o=o.replace(/^[*->=]+/,"").trim();const r=e.substring(a+(a===n?3:1)).trim();t.push({category:o,change:this.processLinks(r)})}else if(e.trim().startsWith("*")){let o=e.trim().replace(/^[*\s-]+/,""),n=o.indexOf(" - ");if(-1!==n){let e=o.substring(0,n).trim(),a=o.substring(n+3).trim();t.push({category:e,change:this.processLinks(a)})}else t.push({category:"General",change:this.processLinks(o)})}else if(e.trim().startsWith("*")){let o=e.trim().replace(/^[*\s-]+/,"");t.push({category:"General",change:this.processLinks(o)})}})),t}processLinks(e){return e.replace(/\[(.*?)\]\((.*?)\)/g,'<a href="$2">$1</a>')}parse(){const e=this.changelog.replace(/\n\s*(?=\n.*:)/g,"").split(/\n(?=\s*\d{2} \w+ \d{4}|\s*=+\s*[\d.]+|v[\d.]+|#*\s*[\d.]+|-{1,12}\s*[\d.]+\s*\(.*\)\s*-{1,12})/),t=[];return e.forEach((e=>{const o=this.parseSection(e);o&&t.push(o)})),t}getVersion(e){const t=this.parse();for(const o of t)if(o.version===e)return o;return null}normalizeVersion(e){const t=e.split(".");for(;"0"===t[t.length-1];)t.pop();return t.join(".")}getParentVersion(e){const t=e.split(".");return t.length<=1?null:(t.pop(),t.join("."))}getVersions(){const e=this.parse(),t=[],o={},n=new Set;return e.forEach((e=>{const n=this.normalizeVersion(e.version);o[n]={...e,children:[]},t.push(o[n])})),e.forEach((e=>{const t=this.getParentVersion(this.normalizeVersion(e.version));t&&o[t]&&(o[t].children.push(e),n.add(e.version))})),t.filter((e=>!n.has(e.version)))}}const g=function(t){return(()=>{const e=[];return t.changelog.forEach((t=>{const o=[];t.changes.forEach((t=>{e.includes(t.category)||o.includes(t.category)||o.push(t.category)})),e.push(...o)})),e})().map(((o,r)=>{const l=(0,n.get)(t.value,o.toLowerCase(),"");return(0,e.createElement)(a.BaseControl,{key:r,label:o.concat(" Color")},(0,e.createElement)(a.ColorPalette,{value:l,colors:t.colors,onChange:e=>t.onChange({...t.value,[o.toLowerCase()]:e})}))}))},p=function(t){const{attributes:n,setAttributes:l}=t,{perPage:s,changelog:p,enableVersions:m,paginationType:h,enablePagination:E,versionsPosition:f,paginationBgColor:u,customLogTypeColors:d,paginationTextColor:C,paginationActiveBgColor:v,paginationActiveTextColor:D}=n,_=[{label:(0,o.__)("Left","changeloger"),value:"left"},{label:(0,o.__)("Right","changeloger"),value:"right"}],{defaultColors:b}=(0,c.useSelect)((e=>({defaultColors:e("core/block-editor")?.getSettings()?.__experimentalFeatures?.color?.palette?.default}))),w=new i(p).parse();return(0,e.createElement)(r.InspectorControls,null,(0,e.createElement)(a.PanelBody,{title:(0,o.__)("General","changeloger")},(0,e.createElement)(a.ToggleControl,{label:(0,o.__)("Sidebar Versions","changeloger"),checked:m,onChange:()=>l({enableVersions:!m})}),m&&(0,e.createElement)(a.__experimentalToggleGroupControl,{isBlock:!0,value:f,label:(0,o.__)("Versions Position","changeloger")},_.map((t=>(0,e.createElement)(a.__experimentalToggleGroupControlOption,{value:t.value,label:t.label,onClick:()=>l({versionsPosition:t.value})})))),(0,e.createElement)(a.ToggleControl,{label:(0,o.__)("Pagination","changeloger"),checked:E,onChange:()=>l({enablePagination:!E})}),E&&(0,e.createElement)(e.Fragment,null,(0,e.createElement)(a.SelectControl,{label:(0,o.__)("Pagination Type","changeloger"),value:h,options:[{label:"Load More",value:"load-more"},{label:"Numbered",value:"numbered"}],onChange:e=>l({paginationType:e}),__nextHasNoMarginBottom:!0}),(0,e.createElement)(a.TextControl,{label:(0,o.__)("Per Page","changeloger"),value:s.toString(),type:"number",onChange:e=>l({perPage:Number(e)})}))),(0,e.createElement)(a.PanelBody,{title:(0,o.__)("Log Tags Color","changeloger"),initialOpen:!1},(0,e.createElement)(g,{changelog:w,colors:b,value:d,onChange:e=>{l({customLogTypeColors:e})}})),(0,e.createElement)(a.PanelBody,{title:(0,o.__)("Pagination Styling","changeloger"),initialOpen:!1},E&&(0,e.createElement)(e.Fragment,null,(0,e.createElement)(a.BaseControl,{label:(0,o.__)("Pagination Text Color","changeloger")},(0,e.createElement)(a.ColorPalette,{colors:b,value:C,onChange:e=>l({paginationTextColor:e})})),(0,e.createElement)(a.BaseControl,{label:(0,o.__)("Pagination Bg Color","changeloger")},(0,e.createElement)(a.ColorPalette,{colors:b,value:u,onChange:e=>l({paginationBgColor:e})})),"numbered"===h&&(0,e.createElement)(e.Fragment,null,(0,e.createElement)(a.BaseControl,{label:(0,o.__)("Pagination Active Text Color","changeloger")},(0,e.createElement)(a.ColorPalette,{colors:b,value:D,onChange:e=>l({paginationActiveTextColor:e})})),(0,e.createElement)(a.BaseControl,{label:(0,o.__)("Pagination Active Bg Color","changeloger")},(0,e.createElement)(a.ColorPalette,{colors:b,value:v,onChange:e=>l({paginationActiveBgColor:e})}))))))},m=(0,e.createElement)(l.SVG,{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},(0,e.createElement)(l.Path,{d:"M4 9v1.5h16V9H4zm12 5.5h4V13h-4v1.5zm-6 0h4V13h-4v1.5zm-6 0h4V13H4v1.5z"})),h=function(t){const{attributes:n,setAttributes:r}=t,{changelog:l,showPlaceholder:s,showTextArea:c}=n;return(0,e.createElement)(e.Fragment,null,s&&(0,e.createElement)(a.Placeholder,{icon:m,className:"changelogger-placeholder",label:(0,o.__)("Changeloger","changeloger"),instructions:(0,o.__)("Paste your changelog here, or upload changelog from a text file.","changeloger")},(0,e.createElement)(a.FormFileUpload,{variant:"secondary",accept:"text/plain",onChange:e=>(e=>{const t=new FileReader;t.onload=e=>{const t=e.target.result;r({changelog:t,showPlaceholder:!1})},t.readAsText(e.target.files[0])})(e)},(0,o.__)("Upload Changelog (.txt file)","changeloger")),(0,e.createElement)(a.Button,{variant:"primary",onClick:()=>r({showPlaceholder:!1,showTextArea:!0})},(0,o.__)("Plain Text","changeloger"))),!s&&c&&(0,e.createElement)(e.Fragment,null,(0,e.createElement)(a.TextareaControl,{label:(0,o.__)("Paste your changelog Here","changeloger"),rows:20,value:l,onChange:e=>r({changelog:e})}),(0,e.createElement)(a.Button,{className:"placeholder-cancel-button",variant:"secondary",onClick:()=>r({showPlaceholder:!0})},(0,o.__)("Cancel","changeloger")),(0,e.createElement)(a.Button,{variant:"primary",onClick:()=>r({showTextArea:!1})},(0,o.__)("View Visual Changelogs","changeloger"))))},E=function(t){const{attributes:n,setAttributes:l}=t;return(0,e.createElement)(r.BlockControls,null,(0,e.createElement)(a.ToolbarGroup,null,(0,e.createElement)(a.ToolbarButton,{onClick:()=>l({showTextArea:!0})},(0,o.__)("Edit",""))))},f=function(t){const[r,l]=(0,e.useState)(!1),{action:s,currentLinks:c,customLinks:i,setAttributes:g,version:p}=t;return!(0,n.isEmpty)(s)&&(0,e.createElement)("div",{className:"changeloger-link-item"},(0,e.createElement)("a",{className:"changeloger-custom-link",href:"#",onClick:e=>(e=>{e.preventDefault(),l(!0)})(e)},!(0,n.isEmpty)(s.icon)&&(0,e.createElement)("span",{className:"changeloger-custom-link-icon",style:{WebkitMaskImage:`url(${s.icon})`}}),s.name),r&&(0,e.createElement)(a.Modal,{title:"Customise Link",onRequestClose:()=>l(!1),shouldCloseOnClickOutside:!1},(0,e.createElement)(a.TextControl,{label:(0,o.__)("Text","changeloger"),value:s?.name,onChange:e=>g({customLinks:{...i,[p]:c.map(((o,n)=>n!==t.index?o:{...o,name:e}))}})}),(0,e.createElement)(a.TextControl,{label:(0,o.__)("Link","changeloger"),value:s?.link,onChange:e=>g({customLinks:{...i,[p]:c.map(((o,n)=>n!==t.index?o:{...o,link:e}))}})}),(0,e.createElement)(a.FormFileUpload,{variant:"secondary",accept:"image/*",onChange:e=>(e=>{const o=new FileReader;o.onload=e=>{const o=e.target.result;let n="data:image/svg+xml;base64,"+window.btoa(o);g({customLinks:{...i,[p]:c.map(((e,o)=>o!==t.index?e:{...e,icon:n}))}}),l(!1)},o.readAsText(e.target.files[0])})(e)},(0,o.__)("Upload Icon","changeloger")),(0,e.createElement)("div",{style:{display:"flex",justifyContent:"flex-end",marginTop:"20px"}},(0,e.createElement)(a.Button,{style:{marginRight:"10px"},isDestructive:!0,onClick:()=>{g({customLinks:{...i,[p]:c.filter(((e,o)=>o!==t.index))}}),l(!1)}},(0,o.__)("Delete","changeloger")),(0,e.createElement)(a.Button,{variant:"primary",onClick:()=>l(!1)},(0,o.__)("Save","changeloger")))))},u=function t(o){var n;return(0,e.createElement)("ul",{className:null!==(n=!o?.isChild)&&void 0!==n&&n?"changeloger-version-list-wrapper":""},o.versions.map((o=>{const n=o?.children?.length>0;return(0,e.createElement)("li",null,"Version ",o.version,n?(0,e.createElement)(t,{isChild:!0,versions:o?.children}):null)})))},d=JSON.parse('{"u2":"block/changeloger"}');(0,t.registerBlockType)(d.u2,{icon:{src:(0,e.createElement)("svg",{width:"20",height:"20",viewBox:"0 0 77 77",fill:"none",xmlns:"http://www.w3.org/2000/svg"},(0,e.createElement)("path",{d:"M70.9 76.2455H5.34545C2.3939 76.2455 0 73.8516 0 70.9V5.34545C0 2.3939 2.3939 0 5.34545 0H70.9C73.8516 0 76.2455 2.3939 76.2455 5.34545V70.9C76.2455 73.8516 73.8516 76.2455 70.9 76.2455Z",fill:"#29235C"}),(0,e.createElement)("path",{d:"M44.0745 14.8029H28.1813C27.8623 14.8029 27.6011 14.5442 27.6011 14.2227V12.3437C27.6011 12.0247 27.8598 11.7635 28.1813 11.7635H44.0745C44.3935 11.7635 44.6548 12.0222 44.6548 12.3437V14.2227C44.6523 14.5442 44.3935 14.8029 44.0745 14.8029Z",fill:"url(#paint0_linear_1355_1437)"}),(0,e.createElement)("path",{d:"M66.8228 21.1105H28.1813C27.8623 21.1105 27.6011 20.8518 27.6011 20.5303V18.6513C27.6011 18.3323 27.8598 18.071 28.1813 18.071H66.8228C67.1418 18.071 67.4031 18.3298 67.4031 18.6513V20.5303C67.4005 20.8493 67.1418 21.1105 66.8228 21.1105Z",fill:"url(#paint1_linear_1355_1437)"}),(0,e.createElement)("path",{d:"M61.1659 27.4155H28.1813C27.8623 27.4155 27.6011 27.1567 27.6011 26.8352V24.9563C27.6011 24.6373 27.8598 24.376 28.1813 24.376H61.1659C61.4849 24.376 61.7461 24.6347 61.7461 24.9563V26.8352C61.7461 27.1567 61.4874 27.4155 61.1659 27.4155Z",fill:"url(#paint2_linear_1355_1437)"}),(0,e.createElement)("path",{d:"M55.5542 33.7206H28.1813C27.8623 33.7206 27.6011 33.4618 27.6011 33.1403V31.2614C27.6011 30.9423 27.8598 30.6811 28.1813 30.6811H55.5542C55.8732 30.6811 56.1344 30.9398 56.1344 31.2614V33.1403C56.1344 33.4618 55.8757 33.7206 55.5542 33.7206Z",fill:"url(#paint3_linear_1355_1437)"}),(0,e.createElement)("path",{d:"M44.0745 45.562H28.1813C27.8623 45.562 27.6011 45.3032 27.6011 44.9817V43.1028C27.6011 42.7837 27.8598 42.5225 28.1813 42.5225H44.0745C44.3935 42.5225 44.6548 42.7812 44.6548 43.1028V44.9817C44.6523 45.3007 44.3935 45.562 44.0745 45.562Z",fill:"url(#paint4_linear_1355_1437)"}),(0,e.createElement)("path",{d:"M66.8228 51.867H28.1813C27.8623 51.867 27.6011 51.6083 27.6011 51.2868V49.4078C27.6011 49.0888 27.8598 48.8275 28.1813 48.8275H66.8228C67.1418 48.8275 67.4031 49.0863 67.4031 49.4078V51.2868C67.4005 51.6083 67.1418 51.867 66.8228 51.867Z",fill:"url(#paint5_linear_1355_1437)"}),(0,e.createElement)("path",{d:"M61.1659 58.1721H28.1813C27.8623 58.1721 27.6011 57.9134 27.6011 57.5918V55.7129C27.6011 55.3939 27.8598 55.1326 28.1813 55.1326H61.1659C61.4849 55.1326 61.7461 55.3914 61.7461 55.7129V57.5918C61.7461 57.9134 61.4874 58.1721 61.1659 58.1721Z",fill:"url(#paint6_linear_1355_1437)"}),(0,e.createElement)("path",{d:"M55.5542 64.4771H28.1813C27.8623 64.4771 27.6011 64.2183 27.6011 63.8968V62.0179C27.6011 61.6988 27.8598 61.4376 28.1813 61.4376H55.5542C55.8732 61.4376 56.1344 61.6963 56.1344 62.0179V63.8968C56.1344 64.2183 55.8757 64.4771 55.5542 64.4771Z",fill:"url(#paint7_linear_1355_1437)"}),(0,e.createElement)("path",{d:"M9.6586 11.766H23.6778C24.1275 11.766 24.4917 12.1302 24.4917 12.5798V14.5166C24.4917 14.9662 24.1275 15.3304 23.6778 15.3304H9.6586C9.20896 15.3304 8.84473 14.9662 8.84473 14.5166V12.5798C8.84473 12.1327 9.20896 11.766 9.6586 11.766Z",fill:"#DADADA"}),(0,e.createElement)("path",{d:"M13.2108 16.9808H24.0273C24.2835 16.9808 24.492 17.1893 24.492 17.4455V18.6965C24.492 18.9527 24.2835 19.1612 24.0273 19.1612H13.2108C12.9546 19.1612 12.7461 18.9527 12.7461 18.6965V17.4455C12.7461 17.1893 12.9546 16.9808 13.2108 16.9808Z",fill:"#DADADA"}),(0,e.createElement)("path",{d:"M9.6586 42.525H23.6778C24.1275 42.525 24.4917 42.8892 24.4917 43.3388V45.2756C24.4917 45.7252 24.1275 46.0894 23.6778 46.0894H9.6586C9.20896 46.0894 8.84473 45.7252 8.84473 45.2756V43.3388C8.84473 42.8892 9.20896 42.525 9.6586 42.525Z",fill:"#DADADA"}),(0,e.createElement)("path",{d:"M13.2108 47.7399H24.0273C24.2835 47.7399 24.492 47.9484 24.492 48.2046V49.4556C24.492 49.7118 24.2835 49.9203 24.0273 49.9203H13.2108C12.9546 49.9203 12.7461 49.7118 12.7461 49.4556V48.2046C12.7461 47.9484 12.9546 47.7399 13.2108 47.7399Z",fill:"#DADADA"}),(0,e.createElement)("defs",null,(0,e.createElement)("linearGradient",{id:"paint0_linear_1355_1437",x1:"27.6018",y1:"13.2854",x2:"44.6527",y2:"13.2854",gradientUnits:"userSpaceOnUse"},(0,e.createElement)("stop",{"stop-color":"#DADADA"}),(0,e.createElement)("stop",{offset:"0.3421","stop-color":"#DCDCDC"}),(0,e.createElement)("stop",{offset:"0.5082","stop-color":"#E4E4E4"}),(0,e.createElement)("stop",{offset:"0.636","stop-color":"#F1F1F1"}),(0,e.createElement)("stop",{offset:"0.7235","stop-color":"white"}),(0,e.createElement)("stop",{offset:"0.7538","stop-color":"#F5F5F5"}),(0,e.createElement)("stop",{offset:"0.8164","stop-color":"#E6E6E6"}),(0,e.createElement)("stop",{offset:"0.8899","stop-color":"#DDDDDD"}),(0,e.createElement)("stop",{offset:"1","stop-color":"#DADADA"})),(0,e.createElement)("linearGradient",{id:"paint1_linear_1355_1437",x1:"27.6018",y1:"19.5913",x2:"67.4014",y2:"19.5913",gradientUnits:"userSpaceOnUse"},(0,e.createElement)("stop",{"stop-color":"#DADADA"}),(0,e.createElement)("stop",{offset:"0.3421","stop-color":"#DCDCDC"}),(0,e.createElement)("stop",{offset:"0.5082","stop-color":"#E4E4E4"}),(0,e.createElement)("stop",{offset:"0.636","stop-color":"#F1F1F1"}),(0,e.createElement)("stop",{offset:"0.7235","stop-color":"white"}),(0,e.createElement)("stop",{offset:"0.7538","stop-color":"#F5F5F5"}),(0,e.createElement)("stop",{offset:"0.8164","stop-color":"#E6E6E6"}),(0,e.createElement)("stop",{offset:"0.8899","stop-color":"#DDDDDD"}),(0,e.createElement)("stop",{offset:"1","stop-color":"#DADADA"})),(0,e.createElement)("linearGradient",{id:"paint2_linear_1355_1437",x1:"27.6018",y1:"25.8971",x2:"61.7464",y2:"25.8971",gradientUnits:"userSpaceOnUse"},(0,e.createElement)("stop",{"stop-color":"#DADADA"}),(0,e.createElement)("stop",{offset:"0.3421","stop-color":"#DCDCDC"}),(0,e.createElement)("stop",{offset:"0.5082","stop-color":"#E4E4E4"}),(0,e.createElement)("stop",{offset:"0.636","stop-color":"#F1F1F1"}),(0,e.createElement)("stop",{offset:"0.7235","stop-color":"white"}),(0,e.createElement)("stop",{offset:"0.7538","stop-color":"#F5F5F5"}),(0,e.createElement)("stop",{offset:"0.8164","stop-color":"#E6E6E6"}),(0,e.createElement)("stop",{offset:"0.8899","stop-color":"#DDDDDD"}),(0,e.createElement)("stop",{offset:"1","stop-color":"#DADADA"})),(0,e.createElement)("linearGradient",{id:"paint3_linear_1355_1437",x1:"27.6018",y1:"32.203",x2:"56.1342",y2:"32.203",gradientUnits:"userSpaceOnUse"},(0,e.createElement)("stop",{"stop-color":"#DADADA"}),(0,e.createElement)("stop",{offset:"0.3421","stop-color":"#DCDCDC"}),(0,e.createElement)("stop",{offset:"0.5082","stop-color":"#E4E4E4"}),(0,e.createElement)("stop",{offset:"0.636","stop-color":"#F1F1F1"}),(0,e.createElement)("stop",{offset:"0.7235","stop-color":"white"}),(0,e.createElement)("stop",{offset:"0.7538","stop-color":"#F5F5F5"}),(0,e.createElement)("stop",{offset:"0.8164","stop-color":"#E6E6E6"}),(0,e.createElement)("stop",{offset:"0.8899","stop-color":"#DDDDDD"}),(0,e.createElement)("stop",{offset:"1","stop-color":"#DADADA"})),(0,e.createElement)("linearGradient",{id:"paint4_linear_1355_1437",x1:"27.6018",y1:"44.0424",x2:"44.6527",y2:"44.0424",gradientUnits:"userSpaceOnUse"},(0,e.createElement)("stop",{"stop-color":"#DADADA"}),(0,e.createElement)("stop",{offset:"0.3421","stop-color":"#DCDCDC"}),(0,e.createElement)("stop",{offset:"0.5082","stop-color":"#E4E4E4"}),(0,e.createElement)("stop",{offset:"0.636","stop-color":"#F1F1F1"}),(0,e.createElement)("stop",{offset:"0.7235","stop-color":"white"}),(0,e.createElement)("stop",{offset:"0.7538","stop-color":"#F5F5F5"}),(0,e.createElement)("stop",{offset:"0.8164","stop-color":"#E6E6E6"}),(0,e.createElement)("stop",{offset:"0.8899","stop-color":"#DDDDDD"}),(0,e.createElement)("stop",{offset:"1","stop-color":"#DADADA"})),(0,e.createElement)("linearGradient",{id:"paint5_linear_1355_1437",x1:"27.6018",y1:"50.3483",x2:"67.4014",y2:"50.3483",gradientUnits:"userSpaceOnUse"},(0,e.createElement)("stop",{"stop-color":"#DADADA"}),(0,e.createElement)("stop",{offset:"0.3421","stop-color":"#DCDCDC"}),(0,e.createElement)("stop",{offset:"0.5082","stop-color":"#E4E4E4"}),(0,e.createElement)("stop",{offset:"0.636","stop-color":"#F1F1F1"}),(0,e.createElement)("stop",{offset:"0.7235","stop-color":"white"}),(0,e.createElement)("stop",{offset:"0.7538","stop-color":"#F5F5F5"}),(0,e.createElement)("stop",{offset:"0.8164","stop-color":"#E6E6E6"}),(0,e.createElement)("stop",{offset:"0.8899","stop-color":"#DDDDDD"}),(0,e.createElement)("stop",{offset:"1","stop-color":"#DADADA"})),(0,e.createElement)("linearGradient",{id:"paint6_linear_1355_1437",x1:"27.6018",y1:"56.6542",x2:"61.7464",y2:"56.6542",gradientUnits:"userSpaceOnUse"},(0,e.createElement)("stop",{"stop-color":"#DADADA"}),(0,e.createElement)("stop",{offset:"0.3421","stop-color":"#DCDCDC"}),(0,e.createElement)("stop",{offset:"0.5082","stop-color":"#E4E4E4"}),(0,e.createElement)("stop",{offset:"0.636","stop-color":"#F1F1F1"}),(0,e.createElement)("stop",{offset:"0.7235","stop-color":"white"}),(0,e.createElement)("stop",{offset:"0.7538","stop-color":"#F5F5F5"}),(0,e.createElement)("stop",{offset:"0.8164","stop-color":"#E6E6E6"}),(0,e.createElement)("stop",{offset:"0.8899","stop-color":"#DDDDDD"}),(0,e.createElement)("stop",{offset:"1","stop-color":"#DADADA"})),(0,e.createElement)("linearGradient",{id:"paint7_linear_1355_1437",x1:"27.6018",y1:"62.96",x2:"56.1342",y2:"62.96",gradientUnits:"userSpaceOnUse"},(0,e.createElement)("stop",{"stop-color":"#DADADA"}),(0,e.createElement)("stop",{offset:"0.3421","stop-color":"#DCDCDC"}),(0,e.createElement)("stop",{offset:"0.5082","stop-color":"#E4E4E4"}),(0,e.createElement)("stop",{offset:"0.636","stop-color":"#F1F1F1"}),(0,e.createElement)("stop",{offset:"0.7235","stop-color":"white"}),(0,e.createElement)("stop",{offset:"0.7538","stop-color":"#F5F5F5"}),(0,e.createElement)("stop",{offset:"0.8164","stop-color":"#E6E6E6"}),(0,e.createElement)("stop",{offset:"0.8899","stop-color":"#DDDDDD"}),(0,e.createElement)("stop",{offset:"1","stop-color":"#DADADA"}))))},edit:function(t){const{attributes:l,setAttributes:c}=t,{changelog:g,customLinks:m,newTagColor:d,versionName:C,showTextArea:v,fixedTagColor:D,paginationType:_,enableVersions:b,updateTagColor:w,tweakedTagColor:x,showPlaceholder:A,enablePagination:k,versionsPosition:y,paginationBgColor:F,improvementTagColor:V,paginationTextColor:T,customLogTypeColors:P,paginationLoadMoreText:N,paginationActiveBgColor:B,paginationActiveTextColor:H}=l,L=(0,r.useBlockProps)({className:"changeloger-container",style:{"--changeloger-pagination-text-color":T,"--changeloger-pagination-bg-color":F,"--changeloger-pagination-active-text-color":H,"--changeloger-pagination-active-bg-color":B,"--changeloger-improvement-tag-bg-color":V,"--changeloger-new-tag-bg-color":d,"--changeloger-update-tag-bg-color":w,"--changeloger-fixed-tag-bg-color":D,"--changeloger-tweaked-tag-bg-color":x}}),O=new i(g),S=O.parse(),M=O.getVersions(),U=b&&"left"===y,G=b&&"right"===y;return(0,e.createElement)("div",{...L},!A&&!v&&(0,e.createElement)(e.Fragment,null,(0,e.createElement)("div",{className:"changelog-wrapper"},U&&(0,e.createElement)("div",{className:"changeloger-version-list-container changeloger-version-list-position-left"},(0,e.createElement)("h6",{className:"version-title"},"Versions"),(0,e.createElement)(u,{versions:M})),(0,e.createElement)("div",{className:"changeloger-info-inner-wrapper"},(0,e.createElement)("div",{className:"changeloger-items"},S.map(((t,l)=>{const{date:i,version:g,changes:p}=t,h=(0,n.get)(m,g,[]);return(0,e.createElement)("div",{className:"changelog-info-item"},(0,e.createElement)("div",{className:"date"},(0,e.createElement)("span",null,i),(0,e.createElement)(r.RichText,{tagName:"span",className:"changeloger-version-name",placeholder:(0,o.__)("Version Name","changeloger"),value:C[g],onChange:e=>c({versionName:{...C,[g]:e}})})),(0,e.createElement)("div",{className:"version"},(0,e.createElement)("span",{className:"version-tag"},g),(0,e.createElement)("span",{className:"line"})),(0,e.createElement)("div",{className:"content"},p.map((t=>{const o=t.category.toLowerCase(),a=(0,n.has)(P,o);return(0,e.createElement)("p",null,(0,e.createElement)("span",{style:a?{backgroundColor:(0,n.get)(P,o)}:{},className:`tag ${o.replace(" ","-")}`},t.category),(0,e.createElement)("span",{className:"change"},(r=t.change,(new DOMParser).parseFromString(r,"text/html").documentElement.textContent)));var r})),(0,e.createElement)("div",{className:"changeloger-link-wrapper"},h.map(((t,o)=>(0,e.createElement)(f,{action:t,index:o,customLinks:m,currentLinks:h,setAttributes:c,version:g}))),(0,e.createElement)(a.Button,{isSmall:!0,isPressed:!0,icon:s,label:"Add Link",onClick:()=>c({customLinks:{...m,[g]:[...h,{name:"Link",link:"#",icon:""}]}})}))))})))),G&&(0,e.createElement)("div",{className:"changeloger-version-list-container changeloger-version-list-position-right"},(0,e.createElement)("h6",{className:"version-title"},"Versions"),(0,e.createElement)(u,{versions:M}))),k&&(0,e.createElement)("div",{className:"changeloger-pagination-wrapper"},"load-more"===_&&(0,e.createElement)("div",{class:"wp-block-button"},(0,e.createElement)(r.RichText,{tagName:"a",style:{color:T,backgroundColor:F},className:"changeloger-pagination-button wp-block-button__link wp-element-button",value:N,onChange:e=>c({paginationLoadMoreText:e})})),"numbered"===_&&(0,e.createElement)("div",{className:"changeloger-pagination-inner-wrapper"},(0,e.createElement)("span",{className:"changeloger-prev-button page-numbers"},"« Previous"),(0,e.createElement)("span",{className:"page-numbers current"},"1"),(0,e.createElement)("span",{className:"page-numbers"},"2"),(0,e.createElement)("span",{className:"page-numbers"},"3"),(0,e.createElement)("span",{className:"changeloger-next-button page-numbers"},"Next »")))),(0,e.createElement)(p,{...t}),(0,e.createElement)(h,{...t}),(0,e.createElement)(E,{...t}))},save:function(e){const{improvementTagColor:t,newTagColor:o,updateTagColor:n,fixedTagColor:a,tweakedTagColor:l,paginationTextColor:s,paginationBgColor:c,paginationActiveTextColor:g,paginationActiveBgColor:p}=e.attributes,m=r.useBlockProps.save({className:"changeloger-container",style:{"--changeloger-pagination-text-color":s,"--changeloger-pagination-bg-color":c,"--changeloger-pagination-active-text-color":g,"--changeloger-pagination-active-bg-color":p,"--changeloger-improvement-tag-bg-color":t,"--changeloger-new-tag-bg-color":o,"--changeloger-update-tag-bg-color":n,"--changeloger-fixed-tag-bg-color":a,"--changeloger-tweaked-tag-bg-color":l}}),h=new i(e.attributes.changelog),E=h.parse();return JSON.stringify({changelog:E,props:m,version:h.getVersions(),paginationStyles:{color:s,"background-color":c}})}})}},o={};function n(e){var a=o[e];if(void 0!==a)return a.exports;var r=o[e]={exports:{}};return t[e](r,r.exports,n),r.exports}n.m=t,e=[],n.O=(t,o,a,r)=>{if(!o){var l=1/0;for(g=0;g<e.length;g++){o=e[g][0],a=e[g][1],r=e[g][2];for(var s=!0,c=0;c<o.length;c++)(!1&r||l>=r)&&Object.keys(n.O).every((e=>n.O[e](o[c])))?o.splice(c--,1):(s=!1,r<l&&(l=r));if(s){e.splice(g--,1);var i=a();void 0!==i&&(t=i)}}return t}r=r||0;for(var g=e.length;g>0&&e[g-1][2]>r;g--)e[g]=e[g-1];e[g]=[o,a,r]},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={826:0,431:0};n.O.j=t=>0===e[t];var t=(t,o)=>{var a,r,l=o[0],s=o[1],c=o[2],i=0;if(l.some((t=>0!==e[t]))){for(a in s)n.o(s,a)&&(n.m[a]=s[a]);if(c)var g=c(n)}for(t&&t(o);i<l.length;i++)r=l[i],n.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return n.O(g)},o=self.webpackChunkchangeloger=self.webpackChunkchangeloger||[];o.forEach(t.bind(null,0)),o.push=t.bind(null,o.push.bind(o))})();var a=n.O(void 0,[431],(()=>n(366)));a=n.O(a)})();