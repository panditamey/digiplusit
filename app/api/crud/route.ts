import { PrismaClient } from '@prisma/client'
import { NextResponse } from "next/server";

const prisma = new PrismaClient()

export const GET = async (req:Request)=>{
    try {
        await prisma.$connect();
        const data = await prisma.person.findMany();
        return NextResponse.json({data},{status:200});
    } catch (error:any) {
        return NextResponse.json({error:error.nessage},{status:500});
    }finally{
        await prisma.$disconnect();
    }
}

export const DELETE = async (req:Request)=>{
    const {id} = await req.json();
    try {
        await prisma.$connect();
        const d = await prisma.person.delete({
          where: {
            id: id
          }
        });
        return NextResponse.json({d},{status:200});
      } catch (error: any) {
        console.error(error);
      } finally {
        await prisma.$disconnect();
      }
}

export const PUT = async (req:Request)=>{
  const {id,name,location,cgpa} = await req.json();
  try {
      await prisma.$connect();
      const d = await prisma.person.update(
        {
          where: {
            id: id
          },
          data: {
            name: name,
            location: location,
            cgpa: cgpa
          }
        }
      );
      return NextResponse.json({d},{status:200});
    } catch (error: any) {
      console.error(error);
    } finally {
      await prisma.$disconnect();
    }
}

export const POST = async (req:Request)=>{
  const {name,location,cgpa} = await req.json();
  try {
      await prisma.$connect();
      const d = await prisma.person.create(
        {
          data: {
            name: name,
            location: location,
            cgpa: cgpa
          }
        }
      );
      return NextResponse.json({d},{status:200});
    } catch (error: any) {
      console.error(error);
    } finally {
      await prisma.$disconnect();
    }
}