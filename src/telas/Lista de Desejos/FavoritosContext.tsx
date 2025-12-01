import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

// Tipagem para produto favorito
export interface ProdutoFavorito {
  id: number;
  nome: string;
  preco: number;
  imagem: any;
  descricao: string;
  descricaoDetalhada?: string;
  slider?: any[];
}

interface FavoritosContextType {
  favoritos: ProdutoFavorito[];
  adicionarFavorito: (produto: ProdutoFavorito) => void;
  removerFavorito: (id: number) => void;
  limparFavoritos: () => void; // 👈 NOVO
}

const FavoritosContext = createContext<FavoritosContextType | undefined>(
  undefined
);

interface FavoritosProviderProps {
  children: ReactNode;
}

export function FavoritosProvider({ children }: FavoritosProviderProps) {
  const [favoritos, setFavoritos] = useState<ProdutoFavorito[]>([]);

  function adicionarFavorito(produto: ProdutoFavorito) {
    setFavoritos((favoritosAtuais) => {
      // evita duplicado
      const jaExiste = favoritosAtuais.some((f) => f.id === produto.id);
      if (jaExiste) return favoritosAtuais;
      return [...favoritosAtuais, produto];
    });
  }

  function removerFavorito(id: number) {
    setFavoritos((favoritosAtuais) =>
      favoritosAtuais.filter((item) => item.id !== id)
    );
  }

  function limparFavoritos() {
    setFavoritos([]); // 👈 limpa tudo
  }

  return (
    <FavoritosContext.Provider
      value={{ favoritos, adicionarFavorito, removerFavorito, limparFavoritos }}
    >
      {children}
    </FavoritosContext.Provider>
  );
}

export function useFavoritos() {
  const context = useContext(FavoritosContext);
  if (!context) {
    throw new Error(
      "useFavoritos deve ser usado dentro de um FavoritosProvider"
    );
  }
  return context;
}
