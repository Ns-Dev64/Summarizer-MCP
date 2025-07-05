import { PrismaClient  } from "../generated/prisma";
import type { Note } from "../generated/prisma";

const prismaClient=new PrismaClient();

interface bulkNotes{
    title:string,
    content:string,
    summary:string
}

export async function pushNote(title:string,content:string,summary:string) {

    const note:Note=await prismaClient.note.create({
        data:{
            title:title,
            content:content,
            summary:summary
        },
    })

    if(!note) return "Error occured while creating a note";

    return `Note title: ${note.title}, Note id: ${note.id}, Note summary: ${note.summary}, Note content: ${note.content}`
}

export async function addTag(noteId:string,name:string) {
    
    if(!noteId) return "Please specify a id";

    const tag=await prismaClient.tag.create({
        data:{
            name:name,
            notes:{
                connect:{
                  id:noteId
                }
            }
        },
        select:{
            id:true,
            name:true,
            notes:{
                select:{
                    title:true,
                    summary:true
                }
            }
        }
    })

    if(!tag) return "Error occured while creating a tag";

    return `Tag Name: ${tag.name}, Tag id: ${tag.id}, Assigned Note: ${tag.notes}`
}

export async function getNoteFromTag(identifier:string) {
    
    if(!identifier) return "Please enter a valid identifier";

    const note=await prismaClient.note.findFirst({
        where:{
            tags:{
                some:{
                    OR:[
                        {id:identifier},
                        {name:identifier}
                    ]
                }
            }
        },
        select:{
            title:true,
            content:true,
            summary:true
        }
    })

    if(!note) return "Note doesn't exist"

    return `Note title: ${note.title}, Note content: ${note.content}, Note Summary: ${note.summary}`

}

export async function getNote(identifier:string) {

    if(!identifier) return "Please enter a valid identifier";

    const note=await prismaClient.note.findFirst({
        where:{
            OR:[
                {id:identifier},
                {title:identifier}
            ]
        },
        select:{
            id:true,
            title:true,
            summary:true,
            content:true,
            tags:{
                select:{
                    name:true
                }
            }
        }
    })

    if(!note) return "Error occured while fetching note"
    return `Note title: ${note.title}, Note id: ${note.id}, Note summary: ${note.summary}, Note content: ${note.content}, Assigned Tag(s): ${note.tags}`
}

export async function pushBulkNotes(notes:bulkNotes[]) {

    if(!notes || notes.length===0) return "Please make sure that the input is an array"


    const bulkNotes=await prismaClient.note.createMany({
        data:notes.map(note=>({
            title:note.title,
            content:note.content,
            summary:note.summary
        }))
    });

    if(bulkNotes.count===0) return "Error occured while creating bulk notes"
    
    return `${bulkNotes.count} notes pushed into the db. Please fetch using bulk note fetch.`
    
}

export async function getBulkNotes(limit:number|null=null) {
    
    const lim=limit || 10;
    
    const notes=await prismaClient.note.findMany({
        take:lim,
        select:{
            title:true,
            summary:true,
            tags:{
                select:{
                    name:true
                }
            }
        }
    })

    if(!notes || notes.length===0) return "Notes not found."
    
    let finalNote='';

    notes.map((note)=>{
        finalNote=finalNote+`\nNote title: ${note.title} Note summary: ${note.summary} Note Tag(s): ${note.tags}`
    })

    return finalNote
}