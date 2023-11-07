"use client"
import Image from 'next/image'
import { PrismaClient } from '@prisma/client'
import { ArrowSmallDownIcon, ArrowSmallUpIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import { ImCross } from 'react-icons/im';
import { BsFillPencilFill } from 'react-icons/bs';
import Modal from '@/components/ui/modal';
import InputModal from '@/components/ui/modal';
import { Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"



const prisma = new PrismaClient()

interface Person {
  id: string;
  name: string;
  location: string;
  cgpa: number;
}

export default async function Home() {

  var [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [cgpa, setCgpa] = useState(0);
  let status = false;


  const handleClose = () => {
    status = false;
  }



  const res = await fetch('http://localhost:3000/api/crud', {
    method: 'GET',
  });
  const data = await res.json();

  return (


    <div className="w-full h-screen bg-white flex flex-col justify-center items-center">
      {status ?
        <InputModal visible={status} onClose={handleClose} /> : null}
      <div className="w-full max-w-2xl ">
        <table className="w-full">
          <thead className="bg-blue-500">
            <tr className="text-center">
              <th className="p-2 ">
                <div className="flex">
                  <span>Row Num</span>
                  <ArrowSmallUpIcon className="h-6 w-6 text-white" />
                  <ArrowSmallDownIcon className="h-6 w-6 text-white" />
                </div>
              </th>
              <th className="p-2 ">
                <div className="flex">
                  <span>Name</span>
                  <ArrowSmallUpIcon className="h-6 w-6 text-white" />
                  <ArrowSmallDownIcon className="h-6 w-6 text-white" />
                </div>
              </th>
              <th className="p-2">
                <div className="flex">
                  <span>Location</span>
                  <ArrowSmallUpIcon className="h-6 w-6 text-white" />
                  <ArrowSmallDownIcon className="h-6 w-6 text-white" />
                </div>
              </th>
              <th className="p-2">
                <div className="flex">
                  <span>CGPA</span>
                  <ArrowSmallUpIcon className="h-6 w-6 text-white" />
                  <ArrowSmallDownIcon className="h-6 w-6 text-white" />
                </div>
              </th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-blue-200">
            {data.data.map((person: Person, index: number) => (
              <tr className="text-center" key={person.name}>
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{person.name}</td>
                <td className="p-2">{person.location}</td>
                <td className="p-2">{person.cgpa}</td>
                <td className="p-2">
                  <div>
                    <button className='text-red-700 pr-10' onClick={
                      async () => {
                        fetch('http://localhost:3000/api/crud', {
                          method: 'DELETE',
                          body: JSON.stringify({
                            id: person.id
                          })
                        });
                        //refresh page
                        window.location.reload();
                      }
                    }><ImCross /></button>
                    <button className='text-green-700'><BsFillPencilFill /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Share</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                defaultValue={name}
                onChange={(e) => {
                  setName((e.target as HTMLInputElement).value);
                }}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                defaultValue={location}
                onChange={(e) => {
                  setLocation((e.target as HTMLInputElement).value);
                }}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                CGPA
              </Label>
              <Input
                id="cgpa"
                defaultValue={cgpa}
                onChange={(e) => {
                  setCgpa(parseInt(e.target.value));
                }}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary" onClick={() => {
                console.log(name+location+ cgpa);
                fetch('http://localhost:3000/api/crud', {
                  method: 'POST',
                  body: JSON.stringify({
                    name: name,
                    location: location,
                    cgpa: cgpa
                  })

                }).then(()=>{
                  window.location.reload();
                })
              }}>
                Submit
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>


    </div>
  )
}
