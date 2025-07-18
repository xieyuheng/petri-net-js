import * as pt from "@xieyuheng/partech"
import type { Stmt } from "../../stmt"
import * as matchers from "../matchers"

export function stmt_matcher(tree: pt.Tree): Stmt {
  return pt.matcher<Stmt>({
    "stmt:transition": (
      { name, inputParameters, outputParameters, body },
      { span },
    ) => ({
      "@type": "Stmt",
      "@kind": "DefineTransition",
      name: pt.str(name),
      inputParameters: matchers.parameters_matcher(inputParameters),
      outputParameters: matchers.parameters_matcher(outputParameters),
      body: matchers.block_stmts_matcher(body),
      span,
    }),
    "stmt:begin": ({ body }, { span }) => ({
      "@type": "Stmt",
      "@kind": "Begin",
      body: matchers.block_stmts_matcher(body),
      span,
    }),
  })(tree)
}

export function stmts_matcher(tree: pt.Tree): Array<Stmt> {
  return pt.matcher({
    "stmts:stmts": ({ stmts }) =>
      pt.matchers.zero_or_more_matcher(stmts).map(stmt_matcher),
  })(tree)
}
