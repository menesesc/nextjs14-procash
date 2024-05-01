'use client'
import React from 'react';
import Link from "next/link"
import { useAppContext } from "@/app/context";
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Badge } from '@/components/ui/badge';
import { useToast } from "@/components/ui/use-toast"
import Mapa from './map';
  
export default function CardMapa() {
    const { toast } = useToast()
    const mapStyles = {
        width: '100%',
        height: '50%'
    };
    
    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle>Mapa</CardTitle>
            </CardHeader>
            <CardContent>
                <Mapa />
            </CardContent>
        </Card>
    )
}

