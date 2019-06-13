import * as nearley from 'nearley/lib/nearley.js';
import * as grammar from './eppprocessor2.js';
import IRToJavascript from '../IR/IR.js'

var parserStartPoint;
let processor = nearley.Grammar.fromCompiled(grammar);
let parser = new nearley.Parser(processor);
parserStartPoint = parser.save();
console.log('Nearley parser loaded')

var ts = 0;
onmessage = (m) => {
  // console.log(m.data);
  if (m.data !== undefined) {
    try {
      parser.feed(m.data);
      // console.log(parser.results)
      postMessage({
        "treeTS": 1
      });
      // console.log(`Parse tree complete`);
      let jscode = IRToJavascript.treeToCode(parser.results);
      postMessage(jscode);
    } catch (err) {
      console.log("Error at character " + err.offset); // "Error at character 9"
    }
  }
  parser.restore(parserStartPoint);
};
