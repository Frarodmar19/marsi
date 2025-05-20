
    import React, { useState, useEffect, useRef } from 'react';
    import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
    import { Toaster } from '@/components/ui/toaster';
    import { useToast } from '@/components/ui/use-toast';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
    import { Checkbox } from '@/components/ui/checkbox';
    import { Progress } from '@/components/ui/progress';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Home, MapPin, MessageSquare, Heart, User, Settings, Building, Users, Bath, BedDouble, Sun, Snowflake, Phone, Eye, Search, Filter, Menu, X, LogOut } from 'lucide-react';

    const initialProfileData = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      birthDate: '',
      userType: '',
      hobbies: [],
      disabilityType: 'none',
      city: '',
    };

    const hobbyOptions = ['Deporte', 'Música', 'Lectura', 'Videojuegos', 'Viajar', 'Cocina'];

    const AppContent = () => {
      const [isAuthenticated, setIsAuthenticated] = useState(true); // simula login
      const [showProfileCreation, setShowProfileCreation] = useState(false);
    
      if (!isAuthenticated) {
        return <div className="p-8">Pantalla de autenticación simulada</div>;
      }
    
      if (showProfileCreation) {
        return <div className="p-8">Creador de perfil</div>;
      }
    
      return (
        <div className="min-h-screen flex flex-col md:flex-row">
          <Toaster />
          <Sidebar
            setIsAuthenticated={setIsAuthenticated}
            setShowProfileCreation={setShowProfileCreation}
          />
          <div className="flex-1 p-6 overflow-y-auto bg-gradient-to-br from-blue-50 to-purple-100">
            <Routes>
              <Route path="/" element={<Dashboard />} />
                              <Route path="/anuncios" element={<PropertyListingPage />} />
                              <Route path="/mapa" element={<MapScreen />} />
                              <Route path="/mensajes" element={<PlaceholderScreen title="Mensajes" icon={<MessageSquare size={48} />} />} />
                              <Route path="/favoritos" element={<PlaceholderScreen title="Favoritos" icon={<Heart size={48} />} />} />
                              <Route path="/perfil" element={<PlaceholderScreen title="Mi Perfil" icon={<User size={48} />} />} />
                              <Route path="/configuracion" element={<PlaceholderScreen title="Configuración" icon={<Settings size={48} />} />} />
                              <Route path="/mi-piso" element={<PlaceholderScreen title="Mi Piso" icon={<Building size={48} />} />} />
                              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      );
    };

    const App = () => (
      <Router>
        <AppContent />
      </Router>
    );


    const AuthScreen = ({ onLogin, onRegister }) => (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-200 via-indigo-200 to-purple-300 p-4">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>
            UniRoomFinder
          </h1>
          <p className="text-xl md:text-2xl text-white/90" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Encuentra tu espacio ideal, conecta con tus futuros compañeros.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-2xl w-full max-w-md"
        >
          <h2 className="text-3xl font-semibold text-center text-indigo-700 mb-8" style={{ fontFamily: "'Poppins', sans-serif" }}>
            Bienvenido/a
          </h2>
          <div className="space-y-6">
            <Button
              onClick={onLogin}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-lg py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              Iniciar Sesión
            </Button>
            <Button
              onClick={onRegister}
              variant="outline"
              className="w-full border-indigo-600 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 text-lg py-3 rounded-lg shadow-md transition-transform transform hover:scale-105"
              style={{ fontFamily: "'Nunito', sans-serif" }}
            >
              Registrarse
            </Button>
          </div>
          <p className="text-xs text-center text-slate-500 mt-8" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Al continuar, aceptas nuestros Términos de Servicio y Política de Privacidad.
          </p>
        </motion.div>
      </div>
    );

    const ProfileCreationWizard = ({ step, profileData, onProfileChange, onHobbyChange, onDisabilityChange, onUserTypeChange, nextStep, prevStep, submitProfile }) => {
      const totalSteps = 4;
      const progress = (step / totalSteps) * 100;
      const prevStepRef = useRef(step);

      useEffect(() => {
        prevStepRef.current = step;
      }, [step]);

      const animationDirection = step > prevStepRef.current ? 50 : -50;

      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-100 via-indigo-100 to-purple-100 p-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: step === 1 ? 0 : animationDirection }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -animationDirection }}
              transition={{ duration: 0.4, type: "tween" }}
              className="bg-white p-6 md:p-8 rounded-xl shadow-xl w-full max-w-lg"
            >
              <h2 className="text-2xl md:text-3xl font-semibold text-center text-indigo-600 mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>
                Crea tu Perfil
              </h2>
              <p className="text-center text-slate-500 mb-6" style={{ fontFamily: "'Nunito', sans-serif" }}>Paso {step} de {totalSteps}</p>
              <Progress value={progress} className="w-full mb-8 h-2 bg-indigo-100 [&>div]:bg-indigo-500" />

              {step === 1 && (
                <Step1 data={profileData} onChange={onProfileChange} />
              )}
              {step === 2 && (
                <Step2 data={profileData} onUserTypeChange={onUserTypeChange} onBirthDateChange={onProfileChange} />
              )}
              {step === 3 && (
                <Step3 data={profileData} onHobbyChange={onHobbyChange} onDisabilityChange={onDisabilityChange} />
              )}
              {step === 4 && (
                <Step4 data={profileData} onChange={onProfileChange} />
              )}

              <div className="mt-8 flex justify-between">
                {step > 1 && (
                  <Button variant="outline" onClick={prevStep} className="border-indigo-500 text-indigo-500 hover:bg-indigo-50" style={{ fontFamily: "'Nunito', sans-serif" }}>
                    Anterior
                  </Button>
                )}
                {step < totalSteps && (
                  <Button onClick={nextStep} className="bg-indigo-600 hover:bg-indigo-700 ml-auto" style={{ fontFamily: "'Nunito', sans-serif" }}>
                    Siguiente
                  </Button>
                )}
                {step === totalSteps && (
                  <Button onClick={submitProfile} className="bg-green-500 hover:bg-green-600 ml-auto" style={{ fontFamily: "'Nunito', sans-serif" }}>
                    Finalizar Perfil
                  </Button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      );
    };

    const Step1 = ({ data, onChange }) => (
      <div className="space-y-4">
        <div>
          <Label htmlFor="firstName" style={{ fontFamily: "'Nunito', sans-serif" }}>Nombre</Label>
          <Input id="firstName" name="firstName" value={data.firstName} onChange={onChange} placeholder="Ej: Ana" className="mt-1" style={{ fontFamily: "'Nunito', sans-serif" }} />
        </div>
        <div>
          <Label htmlFor="lastName" style={{ fontFamily: "'Nunito', sans-serif" }}>Apellidos</Label>
          <Input id="lastName" name="lastName" value={data.lastName} onChange={onChange} placeholder="Ej: Pérez García" className="mt-1" style={{ fontFamily: "'Nunito', sans-serif" }} />
        </div>
        <div>
          <Label htmlFor="email" style={{ fontFamily: "'Nunito', sans-serif" }}>Correo Electrónico</Label>
          <Input id="email" name="email" type="email" value={data.email} onChange={onChange} placeholder="ejemplo@correo.com" className="mt-1" style={{ fontFamily: "'Nunito', sans-serif" }} />
        </div>
        <div>
          <Label htmlFor="phone" style={{ fontFamily: "'Nunito', sans-serif" }}>Teléfono</Label>
          <Input id="phone" name="phone" type="tel" value={data.phone} onChange={onChange} placeholder="+34 600 000 000" className="mt-1" style={{ fontFamily: "'Nunito', sans-serif" }} />
        </div>
      </div>
    );

    const Step2 = ({ data, onUserTypeChange, onBirthDateChange }) => (
      <div className="space-y-6">
        <div>
          <Label htmlFor="birthDate" style={{ fontFamily: "'Nunito', sans-serif" }}>Fecha de Nacimiento</Label>
          <Input id="birthDate" name="birthDate" type="date" value={data.birthDate} onChange={onBirthDateChange} className="mt-1" style={{ fontFamily: "'Nunito', sans-serif" }} />
        </div>
        <div>
          <Label style={{ fontFamily: "'Nunito', sans-serif" }}>Tipo de Usuario</Label>
          <Select name="userType" onValueChange={onUserTypeChange} value={data.userType}>
            <SelectTrigger className="w-full mt-1" style={{ fontFamily: "'Nunito', sans-serif" }}>
              <SelectValue placeholder="Selecciona tu rol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="inquilino" style={{ fontFamily: "'Nunito', sans-serif" }}>Busco alojamiento (Inquilino)</SelectItem>
              <SelectItem value="arrendador" style={{ fontFamily: "'Nunito', sans-serif" }}>Ofrezco alojamiento (Arrendador)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    );

    const Step3 = ({ data, onHobbyChange, onDisabilityChange }) => (
      <div className="space-y-6">
        <div>
          <Label style={{ fontFamily: "'Nunito', sans-serif" }}>Aficiones (selecciona varias si quieres)</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
            {hobbyOptions.map(hobby => (
              <Button
                key={hobby}
                variant={data.hobbies.includes(hobby) ? "default" : "outline"}
                onClick={() => onHobbyChange(hobby)}
                className={`w-full ${data.hobbies.includes(hobby) ? 'bg-indigo-500 text-white' : 'border-indigo-300 text-indigo-500 hover:bg-indigo-50'}`}
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                {hobby}
              </Button>
            ))}
          </div>
        </div>
        <div>
          <Label style={{ fontFamily: "'Nunito', sans-serif" }}>Tipo de Discapacidad (si aplica)</Label>
          <Select name="disabilityType" onValueChange={onDisabilityChange} value={data.disabilityType}>
            <SelectTrigger className="w-full mt-1" style={{ fontFamily: "'Nunito', sans-serif" }}>
              <SelectValue placeholder="Selecciona una opción" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none" style={{ fontFamily: "'Nunito', sans-serif" }}>Ninguna</SelectItem>
              <SelectItem value="physical" style={{ fontFamily: "'Nunito', sans-serif" }}>Física</SelectItem>
              <SelectItem value="sensory" style={{ fontFamily: "'Nunito', sans-serif" }}>Sensorial</SelectItem>
              <SelectItem value="mental" style={{ fontFamily: "'Nunito', sans-serif" }}>Mental</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    );

    const Step4 = ({ data, onChange }) => (
      <div className="space-y-4">
        <div>
          <Label htmlFor="city" style={{ fontFamily: "'Nunito', sans-serif" }}>Ciudad o Zona donde buscas/ofreces piso</Label>
          <Input id="city" name="city" value={data.city} onChange={onChange} placeholder="Ej: Madrid Centro, Barcelona Eixample" className="mt-1" style={{ fontFamily: "'Nunito', sans-serif" }} />
        </div>
        <div className="pt-4">
          <p className="text-lg font-semibold text-indigo-600 text-center" style={{ fontFamily: "'Poppins', sans-serif" }}>¡Casi listo!</p>
          <p className="text-slate-600 text-center mt-2" style={{ fontFamily: "'Nunito', sans-serif" }}>Revisa que toda tu información sea correcta antes de finalizar.</p>
        </div>
      </div>
    );

    const SidebarNavLink = ({ to, children, onClick }) => {
      const location = useLocation();
      const navigate = useNavigate();
      const isActive = location.pathname === to;
    
      const handleClick = (e) => {
        e.preventDefault();
        navigate(to);
        if (onClick) onClick();
      };
    
      return (
        <a
          href={to}
          onClick={handleClick}
          className={`flex items-center space-x-3 p-2 rounded-md transition hover:bg-indigo-100 ${
            isActive ? 'bg-indigo-200 font-bold' : ''
          }`}
        >
          {children}
        </a>
      );
    };

    const Sidebar = ({ setIsAuthenticated, setShowProfileCreation }) => {
      const navigate = useNavigate();
      const { toast } = useToast();
    
      const navItems = [
        { icon: <Home size={20} />, label: 'Inicio', path: '/' },
        { icon: <Search size={20} />, label: 'Anuncios', path: '/anuncios' },
        { icon: <MapPin size={20} />, label: 'Mapa', path: '/mapa' },
    { icon: <MessageSquare size={20} />, label: 'Mensajes', path: '/mensajes' },
    { icon: <Heart size={20} />, label: 'Favoritos', path: '/favoritos' },
    { icon: <User size={20} />, label: 'Mi Perfil', path: '/perfil' },
    { icon: <Building size={20} />, label: 'Mi Piso', path: '/mi-piso' },
    { icon: <Settings size={20} />, label: 'Configuración', path: '/configuracion' },
      ];
    
      const handleLogout = () => {
        localStorage.removeItem('isAuthenticatedUniRoomFinder');
        localStorage.removeItem('userProfileUniRoomFinder');
        setIsAuthenticated(false);
        setShowProfileCreation(false);
        toast({ title: 'Sesión Cerrada', description: 'Has cerrado sesión correctamente.' });
        navigate('/');
      };
    
      return (
        <div className="w-64 bg-white border-r p-6 hidden md:block h-screen">
          <h1 className="text-2xl font-bold text-indigo-600 mb-8">UniRoomFinder</h1>
          <nav className="space-y-3">
            {navItems.map((item) => (
              <SidebarNavLink key={item.label} to={item.path}>
                {item.icon}
                <span>{item.label}</span>
              </SidebarNavLink>
            ))}
          </nav>
          <div className="mt-auto">
                        <Button variant="outline" className="w-full border-red-500 text-red-500 hover:bg-red-100 hover:border-red-600 hover:text-red-600 flex items-center justify-center group" onClick={handleLogout} style={{ fontFamily: "'Nunito', sans-serif" }}>
                          <LogOut size={18} className="mr-2 transition-transform group-hover:scale-110" />
                          Cerrar Sesión
                        </Button>
                      </div>
        </div>
      );
    };
    

    const Dashboard = () => {
      const stats = [
        { label: "Nuevos Anuncios Hoy", value: "12", icon: <Home className="text-blue-500" />, color: "blue" },
        { label: "Compañeros Buscando", value: "87", icon: <Users className="text-green-500" />, color: "green" },
        { label: "Mensajes Sin Leer", value: "5", icon: <MessageSquare className="text-purple-500" />, color: "purple" },
      ];

      const recentListings = [
        { id: 1, title: "Piso céntrico ideal estudiantes", price: "450€/mes", image_alt: "Piso céntrico", image_text: "Piso luminoso en el centro", location: "Calle Mayor, 10", num_people: 3, adapted: true },
        { id: 2, title: "Habitación en chalet compartido", price: "320€/mes", image_alt: "Habitación en chalet", image_text: "Chalet con jardín y piscina", location: "Avenida Universidad, 25", num_people: 4, adapted: false },
        { id: 3, title: "Estudio moderno cerca del campus", price: "550€/mes", image_alt: "Estudio moderno", image_text: "Estudio recién reformado", location: "Plaza Nueva, 5", num_people: 1, adapted: false },
      ];
      const navigate = useNavigate();
      
      return (
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-semibold text-slate-800 mb-2" style={{ fontFamily: "'Poppins', sans-serif" }}>Bienvenido de nuevo!</h2>
            <p className="text-slate-600" style={{ fontFamily: "'Nunito', sans-serif" }}>Aquí tienes un resumen de tu actividad y novedades.</p>
          </motion.div>

          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                className={`bg-white p-6 rounded-xl shadow-lg border-l-4 border-${stat.color}-500`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-slate-500" style={{ fontFamily: "'Nunito', sans-serif" }}>{stat.label}</p>
                    <p className="text-3xl font-bold text-slate-800" style={{ fontFamily: "'Poppins', sans-serif" }}>{stat.value}</p>
                  </div>
                  <div className={`p-3 bg-${stat.color}-100 rounded-full`}>
                    {React.cloneElement(stat.icon, { size: 28 })}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div>
            <h3 className="text-2xl font-semibold text-slate-700 mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>Anuncios Recientes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentListings.map(listing => (
                <PropertyCard key={listing.id} property={listing} isSimplified />
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button 
                onClick={() => navigate('/anuncios')} 
                className="bg-indigo-600 hover:bg-indigo-700 text-white" 
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                Ver Todos los Anuncios <Search size={18} className="ml-2" />
              </Button>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-2xl font-semibold text-slate-700 mb-4" style={{ fontFamily: "'Poppins', sans-serif" }}>Búsqueda Rápida</h3>
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-grow">
                <Label htmlFor="quick-search-city" style={{ fontFamily: "'Nunito', sans-serif" }}>Ciudad o Zona</Label>
                <Input id="quick-search-city" placeholder="Ej: Valencia, Benimaclet" className="mt-1" style={{ fontFamily: "'Nunito', sans-serif" }} />
              </div>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white w-full md:w-auto" style={{ fontFamily: "'Nunito', sans-serif" }}>
                <Search size={18} className="mr-2" /> Buscar
              </Button>
            </div>
          </motion.div>
        </div>
      );
    };
    
    const PropertyCard = ({ property, isSimplified = false }) => {
      const { toast } = useToast();
      const navigate = useNavigate();

      const handleContact = () => {
        toast({
          title: "Contacto Simulado",
          description: `Has intentado contactar sobre ${property.title || property.address}. En una app real, esto abriría un chat o mostraría info de contacto.`,
        });
      };

      const handleViewAd = () => {
         toast({
          title: "Viendo Anuncio",
          description: `Mostrando detalles de ${property.title || property.address}.`,
        });
        // In a real app, you'd navigate to a detailed page:
        // navigate(`/anuncios/${property.id}`);
      };

      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl shadow-lg overflow-hidden transition-all hover:shadow-2xl flex flex-col"
        >
          <div className="relative">
            <img  
              className="w-full h-48 object-cover" 
              alt={property.image_alt || `Fachada de ${property.address}`}
             src={`https://source.unsplash.com/random/400x300/?apartment,${property.id}`} />
            <div className="absolute top-2 right-2 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md" style={{ fontFamily: "'Poppins', sans-serif" }}>
              {property.price}
            </div>
            {property.adapted && (
              <div className="absolute top-2 left-2 bg-green-500 text-white p-2 rounded-full shadow-md" title="Adaptado para discapacidad">
                <Users size={18} />
              </div>
            )}
          </div>

          <CardContent className="p-4 flex-grow">
            <h3 className="text-xl font-semibold text-indigo-700 mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>
              {property.title || property.address}
            </h3>
            {!isSimplified && <p className="text-sm text-slate-500 mb-1" style={{ fontFamily: "'Nunito', sans-serif" }}>{property.address}</p>}
            
            <div className="flex items-center space-x-3 text-sm text-slate-600 my-2" style={{ fontFamily: "'Nunito', sans-serif" }}>
              <span className="flex items-center"><Users size={16} className="mr-1 text-indigo-500" /> {property.num_people} personas</span>
              {!isSimplified && <span className="flex items-center"><BedDouble size={16} className="mr-1 text-indigo-500" /> {property.free_rooms} hab. libres</span>}
              {!isSimplified && <span className="flex items-center"><Bath size={16} className="mr-1 text-indigo-500" /> {property.bathrooms} baños</span>}
            </div>

            {!isSimplified && (
              <>
                <div className="flex flex-wrap gap-2 my-3">
                  {property.features?.terrace && <FeatureChip icon={<Sun size={14}/>} text="Terraza" />}
                  {property.features?.ac && <FeatureChip icon={<Snowflake size={14}/>} text="A/A" />}
                </div>
                <div className="mt-3 pt-3 border-t border-slate-200">
                  <p className="text-sm font-medium text-slate-700" style={{ fontFamily: "'Poppins', sans-serif" }}>Propietario: {property.owner_name}</p>
                  <p className="text-xs text-slate-500" style={{ fontFamily: "'Nunito', sans-serif" }}>Contacto: {property.owner_contact}</p>
                </div>
                <div className="mt-3">
                  <p className="text-sm font-medium text-slate-700 mb-1" style={{ fontFamily: "'Poppins', sans-serif" }}>Compañeros Actuales:</p>
                  <div className="flex space-x-2">
                    {property.current_tenants?.map(tenant => (
                      <div key={tenant.name} className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs" style={{ fontFamily: "'Nunito', sans-serif" }}>{tenant.name} ({tenant.age})</div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </CardContent>
          
          <CardFooter className="p-4 bg-slate-50/50 mt-auto">
            {isSimplified ? (
               <Button onClick={handleViewAd} className="w-full bg-indigo-500 hover:bg-indigo-600 text-white" style={{ fontFamily: "'Nunito', sans-serif" }}>
                Ver Anuncio <Eye size={16} className="ml-2" />
              </Button>
            ) : (
              <Button onClick={handleContact} className="w-full bg-green-500 hover:bg-green-600 text-white" style={{ fontFamily: "'Nunito', sans-serif" }}>
                Contactar <Phone size={16} className="ml-2" />
              </Button>
            )}
          </CardFooter>
        </motion.div>
      );
    };

    const FeatureChip = ({ icon, text }) => (
      <span className="flex items-center bg-sky-100 text-sky-700 px-2 py-1 rounded-full text-xs font-medium" style={{ fontFamily: "'Nunito', sans-serif" }}>
        {icon && React.cloneElement(icon, { className: "mr-1" })}
        {text}
      </span>
    );

    const PropertyListingPage = () => {
      const properties = [
        { id: 1, address: "Calle Falsa 123, Ciudad Real", title: "Piso Luminoso Centro", price: "350€/mes", num_people: 3, adapted: true, free_rooms: 1, bathrooms: 1, features: { terrace: true, ac: false }, owner_name: "Juan Pérez", owner_contact: "juan.perez@email.com", current_tenants: [{name: "Ana", age:22}, {name: "Luis", age:24}], image_alt: "Piso luminoso en Calle Falsa", image_text: "Piso exterior con mucha luz natural" },
        { id: 2, address: "Avenida Principal 45, Villa Arriba", title: "Apartamento Moderno", price: "400€/mes", num_people: 4, adapted: false, free_rooms: 2, bathrooms: 2, features: { terrace: false, ac: true }, owner_name: "María López", owner_contact: "maria.lopez@email.com", current_tenants: [{name: "Carlos", age:21}, {name: "Sofía", age:23}], image_alt: "Apartamento moderno en Avenida Principal", image_text: "Apartamento con vistas despejadas" },
        { id: 3, address: "Plaza Mayor 1, Pueblo Nuevo", title: "Estudio Acogedor", price: "300€/mes", num_people: 2, adapted: true, free_rooms: 1, bathrooms: 1, features: { terrace: true, ac: true }, owner_name: "Pedro Gómez", owner_contact: "pedro.gomez@email.com", current_tenants: [{name: "Laura", age:20}], image_alt: "Acogedor estudio en Plaza Mayor", image_text: "Estudio céntrico ideal para una persona" },
        { id: 4, address: "Ronda Norte 78, Ciudad Jardín", title: "Chalet Amplio", price: "450€/mes", num_people: 5, adapted: false, free_rooms: 3, bathrooms: 2, features: { terrace: true, ac: true }, owner_name: "Lucía Fernández", owner_contact: "lucia.fdez@email.com", current_tenants: [{name: "David", age:25}, {name: "Elena", age:22}], image_alt: "Amplio chalet en Ronda Norte", image_text: "Chalet con jardín y piscina comunitaria" },
        { id: 5, address: "Calle Luna 22, Barrio Gótico", title: "Habitación con Encanto", price: "380€/mes", num_people: 3, adapted: false, free_rooms: 1, bathrooms: 1, features: { terrace: false, ac: false }, owner_name: "Sofía Castillo", owner_contact: "sofia.castillo@email.com", current_tenants: [{name: "Marco", age:23}, {name: "Julia", age:21}], image_alt: "Habitación en piso antiguo", image_text: "Habitación tranquila en el corazón del barrio" },
        { id: 6, address: "Paseo Marítimo 101, Costa Azul", title: "Vistas al Mar", price: "500€/mes", num_people: 2, adapted: true, free_rooms: 1, bathrooms: 1, features: { terrace: true, ac: true }, owner_name: "Ricardo Soler", owner_contact: "ricardo.soler@email.com", current_tenants: [{name: "Paula", age:26}], image_alt: "Apartamento con vistas al mar", image_text: "Despierta con el sonido de las olas" },
      ];

      return (
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row justify-between items-center gap-4 p-4 bg-white rounded-xl shadow-md"
          >
            <h2 className="text-3xl font-semibold text-indigo-700" style={{ fontFamily: "'Poppins', sans-serif" }}>Portal de Anuncios</h2>
            <div className="flex items-center gap-2">
              <Input placeholder="Buscar por dirección, ciudad..." className="max-w-xs" style={{ fontFamily: "'Nunito', sans-serif" }} />
              <Button variant="outline" className="border-indigo-500 text-indigo-500 hover:bg-indigo-50" style={{ fontFamily: "'Nunito', sans-serif" }}>
                <Filter size={18} className="mr-2" /> Filtros
              </Button>
            </div>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map(prop => <PropertyCard key={prop.id} property={prop} />)}
          </div>
        </div>
      );
    };

    const MapScreen = () => (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-xl p-6 h-[calc(100vh-10rem)] flex flex-col items-center justify-center"
      >
        <MapPin size={64} className="text-indigo-500 mb-6 animate-bounce" />
        <h2 className="text-3xl font-semibold text-indigo-700 mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>Mapa Interactivo (Simulado)</h2>
        <p className="text-slate-600 text-center max-w-md" style={{ fontFamily: "'Nunito', sans-serif" }}>
          Aquí se mostraría un mapa interactivo con las ubicaciones de los pisos.
          Por ahora, imagina chinchetas de colores vibrantes sobre un mapa de OpenStreetMap.
        </p>
        <img  className="mt-8 rounded-lg shadow-md w-full max-w-2xl h-64 object-cover" alt="Mapa simulado con chinchetas de ubicaciones" src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?q=80&w=1931&auto=format&fit=crop" />
      </motion.div>
    );

    const PlaceholderScreen = ({ title, icon }) => (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center h-full text-center p-8 bg-white rounded-xl shadow-lg"
      >
        {icon && React.cloneElement(icon, { className: "text-indigo-400 mb-6"})}
        <h2 className="text-4xl font-bold text-indigo-600 mb-3" style={{ fontFamily: "'Poppins', sans-serif" }}>{title}</h2>
        <p className="text-slate-500 text-lg" style={{ fontFamily: "'Nunito', sans-serif" }}>Esta sección está en construcción. ¡Vuelve pronto!</p>
      </motion.div>
    );

    export default App;
  