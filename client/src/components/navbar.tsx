import { ModeToggle } from "./mode-toggle"
export default function Navbar(){
    return(
        <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <h1 className="text-2xl font-bold">DDL Generator</h1>
            <div className="flex items-center">
                <ModeToggle />
            </div>
        </div>
    )
} 