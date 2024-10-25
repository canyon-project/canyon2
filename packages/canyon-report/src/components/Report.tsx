import { codeToHtml } from 'shiki'
import {useState} from "react";
import ss from '../mock/fileContent.json'
import cov from '../mock/fileCoverage.json'
import {genBranchdecorations, gendecorations, genFnDecorations} from "../helpers/gendecorations.ts";

// 用于文件base64解码后的格式化
export function getDecode(str: string) {
  return decodeURIComponent(
    atob(str)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(""),
  );
}


// console.log(html) // 带有高亮显示的 HTML 字符串

const h = getDecode(ss.data)

console.log(cov,'cov')

// const decorations = gendecorations(cov["src/module/bookPage/PostApprovalAndTravelApplication/index.ts"],h)

const decorations = genBranchdecorations(cov["src/module/bookPage/PostApprovalAndTravelApplication/index.ts"],h)
console.log(decorations)
const Xxx = () => {
  const [html, setHtml] = useState('')
  const code = getDecode(ss.data)
  codeToHtml(code, {
    lang: 'javascript',
    theme: 'light-plus',
    // decorations:[
    //     {
    //         start: 0,
    //         end: 10,
    //         properties: { class: 'highlighted-word' }
    //     },
    //     {
    //         start: 10,
    //         end: 22,
    //         properties: { class: 'highlighted-word-blue' }
    //     }
    // ],
    // decorations:decorations.map(([start,end])=>{
    //   return     {
    //     start: start,
    //     end: end,
    //     properties: { class: 'highlighted-word' }
    //   }
    // }),
    decorations:decorations.map(([start,end])=>{
      return     {
        start: start,
        end: end,
        properties: { class: 'highlighted-word' }
      }
    }),
    // decorations:decorations.map(({start,end})=>{
    //   return     {
    //     start: {
    //       line: start.line - 1,
    //       character: start.column
    //     },
    //     end: {
    //       line: end.line - 1,
    //       character: end.column
    //     },
    //     properties: { class: 'highlighted-word' }
    //   }
    // }),
  }).then(r=>{
    setHtml(r)
  })

  return <div dangerouslySetInnerHTML={{
    __html:html
  }}>

  </div>
}

export default Xxx
