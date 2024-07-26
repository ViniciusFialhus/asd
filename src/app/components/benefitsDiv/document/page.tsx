"use client";
import styles from "./page.module.css";
import { useEffect, useState, ChangeEvent, useRef } from "react";

interface DefensesDivProps {
  readonly height: string | number;
  readonly width: string | number;
  readonly style: any;
  readonly onMouseDown?: (event: React.MouseEvent<HTMLDivElement>) => void;
  readonly onMouseMove?: (event: React.MouseEvent<HTMLDivElement>) => void;
  readonly removerItem?: any;
}

interface Expertise {
  vantagem: string;
  efeito: string;
}
const expertiseOptions: Record<string, Expertise[]> = {
  combate: [
    {
      vantagem: "Ação em Movimento",
      efeito: "Mova-se tanto antes quanto depois de sua ação padrão.",
    },
    {
      vantagem: "Agarrar Aprimorado",
      efeito: "Faça ataques de agarrar com apenas uma mão.",
    },
    {
      vantagem: "Agarrar Preciso",
      efeito: "Substitui Des por For em ataques para agarrar.",
    },
    {
      vantagem: "Agarrar Rápido",
      efeito:
        "Quando acerta um ataque desarmado, pode fazer um teste de agarrar como ação livre.",
    },
    {
      vantagem: "Ambiente Favorito",
      efeito:
        "Bônus de circunstância no ataque ou na defesa em determinado ambiente.",
    },
    {
      vantagem: "Arma Improvisada",
      efeito:
        "Use a perícia Combate Desarmado com armas improvisadas, com bônus de dano de +1.",
    },
    {
      vantagem: "Armação",
      efeito:
        "Transfira o benefício de uma perícia de interação para um aliado.",
    },
    {
      vantagem: "Ataque à Distância",
      efeito: "Bônus de +1 em testes de ataque à distância por graduação.",
    },
    {
      vantagem: "Ataque Acurado",
      efeito: "Troque a CD do efeito por um bônus de ataque.",
    },
    {
      vantagem: "Ataque Corpo-a-Corpo",
      efeito: "Bônus de +1 em testes de ataque corpo-a-corpo por graduação.",
    },
    {
      vantagem: "Ataque Defensivo",
      efeito: "Troque um bônus de ataque por um bônus de defesa ativa.",
    },
    {
      vantagem: "Ataque Dominó",
      efeito: "Ganhe um ataque extra quando incapacitar um capanga.",
    },
    {
      vantagem: "Ataque Imprudente",
      efeito: "Troque defesa ativa por um bônus de ataque.",
    },
    {
      vantagem: "Ataque Poderoso",
      efeito: "Troque bônus de ataque por bônus de efeito.",
    },
    {
      vantagem: "Ataque Preciso",
      efeito:
        "Ignore penalidades em testes de ataque devido a cobertura ou camuflagem.",
    },
    {
      vantagem: "Crítico Aprimorado",
      efeito: "+1 na ameaça de crítico com um ataque específico por graduação.",
    },
    {
      vantagem: "Defesa Aprimorada",
      efeito:
        "Bônus de +2 em uma defesa ativa quando você usa a ação defender-se.",
    },
    {
      vantagem: "Derrubar Aprimorado",
      efeito: "Sem penalidade para usar a ação derrubar.",
    },
    {
      vantagem: "Desarmar Aprimorado",
      efeito: "Sem penalidade para usar a ação desarmar.",
    },
    {
      vantagem: "Esquiva Fabulosa",
      efeito: "Você não fica vulnerável quando surpreso ou desatento.",
    },
    {
      vantagem: "Estrangular",
      efeito: "Sufoca um oponente que você tenha agarrado.",
    },
    {
      vantagem: "Evasão",
      efeito: "Bônus de circunstância para evitar ataques de área.",
    },
    {
      vantagem: "Imobilizar Aprimorado",
      efeito: "Penalidade de circunstância de –5 para escapar de você.",
    },
    {
      vantagem: "Iniciativa Aprimorada",
      efeito: "Bônus de +4 por graduação em testes de iniciativa.",
    },
    { vantagem: "Luta no Chão", efeito: "Sem penalidade por lutar caído." },
    {
      vantagem: "Maestria em Arremesso",
      efeito: "Bônus de dano de +1 com armas arremessadas por graduação.",
    },
    {
      vantagem: "Mira Aprimorada",
      efeito: "Dobra os bônus de circunstância por mirar.",
    },
    {
      vantagem: "Prender Arma",
      efeito: "Tentativa livre de desarme quando você se defende.",
    },
    {
      vantagem: "Quebrar Aprimorado",
      efeito: "Sem penalidade para usar a ação quebrar.",
    },
    {
      vantagem: "Quebrar Arma",
      efeito: "Tentativa livre de quebrar quando você se defende.",
    },
    {
      vantagem: "Redirecionar",
      efeito:
        "Use Enganação para redirecionar um ataque que falhe para outro alvo.",
    },
    {
      vantagem: "Rolamento Defensivo",
      efeito: "Bônus de defesa ativa de +1 em Resistência por graduação.",
    },
    { vantagem: "Saque Rápido", efeito: "Saque uma arma como uma ação livre." },
  ],
  pericia: [
    {
      vantagem: "Artífice",
      efeito:
        "Use Especialidade: Magia para criar dispositivos mágicos temporários.",
    },
    { vantagem: "Assustar", efeito: "Use Intimidação para fintar em combate." },
    {
      vantagem: "Atraente",
      efeito:
        "Bônus de circunstância em perícias de interação baseado em sua aparência.",
    },
    {
      vantagem: "Bem Informado",
      efeito:
        "Teste imediato de Investigação ou Percepção para saber alguma coisa.",
    },
    {
      vantagem: "Bem Relacionado",
      efeito: "Chame ajuda ou consiga favores com um teste de Persuasão.",
    },
    {
      vantagem: "Contatos",
      efeito: "Faça um teste inicial de Investigação em um minuto.",
    },
    {
      vantagem: "Empatia com Animais",
      efeito: "Use perícias de interação com animais.",
    },
    {
      vantagem: "Esconder-se à Plena Vista",
      efeito: "Esconda-se quando observado sem precisar de uma distração.",
    },
    {
      vantagem: "Fascinar",
      efeito: "Use uma perícia de interação para prender a atenção dos outros.",
    },
    { vantagem: "Faz Tudo", efeito: "Use qualquer perícia sem treinamento." },
    {
      vantagem: "Ferramentas Aprimoradas",
      efeito:
        "Sem penalidade por usar perícias sem as ferramentas apropriadas.",
    },
    {
      vantagem: "Finta Ágil",
      efeito: "Finte usando a perícia Acrobacia ou sua velocidade.",
    },
    { vantagem: "Idiomas", efeito: "Fale e compreenda idiomas adicionais." },
    {
      vantagem: "Inimigo Favorito",
      efeito: "Bônus de circunstância em testes contra um tipo de oponente.",
    },
    {
      vantagem: "Inventor",
      efeito: "Use Tecnologia para criar dispositivos temporários.",
    },
    {
      vantagem: "Maestria em Perícia",
      efeito:
        "Realize testes de rotina com uma perícia sob quaisquer circunstâncias.",
    },
    { vantagem: "Rastrear", efeito: "Use Percepção para seguir rastros." },
    {
      vantagem: "Ritualista",
      efeito: "Use Especialidade: Magia para criar e realizar rituais.",
    },
    {
      vantagem: "Tontear",
      efeito: "Use Enganação ou Intimidação para deixar um oponente tonto.",
    },
    {
      vantagem: "Zombar",
      efeito: "Use Enganação para desmoralizar em combate.",
    },
  ],
  sorte: [
    {
      vantagem: "Esforço Supremo",
      efeito:
        "Gaste um ponto heróico para ganhar um 20 efetivo em um teste específico.",
    },
    {
      vantagem: "Inspirar",
      efeito:
        "Gaste um ponto heróico para conceder a seus aliados um bônus de circunstância de +1 por graduação.",
    },
    {
      vantagem: "Liderança",
      efeito: "Gaste um ponto heróico para remover uma condição de um aliado.",
    },
    {
      vantagem: "Sorte de Principiante",
      efeito:
        "Gaste um ponto heróico para ganhar 5 graduações temporárias em uma perícia.",
    },
    { vantagem: "Sorte", efeito: "Rerole uma rolagem uma vez por graduação." },
    {
      vantagem: "Tomar a Iniciativa",
      efeito:
        "Gaste um ponto heróico para agir primeiro na ordem de iniciativa.",
    },
  ],
  geral: [
    {
      vantagem: "Avaliação",
      efeito:
        "Use Intuição para descobrir as habilidades de combate do oponente.",
    },
    {
      vantagem: "Benefício",
      efeito: "Ganhe uma gratificação ou benefício adicional.",
    },
    {
      vantagem: "Capanga",
      efeito:
        "Ganhe um seguidor ou capanga com (15 x graduação) pontos de poder.",
    },
    {
      vantagem: "De Pé",
      efeito: "Passe de caído para em pé como uma ação livre.",
    },
    { vantagem: "Destemido", efeito: "Imune a efeitos de medo." },
    {
      vantagem: "Duro de Matar",
      efeito: "Estabilize automaticamente quando moribundo.",
    },
    {
      vantagem: "Equipamento",
      efeito: "5 pontos de equipamento por graduação.",
    },
    {
      vantagem: "Esforço Extraordinário",
      efeito: "Ganhe dois benefícios quando usando esforço extra.",
    },
    {
      vantagem: "Interpor-se",
      efeito: "Sofra um ataque mirado contra um aliado.",
    },
    {
      vantagem: "Memória Eidética",
      efeito:
        "Você se lembra de tudo, bônus de circunstância de +5 para se lembrar das coisas.",
    },
    {
      vantagem: "Parceiro",
      efeito: "Ganhe um parceiro com (5 x graduação) pontos de poder.",
    },
    {
      vantagem: "Segunda Chance",
      efeito: "Rerole um teste falho contra uma ameaça uma vez.",
    },
    {
      vantagem: "Tolerância Maior",
      efeito: "+5 em testes envolvendo tolerância.",
    },
    {
      vantagem: "Trabalho em Equipe",
      efeito: "+5 de bônus para ajudar em testes de equipe.",
    },
    {
      vantagem: "Transe",
      efeito:
        "Entre em um transe parecido com a morte que diminui as funções vitais.",
    },
  ],
};

