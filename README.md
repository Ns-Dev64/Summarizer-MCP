# Summarizer Mcp


To install dependencies:

```bash
bun install
```

To run:
```bash
1) Install claude desktop.
2) Enable developer mode.
3) Edit the config file to the following pattern:
  {
  "mcpServers": {
    "testy": {
      "command": "ROOT_PATH_TO_BUN_EXECUTABLE",
      "args": [
        "ROOT_PATH_TO_INDEX.TS"
      ]
    }
  }
}
```

This project was created using `bun init` in bun v1.2.18. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
