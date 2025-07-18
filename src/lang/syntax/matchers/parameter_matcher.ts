import * as pt from "@xieyuheng/partech"
import { ParameterExp } from "../../parameter"
import * as matchers from "../matchers"

export function parameter_matcher(tree: pt.Tree): ParameterExp {
  return pt.matcher<ParameterExp>({
    "parameter:place": ({ name, t }) => ({
      name: pt.str(name),
      t: matchers.exp_matcher(t),
      isPrincipal: false,
    }),
  })(tree)
}

export function parameters_matcher(tree: pt.Tree): Array<ParameterExp> {
  return pt.matcher({
    "parameters:parameters": ({ entries, last_entry }) => [
      ...pt.matchers.zero_or_more_matcher(entries).map(parameter_matcher),
      parameter_matcher(last_entry),
    ],
  })(tree)
}
