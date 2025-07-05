import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import * as operations from "./note"


const server = new McpServer({
  name: "localSummarizer",
  version: "1.0.0"
});

const bulkNotes=z.object({
    title:z.string(),
    content:z.string(),
    summary:z.string()
  })

server.registerTool("CreateNote",{
  title:"Tool used to add a note",
  description:"Use this tool to add a single note into the db.",
  inputSchema:{title:z.string(),content:z.string(),summary:z.string()}
},
  async({title,content,summary})=>({
    content:[{type:"text",text:await operations.pushNote(title,content,summary)}]
  })
)

server.registerTool("CreateTag",{
  title:"Tool used to create a tag on a note",
  description:"Use this tool to create a tag for a note. NoteId is an id field of a note entry exisitng in the database, name is a name given for the tag",
  inputSchema:{noteId:z.string(),name:z.string()}
},
async({noteId,name})=>({
  content:[{type:"text",text:await operations.addTag(noteId,name)}]
})
)

server.registerTool("CreateBulkNotes",{
  title:"Tool used to add bulk notes",
  description:"Use this tool to add bulk notes to a db. This tool accepts an array of notes.",
  inputSchema:{notes:z.array(bulkNotes)}
},
async({notes})=>({
    content:[{type:"text",text:await operations.pushBulkNotes(notes)}]
})
)

server.registerTool("FetchNote",{
  title:"Fetch a single note entry",
  description:"Fetch a single note entry from the db. The identifier can either be a noteId or a title.",
  inputSchema:{identifier:z.string()}
},
async({identifier})=>({
    content:[{type:"text",text:await operations.getNote(identifier)}]
})
)

server.registerTool("FetchBulkNotes",{
  title:"Fetch a number of notes.",
  description:"Fetch a number of notes from the db. You can provide a  limit to get a specific amount of notes (default limit is 10 notes).",
  inputSchema:{limit:z.number()}
},
async({limit})=>({
      content:[{type:"text",text:await operations.getBulkNotes(limit)}]
})
)

server.registerTool("FetchNoteFromTag",{
  title:"Fetch a note from a tag.",
  description:"Fetch a note from a tag. Here the identifier is either the name of the tag or the id of the tag.",
  inputSchema:{identifier:z.string()}
},
async({identifier})=>({
      content:[{type:"text",text:await operations.getNoteFromTag(identifier)}]
})
)


const transport = new StdioServerTransport();
await server.connect(transport)