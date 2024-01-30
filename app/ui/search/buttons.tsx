import { ShareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import {
  WhatsappShareButton,
  WhatsappIcon,
} from 'next-share'

export function ShareCard({ title }: { title: string }) {
    //const currentURL = new URL(window.location.href);
    console.log(process.env.VERCEL_URL)
    return (
      <Link
        href={`/search?query=${title}&page=1`}
        className="rounded-md border p-2 hover:bg-gray-100"
      >
        <ShareIcon className="w-5" />
      </Link>
    );
  }