import { Menu } from "lucide-react"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { NavBarContent } from "./NavBarContent"

interface NavBarSheetProps {
   isOpen: boolean;
   setIsOpen: (open: boolean) => void;
   searchQuery: string;
   setSearchQuery: (query: string) => void;
}

export const NavBarSheet = ({ isOpen, setIsOpen, searchQuery, setSearchQuery }: NavBarSheetProps) => {
    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="default" size="sm" className="bg-[#6C5CE7] hover:bg-[#5A4BCF] cursor-pointer">
                    <Menu size={24} />
                </Button>
            </SheetTrigger>
            <SheetContent
                side="left"
                className="w-full sm:w-80 p-0 [&_button[data-slot='sheet-close']]:text-[#6C5CE7] [&_button[data-slot='sheet-close']]:hover:bg-[#6C5CE7]/10 [&_button[data-slot='sheet-close']]:cursor-pointer"
            >
                <NavBarContent
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    onClose={() => setIsOpen(false)}
                />
            </SheetContent>
        </Sheet>
    )
}