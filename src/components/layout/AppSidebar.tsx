import React from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Box, 
  Package, 
  Users, 
  Database, 
  ArrowDownCircle, 
  ArrowUpCircle 
} from "lucide-react";

const AppSidebar: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { name: "Painel", path: "/", icon: <Box size={20} /> },
    { name: "Produtos", path: "/products", icon: <Package size={20} /> },
    { name: "Fornecedores", path: "/suppliers", icon: <Users size={20} /> },
    { name: "Inventário", icon: <Database size={20} />, children: [
      { name: "Entradas", path: "/inventory/inputs", icon: <ArrowDownCircle size={18} /> },
      { name: "Saídas", path: "/inventory/outputs", icon: <ArrowUpCircle size={18} /> },
    ]}
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 shadow-sm">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-gray-200 px-6">
        <h1 className="text-xl font-semibold text-blue-600">QAERP</h1>
      </div>
      
      {/* Navigation */}
      <nav className="space-y-1 px-3 py-4">
        {navItems.map((item) => (
          <div key={item.name} className="py-1">
            {item.children ? (
              <div className="space-y-1">
                <div className="flex items-center px-3 py-2 text-sm font-medium text-gray-600">
                  <span className="mr-2">{item.icon}</span>
                  {item.name}
                </div>
                
                <div className="ml-6 space-y-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.name}
                      to={child.path}
                      className={`flex items-center px-3 py-2 text-sm rounded-md ${
                        isActive(child.path)
                          ? "bg-blue-50 text-blue-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span className="mr-2">{child.icon}</span>
                      {child.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                to={item.path}
                className={`flex items-center px-3 py-2 text-sm rounded-md ${
                  isActive(item.path)
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.name}
              </Link>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default AppSidebar;