export default function BenefitsDiv({
  height,
  width,
  style,
  onMouseDown,
  onMouseMove,
  removerItem,
}: DefensesDivProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<Expertise[]>([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("combate");
  const [utils, setUtils] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dimensions, setDimensions] = useState({ width, height });

  const handleDobleClick = () => {
    setUtils(true);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setUtils(false);
    }
  };

  const addItem = (item: string) => {
    const selected = expertiseOptions[selectedCategory].find(
      (option) => option.vantagem === item
    );
    if (selected) {
      const includes = items.includes(selected);
      if (!includes) {
        setSelectedValue("");
        setItems((prevItems) => [...prevItems, selected]);
      }
    }
  };

  const removeItem = (item: string) => {
    const removeList = items.filter((option) => option.vantagem !== item);
    setItems(removeList);
  };

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    if (value) {
      addItem(value);
    }
  };

  const handleResizeMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsResizing(true);
  };
  const handleMouseMove = (event: MouseEvent) => {
    if (isResizing) {
      const newWidth =
        event.clientX - (ref.current?.getBoundingClientRect().left || 0);
      const newHeight =
        event.clientY - (ref.current?.getBoundingClientRect().top || 0);
      setDimensions({ width: newWidth, height: newHeight });
    }
  };

  const handleMouseUp = () => {
    if (isResizing) {
      setIsResizing(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  useEffect(() => {
    const handleGlobalMouseDown = () => setMouseDown(true);
    const handleGlobalMouseUp = () => setMouseDown(false);

    window.addEventListener("mousedown", handleGlobalMouseDown);
    window.addEventListener("mouseup", handleGlobalMouseUp);

    return () => {
      window.removeEventListener("mousedown", handleGlobalMouseDown);
      window.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={styles.main}
      style={{
        ...style,
        height: dimensions.height,
        width: dimensions.width,
        cursor: mouseDown ? "grabbing" : "grab",
      }}
      onDoubleClick={handleDobleClick}
      onMouseDown={
        !utils && typeof onMouseDown === "function" ? onMouseDown : undefined
      }
      onMouseMove={
        !utils && typeof onMouseMove === "function" ? onMouseMove : undefined
      }
    >
      <section className={styles.containerBase}>
        <div className={styles.containerText}>VANTAGENS</div>
        <div
          className={styles.containerContent}
          style={{ border: utils ? "2px solid black" : "" }}
        >
          <div className={styles.containerSelector}>
            {utils && (
              <div
                className={styles.resize}
                onMouseDown={handleResizeMouseDown}
              >
                <span className="material-symbols-outlined">resize</span>
              </div>
            )}
            <select
              value={selectedCategory}
              className={styles.containerSelectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{ marginBottom: "5px", marginTop: "5px" }}
            >
              <option value="combate">Combate</option>
              <option value="pericia">Perícia</option>
              <option value="sorte">Sorte</option>
              <option value="geral">Geral</option>
            </select>
            <select
              value={selectedValue}
              onChange={handleSelectChange}
              style={{ marginBottom: "5px", marginTop: "5px" }}
            >
              <option value="" disabled>
                Selecione sua Vantagem
              </option>
              {expertiseOptions[selectedCategory].map((expertise, index) => (
                <option key={index} value={expertise.vantagem}>
                  {expertise.vantagem}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.containerContentChildren}>
          {items.map((item, index) => (
            <div className={styles.dynamicItem} key={index}>
              <div className={styles.containerSpan}>
                <span
                  className="material-symbols-outlined"
                  onClick={() => removeItem(item.vantagem)}
                >
                  delete
                </span>
              </div>
              <div className={styles.containerName}>{item.vantagem} </div>
              <div className={styles.containerName}> -| {item.efeito}</div>
            </div>
          ))}
        </div>
        </div>
      </section>
      <section className={styles.containerIcon}>
        {utils && (
          <>
            <div className={styles.containerSpan} onClick={removerItem}>
              <span className="material-symbols-outlined">delete</span>
            </div>
            <div className={styles.containerSpan}>
              <span className="material-symbols-outlined">recenter</span>
            </div>
          </>
        )}
      </section>
    </div>
  );
}
