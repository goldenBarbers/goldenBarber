import React, { createContext, useContext, useState } from 'react';

export interface Agendamento {
  id: string;
  servico: string;
  barbeiro: string;
  data: string;
  horario: string;
  duracao: string;
  preco: string;
  status: string;
}

export interface Usuario {
  nome: string;
  email: string;
}

interface AuthContextType {
  usuario: Usuario | null;
  login: (nome: string, email: string) => void;
  logout: () => void;
  agendamento: Agendamento | null;
  agendar: (novoAgendamento: Agendamento) => void;
  cancelarAgendamento: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Estado do Usuário Autenticado (Inicia sem usuário ou pronto para receber o formulário)
  const [usuario, setUsuario] = useState<Usuario | null>({
    nome: 'Lucas Silveira',
    email: 'lucas.silveira@email.com',
  });

  // Estado do Agendamento Ativo
  const [agendamento, setAgendamento] = useState<Agendamento | null>({
    id: 'ag-102',
    servico: 'Corte de Cabelo Minimalista',
    barbeiro: 'Paulo Rogério',
    data: 'Segunda-feira, 26/10',
    horario: '14:00',
    duracao: '40 min',
    preco: 'R$ 65,00',
    status: 'Confirmado',
  });

  const login = (nome: string, email: string) => {
    setUsuario({ nome, email });
  };

  const logout = () => {
    setUsuario(null);
  };

  const agendar = (novoAgendamento: Agendamento) => {
    setAgendamento(novoAgendamento);
  };

  const cancelarAgendamento = () => {
    setAgendamento(null);
  };

  return (
    <AuthContext.Provider
      value={{
        usuario,
        login,
        logout,
        agendamento,
        agendar,
        cancelarAgendamento,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);