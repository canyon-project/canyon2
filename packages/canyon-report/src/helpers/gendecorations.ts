// 忽略ts
// ts-ignore

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


