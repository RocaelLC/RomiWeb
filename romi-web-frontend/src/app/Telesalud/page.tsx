import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ImportIcon } from "lucide-react";
export default function Page() {
  return (
    <div className="flex gap-[2%] flex-wrap content-start">
      <div className="w-full h-[5%]">Header</div>
      <div className="w-1/4 h-3/4">Sidebar</div>
      <div className="grow h-3/4">Content</div>
      <div className="w-full h-[5%]">Footer</div>
    </div>
  );
}
