import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LanguageProvider } from '@/contexts/LanguageContext';
import AnnouncementBar from '@/components/AnnouncementBar';
import AIChatButton from '@/components/AIChatButton';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import routes from './routes';
import { Toaster } from '@/components/ui/sonner';

const App: React.FC = () => {
  return (
    <Router>
      <LanguageProvider>
        {/*<AuthProvider>*/}
        {/*<RouteGuard>*/}
        <AnnouncementBar />
        <div className="flex flex-col min-h-screen">
          {/*<Header />*/}
          <main className="flex-grow pt-12">
            <Routes>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={route.element}
              />
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
        <Toaster />
        <AIChatButton />
        <FloatingWhatsApp />
        {/*</RouteGuard>*/}
        {/*</AuthProvider>*/}
      </LanguageProvider>
    </Router>
  );
};

export default App;
