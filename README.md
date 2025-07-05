Summarizer Mcp

## Core Note Functions:

1) Create individual notes - Add single notes with title, content, and summary
2) Bulk create notes - Add multiple notes at once from large content 
3) Retrieve notes - Fetch individual notes by title or ID
4) Bulk retrieve notes - Get multiple notes at once with customizable limits

## Tagging System:

1) Create tags - Add descriptive tags to notes for organization
2) Tag-based retrieval - Find notes by searching for specific tags
3) Multiple tags per note - Each note can have several relevant tags for flexible categorization

## What Makes It Great for Studying:

1) Structured organization - Break down complex topics into digestible notes
2) Flexible tagging - Create your own categorization system
3) Easy retrieval - Find notes by title, ID, or tags
4) Bulk operations - Efficiently handle large amounts of content

## Perfect For:

1) Academic studying - Organize course materials by subject, chapter, or concept
2) Research - Tag and categorize information from various sources
3) Knowledge management - Build a personal knowledge base with searchable tags
4) Content organization - Structure any type of information systematically

## To install dependencies:

```bash
bun install
```

## To run:
```bash
1) Install claude desktop.
2) Enable developer mode.
3) Edit the config file to the following pattern:
  {
  "mcpServers": {
    "YOUR_MCP_SERVER_NAME": {
      "command": "ROOT_PATH_TO_BUN_EXECUTABLE",
      "args": [
        "ROOT_PATH_TO_INDEX.TS"
      ]
    }
  }
}
4) The server is now visible in the developer menu inside settings.
```

This project was created using `bun init` in bun v1.2.18. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
