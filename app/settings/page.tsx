"use client";

import { NavBar } from "@/components/NavBar";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />

      {/* Main Content Area */}
      <main className="md:ml-80 ml-0 pt-16 md:pt-0">
        <div className="max-w-2xl mx-auto p-4 md:p-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Configurações
            </h1>

            {/* Profile Settings */}
            <section className="mb-8 pb-8 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Perfil
              </h2>
              <p className="text-gray-600">
                Manage your profile information and preferences here.
              </p>
            </section>

            {/* Privacy Settings */}
            <section className="mb-8 pb-8 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Privacidade
              </h2>
              <p className="text-gray-600">
                Control your privacy settings and who can contact you.
              </p>
            </section>

            {/* Notifications */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Notificações
              </h2>
              <p className="text-gray-600">
                Customize your notification preferences.
              </p>
            </section>

            {/* Save Button */}
            <div className="flex gap-3">
              <Button className="bg-blue-500 hover:bg-blue-600">
                Salvar Alterações
              </Button>
              <Button variant="outline">Cancelar</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
