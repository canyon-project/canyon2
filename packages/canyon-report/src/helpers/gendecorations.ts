// 忽略ts
// ts-ignore

import {make2DArrayNonOverlapping} from "./test.ts";

function fffffffff(startLine, endLine, structuredText, startCol, endCol) {
    let start = 0;
    let end = 0;

    for (let i = 0; i < startLine - 1; i++) {
        start += structuredText[i].length + 1;
    }
    for (let i = 0; i < endLine - 1; i++) {
        end += structuredText[i].length + 1;
    }

    start += startCol;
    end += endCol;
    return [start, end]

}

// function f(start,end,structuredText) {
//
//
// }

export const gendecorations = (filecoverage,fileContent) => {

    const statementStats = filecoverage.s;
    const statementMeta = filecoverage.statementMap;
    const structuredText = fileContent
        .split("\n")
        .reduce((previousValue, currentValue, currentIndex) => {
            return {
                ...previousValue,
                [currentIndex]: currentValue,
            };
        }, {});
    const statementDecorations = [];

    Object.entries(statementStats).forEach(([stName, count]) => {
        const meta = statementMeta[stName];
        if (meta) {
            const type = count > 0 ? "yes" : "no";
            const startCol = meta.start.column;
            let endCol = meta.end.column + 1;
            const startLine = meta.start.line;
            const endLine = meta.end.line;

            if (type === "no" && structuredText[startLine]) {
              statementDecorations.push(fffffffff(startLine, endLine, structuredText, startCol, endCol));
            }
        }
    });
  return statementDecorations
}



export const genFnDecorations = (filecoverage,fileContent) => {

  const statementStats = filecoverage.f;
  const statementMeta = filecoverage.fnMap;
  const structuredText = fileContent
    .split("\n")
    .reduce((previousValue, currentValue, currentIndex) => {
      return {
        ...previousValue,
        [currentIndex]: currentValue,
      };
    }, {});
  const fnDecorations = [];

  Object.entries(statementStats).forEach(([stName, count]) => {
    const meta = statementMeta[stName];
    if (meta) {
      const type = count > 0 ? "yes" : "no";
      // Some versions of the instrumenter in the wild populate 'func'
      // but not 'decl':
      const decl = meta.decl || meta.loc;
      const startCol = decl.start.column;
      let endCol = decl.end.column + 1;
      const startLine = decl.start.line;
      const endLine = decl.end.line;

      if (type === "no" && structuredText[startLine]) {
        if (endLine !== startLine) {
          // endCol = structuredText[startLine].length;
        }

        //     转化为字符的起始

        let start = 0;
        let end = 0;

        for (let i = 0; i < startLine - 1; i++) {
          start += structuredText[i].length + 1;
        }
        for (let i = 0; i < endLine - 1; i++) {
          end += structuredText[i].length + 1;
        }

        start += startCol;
        end += endCol;
        fnDecorations.push([start, end]);
      }
    }
  });
  return fnDecorations
}




export const genBranchdecorations = (fileCoverage,fileContent) => {

  // const statementStats = filecoverage.b;
  // const statementMeta = filecoverage.branchMap;

  const branchStats = fileCoverage.b;
  const branchMeta = fileCoverage.branchMap;

  const structuredText = fileContent
    .split("\n")
    .reduce((previousValue, currentValue, currentIndex) => {
      return {
        ...previousValue,
        [currentIndex]: currentValue,
      };
    }, {});

  if (!branchStats) {
    return;
  }


  const statementDecorations = [];

  Object.entries(branchStats).forEach(([branchName, branchArray]) => {
    // const sumCount = branchArray.
    const metaArray = branchMeta[branchName].locations;



    // console.log(metaArray,branchArray)

    for (let i = 0; i < branchArray.length; i++) {
      if (branchArray[i]===0) {
        const meta = metaArray[i];
        // console.log(branchMeta[branchName])

        const leixing = branchMeta[branchName].type

        if (leixing === 'if' && i===0){

        } else {

          const startCol = meta.start.column;
          let endCol = meta.end.column + 1;
          const startLine = meta.start.line;
          const endLine = meta.end.line;

          // const startCol = meta.start.column;
          // let endCol = startCol + 1;
          // const startLine = meta.start.line;
          // const endLine = startLine;

          if (structuredText[startLine]) {
            statementDecorations.push(fffffffff(startLine, endLine, structuredText, startCol, endCol));
          }
        }

      }
    }

    // let i;
    // let count;
    // let meta;
    // let startCol;
    // let endCol;
    // let startLine;
    // let endLine;
    // let openSpan;
    // let closeSpan;
    // let text;
  })

  // console.log(statementStats,statementMeta)



  console.log(statementDecorations,'statementDecorations')
  return make2DArrayNonOverlapping(statementDecorations)
}
