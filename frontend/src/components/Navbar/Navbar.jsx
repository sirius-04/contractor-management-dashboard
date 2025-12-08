import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function Navbar() {
  return (
    <header className="w-full border-b bg-background">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left — Logo */}
        <div className="text-xl">
          Contractor Dashboard
        </div>

        {/* Right — Profile */}
        <div>
          <Avatar className="h-9 w-9 border-2 border-solid">
            <AvatarImage src="https://api.dicebear.com/7.x/notionists/svg?seed=user" />
            <AvatarFallback>You</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
