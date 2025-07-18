import * as pt from "@xieyuheng/partech"
import { BlockStmt } from "../../exp/BlockStmt"
import * as matchers from "../matchers"

export function block_stmt_matcher(tree: pt.Tree): BlockStmt {
  return pt.matcher<BlockStmt>({
    "block_stmt:connect": (
      { inputArgs, transition, outputArgs },
      { span },
    ) => ({
      "@type": "BlockStmt",
      "@kind": "Connect",
      transition: matchers.exp_matcher(transition),
      inputArgs: matchers.args_matcher(inputArgs),
      outputArgs: matchers.args_matcher(outputArgs),
      span,
    }),
    "block_stmt:let_place": ({ name, t }, { span }) => ({
      "@type": "BlockStmt",
      "@kind": "LetPlace",
      name: pt.str(name),
      t: matchers.exp_matcher(t),
      span,
    }),
  })(tree)
}

export function block_stmts_matcher(tree: pt.Tree): Array<BlockStmt> {
  return pt.matcher<Array<BlockStmt>>({
    "block_stmts:block_stmts": ({ entries }) =>
      pt.matchers.zero_or_more_matcher(entries).map(block_stmt_matcher),
  })(tree)
}
