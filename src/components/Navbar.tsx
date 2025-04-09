
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bell, Menu, User, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  // Don't show navbar on landing, signin, or signup pages
  if (['/','/','/signin','/signup'].includes(location.pathname)) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand name */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center">
              <div className="w-8 h-8 rounded-full flora-gradient flex items-center justify-center mr-2 animate-pulse-soft">
                <span className="text-white font-bold">FS</span>
              </div>
              <span className="text-xl font-bold flora-gradient-text">FloraSense</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/dashboard" className={`font-medium ${location.pathname === '/dashboard' ? 'text-flora-green' : 'text-flora-dark hover:text-flora-green'}`}>Dashboard</Link>
            <Link to="/devices" className={`font-medium ${location.pathname === '/devices' ? 'text-flora-green' : 'text-flora-dark hover:text-flora-green'}`}>Devices</Link>
            <Link to="/insights" className={`font-medium ${location.pathname === '/insights' ? 'text-flora-green' : 'text-flora-dark hover:text-flora-green'}`}>Insights</Link>
            <Link to="/history" className={`font-medium ${location.pathname === '/history' ? 'text-flora-green' : 'text-flora-dark hover:text-flora-green'}`}>History</Link>
            <Link to="/upload" className={`font-medium ${location.pathname === '/upload' ? 'text-flora-green' : 'text-flora-dark hover:text-flora-green'}`}>Upload Data</Link>
          </div>

          {/* Notification and profile */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-flora-orange"></span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Health Data</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/">Logout</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-b">
            <Link to="/dashboard" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted">Dashboard</Link>
            <Link to="/devices" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted">Devices</Link>
            <Link to="/insights" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted">Insights</Link>
            <Link to="/history" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted">History</Link>
            <Link to="/upload" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-muted">Upload Data</Link>
            
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium">John Smith</div>
                  <div className="text-sm text-muted-foreground">john@example.com</div>
                </div>
                <Button variant="ghost" size="icon" className="ml-auto">
                  <Bell className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
