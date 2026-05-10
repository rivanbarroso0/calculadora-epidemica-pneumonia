# CalcEpi Pneumonia — Calculadora Epidemiológica

**Modelo SEIR para Pneumonia Bacteriana e Viral**  
Instituto Regional de Referência em Doenças — IRRD-PE

---

## Sobre

Calculadora epidêmica interativa baseada no modelo SEIR (Suscetíveis-Expostos-Infectados-Recuperados), adaptada para pneumonia comunitária (CAP) nas formas bacteriana e viral.

Inspirada na [Calculadora Epidêmica do IRRD-PE (COVID-19)](https://www.irrd.org/covid-19/calculadora-epidemica/) e no modelo original de [Gabriel Goh](http://gabgoh.github.io/COVID/index.html).

---

## Uso

Basta abrir `index.html` em qualquer navegador moderno — não requer servidor ou instalação.

```bash
# Clonar
git clone https://github.com/SEU_USUARIO/calcepi-pneumonia.git
cd calcepi-pneumonia

# Abrir no navegador
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

---

## Tecnologias

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| Linguagem | JavaScript (ES2020) | nativo |
| Visualização | Chart.js | 4.4.1 |
| Tipografia | Google Fonts (IBM Plex Mono, DM Serif Display, DM Sans) | — |
| Estilo | CSS3 com variáveis customizadas | — |
| Modelo | SEIR determinístico (equações diferenciais discretas) | — |
| Runtime | Navegador (Zero dependências de servidor) | — |

---

## Modelo Matemático

O modelo SEIR é governado pelo sistema de equações:

```
dS/dt = -β · c · (I/N) · S
dE/dt =  β · c · (I/N) · S - σ · E
dI/dt =  σ · E - γ · I
dR/dt =  γ · I
```

Onde:
- **S** — Suscetíveis
- **E** — Expostos (período de incubação)
- **I** — Infectados (período infeccioso)
- **R** — Recuperados/Removidos
- **β** — Taxa de transmissão por contato
- **c** — Número de contatos por dia
- **σ** — Taxa de transição E→I (1/período de incubação)
- **γ** — Taxa de recuperação (1/período infeccioso)
- **N** — Tamanho da população

O número reprodutivo básico é: **R₀ = β · c / γ**

---

## Parâmetros Padrão

### Pneumonia Bacteriana (CAP)
| Parâmetro | Valor | Referência |
|-----------|-------|-----------|
| β (transmissão) | 0.45 | Mandell et al. (2007) |
| Incubação | 3.5 dias | WHO (2019) |
| Período infeccioso | 7 dias | Metlay et al. (2019) |
| Hospitalização | 12% | Welte et al. (2012) |
| CFR | 1.2% | Torres et al. (2013) |

### Pneumonia Viral (Influenza-associada)
| Parâmetro | Valor | Referência |
|-----------|-------|-----------|
| β (transmissão) | 0.60 | Chowell et al. (2008) |
| Incubação | 2.0 dias | Lessler et al. (2009) |
| Período infeccioso | 5 dias | Sato et al. (2013) |
| Hospitalização | 8% | Shrestha et al. (2011) |
| CFR | 0.6% | Bhat et al. (2005) |

---

## Intervenções Modeladas

- **Distanciamento social** — reduz o número de contatos `c`
- **Antibioticoterapia** — reduz o período infeccioso `γ` (bacteriana)
- **Vacinação** — aumenta a imunidade da população, reduzindo `S`

---

## Estrutura do Repositório

```
calcepi-pneumonia/
├── index.html          # Aplicação completa (single-file)
├── README.md           # Este arquivo
└── artigo_cientifico.pdf  # Artigo com metodologia completa
```

---

## Referências

- Mandell LA, et al. *Infectious Diseases Society of America/American Thoracic Society consensus guidelines on the management of community-acquired pneumonia in adults.* Clin Infect Dis. 2007.
- Metlay JP, et al. *Diagnosis and Treatment of Adults with Community-acquired Pneumonia.* Am J Respir Crit Care Med. 2019.
- Gabriel Goh. *Epidemic Calculator.* gabgoh.github.io/COVID. 2020.
- IRRD-PE. *Calculadora Epidêmica COVID-19.* irrd.org. 2020.
- WHO. *Pneumonia Fact Sheet.* 2019.

---

## Licença

MIT — Livre para uso educacional e científico.

---

*Desenvolvido com base nos modelos epidemiológicos de referência internacional.*

# CalcEpi Pneumonia — Calculadora Epidemiológica

**Modelo SEIR para Pneumonia Bacteriana e Viral**  
Instituto Regional de Referência em Doenças — IRRD-PE

---

## Sobre

Calculadora epidêmica interativa baseada no modelo SEIR (Suscetíveis-Expostos-Infectados-Recuperados), adaptada para pneumonia comunitária (CAP) nas formas bacteriana e viral.

Inspirada na [Calculadora Epidêmica do IRRD-PE (COVID-19)](https://www.irrd.org/covid-19/calculadora-epidemica/) e no modelo original de [Gabriel Goh](http://gabgoh.github.io/COVID/index.html).

---

## Uso

Basta abrir `index.html` em qualquer navegador moderno — não requer servidor ou instalação.

```bash
# Clonar
git clone https://github.com/SEU_USUARIO/calcepi-pneumonia.git
cd calcepi-pneumonia

# Abrir no navegador
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

---

## Tecnologias

| Camada | Tecnologia | Versão |
|--------|-----------|--------|
| Linguagem | JavaScript (ES2020) | nativo |
| Visualização | Chart.js | 4.4.1 |
| Tipografia | Google Fonts (IBM Plex Mono, DM Serif Display, DM Sans) | — |
| Estilo | CSS3 com variáveis customizadas | — |
| Modelo | SEIR determinístico (equações diferenciais discretas) | — |
| Runtime | Navegador (Zero dependências de servidor) | — |

---

## Modelo Matemático

O modelo SEIR é governado pelo sistema de equações:

```
dS/dt = -β · c · (I/N) · S
dE/dt =  β · c · (I/N) · S - σ · E
dI/dt =  σ · E - γ · I
dR/dt =  γ · I
```

Onde:
- **S** — Suscetíveis
- **E** — Expostos (período de incubação)
- **I** — Infectados (período infeccioso)
- **R** — Recuperados/Removidos
- **β** — Taxa de transmissão por contato
- **c** — Número de contatos por dia
- **σ** — Taxa de transição E→I (1/período de incubação)
- **γ** — Taxa de recuperação (1/período infeccioso)
- **N** — Tamanho da população

O número reprodutivo básico é: **R₀ = β · c / γ**

---

## Parâmetros Padrão

### Pneumonia Bacteriana (CAP)
| Parâmetro | Valor | Referência |
|-----------|-------|-----------|
| β (transmissão) | 0.45 | Mandell et al. (2007) |
| Incubação | 3.5 dias | WHO (2019) |
| Período infeccioso | 7 dias | Metlay et al. (2019) |
| Hospitalização | 12% | Welte et al. (2012) |
| CFR | 1.2% | Torres et al. (2013) |

### Pneumonia Viral (Influenza-associada)
| Parâmetro | Valor | Referência |
|-----------|-------|-----------|
| β (transmissão) | 0.60 | Chowell et al. (2008) |
| Incubação | 2.0 dias | Lessler et al. (2009) |
| Período infeccioso | 5 dias | Sato et al. (2013) |
| Hospitalização | 8% | Shrestha et al. (2011) |
| CFR | 0.6% | Bhat et al. (2005) |

---

## Intervenções Modeladas

- **Distanciamento social** — reduz o número de contatos `c`
- **Antibioticoterapia** — reduz o período infeccioso `γ` (bacteriana)
- **Vacinação** — aumenta a imunidade da população, reduzindo `S`

---

## Estrutura do Repositório

```
calcepi-pneumonia/
├── index.html          # Aplicação completa (single-file)
├── README.md           # Este arquivo
└── artigo_cientifico.pdf  # Artigo com metodologia completa
```

---

## Referências

- Mandell LA, et al. *Infectious Diseases Society of America/American Thoracic Society consensus guidelines on the management of community-acquired pneumonia in adults.* Clin Infect Dis. 2007.
- Metlay JP, et al. *Diagnosis and Treatment of Adults with Community-acquired Pneumonia.* Am J Respir Crit Care Med. 2019.
- Gabriel Goh. *Epidemic Calculator.* gabgoh.github.io/COVID. 2020.
- IRRD-PE. *Calculadora Epidêmica COVID-19.* irrd.org. 2020.
- WHO. *Pneumonia Fact Sheet.* 2019.

---

## Licença

MIT — Livre para uso educacional e científico.

---

*Desenvolvido com base nos modelos epidemiológicos de referência internacional.*

IA utilizada: Claude.ai
Prompt para o código:Atue como um Engenheiro de Software especializado em Modelagem Epidemiológica. O meu objetivo é desenvolver uma ferramenta interativa web para simular o espalhamento de pneumonia (variantes bacteriana e viral).

Referência Técnica: O projeto deve ser inspirado na arquitetura visual e matemática do modelo de Gabriel Goh (baseado no COVID-19) e na Calculadora Epidêmica do IRRD-PE.

Requisitos do Código:

    Desenvolva uma aplicação utilizando HTML5, CSS3 e JavaScript puro (ou D3.js para os gráficos).

    O modelo matemático deve permitir a transição entre estados Suscetível, Exposto, Infectado e Recuperado (modelo SEIR), mas adaptado para as taxas de transmissão da pneumonia infectocontagiosa.

    Inclua sliders de controle para parâmetros como: Taxa de Transmissão (R0), Período de Incubação, Letalidade e Duração da Recuperação.

    Forneça uma lista detalhada da stack tecnológica utilizada.

    Prompt para o artigo:Requisitos de Documentação:

    Gere um artigo científico formal (em inglês ou português) estruturado com: Resumo, Introdução, Metodologia (explicando o modelo matemático), Resultados Esperados e Referências.

    O artigo deve explicar como os parâmetros da pneumonia bacteriana/viral foram integrados ao código.

Entrega: Disponibilize o código-fonte organizado para que eu possa fazer upload direto para um repositório GitHub e forneça o artigo em formato PDF para download."