# Petri Net JS

This is an implementation of [Petri net](https://en.wikipedia.org/wiki/Petri_net).

## Usage

### Command line tool

Install it by the following command:

```sh
npm install --global @xieyuheng/petri-net-js
```

The command-line program is called `petri-net-js`.

```sh
petri-net-js repl         # Open an interactive REPL
petri-net-js run [path]   # Run a Petri net program
petri-net-js help [name]  # Display help for a command
```

## Examples

```petri-net
transition processComplaint(
  place input: Complaint
  ------------------------
  place output: ComplaintArchive
) {
  (input) -> [register] -> (c1, c2)
  (c1) -> [sendQuestionnaire] -> (c3)
  (c3) -> [processQuestionnaire] -> (c5)
  (c3) -> [timeout] -> (c5)

  (c5, c6) -> [archive] -> (output)

  (c2) -> <evaluate> -> (c6, c7)
  (c5, c7) -> [processComplaint] -> (c5, c8)
  (c8) -> <checkProcessing> -> (c6, c7)
}

begin {
  place input: Complaint
  place output: ComplaintArchive

  (input) -> [processComplaint] -> (output)

  @send(input, Complaint(1, "xieyuheng"))
  @send(input, Complaint(2, "xieyuheng"))
  @send(input, Complaint(3, "xieyuheng"))

  @receive(output, printComplaint)
}
```

## Development

```sh
npm install          # Install dependencies
npm run build        # Compile `src/` to `lib/`
npm run build:watch  # Watch the compilation
npm run test         # Run test
```

## References

**Papers**:

- [Communication with automata, Carl Adam Petri, 1966 (the founding paper)](./docs/references/papers/1966-communication-with-automata.pdf).
- [The Application of Petri Nets to Workflow Management, Wil van der Aalst, 1998](./docs/references/papers/1998-the-application-of-petri-nets-to-workflow-management.pdf).

## Contributions

To make a contribution, fork this project and create a pull request.

Please read the [STYLE-GUIDE.md](STYLE-GUIDE.md) before you change the code.

Remember to add yourself to [AUTHORS](AUTHORS).
Your line belongs to you, you can write a little
introduction to yourself but not too long.

## License

[GPLv3](LICENSE)
