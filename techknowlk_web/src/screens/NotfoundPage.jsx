import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";
import Button01 from "../components/Button01";
import Button02 from "../components/Button02";

import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative z-10 text-center px-4 max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-[150px] md:text-[200px] font-bold text-[#626262] bg-clip-text leading-none">
            404
          </h1>
        </div>
        
        <h2 className="text-3xl md:text-4xl font-bold  mb-4">
          Page Not Found
        </h2>
        
        <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved. Let's get you back on track.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button01 label={"Go to Home"} asChild size="lg" className="gap-2" onClick={() => { navigate("/"); }} />


          <Button02 label={"Go Back"} asChild variant="outline" size="lg" className="gap-2" onClick={() => { navigate(-1); }} />

        </div>
      </div>
    </div>
  );
};

export default NotFound;
